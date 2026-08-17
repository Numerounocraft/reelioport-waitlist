import { Hero } from "@/components/Hero";
import { WhyJoinWaitlist } from "@/components/WhyJoinWaitlist";
import { BuiltForCreatives } from "@/components/BuiltForCreatives";
import { StickyTextReveal } from "@/components/StickyTextReveal";
import { ProblemSolution } from "@/components/ProblemSolution";
import { TestimonialQuote } from "@/components/TestimonialQuote";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ProblemSolution />
      <BuiltForCreatives />
      <section className="bg-white px-5 pb-16 sm:px-10 lg:px-16 sm:pb-20">
        <div className="mb-[40px]">
          <StickyTextReveal />
        </div>
        <div className="mx-auto flex max-w-[1313px] flex-col gap-4">
          <WhyJoinWaitlist />
          <TestimonialQuote />
        </div>
      </section>
    </main>
  );
}
