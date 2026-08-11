import { Hero } from "@/components/Hero";
import { WhyJoinWaitlist } from "@/components/WhyJoinWaitlist";
import { BuiltForCreatives } from "@/components/BuiltForCreatives";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <WhyJoinWaitlist />
      <BuiltForCreatives />
      {/* Testimonial/quote banner and final CTA go here — built next, with scroll text effects */}
    </main>
  );
}
