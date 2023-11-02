import { EVENTS } from "@/analytics";

type FaqAnswers = string[];

export interface FaqQa {
  answers: FaqAnswers;
  question: string;
  startOpen?: boolean;
  trackEventName: string;
}

export const FAQ_QUESTIONS_AND_ANSWERS: FaqQa[] = [
  {
    question: "What is Stackly?",
    answers: [
      `Stackly is a simple non-custodial DCA app that makes it easy to do recurring 
      swaps of any token.`,
    ],
    startOpen: true,
    trackEventName: EVENTS.SECTIONS.FAQ.WHAT_IS_STACKLY_CLICK,
  },
  {
    question: "What is a stack?",
    answers: [
      `We call it stack the creation of the recurrent order with the total amount 
      that will be used to swap the choosen tokens on the choosen frequency 
      (hourly, daily, etc).`,
      `Example: A stack of WETH using 500WXDAI that will do recurrent swaps every 
      day till the end of the week.`,
    ],
    trackEventName: EVENTS.SECTIONS.FAQ.WHAT_IS_STACK_CLICK,
  },
  {
    question: "How does Stackly work?",
    answers: [
      `When you stack a token, stackly creates a contract for you with the funds 
      and uses CoW protocol to place recurring orders (stacks) at the frequency 
      you choose.`,
    ],
    trackEventName: EVENTS.SECTIONS.FAQ.HOW_STACKLY_WORKS,
  },
  {
    question: "What is DCA?",
    answers: [
      `DCA stands for Dollar-Cost Averaging, which is an investment strategy used 
      in the financial markets. DCA involves regularly investing a fixed amount 
      of money at predetermined intervals, regardless of the asset's price.`,
    ],
    trackEventName: EVENTS.SECTIONS.FAQ.WHAT_IS_DCA,
  },
  {
    question: "Why one should do DCA?",
    answers: [
      `Recurring swaps (aka DCA) remove the need to time the market, neutralising 
      the short term market volatility, and helps you build a portfolio, 
      distributed over a period of time.`,
    ],
    trackEventName: EVENTS.SECTIONS.FAQ.WHY_TO_DCA,
  },
  {
    question: "Can I cancel my stacks?",
    answers: [
      `Yes. You can cancel your stacks anytime. Your funds will be withdrawn 
      immediately to your wallet. To do it, you have to connect your wallet, 
      go to your stacks, choose a stack, click cancel and confirm transaction 
      with your wallet.`,
    ],
    trackEventName: EVENTS.SECTIONS.FAQ.HOW_CANCEL_STACK,
  },
];
