"use client";
import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import {motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import React, { useState } from 'react'

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
  );
};

export default ImageView;
