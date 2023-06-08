import React from 'react';
import { Grid, Typography } from '@mui/material';
import Breadcrumb from '../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../src/components/container/PageContainer';
import DashboardCard from '../src/components/shared/DashboardCard';
import FullLayout from '../src/layouts/full/FullLayoutWithPadding';
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
      <DashboardCard >
        <ReactPlayer url='https://www.youtube.com/watch?v=U5Coqx2SNSA&pp=ygUkaW5zdGl0dXQgZGVzIGVudHJlcHJpc2VzIGVuZ2Fnw6kgZXNn'  style={{
          margin: 'auto',
          width: '100%',
          height: '100%',
        }}/>
      </DashboardCard>
      </Grid>
      <Grid item xs={12}>
      <DashboardCard >
        <Typography 
        textAlign={'center'}
        >ChatESG est une startup en technologie qui développe des outils d’intelligence artificielle
ayant pour mission d'assister les entreprises désireuses d’avoir un impact social et
environnemental positif.
</Typography>
      </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

Home.layout = FullLayout

export default Home;