import { useMemo, useRef, useState } from "react";

const report = {
  score: 87,
  faceShape: "Oval",
  attractiveness: "High",
  style: "Korean Streetwear",
  hairstyle: "Textured fringe / Korean two-block",
  priority: "Sharpen jawline definition with body-fat reduction and consistent sleep.",
  outfit: "Cropped jacket, straight-leg trousers, clean sneakers, and neutral layers.",
};

const seoPages = [
  {
    slug: "/face-shape/oval",
    title: "Oval Face Shape",
    copy: "Balanced and versatile proportions. Works well with textured fringe, Korean two-block, comma hair, and layered medium cuts.",
  },
  {
    slug: "/hairstyle/korean-two-block",
    title: "Korean Two-Block Haircut",
    copy: "Best for clean structure, soft volume, and a younger dating profile. Keep the sides tidy and add texture on top.",
  },
  {
    slug: "/style/minimal-korean",
    title: "Minimal Korean Style",
    copy: "Neutral tones, relaxed silhouettes, clean shoes, and simple accessories create an approachable high-value look.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "$0",
    label: "Lead magnet",
    features: ["1 AI analysis", "Basic score", "Face shape preview"],
  },
  {
    name: "Report",
    price: "$1.99",
    label: "Main offer",
    featured: true,
    features: ["GlowUp score", "Hairstyle plan", "Outfit advice", "30-day makeover roadmap"],
  },
  {
    name: "Premium",
    price: "$9.99/mo",
    label: "Later stage",
    features: ["Unlimited reports", "Dating analysis", "Style transformation", "Progress tracking"],
  },
];

export default function GlowUpAI() {
  const [freeUsage, setFreeUsage] = useState(0);
  const [referrals, setReferrals] = useState(1);
  const shareCardRef = useRef(null);

  const isFreeBlocked = freeUsage >= 1;
  const referralCode = useMemo(() => "glow-" + Math.random().toString(36).slice(2, 8), []);

  function runAnalysis() {
    if (isFreeBlocked) return;
    setFreeUsage((value) => value + 1);
  }

  function downloadShareCard() {
    const card = shareCardRef.current;
    if (!card) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1080;
    canvas.height = 1350;

    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#38bdf8");
    gradient.addColorStop(0.52, "#f8fafc");
    gradient.addColorStop(1, "#f97316");
    ctx.fillStyle = gradient;
    ctx.fillRect(64, 64, 952, 1222);

    ctx.fillStyle = "#0b0b0b";
    ctx.fillRect(92, 92, 896, 1166);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 72px Inter, Arial";
    ctx.fillText("GlowUp Score", 140, 210);

    ctx.font = "800 220px Inter, Arial";
    ctx.fillText(String(report.score), 140, 470);

    ctx.font = "600 52px Inter, Arial";
    ctx.fillText("Face: " + report.faceShape, 140, 620);
    ctx.fillText("Style: " + report.style, 140, 710);
    ctx.fillText("Attractiveness: " + report.attractiveness, 140, 800);

    ctx.fillStyle = "#d4d4d8";
    ctx.font = "500 38px Inter, Arial";
    ctx.fillText("AI Personal Glow-Up Report", 140, 1040);
    ctx.fillText("Try yours at glowup.ai", 140, 1110);

    const link = document.createElement("a");
    link.download = "glowup-share-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function copyReferralLink() {
    const url = "https://glowup.ai/?ref=" + referralCode;
    navigator.clipboard?.writeText(url);
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="border-b border-white/10 bg-neutral-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
              AI Personal Glow-Up Report
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              See how attractive you look in the dating market.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
              Upload a selfie and get a practical Korean-style appearance report:
              face shape, hairstyle, outfit direction, glow-up score, and a makeover plan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={runAnalysis}
                disabled={isFreeBlocked}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
              >
                {isFreeBlocked ? "Free report used" : "Analyze my selfie"}
              </button>
              <button className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-sky-300 hover:text-sky-200">
                Unlock full report $1.99
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-400">
              <span>Free usage: {freeUsage}/1</span>
              <span>Cached result ready after first analysis</span>
              <span>No monthly plan required to start</span>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-neutral-900 p-4 shadow-2xl">
            <div className="aspect-[4/5] rounded-md bg-gradient-to-br from-neutral-800 via-neutral-950 to-sky-950 p-5">
              <div className="flex h-full flex-col justify-between rounded-md border border-white/10 bg-black/45 p-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-neutral-400">Preview</p>
                  <div className="mt-8 text-7xl font-black">{report.score}</div>
                  <p className="mt-2 text-2xl font-semibold">GlowUp Score</p>
                </div>
                <div className="space-y-3 text-sm text-neutral-200">
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span>Face</span>
                    <strong>{report.faceShape}</strong>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span>Style</span>
                    <strong>{report.style}</strong>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span>Attractiveness</span>
                    <strong>{report.attractiveness}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {pricing.map((plan) => (
            <article
              key={plan.name}
              className={
                "rounded-lg border p-5 " +
                (plan.featured
                  ? "border-sky-300 bg-sky-300 text-black"
                  : "border-white/10 bg-neutral-900 text-white")
              }
            >
              <p className={plan.featured ? "text-sm font-semibold text-black/60" : "text-sm font-semibold text-sky-300"}>
                {plan.label}
              </p>
              <h2 className="mt-2 text-2xl font-bold">{plan.name}</h2>
              <p className="mt-2 text-3xl font-black">{plan.price}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature}>+ {feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-neutral-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">Viral share card</p>
            <h2 className="mt-3 text-3xl font-bold">Turn every result into a social post.</h2>
            <p className="mt-4 leading-7 text-neutral-300">
              The report is designed to make people ask, "What score would I get?"
              Users can download a card, copy a referral link, and share the result.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={downloadShareCard}
                className="rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-sky-100"
              >
                Download image
              </button>
              <button
                onClick={copyReferralLink}
                className="rounded-lg border border-white/20 px-5 py-3 font-semibold transition hover:border-sky-300 hover:text-sky-200"
              >
                Copy link
              </button>
              <button className="rounded-lg border border-white/20 px-5 py-3 font-semibold transition hover:border-sky-300 hover:text-sky-200">
                Share to IG story
              </button>
            </div>
          </div>

          <div ref={shareCardRef} className="rounded-lg border border-white/10 bg-black p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">Share preview</p>
            <div className="mt-8 text-6xl font-black">GlowUp Score: {report.score}</div>
            <div className="mt-8 grid gap-3 text-lg">
              <p>Face: {report.faceShape}</p>
              <p>Style: {report.style}</p>
              <p>Attractiveness: {report.attractiveness}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1fr_1fr] md:px-8">
        <article className="rounded-lg border border-white/10 bg-neutral-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">Full report</p>
          <h2 className="mt-3 text-3xl font-bold">Actionable improvement plan</h2>
          <div className="mt-6 space-y-5 text-neutral-300">
            <div>
              <h3 className="font-semibold text-white">Recommended hairstyle</h3>
              <p>{report.hairstyle}</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Glow-up priority</h3>
              <p>{report.priority}</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Outfit direction</h3>
              <p>{report.outfit}</p>
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-white/10 bg-neutral-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">Referral engine</p>
          <h2 className="mt-3 text-3xl font-bold">Invite friends. Unlock reports.</h2>
          <div className="mt-6 rounded-md bg-neutral-950 p-4 font-mono text-sm text-neutral-300">
            https://glowup.ai/?ref={referralCode}
          </div>
          <div className="mt-5 space-y-3 text-neutral-300">
            <p>Invites: {referrals}</p>
            <p>Invite 1 friend: +1 free analysis</p>
            <p>Invite 3 friends: unlock premium report</p>
          </div>
          <button
            onClick={() => setReferrals((value) => value + 1)}
            className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-sky-100"
          >
            Simulate invite
          </button>
        </article>
      </section>

      <section className="border-t border-white/10 bg-neutral-900">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">SEO system</p>
          <h2 className="mt-3 text-3xl font-bold">Programmatic pages for free traffic</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {seoPages.map((page) => (
              <article key={page.slug} className="rounded-lg border border-white/10 bg-neutral-950 p-5">
                <p className="font-mono text-sm text-sky-300">{page.slug}</p>
                <h3 className="mt-4 text-xl font-bold">{page.title}</h3>
                <p className="mt-3 leading-7 text-neutral-300">{page.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
