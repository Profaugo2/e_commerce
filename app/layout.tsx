'use client'
import { Toaster } from 'react-hot-toast';
import './globals.css';
import ChatIcon from '@/components/ChatIcon';
// import { useEffect, useState } from 'react';
// import Loader from '@/components/Loader';
const RootLayout = ({children}: {children: React.ReactNode}) => {
    // const [loading, setLoading] = useState(true);

//     useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1500); // simulate loading delay
//     return () => clearTimeout(timer);
//   }, []);
    return(
        <html lang="en">
            <body  className="font-poppins antialiased">
                <ChatIcon />
                {children}
                <Toaster 
                 position="top-right"
                 toastOptions={{
                    style:{
                        background: "#000000",
                        color:"#fff"
                    }
                 }}
                />
            </body>
        </html>
    );
};

export default RootLayout;