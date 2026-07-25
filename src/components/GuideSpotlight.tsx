export function GuideSpotlight() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border-2 border-zinc-300 bg-white/70 p-6 lg:p-8">
          <p className="font-label text-[11px] uppercase text-amber-700">Why we do it differently</p>
          <h2 className="mt-2 max-w-4xl text-5xl uppercase leading-none text-zinc-900">
            Experienced Paris guides, done WITHOUT exploitative tour-company models
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="space-y-4 text-lg leading-7 text-zinc-700">
              <p>
                Real Paris Tours was built by guides who have worked for other companies in Paris and
                got tired of the usual setup: low transparency, extractive margins, and the people
                actually guiding the tours having the least say in how the work is done.
              </p>
              <p>
                We do things differently. We believe in open accounting, a collaborative business
                model, and treating guiding as skilled local work rather than disposable labor.
              </p>
              <p>
                The result is simple: experienced guides who&apos;ve lived here for a long time, know the
                city deeply, and ride and walk it every day. Better routes, better stories, and a
                business model that makes more sense for the people doing the work.
              </p>
            </div>
            <div className="grid gap-3">
              <div className="rounded-[1.5rem] border-2 border-zinc-300 bg-[#f4edda] p-4">
                <p className="font-label text-[10px] uppercase text-zinc-500">Structure</p>
                <p className="mt-2 text-xl font-semibold uppercase text-zinc-900">Open accounting</p>
              </div>
              <div className="rounded-[1.5rem] border-2 border-zinc-300 bg-[#d9c5e3] p-4">
                <p className="font-label text-[10px] uppercase text-zinc-500">Model</p>
                <p className="mt-2 text-xl font-semibold uppercase text-zinc-900">Collaborative business</p>
              </div>
              <div className="rounded-[1.5rem] border-2 border-zinc-300 bg-[#e6efd8] p-4">
                <p className="font-label text-[10px] uppercase text-zinc-500">Practice</p>
                <p className="mt-2 text-xl font-semibold uppercase text-zinc-900">We live here and ride daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
