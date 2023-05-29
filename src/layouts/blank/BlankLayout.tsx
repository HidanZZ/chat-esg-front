import { Box } from "@mui/material";

interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <Box
    sx={{
      height: '100vh',
    }}
    >{children}</Box>
  )
};

export default BlankLayout;



