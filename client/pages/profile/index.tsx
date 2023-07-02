import React from 'react';
import { NextPage } from 'next';
import Profile from '../../components/Profile';
import SEO from '../../components/SEO';
import { homeConfig } from '../../utils/config';

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <Profile />
      </main>
    </>
  );
};
export default LoginPage;
