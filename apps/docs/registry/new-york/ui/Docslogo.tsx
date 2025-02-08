import React from "react";
import Image from "next/image";
export default function docslogo() {
  return (
    <div>
      <Image
        src="https://res.cloudinary.com/dmfh8lexl/image/upload/v1737388265/logo_mqxuad.png"
        alt="Axion / JS"
        width={100}
        height={40}
        priority
      />
    </div>
  );
}
