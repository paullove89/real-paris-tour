import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Real Paris Tours",
  description: "Frequently asked questions about Real Paris Tours bookings and logistics.",
};

const faqs = [
  {
    question: "How many people are in each group?",
    answer: "Most tours are limited to 8–12 guests for a personal, conversational experience.",
  },
  {
    question: "Where do tours start?",
    answer:
      "Exact meeting points are sent by email after booking, typically near accessible metro stops.",
  },
  {
    question: "Can I book a private tour?",
    answer:
      "Yes. Use the contact page and share your dates, interests, and group size for a custom plan.",
  },
  {
    question: "Where can I book?",
    answer:
      "All bookings are handled through Bokun.",
  },
];

export default function FaqPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Frequently Asked Questions</h1>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-zinc-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-zinc-900">{faq.question}</h2>
              <p className="mt-2 text-zinc-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
