// TODO: Set TRUSTPILOT_API_KEY in your .env.local to enable live review fetching.
// Get a free API key at https://developers.trustpilot.com
// Then update NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID in .env.local too.
//
// Until the key is set, this route returns the hardcoded fallback reviews.
// The homepage fetches from this route via /api/trustpilot-reviews so swapping
// to live data only requires adding the env var — no component changes needed.

export const revalidate = 3600; // re-fetch at most once per hour

const BUSINESS_UNIT_ID = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID || "690a5208a3d8694b128bda0";

const FALLBACK_REVIEWS = [
  { id: "1", author: "Bowi Magilse", rating: 5, text: "They helped me with LLC setup. Quick, easy, transparent, nice and prompt communication. No feedback whatsoever, perfect service. Thanks guys and keep it going 🤙🏽", date: "2024-01-01T00:00:00Z" },
  { id: "2", author: "Johnny May", rating: 5, text: "Working with Zohaib was an absolute pleasure. The entire process was smooth and efficient, and he was always highly responsive to every question I had. His guidance made everything simple and stress-free.", date: "2024-01-01T00:00:00Z" },
  { id: "3", author: "Mehdi Berrahou", rating: 5, text: "Working with Zohaib was extremely smooth and efficient. He is highly responsive, helped me through all the process and all the questions I had. Excellent service.", date: "2024-01-01T00:00:00Z" },
  { id: "4", author: "Kevin", rating: 5, text: "10/10 best one out there. Very good service. If you need someone who can keep up with your pace and you want to move fast then I definitely recommend this party because they always replied fast with very helpful information.", date: "2024-01-01T00:00:00Z" },
  { id: "5", author: "JHJ", rating: 5, text: "Very quick and good service. Helped me out with all my questions.", date: "2024-01-01T00:00:00Z" },
  { id: "6", author: "Duanthy Tjon", rating: 5, text: "ZOHAIB is great, quick replies, and great service. Would highly recommend, before anyone else.", date: "2024-01-01T00:00:00Z" },
  { id: "7", author: "Mehdi BJ", rating: 5, text: "Professional service, I definitely recommend!", date: "2024-01-01T00:00:00Z" },
  { id: "8", author: "Team ANDR", rating: 5, text: "I was recommended FAAZ by another ecom founder in my network. The process was very clear, quick and easy. There was a slight hiccup with a banking partner but even that got handled swiftly! And all that for a sharp investment. Would definitely recommend 👍🏼", date: "2024-01-01T00:00:00Z" },
  { id: "9", author: "Rut de Letter", rating: 5, text: "Good personal help.", date: "2024-01-01T00:00:00Z" },
  { id: "10", author: "Sibe Germis", rating: 5, text: "I'm really pleased with how quickly the company was set up and with the pricing. So far I haven't encountered any issues and everything is running smoothly.", date: "2024-01-01T00:00:00Z" },
  { id: "11", author: "Niek Wiegand", rating: 5, text: "Amazing work, great attention to detail. Always willing to help. Would recommend!", date: "2024-01-01T00:00:00Z" },
  { id: "12", author: "Jan", rating: 5, text: "Great service, great team. Always supporting, don't leave you behind even months later.", date: "2024-01-01T00:00:00Z" },
];

export async function GET() {
  const apiKey = process.env.TRUSTPILOT_API_KEY;

  if (!apiKey) {
    // TODO: Add TRUSTPILOT_API_KEY to .env.local to enable live reviews
    return Response.json({ reviews: FALLBACK_REVIEWS, source: "fallback" });
  }

  try {
    const res = await fetch(
      `https://api.trustpilot.com/v1/business-units/${BUSINESS_UNIT_ID}/reviews?apikey=${apiKey}&perPage=20&orderBy=recency`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error(`Trustpilot API error: ${res.status}`);

    const data = await res.json();

    const reviews = data.reviews.map((r) => ({
      id: r.id,
      author: r.consumer?.displayName ?? "Anonymous",
      rating: r.stars,
      text: r.text,
      date: r.createdAt,
    }));

    return Response.json({ reviews, source: "live" });
  } catch (err) {
    console.error("Trustpilot fetch failed, using fallback:", err.message);
    return Response.json({ reviews: FALLBACK_REVIEWS, source: "fallback" });
  }
}
