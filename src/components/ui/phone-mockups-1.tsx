import {
  ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const exampleImages: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1756277623973-3717bc2d4427?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    alt: "Cinematic portrait reel on ReelioPort",
  },
  {
    src: "https://images.unsplash.com/photo-1563775957285-5860ffa885c0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    alt: "Live performance reel on ReelioPort",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1664803966524-ee7799439715?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    alt: "Aerial drone reel on ReelioPort",
  },
  {
    src: "https://images.unsplash.com/photo-1723236900134-63561e5832b3?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    alt: "Action sports reel on ReelioPort",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />;
}
