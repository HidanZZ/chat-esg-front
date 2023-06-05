import React from 'react';
import { Typography } from '@mui/material';
import Breadcrumb from '../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../src/components/container/PageContainer';
import DashboardCard from '../src/components/shared/DashboardCard';
import FullLayout from '../src/layouts/full/FullLayoutWithPadding';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Sample Page',
  },
];

const Home=() =>{
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      {/* breadcrumb */}
      {/* end breadcrumb */}
      <DashboardCard title="Sample Page" >
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
}

Home.layout = FullLayout

export default Home;