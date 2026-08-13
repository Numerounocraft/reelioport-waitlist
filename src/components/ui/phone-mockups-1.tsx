import {
  ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const exampleImages: ImageItem[] = [
  {
    src: "/images/app-feed.png",
    alt: "ReelioPort profile feed with featured reel and new portfolios",
  },
  {
    src: "/images/app-video-detail.png",
    alt: "ReelioPort video detail page with creator info and related reels",
  },
  {
    src: "/images/app-studio.png",
    alt: "ReelioPort studio dashboard with project stats and uploads",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />;
}
