// import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';


type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
  sx?: any;
};

const PageContainer = ({ title, description, children,sx }: Props) => (
  
  <HelmetProvider>
    <Box
    sx={sx}
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </Box>
  </HelmetProvider>
);

export default PageContainer;
