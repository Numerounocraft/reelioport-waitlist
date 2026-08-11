const features = [
  {
    title: "EXCLUSIVE PRO DISCOUNT",
    description:
      "Waitlist members get an exclusive discount when ReelioPort Pro launches.",
  },
  {
    title: "EARLY ACCESS",
    description:
      "Be among the first creatives to experience ReelioPort before it opens to everyone.",
  },
  {
    title: "BE READY",
    description:
      "Have a professional home for your video work when your next opportunity comes knocking.",
  },
];

export function WhyJoinWaitlist() {
  return (
    <section className="bg-white px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-[1313px] flex-col gap-12 rounded-4xl bg-brand-dark p-8 sm:gap-16 sm:p-16">
        <h2 className="font-display text-[32px] leading-10 text-white">
          WHY JOIN THE WAITLIST?
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-brand-mint">
                {feature.title}
              </h3>
              <p className="max-w-[267px] text-[13px] leading-4 tracking-[-0.01em] text-brand-mint">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
