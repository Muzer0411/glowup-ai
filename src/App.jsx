import { useMemo, useRef, useState } from "react";
import {
  Camera,
  Copy,
  Download,
  Lock,
  Share2,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";

const sampleReport = {
  score: 87,
  faceShape: "Oval",
  attractiveness: "High",
  style: "Korean Streetwear",
  hairstyle: "Textured fringe / Korean two-block",
  priority: "Reduce body fat slightly, improve sleep consistency, and use soft volume to frame the upper face.",
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

const checkoutUrl =
  import.meta.env.VITE_CHECKOUT_URL || "https://eyebelfy.gumroad.com/l/Glow-UpReport";

function App() {
  const [freeUsage, setFreeUsage] = useState(0);
  const [referrals, setReferrals] = useState(1);
  const [photoUrl, setPhotoUrl] = useState("");
  const [toast, setToast] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("checkout") === "success";
  });
  const fileInputRef = useRef(null);

  const isFreeBlocked = freeUsage >= 1;
  const referralCode = useMemo(() => "glow-" + Math.random().toString(36).slice(2, 8), []);
  const referralLink = "https://glowup.ai/?ref=" + referralCode;

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
  }

  function runAnalysis() {
    if (isFreeBlocked) {
      showToast("Free report used. Unlock the full report for $1.99.");
      return;
    }
    setFreeUsage((value) => value + 1);
    showToast("Demo report generated from cached sample data.");
  }

  function downloadShareCard() {
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
    ctx.font = "700 72px Arial";
    ctx.fillText("GlowUp Score", 140, 210);

    ctx.font = "800 220px Arial";
    ctx.fillText(String(sampleReport.score), 140, 470);

    ctx.font = "600 52px Arial";
    ctx.fillText("Face: " + sampleReport.faceShape, 140, 620);
    ctx.fillText("Style: " + sampleReport.style, 140, 710);
    ctx.fillText("Attractiveness: " + sampleReport.attractiveness, 140, 800);

    ctx.fillStyle = "#d4d4d8";
    ctx.font = "500 38px Arial";
    ctx.fillText("AI Personal Glow-Up Report", 140, 1040);
    ctx.fillText("Try yours at glowup.ai", 140, 1110);

    const link = document.createElement("a");
    link.download = "glowup-share-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function copyReferralLink() {
    await navigator.clipboard?.writeText(referralLink);
    showToast("Referral link copied.");
  }

  async function startCheckout() {
    setIsCheckingOut(true);
    window.location.href = checkoutUrl;
  }

  function simulateUnlock() {
    setIsPremiumUnlocked(true);
    showToast("Premium report unlocked.");
  }

  return (
    <main className="app-shell">
      {toast && <div className="toast">{toast}</div>}

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            AI Personal Glow-Up Report
          </div>
          <h1>See how attractive you look in the dating market.</h1>
          <p>
            Upload a selfie and get a practical Korean-style appearance report:
            face shape, hairstyle, outfit direction, glow-up score, and a makeover plan.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => fileInputRef.current?.click()}>
              <Upload size={18} />
              Upload selfie
            </button>
            <button className="secondary-btn" onClick={runAnalysis}>
              <Camera size={18} />
              {isFreeBlocked ? "Free report used" : "Analyze free"}
            </button>
            <button className="primary-btn" onClick={startCheckout} disabled={isCheckingOut}>
              <Lock size={18} />
              {isCheckingOut ? "Opening Gumroad..." : "Unlock report $1.99"}
            </button>
            <button className="secondary-btn" onClick={simulateUnlock}>
              Test unlock
            </button>
          </div>

          <input
            ref={fileInputRef}
            className="hidden-input"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />

          <div className="status-row">
            <span>Free usage: {freeUsage}/1</span>
            <span>Cached result after first analysis</span>
            <span>Pay-per-report first</span>
          </div>
        </div>

        <div className="preview-panel">
          <div className="photo-frame">
            {photoUrl ? (
              <img src={photoUrl} alt="Uploaded selfie preview" />
            ) : (
              <div className="photo-empty">
                <Camera size={42} />
                <span>Selfie preview</span>
              </div>
            )}
          </div>
          <div className="score-strip">
            <div>
              <span>GlowUp Score</span>
              <strong>{sampleReport.score}</strong>
            </div>
            <div>
              <span>Face</span>
              <strong>{sampleReport.faceShape}</strong>
            </div>
            <div>
              <span>Style</span>
              <strong>{sampleReport.style}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-grid">
        {pricing.map((plan) => (
          <article className={plan.featured ? "price-card featured" : "price-card"} key={plan.name}>
            <span>{plan.label}</span>
            <h2>{plan.name}</h2>
            <strong>{plan.price}</strong>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className={plan.featured ? "dark-btn" : "secondary-btn"}
              onClick={plan.featured ? startCheckout : undefined}
              disabled={plan.featured && isCheckingOut}
            >
              {plan.featured && <Lock size={16} />}
              {plan.featured ? (isCheckingOut ? "Opening Gumroad..." : "Unlock report") : "Select"}
            </button>
          </article>
        ))}
      </section>

      <section className="split-section dark-band">
        <div>
          <div className="eyebrow">
            <Share2 size={16} />
            Viral share card
          </div>
          <h2>Turn every result into a social post.</h2>
          <p>
            Every report creates a high-contrast score card that can spread through Instagram,
            Threads, Discord, and TikTok comments.
          </p>
          <div className="button-row">
            <button className="primary-btn" onClick={downloadShareCard}>
              <Download size={18} />
              Download image
            </button>
            <button className="secondary-btn" onClick={copyReferralLink}>
              <Copy size={18} />
              Copy link
            </button>
          </div>
        </div>

        <div className="share-card">
          <span>Share preview</span>
          <h2>GlowUp Score: {sampleReport.score}</h2>
          <p>Face: {sampleReport.faceShape}</p>
          <p>Style: {sampleReport.style}</p>
          <p>Attractiveness: {sampleReport.attractiveness}</p>
        </div>
      </section>

      <section className="split-section">
        <article className="content-card">
          <div className="eyebrow">Full report</div>
          <h2>{isPremiumUnlocked ? "Premium report unlocked" : "Premium report locked"}</h2>
          {isPremiumUnlocked ? (
            <dl>
              <dt>Recommended hairstyle</dt>
              <dd>{sampleReport.hairstyle}</dd>
              <dt>Glow-up priority</dt>
              <dd>{sampleReport.priority}</dd>
              <dt>Outfit direction</dt>
              <dd>{sampleReport.outfit}</dd>
            </dl>
          ) : (
            <div className="locked-report">
              <Lock size={30} />
              <p>
                Unlock the full report to see hairstyle, outfit, and 30-day makeover recommendations.
              </p>
              <button className="primary-btn" onClick={startCheckout}>
                Unlock report $1.99
              </button>
            </div>
          )}
        </article>

        <article className="content-card">
          <div className="eyebrow">
            <Users size={16} />
            Referral engine
          </div>
          <h2>Invite friends. Unlock reports.</h2>
          <code>{referralLink}</code>
          <p>Invites: {referrals}</p>
          <p>Invite 1 friend: +1 free analysis</p>
          <p>Invite 3 friends: unlock premium report</p>
          <button className="primary-btn" onClick={() => setReferrals((value) => value + 1)}>
            Simulate invite
          </button>
        </article>
      </section>

      <section className="seo-section">
        <div className="eyebrow">SEO system</div>
        <h2>Programmatic pages for free traffic</h2>
        <div className="seo-grid">
          {seoPages.map((page) => (
            <article key={page.slug}>
              <code>{page.slug}</code>
              <h3>{page.title}</h3>
              <p>{page.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
