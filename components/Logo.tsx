import { logo } from '@/images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={"/"} className='inline-flex'>
<div>
        <Image 
        src={logo}
        alt='logo'
        className='md:inline-flex h-15 w-20'/>
     </div>
    </Link>
  );
};

export default Logo;
