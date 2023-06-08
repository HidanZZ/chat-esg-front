import React, { useState, useEffect } from "react";
import {
	Divider,
	Box,
	Chip,
	Typography,
	Avatar,
	IconButton,
	Button,
	Stack,
	styled,
	Grid,
} from "@mui/material";
import { IconDownload } from "@tabler/icons-react";

import Breadcrumb from "../../../src/layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "../../../src/components/container/PageContainer";
import ChatSidebar from "../../../src/components/apps/chats/ChatSidebar";
import AppCard from "../../../src/components/shared/AppCard";
import Sidebar from "../../../src/layouts/full/vertical/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchChats,
	sendMsg as send,
} from "../../../src/store/apps/chat/ChatSlice";
import { AppDispatch } from "../../../src/store/Store";
import InlineItemCard from "../../../src/components/shared/InlineItemCard";
import { getFrequentQuestions } from "../../../src/store/apps/chat/components/FrequentQuestions";
import { ChatsType, MessageType } from "../../../src/types/apps/chat";
import {
	OpenAiResponse,
	getChatResponse,
} from "../../../src/store/apps/chat/components/ChatCompletion";
import FullLayout from "../../../src/layouts/full/FullLayoutWithHeader";
import ChatContent from "../../../src/components/apps/chatpdf/ChatContent";
import ChatMsgSent from "../../../src/components/apps/chatpdf/ChatMsgSent";
import { getDocuments } from "../../../src/store/apps/chat/components/Chatpdf";
import Image from "next/image";
import { max } from "date-fns";
import ArrowBack from "@mui/icons-material/ArrowBack";
import MessageOutlined  from "@mui/icons-material/MessageOutlined";
import { on } from "events";
const handleDownload = (filename: string) => {
		const url = process.env.NEXT_PUBLIC_API_URL + "/" + filename;
		window.open(url, "_blank");
	};
	const getImageUrl = (filename: string) => {
    
		return process.env.NEXT_PUBLIC_API_URL + "/" + filename.replace(".pdf", ".jpg");
	};
const ChatPdf = () => {
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { documentList } = useSelector(
		(state: any) => state.openAiReducer.chatpdf
	);
	const [showChat, setShowChat] = useState(false);

	const StyledStack = styled(Stack)(() => ({
		".showOnHover": {
			display: "none",
		},
		"&:hover .showOnHover": {
			display: "block",
		},
	}));

	
	const renderDocuments = (documentList: string[]) => {
    if (!documentList || documentList.length === 0) return null
		return (
			<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        p: 2,
      }}
      >
				<Grid container spacing={2} sx={{
          minHeight: '700px',
          mb:6
        }}>
					<Grid item xs={12} md={6}>
						<PdfCard filename={documentList[2]} />
					</Grid>
					<Grid item xs={12} md={6}>
						<Grid container spacing={6} sx={{
              height: '100%'
            }}>
							<Grid item xs={6} >
								<PdfCard filename={documentList[1]} />
							</Grid>
							<Grid item xs={6} >
								<PdfCard filename={documentList[0]} />
							</Grid>
							<Grid item xs={6}>
								<PdfCard filename={documentList[3]} />
							</Grid>
              <Grid item xs={6}>
								<PdfCard filename={documentList[4]} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
        >

				<Button
        sx={{
          width: '50%',
        }}
        startIcon={<MessageOutlined />}
        variant='contained' onClick={() => setShowChat(true)}>
					Chat with Pdfs
				</Button>
        </Box>
			</Box>
		);
	};

	useEffect(() => {
		dispatch(getDocuments("test"));
	}, [dispatch]);

	return (
		<PageContainer
			sx={{
				minHeight: "calc(100vh - 64px)",
				height: "calc(100vh - 64px)",
				display: "flex",
				overflow: "hidden",
			}}
		>
			{/* <Breadcrumb title="Chat app" subtitle="Messenger" /> */}
			<AppCard
				sx={{
					flexDirection: "column",
					flexGrow: 1,
					height: "100%",
				}}
			>
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

				<Box
					flexGrow={1}
					sx={{
						display: "flex",
						flexDirection: "column",
						height: "inherit",
					}}
				>
					{showChat ? (
						<>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          
            >
            <Button 
            sx={{
              my: 4,
              mx: 2
            }}
             startIcon={<ArrowBack />}
            variant='contained' onClick={() => setShowChat(false)}>
                  Back to Pdfs
                </Button>
                </Box>
							<Divider />

							<ChatContent
								toggleChatSidebar={() => setMobileSidebarOpen(true)}
							/>

							<Divider />
							<ChatMsgSent />
						</>
					) : (
						renderDocuments(documentList)
					)}
				</Box>
			</AppCard>
		</PageContainer>
	);
};

const PdfCard = ({ filename }: { filename: string }) => {
  const StyledBox =  styled(Box)(() => ({
		".showOnHover": {
			display: "none",
		},
		"&:hover .showOnHover": {
			display: "block",
		},
	}));

  return (
    <StyledBox 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        p: 2,
        width: '100%',
        height: '100%',
        position : 'relative'
      }}
    >
      <Image
	  loader={()=> getImageUrl(filename)}
        alt={filename}
        fill={true}
        src={getImageUrl(filename)}
        style={{
          objectFit: 'contain',
        }}
        ></Image>
        <Box 
        
        sx={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
        }}
        className="showOnHover">
                          <IconButton aria-label="delete"
                          onClick={() => handleDownload(filename)}
                          sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'black',
                              color: 'white',
                            }
                            
                          }}>
                            <IconDownload stroke={1.5} size="20" />
                          </IconButton>
                        </Box>
        </StyledBox>
  )


}

ChatPdf.layout = FullLayout;

export default ChatPdf;
