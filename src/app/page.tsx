import { Hero } from "@/components/Hero";
import { WhyJoinWaitlist } from "@/components/WhyJoinWaitlist";
import { BuiltForCreatives } from "@/components/BuiltForCreatives";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { FinalCta } from "@/components/FinalCta";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <WhyJoinWaitlist />
      <BuiltForCreatives />
      <TestimonialQuote />
      <FinalCta />
    </main>
  );
}
