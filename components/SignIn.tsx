import { SignInButton } from '@clerk/nextjs';
import React from 'react';
import { Button } from './ui/button';

const SignIn = () => {
  return (
    <SignInButton mode='modal'>
      <Button className='text-sm font-semibold text-white bg-shop_dark_orange hover:bg-amber-600 hover:text-white hover:cursor-pointer hoverEffect'>
      Login
    </Button>
    </SignInButton>
  );
};

export default SignIn;
