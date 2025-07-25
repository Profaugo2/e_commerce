"use client";
import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import {motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import React, { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from 'lucide-react';

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number | undefined;
}

const ImageView =  ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);
  const [showModal, setShowModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const openModal = (index: number) => {
    setInitialSlide(index);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };
  return (
    <>
    <div className="w-full md:w-2/5 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
          <motion.div
            key={active?._key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-h-[550px] min-h-[450px] border border-tech_dark_color/10 rounded-md group overflow-hidden cursor-pointer"
            onClick={() =>
              openModal(images.findIndex((img) => img._key === active._key))
            }
          >
            <Image
              src={urlFor(active).url()}
              alt="productImage"
              width={700}
              height={700}
              priority
              className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md ${
                isStock === 0 ? "opacity-50" : ""
              }`}
            />
          </motion.div>
        </AnimatePresence>
           <div className="flex flex-wrap gap-2 items-center justify-center">
            {images.map((image) => (
            <button
              key={image._key}
              onClick={() => {
                setActive(image);
              }}
              className={`border rounded-md overflow-hidden w-16 h-16 ${
                active._key === image._key ? "ring-1 ring-darkColor opacity-100" : "opacity-80"
              }`}
            >
              <Image
                src={urlFor(image).url()}
                alt={`Thumbnail ${image._key}`}
                width={100}
                height={100}
                className="w-full h-auto object-contain"
              />
            </button>
          ))}
        </div>
    </div>

     {/* Modal Carousel */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full p-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <Carousel className="w-full" opts={{ startIndex: initialSlide }}>
                <CarouselContent>
                  {images.map((image) => (
                    <CarouselItem key={image._key}>
                      <div className="flex items-center justify-center h-[500px]">
                        <Image
                          src={urlFor(image).url()}
                          alt={`Product image ${image._key}`}
                          width={800}
                          height={800}
                          className="object-contain max-h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </>
  );
};

export default ImageView;
