"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
}

const SafeImage = ({
  src,
  alt,
  fallbackSrc = "/images/img-default.png",
  width = 300,
  height = 300,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default SafeImage;
