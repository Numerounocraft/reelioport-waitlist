import {
  ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const exampleImages: ImageItem[] = [
  {
    src: "/images/app-feed.png",
    alt: "Reelioport profile feed with featured reel and new portfolios",
  },
  {
    src: "/images/app-video-detail.png",
    alt: "Reelioport video detail page with creator info and related reels",
  },
  {
    src: "/images/app-studio.png",
    alt: "Reelioport studio dashboard with project stats and uploads",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />;
}
