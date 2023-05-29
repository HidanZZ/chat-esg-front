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
import { OpenAiResponse, getChatResponse } from "../../../store/apps/chat/OpenAiSlice";

const ChatMsgSent = () => {
  const [msg, setMsg] = React.useState<any>("");
  const dispatch = useDispatch();


  
  const id = useSelector((state) => state.chatReducer.chatContent);
  const {status} = useSelector((state) => state.openAiReducer);

  const handleChatMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const newMsg = { id, msg };

  const onChatMsgSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(sendMsg({
      ...newMsg,
      senderId: 0
    }));
    dispatch(getChatResponse(msg)).unwrap().then((response:OpenAiResponse)=>{
      
      
      dispatch(sendMsg({id: response.id, msg: response.content, senderId: response.id}))
    })
    
    
    setMsg("");
  };
  // const handleEnter = (e: any) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     dispatch(sendMsg(newMsg));
  //   console.log('new message sent: ', newMsg);

  //     setMsg("");
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener("keydown", handleEnter, false);

  //   return () => {
  //     document.removeEventListener("keydown", handleEnter, false);
  //   };
  // }, []);

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
          placeholder="Type a Message"
          size="small"
          type="text"
          inputProps={{ "aria-label": "Type a Message" }}
          onChange={handleChatMsgChange.bind(null)}
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
