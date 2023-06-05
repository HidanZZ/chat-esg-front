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
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Theme,
} from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";

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
import {
	toggleSidebar,
	toggleMobileSidebar,
} from "../../../store/customizer/CustomizerSlice";
import { sourceDocument } from "../../../store/apps/chat/components/Chatpdf";
interface ChatContentProps {
	toggleChatSidebar: () => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
	toggleChatSidebar,
}: any) => {
	const dispatch = useDispatch();
	const { history, status } = useSelector(
		(state: any) => state.openAiReducer.chatpdf
	);

	useEffect(() => {
		//if new msg comes then scroll to bottom
		if (history) {
			console.log(history);

			const chatContent = document.getElementById("chatContent");
			if (chatContent) {
				chatContent.scrollTop = chatContent.scrollHeight;
			}
		}
	}, [history]);
    
    const formatSource = (source:string)=>{
        return source.split('\\').pop()
    }

	return (
		<Box flexGrow={1} overflow={"auto"} id='chatContent'>
			{history ? (
				<Box>
					{/* ------------------------------------------- */}
					{/* Header Part */}
					{/* ------------------------------------------- */}

					{/* ------------------------------------------- */}
					{/* Chat Content */}
					{/* ------------------------------------------- */}

					<Box display='flex' height='100%'>
						{/* ------------------------------------------- */}
						{/* Chat msges */}
						{/* ------------------------------------------- */}

						<Box width='100%' height='100%'>
							<Box
								sx={{
									height: "100%",
									// overflow: "auto",
									// maxHeight: "800px",
								}}
							>
								<Box p={3}>
									{history.map(
										(
											msgs: [string | null, string | null, sourceDocument[]],
											index: number
										) => {
											return (
												<Box key={index} mb={1}>
													{msgs[0] && (
														<Box
															mb={1}
															display='flex'
															alignItems='flex-end'
															flexDirection='row-reverse'
														>
															<Box
																alignItems='flex-end'
																display='flex'
																flexDirection={"column"}
															>
																<Box
																	mb={1}
																	sx={{
																		p: 1,
																		backgroundColor: "primary.light",
																		ml: "auto",
																		maxWidth: "320px",
																	}}
																>
																	{msgs[0]}
																</Box>
															</Box>
														</Box>
													)}
													{msgs[1] && (
														<Box display='flex'>
															<ListItemAvatar>
																<Avatar
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
																	{msgs[1]}
																</Box>
															</Box>
														</Box>
													)}
													{msgs[2] && (
														<>
                                                        {
                                                            msgs[2].map((doc:sourceDocument,index:number)=>{
                                                                return (
                                                                    <Accordion>
															<AccordionSummary
																expandIcon={<IconChevronDown />}
															>
																<Typography
																	variant='h6'
																	sx={{ width: "33%", flexShrink: 0 }}
																>
																	{
                                                                    `Source #${index+1}`
                                                                    }
																</Typography>
																<Typography
																	variant='subtitle2'
																	color='textSecondary'
																>
																	{
                                                                    `${formatSource(doc.metadata.source)} (Page : ${doc.metadata["loc.pageNumber"]})`
                                                                    }
																</Typography>
															</AccordionSummary>
															<AccordionDetails>
																<Typography
																	variant='subtitle1'
																	color='textSecondary'
																>
																	{
                                                                        doc.pageContent
                                                                    }
																</Typography>
															</AccordionDetails>
														</Accordion>
                                                                )
                                                            })
                                                        }
                                                        </>
													)}
												</Box>
											);
										}
									)}
									{status === "loading" && (
										<Box display='flex'>
											<ListItemAvatar>
												<Avatar
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
													<Lottie
														animationData={dotAnimation}
														style={{
															flex: 1,
														}}
													/>
												</Box>
											</Box>
										</Box>
									)}
								</Box>
							</Box>
						</Box>

						{/* ------------------------------------------- */}
						{/* Chat right sidebar Content */}
						{/* ------------------------------------------- */}
					</Box>
				</Box>
			) : (
				<Box display='flex' alignItems='center' p={2} pb={1} pt={1}>
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
					<Typography variant='h4'>Select Chat</Typography>
				</Box>
			)}
		</Box>
	);
};

export default ChatContent;
