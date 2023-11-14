"use client";

import { trackEvent } from "fathom-client";

import { HeadingText } from "@/ui";

import { QAndAAccordion } from "./QAndAAccordion";
import { FAQ_QUESTIONS_AND_ANSWERS, FaqQa } from "./constants";

export const FAQ = () => {
  return (
    <section className="px-6 py-12 md:py-32" id="faqs">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between">
          <HeadingText size={4} className="pb-10 md:pb-0">
            Frequently asked questions
          </HeadingText>
          <div className="w-full max-w-lg space-y-4">
            {FAQ_QUESTIONS_AND_ANSWERS.map((faq: FaqQa, faqIndex: number) => (
              <QAndAAccordion
                key={faqIndex}
                onClick={() => trackEvent(faq.trackEventName)}
                question={faq.question}
                startOpen={faq.startOpen}
              >
                {faq.answers.map((answer: string, answerIndex: number) => (
                  <p key={answerIndex}>{answer}</p>
                ))}
              </QAndAAccordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
