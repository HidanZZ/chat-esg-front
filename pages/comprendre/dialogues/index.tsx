import React, { useState,useEffect } from 'react';
import { Divider, Box, Chip } from '@mui/material';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/components/container/PageContainer';
import ChatSidebar from '../../../src/components/apps/chats/ChatSidebar';
import ChatContent from '../../../src/components/apps/chats/ChatContent';
import ChatMsgSent from '../../../src/components/apps/chats/ChatMsgSent';
import AppCard from '../../../src/components/shared/AppCard';
import Sidebar from '../../../src/layouts/full/vertical/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, sendMsg as send } from '../../../src/store/apps/chat/ChatSlice';
import { AppDispatch } from '../../../src/store/Store';
import InlineItemCard from '../../../src/components/shared/InlineItemCard';
import { getFrequentQuestions } from '../../../src/store/apps/chat/components/FrequentQuestions';
import { ChatsType, MessageType } from '../../../src/types/apps/chat';
import { OpenAiResponse, getChatResponse } from '../../../src/store/apps/chat/components/ChatCompletion';

const Chats = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
const dispatch = useDispatch<AppDispatch>();
const {questions} = useSelector((state:any) => state.openAiReducer.FrequentQuestions);
const id = useSelector((state:any) => state.chatReducer.chatContent);
  const chat:ChatsType = useSelector(
    (state:any) => state.chatReducer.chats[state.chatReducer.chatContent - 1]
  );
  useEffect(() => {
    dispatch(fetchChats());
    dispatch(getFrequentQuestions('test'))
  }, [dispatch]);

  const sendMsg = (msg:string) => {
    dispatch(send({
      id: id,
      msg: msg,
      senderId: 0
    }));
     const requestBody = []
    chat.messages.forEach((msg:MessageType)=>{
      const t = {
        role : msg.senderId === id ? 'assistant' : 'user',
        content : msg.msg
      }
      requestBody.push(t)
    })
    requestBody.push({
      role : 'user',
      content : msg
    })

    dispatch(getChatResponse(requestBody)).unwrap().then((response:OpenAiResponse)=>{
      
      
      dispatch(send({id: response.id, msg: response.content, senderId: response.id}))
    })
  }

  return (
    <PageContainer sx={{
        height:'100vh'
    }}>
      {/* <Breadcrumb title="Chat app" subtitle="Messenger" /> */}
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        {/* <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}  
        /> */}
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1} sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'inherit',
        }} >
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <InlineItemCard>
                {
                  questions && questions.map((question:any)=>{
                    return <Chip label={question} onClick={()=>sendMsg(question)} sx={{
                      cursor: 'pointer'
                    }} />
                  })
                }

            </InlineItemCard>
          <Divider />
          <ChatMsgSent />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
