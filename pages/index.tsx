import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Breadcrumb from '../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../src/components/container/PageContainer';
import DashboardCard from '../src/components/shared/DashboardCard';
import FullLayout from '../src/layouts/full/FullLayoutWithPadding';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });


const Home=() =>{
  const router = useRouter()
  useEffect(() => {
    router.push('/comprendre/dialogues')
  }, [])
  return null
}

export default Home;