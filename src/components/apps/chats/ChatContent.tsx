import React, { useEffect } from "react";
import {
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Box,
  Stack,
  Badge,
  useMediaQuery,
  Theme,
} from "@mui/material";
import {
  IconDotsVertical,
  IconMenu2,
  IconPhone,
  IconVideo,
} from "@tabler/icons-react";
import { useSelector } from "../../../store/Store";
import Lottie from "lottie-react";
import { ChatsType } from "../../../types/apps/chat";
import { formatDistanceToNowStrict } from "date-fns";
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
import dotAnimation from "../../../../public/animations/50817-three-dots.json";

import { useDispatch } from "react-redux";
import { toggleSidebar,toggleMobileSidebar } from "../../../store/customizer/CustomizerSlice";
import ChatInsideSidebar from "./ChatInsideSidebar";
import fr from 'date-fns/locale/fr';
interface ChatContentProps {
  toggleChatSidebar: () => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  toggleChatSidebar,
}: any) => {
  const [open, setOpen] = React.useState(true);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const {status} = useSelector((state) => state.openAiReducer.ChatCompletion);
const dispatch = useDispatch();
  const chatDetails: ChatsType = useSelector(
    (state) => state.chatReducer.chats[state.chatReducer.chatContent - 1]
  );

  
  useEffect(() => {
    //if new msg comes then scroll to bottom
    if (chatDetails) {
      console.log('chatDetails: ', chatDetails);
      
      const chatContent = document.getElementById("chatContent");
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    }
  }, [chatDetails]);
  useEffect(() => {
    console.log('open', open);
  }, [open]);
    
  

  return (
    <Box flexGrow={1} overflow={'auto'} 
    id="chatContent"
    >
      {chatDetails ? (
        <Box>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box>
            <Box display="flex" alignItems="center" p={2}>
              <Box
                sx={{
                  display: { xs: "block", md: "block", lg: "none" },
                  mr: "10px",
                }}
              >
                <IconMenu2 stroke={1.5} onClick={() => dispatch(toggleMobileSidebar())} />
              </Box>
              <ListItem key={chatDetails.id} dense disableGutters>
                <ListItemAvatar>
                  
                    <Avatar alt={chatDetails.name}  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h5">{chatDetails.name}</Typography>
                  }
                />
              </ListItem>
              <Stack direction={"row"}>
               
                <IconButton aria-label="sidebar" onClick={() => toggleChatSidebar()}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
          </Box>
          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}

          <Box display="flex" height='100%'>
            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}

            <Box width="100%" height='100%'>
              <Box
                sx={{
                  height: "100%",
                  // overflow: "auto",
                  // maxHeight: "800px",
                }}
              >
                <Box p={3}>
                  {chatDetails.messages.map((chat) => {
                    return (
                      <Box key={chat.id + chat.createdAt}>
                        {chatDetails.id === chat.senderId ? (
                          <Box display="flex">
                            <ListItemAvatar>
                              <Avatar
                                alt={chatDetails.name}
                                // src={chatDetails.thumb}
                                sx={{ width: 40, height: 40 }}
                              />
                            </ListItemAvatar>
                            <Box>
                              {chat.createdAt ? (
                                <Typography
                                  variant="body2"
                                  color="grey.400"
                                  mb={1}
                                >
                                  {chatDetails.name},{" "}il y a{" "}
                                  {formatDistanceToNowStrict(
                                    new Date(chat.createdAt),
                                    {
                                      addSuffix: false,
                                      locale: fr
                                    }
                                  )}
                                  
                                </Typography>
                              ) : null}
                              {chat.type === "text" ? (
                                <Box
                                  mb={2}
                                  sx={{
                                    p: 1,
                                    backgroundColor: "grey.100",
                                    mr: "auto",
                                    maxWidth: "320px",
                                  }}
                                >
                                  {chat.msg}
                                </Box>
                              ) : null}
                              {chat.type === "image" ? (
                                <Box
                                  mb={1}
                                  sx={{
                                    overflow: "hidden",
                                    lineHeight: "0px",
                                  }}
                                >
                                  <img
                                    src={chat.msg}
                                    alt="attach"
                                    width="150"
                                  />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            mb={1}
                            display="flex"
                            alignItems="flex-end"
                            flexDirection="row-reverse"
                          >
                            <Box
                              alignItems="flex-end"
                              display="flex"
                              flexDirection={"column"}
                            >
                              {chat.createdAt ? (
                                <Typography
                                  variant="body2"
                                  color="grey.400"
                                  mb={1}
                                >
                                  il y a{" "}
                                  {formatDistanceToNowStrict(
                                    new Date(chat.createdAt),
                                    {
                                      addSuffix: false,
                                      locale: fr
                                    }
                                  )}
                                </Typography>
                              ) : null}
                              {chat.type === "text" ? (
                                <Box
                                  mb={1}
                                  sx={{
                                    p: 1,
                                    backgroundColor: "primary.light",
                                    ml: "auto",
                                    maxWidth: "320px",
                                  }}
                                >
                                  {chat.msg}
                                </Box>
                              ) : null}
                              {chat.type === "image" ? (
                                <Box
                                  mb={1}
                                  sx={{ overflow: "hidden", lineHeight: "0px" }}
                                >
                                  <img
                                    src={chat.msg}
                                    alt="attach"
                                    width="250"
                                  />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                  {
                    status === 'loading' && (
                      <Box display="flex">
                            <ListItemAvatar>
                              <Avatar
                                alt={chatDetails.name}
                                // src={chatDetails.thumb}
                                sx={{ width: 40, height: 40 }}
                              />
                            </ListItemAvatar>
                            <Box>
                              
                             
                                <Box
                                  mb={2}
                                  sx={{
                                    p: 1,
                                    backgroundColor: "grey.100",
                                    mr: "auto",
                                    maxWidth: "320px",
                                  }}
                                >
                                 <Lottie animationData={
                                    dotAnimation
                                  } 
                                  style={{
                                   flex: 1,
                                  }}
                                  />
                                </Box>
                              
                             
                            </Box>
                                  
                                </Box>
                              
                              
                            
                    )
                  }
                </Box>
              </Box>
            </Box>

            {/* ------------------------------------------- */}
            {/* Chat right sidebar Content */}
            {/* ------------------------------------------- */}
            {/* {open ? (
              <Box flexShrink={0}>
                <ChatInsideSidebar
                  isInSidebar={lgUp ? open : !open}
                  //@ts-ignore
                  chat={chatDetails}
                />
              </Box>
            ) : (
              ""
            )} */}
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
          {/* ------------------------------------------- */}
          {/* if No Chat Content */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              display: { xs: "flex", md: "flex", lg: "none" },
              mr: "10px",
            }}
          >
            <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
          </Box>
          <Typography variant="h4">Select Chat</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
