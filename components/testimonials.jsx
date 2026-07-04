"use client";

import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote } from "lucide-react";
import { useScrollReveal } from "@/components/ui/use-scroll-reveal";

// TODO: When TRUSTPILOT_API_KEY is configured in .env.local, uncomment the
// useEffect below to swap hardcoded reviews for live Trustpilot data.
const TRUSTPILOT_PROFILE = "https://www.trustpilot.com/review/faazfinancialgroup.com";

const REVIEWS = [
  { id: "1", author: "Bowi Magilse", rating: 5, text: "They helped me with LLC setup. Quick, easy, transparent, nice and prompt communication. No feedback whatsoever, perfect service. Thanks guys and keep it going 🤙🏽" },
  { id: "2", author: "Johnny May", rating: 5, text: "Working with Zohaib was an absolute pleasure. The entire process was smooth and efficient, and he was always highly responsive to every question I had. His guidance made everything simple and stress-free. I'm extremely satisfied with the level of service provided." },
  { id: "3", author: "Mehdi Berrahou", rating: 5, text: "Working with Zohaib was extremely smooth and efficient. He is highly responsive, helped me through all the process and all the questions I had. Excellent service." },
  { id: "4", author: "Kevin", rating: 5, text: "10/10 best one out there. Very good service. If you need someone who can keep up with your pace and you want to move fast then I definitely recommend this party because they always replied fast with very helpful information." },
  { id: "5", author: "JHJ", rating: 5, text: "Very quick and good service. Helped me out with all my questions." },
  { id: "6", author: "Duanthy Tjon", rating: 5, text: "ZOHAIB is great, quick replies, and great service. Would highly recommend, before anyone else." },
  { id: "7", author: "Mehdi BJ", rating: 5, text: "Professional service, I definitely recommend!" },
  { id: "8", author: "Team ANDR", rating: 5, text: "I was recommended FAAZ by another ecom founder in my network. The process was very clear, quick and easy. There was a slight hiccup with a banking partner but even that got handled swiftly! And all that for a sharp investment. Would definitely recommend 👍🏼" },
  { id: "9", author: "Rut de Letter", rating: 5, text: "Good personal help." },
  { id: "10", author: "Sibe Germis", rating: 5, text: "I'm really pleased with how quickly the company was set up and with the pricing. So far I haven't encountered any issues and everything is running smoothly." },
  { id: "11", author: "Niek Wiegand", rating: 5, text: "Amazing work, great attention to detail. Always willing to help. Would recommend!" },
  { id: "12", author: "Jan", rating: 5, text: "Great service, great team. Always supporting, don't leave you behind even months later." },
];

// Trustpilot green star SVG — matches the real Trustpilot star shape.
// fillPercent (0–100) drives a left-to-right gradient for partial stars.
// The gradient id is derived from fillPercent (deterministic) so server and
// client renders match — a module-level counter here caused hydration errors.
function TrustpilotStar({ filled = true, fillPercent, size = 20 }) {
  // Determine effective fill: explicit fillPercent overrides the boolean filled prop
  const pct = fillPercent !== undefined ? fillPercent : filled ? 100 : 0;
  const isPartial = pct > 0 && pct < 100;
  const gradientId = isPartial ? `tp-grad-${pct}` : null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {isPartial && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset={`${pct}%`} stopColor="#00b67a" />
            <stop offset={`${pct}%`} stopColor="#dcdce6" />
          </linearGradient>
        </defs>
      )}
      <rect
        width="40"
        height="40"
        rx="3"
        fill={isPartial ? `url(#${gradientId})` : pct === 100 ? "#00b67a" : "#dcdce6"}
      />
      <path
        d="M20 6l3.708 7.512L32 14.82l-6 5.847 1.416 8.257L20 24.512l-7.416 4.412L14 20.667 8 14.82l8.292-1.308L20 6z"
        fill="white"
      />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <TrustpilotStar key={n} filled={n <= rating} size={24} />
      ))}
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "from-orange-500 to-orange-600",
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-violet-500 to-violet-600",
  "from-rose-500 to-rose-600",
  "from-sky-500 to-sky-600",
];

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState(REVIEWS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const sectionRef = useScrollReveal();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    duration: 28,
  });

  // TODO: Uncomment to fetch live Trustpilot reviews once API key is configured.
  // useEffect(() => {
  //   fetch("/api/trustpilot-reviews")
  //     .then((r) => r.json())
  //     .then((d) => setReviews(d.reviews))
  //     .catch(() => {}); // silently fall back to hardcoded on error
  // }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  // Manual autoplay — advance every 5 seconds, pause on hover
  useEffect(() => {
    if (!emblaApi) return;
    let timer = setInterval(() => emblaApi.scrollNext(), 5000);
    const pause = () => clearInterval(timer);
    const resume = () => {
      timer = setInterval(() => emblaApi.scrollNext(), 5000);
    };
    emblaApi.containerNode()?.addEventListener("mouseenter", pause);
    emblaApi.containerNode()?.addEventListener("mouseleave", resume);
    return () => {
      clearInterval(timer);
      emblaApi.containerNode()?.removeEventListener("mouseenter", pause);
      emblaApi.containerNode()?.removeEventListener("mouseleave", resume);
    };
  }, [emblaApi]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-16 lg:py-24 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Layered background: subtle grid + soft glows, echoing the hero */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 75% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-600/[0.07] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container px-4 mx-auto">

        {/* Header */}
        <div className="reveal text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm px-4 py-1.5 mb-5">
            <TrustpilotStar filled size={20} />
            <span className="text-[#00b67a] font-semibold text-xs lg:text-sm tracking-widest uppercase">
              Trustpilot
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-white text-balance mb-3">
            What Our{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-sm lg:text-lg text-gray-400">
            Rated <span className="text-[#00b67a] font-semibold">Excellent</span> by our clients
          </p>
        </div>

        {/* Carousel */}
        <div className="reveal relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5 lg:gap-6 touch-pan-y">
              {reviews.map((review, i) => (
                <article
                  key={review.id}
                  className="
                    group relative flex-none w-full md:w-[calc(50%-10px)] xl:w-[calc(33.333%-16px)]
                    bg-white/[0.05] backdrop-blur-md border border-white/10
                    rounded-2xl p-7 lg:p-8 shadow-xl shadow-black/20
                    flex flex-col gap-5
                    transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-primary/10
                  "
                >
                  {/* Decorative quote mark */}
                  <Quote
                    className="absolute top-6 right-6 h-9 w-9 text-white/[0.07] group-hover:text-primary/25 transition-colors duration-300 rotate-180"
                    aria-hidden="true"
                    fill="currentColor"
                  />

                  {/* Stars */}
                  <StarRating rating={review.rating} />

                  {/* Review text */}
                  <p className="text-base lg:text-lg text-gray-200 leading-relaxed flex-1 line-clamp-6 text-pretty">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                    <div
                      className={`h-11 w-11 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} ring-2 ring-white/10 flex items-center justify-center flex-shrink-0`}
                      aria-hidden="true"
                    >
                      <span className="text-white text-xs font-bold">
                        {getInitials(review.author)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm lg:text-base font-semibold leading-tight">
                        {review.author}
                      </p>
                      <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5">
                        <TrustpilotStar filled size={12} />
                        Verified review
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Prev arrow */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous review"
            className="
              absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-5
              h-11 w-11 rounded-full
              bg-slate-950/80 backdrop-blur-md border border-white/15
              flex items-center justify-center cursor-pointer
              text-white hover:border-primary/50 hover:bg-slate-900 transition-colors duration-200
            "
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next review"
            className="
              absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-5
              h-11 w-11 rounded-full
              bg-slate-950/80 backdrop-blur-md border border-white/15
              flex items-center justify-center cursor-pointer
              text-white hover:border-primary/50 hover:bg-slate-900 transition-colors duration-200
            "
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Review slides">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === selectedIndex
                  ? "w-7 bg-[#00b67a]"
                  : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Trustpilot footer badge */}
        <div className="reveal mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-1.5" aria-label="4.7 out of 5 stars">
            {[1, 2, 3, 4].map((n) => (
              <TrustpilotStar key={n} filled size={28} />
            ))}
            <TrustpilotStar fillPercent={70} size={28} />
          </div>
          <span className="text-white text-sm lg:text-base font-medium">
            <span className="font-bold">Excellent</span> · Rated 4.7/5 on Trustpilot
          </span>
          <a
            href={TRUSTPILOT_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00b67a] text-sm lg:text-base font-semibold hover:underline"
          >
            Leave us a review →
          </a>
        </div>

      </div>
    </section>
  );
}
