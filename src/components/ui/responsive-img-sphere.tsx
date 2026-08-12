"use client";

import { useEffect, useState } from "react";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";

const SIZES = {
  mobile: { containerSize: 300, sphereRadius: 125 },
  tablet: { containerSize: 440, sphereRadius: 180 },
  desktop: { containerSize: 560, sphereRadius: 230 },
};

export function ResponsiveImgSphere({ images }: { images: ImageData[] }) {
  const [size, setSize] = useState(SIZES.mobile);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) setSize(SIZES.desktop);
      else if (window.innerWidth >= 640) setSize(SIZES.tablet);
      else setSize(SIZES.mobile);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <SphereImageGrid
      images={images}
      containerSize={size.containerSize}
      sphereRadius={size.sphereRadius}
      dragSensitivity={0.6}
      baseImageScale={0.2}
      autoRotate
      autoRotateSpeed={0.15}
    />
  );
}
