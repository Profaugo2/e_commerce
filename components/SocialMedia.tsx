import { Facebook, Instagram, MessageCircle, MessageCircleHeart } from 'lucide-react';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Link from 'next/link';
import { cn } from '@/lib/utils';
interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

const socialLink = [
    {
    title: "WhatsApp",
    href: "https://wa.me/237659619386",
    icon: <MessageCircle className="w-5 h-5"/>,
    id: 'whatsapp',
  },
    {
    title: "Instagram",
    href: "https://www.instagram.com/nedy_shop_store?igsh=NDY5bHZuaGVrbXk3",
    icon: <Instagram className="w-5 h-5"/>,
    id: 'Instagram',
  },
    {
    title: "Facebook",
    href: "https://www.facebook.com/share/1A4mBPFWWD/",
    icon: <Facebook className="w-5 h-5"/>,
    id: 'Facebook',
  },
    {
    title: "Pinterest",
    href: "https://pin.it/huV49CPA3",
    icon: <MessageCircleHeart className="w-5 h-5"/>,
    id: 'Pinterest',
  },
];

const SocialMedia = ({className, iconClassName, tooltipClassName}:Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border border-amber-600 rounded-full hover:text-black hover:border-shop_light_orange hoverEffect",
                  iconClassName
                )}
              >
                {item.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent className={cn("bg-white text-darkColor font-semibold border border-shop_light_orange", tooltipClassName)}>
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
