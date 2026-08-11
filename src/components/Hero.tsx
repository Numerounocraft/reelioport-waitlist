export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-4 sm:px-10 lg:px-20">
        <div className="relative overflow-hidden rounded-b-[32px] bg-brand-dark px-5 pb-14 pt-5 sm:px-10 sm:pb-20 sm:pt-6">
          <nav className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-[#325456] bg-[#1B4143] px-6 py-3">
            <span className="font-tauri text-base text-white">ReelioPort</span>
            <a
              href="#waitlist"
              className="rounded-full bg-brand-mint px-4 py-2.5 text-sm font-medium text-[#012B2E]"
            >
              Join The Waitlist
            </a>
          </nav>

          <div className="mt-14 flex flex-col items-start gap-10 sm:mt-20 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-md flex-col gap-4">
              <h1 className="font-display text-3xl leading-9 text-brand-mint sm:text-4xl sm:leading-10">
                One link. Every project. Every opportunity.
              </h1>
              <p className="max-w-sm text-lg leading-[22px] tracking-[0.03em] text-brand-mint">
                ReelioPort is the professional video portfolio platform built
                for creatives.
              </p>
            </div>
            <p className="max-w-xs font-display text-[32px] leading-10 text-brand-mint sm:text-[40px] sm:leading-[48px] lg:text-right lg:text-[46px] lg:leading-[56px]">
              YOUR WORK DESERVES A BETTER HOME.
            </p>
          </div>
        </div>

        <div
          id="waitlist"
          className="flex flex-col items-center gap-10 py-16 sm:py-20"
        >
          <div className="flex flex-col items-center gap-3.5 text-center">
            <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
              JOIN THE WAITLIST
            </h2>
            <p className="max-w-sm text-lg font-semibold leading-[22px] text-brand-dark">
              Exclusive discount on Reelioport Pro when we launch.
            </p>
          </div>

          <form className="flex w-full max-w-sm flex-col items-center gap-6">
            <div className="flex w-full flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full rounded-lg bg-[#F5F5F5] px-4 py-3 text-[13px] text-[#626262] placeholder:text-[#626262] focus:outline-2 focus:outline-brand-dark"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full rounded-lg bg-[#F5F5F5] px-4 py-3 text-[13px] text-[#626262] placeholder:text-[#626262] focus:outline-2 focus:outline-brand-dark"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-brand-mint px-4 py-3 text-[13px] font-semibold text-brand-ink transition-colors hover:bg-[#8CF0B4]"
              >
                Join Waitlist
              </button>
            </div>
            <p className="max-w-[252px] text-center text-[13px] text-brand-dark">
              Be among the 6,000+ creatives waiting to experience ReelioPort.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
