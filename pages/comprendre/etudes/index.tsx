import React, { useState,useEffect } from 'react';
import { Divider, Box, Chip, Typography } from '@mui/material';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/components/container/PageContainer';
import ChatSidebar from '../../../src/components/apps/chats/ChatSidebar';
import AppCard from '../../../src/components/shared/AppCard';
import Sidebar from '../../../src/layouts/full/vertical/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, sendMsg as send } from '../../../src/store/apps/chat/ChatSlice';
import { AppDispatch } from '../../../src/store/Store';
import InlineItemCard from '../../../src/components/shared/InlineItemCard';
import { getFrequentQuestions } from '../../../src/store/apps/chat/components/FrequentQuestions';
import { ChatsType, MessageType } from '../../../src/types/apps/chat';
import { OpenAiResponse, getChatResponse } from '../../../src/store/apps/chat/components/ChatCompletion';
import FullLayout from '../../../src/layouts/full/FullLayoutWithHeader';
import ChatContent from '../../../src/components/apps/chatpdf/ChatContent';
import ChatMsgSent from '../../../src/components/apps/chatpdf/ChatMsgSent';

const ChatPdf = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
const dispatch = useDispatch<AppDispatch>();
const {questions} = useSelector((state:any) => state.openAiReducer.FrequentQuestions);



  
  return (
    <PageContainer sx={{
        minHeight:'calc(100vh - 64px)',
        height:'calc(100vh - 64px)',
        display: 'flex',
    }}>
      {/* <Breadcrumb title="Chat app" subtitle="Messenger" /> */}
      <AppCard sx={{
        flexDirection: 'column',
        flexGrow: 1,
        height : '100%',
      }}>
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
            
            {/* <Typography variant="h5" sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                mb: '20px'
                }}>
                Questions fréquentes
            </Typography> */}
        
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          {/* <InlineItemCard>
                {
                  questions && questions.map((question:any)=>{
                    return <Chip label={question} onClick={()=>sendMsg(question)} sx={{
                      cursor: 'pointer'
                    }} />
                  })
                }

            </InlineItemCard> */}
          <Divider />
          <ChatMsgSent />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

ChatPdf.layout = FullLayout

export default ChatPdf;
