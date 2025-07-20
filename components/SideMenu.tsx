import React, { FC } from 'react';
import Logo from './Logo';
import { X } from 'lucide-react';
import { headerData } from '@/constant/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hooks';
interface SidebarProps{
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu:FC<SidebarProps> = ({ isOpen,onClose }) => {
    const pathname = usePathname();
    const sidebarRef = useOutsideClick<HTMLDivElement>(onClose)
  return ( 
    <div 
    className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 text-white shadow-xl ${isOpen ? "translate-x-0" :"-translate-x-full"} hoverEffect`}>
        <div  
        ref={sidebarRef}
        className='min-w-72 max-w-96 bg-white text-black h-screen p-10 
        border-r border-r-shop_light_orange flex flex-col gap-6'>
            <div className='flex items-center justify-between gap-5'>
                <Logo />
                <button 
                onClick={onClose}
                className='hover:text-shop_light_orange hoverEffect'
                >
                    <X />
                </button>
            </div>
            <div className='flex flex-col space-y-3.5'>
                {headerData?.map((item) => (
                    <Link href={item?.href} key={item?.title} className={`hover:text-shop_light_orange hoverEffect ${pathname === item?.href && "text-shop_light_orange"}`}>
                        {item?.title}
                    </Link>
                ))}
            </div>
            <SocialMedia />
        </div>
    </div>
  );
};

export default SideMenu;
