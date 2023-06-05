import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../../../store/Store";
import { IconButton, InputBase, Box, Popover } from "@mui/material";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import {
  IconMoodSmile,
  IconPaperclip,
  IconPhoto,
  IconSend,
} from "@tabler/icons-react";
import { sendMsg } from "../../../store/apps/chat/ChatSlice";
import { ChatsType, MessageType } from "../../../types/apps/chat";
import { Payload, getChatResponse,OpenAiResponse, sourceDocument } from "../../../store/apps/chat/components/Chatpdf";

const ChatMsgSent = () => {
  const [msg, setMsg] = React.useState<any>("");
  const dispatch = useDispatch();


  
  
  const {status,history} = useSelector((state) => state.openAiReducer.chatpdf);

  const handleChatMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setMsg(e.target.value);
  };


  const onChatMsgSubmit = (e: any) => {
    if (status === 'loading') return;
    e.preventDefault();
    e.stopPropagation();
    //newhistory without sourceDocuments
    const newHistory : [string|null,string |null][] = history.map((msg:[string|null,string|null,sourceDocument[]|null])=>{
      return [msg[0],msg[1]]
    }
    )
   const requestBody : Payload = {
    question : msg,
    history : newHistory
   }

    dispatch(getChatResponse(requestBody))
    
    
    setMsg("");
  };
  
 

  return (
    <Box p={2} sx={{
      height: '68px',

    }}>
      {/* ------------------------------------------- */}
      {/* sent chat */}
      {/* ------------------------------------------- */}
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        
        <InputBase
          id="msg-sent"
          fullWidth
          multiline
          maxRows={7}
          value={msg}
          placeholder="Type a Question"
          size="small"
          type="text"
          inputProps={{ "aria-label": "Type a Question" }}
          onChange={handleChatMsgChange.bind(null)}
          onKeyPress={(event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onChatMsgSubmit(event);
    }
  }}
        />
        <IconButton
          aria-label="delete"
          // onClick={() => {
          //   dispatch(sendMsg(newMsg));
          //   setMsg("");
          // }}
          type="submit"
          disabled={!msg || status === 'loading'}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
        
      </form>
    </Box>
  );
};

export default ChatMsgSent;
