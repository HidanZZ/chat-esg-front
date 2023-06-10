import React from "react";
import {
  Box,
  Theme,
  useMediaQuery,
  Typography,
  Stack,
  Avatar,
  Grid,
  Alert,
  IconButton,
  styled,
} from "@mui/material";
import { ChatsType } from "../../../types/apps/chat";
import { uniq, flatten } from "lodash";
import { IconDownload } from "@tabler/icons-react";

interface chatType {
  isInSidebar?: boolean;
}

const drawerWidth = 340;

const ChatInsideSidebar = ({ isInSidebar }: chatType) => {
  const attachment = [
					{
						icon: "/images/chat/icon-adobe.svg",
						file: "Attachement-1.pdf",
						fileSize: "2MB",
					},
          {
            icon: "/images/chat/icon-adobe.svg",
            file: "Attachement-2.pdf",
            fileSize: "2MB",
          },
          {
            icon: "/images/chat/icon-adobe.svg",
            file: "Attachement-3.pdf",
            fileSize: "2MB",
          },
          {
            icon: "/images/chat/icon-adobe.svg",
            file: "Attachement-4.pdf",
            fileSize: "2MB",
          },
          {
            icon: "/images/chat/icon-adobe.svg",
            file: "Attachement-5.pdf",
            fileSize: "2MB",
          }
					
				]
  const totalAttachment = attachment.length;
  

  const StyledStack = styled(Stack)(() => ({
    ".showOnHover": {
      display: "none",
    },
    "&:hover .showOnHover": {
      display: "block",
    },
  }));

  return (
    <>
      {isInSidebar ? (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            border: "0",
            borderLeft: "1px",
            borderStyle: "solid",
            right: "0",
            height: "100%",
            background: (theme) => theme.palette.background.paper,
            position:  "relative" ,
            borderColor: (theme) => theme.palette.divider,
          }}
          p={3}
        >
          

          <Typography variant="h6" mt={2} mb={2}>
            Documents Reliés
            ({totalAttachment})
          </Typography>
          <Box>
            
                <Stack spacing={2.5}  direction="column">
                  {attachment.map((a, index) => {
                    return (
                      <StyledStack key={index} direction="row" gap={2}>
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: "48px",
                            height: "48px",
                            bgcolor: (theme) => theme.palette.grey[100],
                          }}
                        >
                          <Avatar
                            src={a.icon}
                            alt="av"
                            variant="rounded"
                            sx={{ width: "24px", height: "24px" }}
                          ></Avatar>
                        </Avatar>
                        <Box mr={"auto"}>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            mb={1}
                          >
                            {a.file}
                          </Typography>
                          <Typography variant="body2">{a.fileSize}</Typography>
                        </Box>
                        <Box className="showOnHover">
                          <IconButton aria-label="delete">
                            <IconDownload stroke={1.5} size="20" />
                          </IconButton>
                        </Box>
                      </StyledStack>
                    );
                  })}
                </Stack>
             
            {totalAttachment === 0 ? (
              <Alert severity="error">No Document Found!</Alert>
            ) : null}
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default ChatInsideSidebar;
