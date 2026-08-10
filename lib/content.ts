/**
 * Single source of truth for championship copy and structured data.
 * Landing-page summary sections and the full detail pages both read from here
 * so numbers and wording never drift apart.
 */

export const championship = {
  name: "RapKids TypeMaster Championship",
  year: 2026,
  prizePool: 4000,
  cashWinners: 30,
  grandFinalDate: "26 September",
  grandFinalDateLong: "Saturday 26 September 2026",
  host: "Jason",
  brackets: {
    juniors: { name: "Juniors", ages: "5–8", accent: "punch" as const },
    seniors: { name: "Seniors", ages: "9–12", accent: "sky" as const },
  },
};

/* ---- At a glance ------------------------------------------------------- */

export type GlanceStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
};

export const glance: GlanceStat[] = [
  {
    value: 4000,
    prefix: "$",
    label: "Total prize pool",
    sub: "30 children win cash",
  },
  {
    value: 30,
    label: "Cash winners",
    sub: "Hundreds more win free months & badges",
  },
  {
    value: 2,
    label: "Age brackets",
    sub: "Juniors 5–8 · Seniors 9–12",
  },
  {
    value: 4,
    label: "Weekly heats",
    sub: "Then a live Grand Final, 26 Sep",
  },
];

/* ---- How it works ----------------------------------------------------- */

export type Step = {
  n: string;
  window: string;
  title: string;
  body: string;
  tag: string;
};

export const steps: Step[] = [
  {
    n: "01",
    window: "Anytime",
    tag: "Register",
    title: "Register from the Parent Zone",
    body: "Enter each child in a couple of minutes. One subscription covers up to four children.",
  },
  {
    n: "02",
    window: "12–23 Aug",
    tag: "Warm up",
    title: "Practice with nothing on the line",
    body: "See your child's shadow rank, build the daily habit, find their footing. Nothing counts yet.",
  },
  {
    n: "03",
    window: "24 Aug – 20 Sep",
    tag: "Compete",
    title: "Four weekly heats",
    body: "Every board resets Monday, so every week is a brand-new shot at winning — a bad week never costs the championship.",
  },
  {
    n: "04",
    window: "26 Sep",
    tag: "Grand Final",
    title: "The live Grand Final",
    body: "The top 8 in each bracket go head-to-head, live, on passages nobody has seen before — for the biggest prizes of the championship.",
  },
];

/* ---- Why it's a fair fight ------------------------------------------- */

export const fairness = [
  {
    key: "brackets",
    title: "Two brackets, always a fair fight",
    body: "Juniors (5–8) and Seniors (9–12). Your child only ever competes against kids their own age.",
  },
  {
    key: "reset",
    title: "A clean slate every Monday",
    body: "Every leaderboard resets to zero each week. Monday is always a fresh start — and three ways to win it: speed, accuracy and improvement.",
  },
  {
    key: "family",
    title: "One subscription, the whole family",
    body: "Every child profile on your plan can enter, up to four. Three kids means three leaderboards and three chances at a prize, every week.",
  },
];

/* ---- Prizes ----------------------------------------------------------- */

export type PrizeRow = { name: string; amount: string; how: string };

export const weeklyPrizes: PrizeRow[] = [
  { name: "Week Champion", amount: "$150", how: "Highest score that week" },
  { name: "Most Improved", amount: "$100", how: "Biggest gain over your own baseline" },
  { name: "Accuracy Ace", amount: "$50", how: "Highest accuracy, min. 5 active days" },
];

export const finalPrizes: { place: string; amount: string }[] = [
  { place: "Grand Champion", amount: "$500" },
  { place: "Runner-up", amount: "$200" },
  { place: "Third place", amount: "$100" },
];

export const beyondCash = [
  {
    title: "Free subscription month",
    body: "Top 3 on any board, any week (one free month max per child for the whole championship).",
  },
  { title: "Podium badge", body: "Permanent, for any top-3 finish." },
  { title: "Top 10 badge", body: "Awarded weekly." },
  { title: "Personal best badge", body: "Any time your child beats their own record." },
  { title: "Streak badges", body: "At 7, 14, 21 and 28 consecutive active days." },
  { title: "Champion avatar frame", body: "For weekly winners." },
  {
    title: "Touch Champion title",
    body: "Top touchscreen player per bracket, revealed at the Grand Final.",
  },
];

export const finalistRewards = [
  "A finalist medal, mailed to you",
  "6 free subscription months",
  'A "RapKids TypeMaster Finalist" title and avatar frame',
  "A permanent spot on the results page",
];

export const championRewards = [
  "Drawn into an actual RapKids comic as a character",
  "An engraved trophy, mailed to you",
  "The Champion title — the one prize that isn't shared",
];

export const championshipPass = {
  title: "Championship Pass (annual plan)",
  note: "Optional. Never required, and it doesn't change anyone's chances of winning anything above.",
  perks: [
    {
      title: "No eligibility risk",
      body: "Nothing to renew, no chance of a payment gap costing your child a week.",
    },
    {
      title: "Founding Champion badge",
      body: "Permanent, only for families who go annual during the 2026 championship. Never offered again.",
    },
    {
      title: "Exclusive avatar frame & practice pack",
      body: "A look reserved for Pass families, plus extra practice material.",
    },
    {
      title: "A RapKids comic pack",
      body: "Mailed to you during the championship.",
    },
    {
      title: "Priority entry to the Term League",
      body: "First through the door when the free Term League opens in October.",
    },
  ],
};

/* ---- Rules ------------------------------------------------------------ */

export type RuleSection = {
  n: number;
  title: string;
  intro?: string;
  points: string[];
};

export const rules: RuleSection[] = [
  {
    n: 1,
    title: "Eligibility",
    points: [
      "Entrants must be 5 to 12 as of 24 August 2026.",
      "An active RapKids subscription is required to enter, appear on the leaderboard or win a prize. Monthly is the minimum plan.",
      "Entry must be completed by a parent or legal guardian, who confirms consent on the child's behalf.",
      "Up to four child profiles per parent account may compete.",
    ],
  },
  {
    n: 2,
    title: "Age brackets",
    points: [
      "Juniors: 5 to 8.",
      "Seniors: 9 to 12.",
      "Every child competes only within their own bracket.",
    ],
  },
  {
    n: 3,
    title: "How to enter",
    points: [
      "Enter each child individually from the Parent Zone. Every entry needs a leaderboard handle, first name, date of birth and your consent.",
      "There's no cutoff for weekly prizes — join any week and compete for that week's prizes on equal terms.",
      "To qualify for the Grand Final, a child needs a scored week in at least 2 of the 4 weeks. Join by the start of Week 3 (7 September) to keep a Grand Final place possible.",
    ],
  },
  {
    n: 4,
    title: "Billing",
    intro:
      "Your child can compete in any week their subscription is active. The championship runs across two monthly billing periods, so a monthly plan renews once during the competition.",
    points: [
      "A given week's prizes require your subscription to be active when that week closes (Sunday, 23:59 WAT).",
      "If your plan is due to renew or a payment fails, we'll email you three days before the week closes — naming your child's current rank and what's at stake.",
    ],
  },
  {
    n: 5,
    title: "Fair play",
    points: [
      "Every run is checked automatically for signs of scripted or assisted typing.",
      "Nothing is auto-disqualified. Every flagged run, and every prospective weekly winner, is reviewed by a person before any result is announced.",
      "A child can win only one cash prize category per week — their highest-value one.",
      "A household can win at most one cash prize per bracket per week.",
      "Creating multiple profiles for one child, entering a false date of birth, or playing on another child's account is grounds for disqualification.",
    ],
  },
  {
    n: 6,
    title: "Prizes and payment",
    points: [
      "Cash prizes are paid to the guardian on record, never to the child.",
      "Paid within 10 business days of the result being announced, by bank transfer or another suitable method.",
    ],
  },
  {
    n: 7,
    title: "Grand Final and broadcast",
    intro:
      "Appearing on camera is never a condition of winning. Every finalist's guardian chooses one of three ways to take part — all three are eligible for the full prize.",
    points: [
      "Full broadcast: your child appears on camera during the live stream.",
      "Audio and avatar only: your child is heard, represented by their avatar, but not shown on camera.",
      "Private proctored session: your child competes privately with a proctor, and only the score is made public.",
      "Consent for the live stream, the recording staying up afterward, and marketing clips are each separate — and each can be withdrawn at any time.",
    ],
  },
  {
    n: 8,
    title: "Privacy and child protection",
    points: [
      "Public leaderboards show your child's chosen handle only — never their real name, photo or school.",
      "Ask us to remove your child from any public board at any time; we'll do it within 24 hours.",
      "Keystroke timing is kept in raw form for 30 days for fair-play checks, then reduced to summary statistics.",
      "If your child wins and we need to verify their age, we view the document, confirm it and delete it. We never keep a copy.",
    ],
  },
];

/* ---- FAQ -------------------------------------------------------------- */

export type Faq = { q: string; a: string; category: string };

export const faqs: Faq[] = [
  {
    category: "Getting in",
    q: "Who can enter?",
    a: "Any child aged 5 to 12 (as of 24 August 2026) on an active RapKids subscription. A parent or guardian enters each child from the Parent Zone and confirms consent on their behalf.",
  },
  {
    category: "Getting in",
    q: "Do I need a separate subscription for each child?",
    a: "No. One RapKids subscription covers up to four child profiles, and every profile on your plan can enter. Three kids means three leaderboards and three chances at a prize, every week.",
  },
  {
    category: "Getting in",
    q: "Can we still join once it's started?",
    a: "Yes. There's no cutoff for weekly prizes — join any week and compete for that week's prizes on equal terms. To keep a Grand Final place possible, join by the start of Week 3 (7 September), since finalists need a scored week in at least 2 of the 4 weeks.",
  },
  {
    category: "Winning",
    q: "How is a run scored?",
    a: "Every run is scored on speed and accuracy, but accuracy counts for more. A child typing 40 words a minute at 98% accuracy beats a child typing 45 at 90%. Play all seven days in a week and you earn a 20% bonus on that week's score.",
  },
  {
    category: "Winning",
    q: "How many times can my child play?",
    a: "Practice is unlimited, always — any length, no cap, works offline. Scored attempts are capped at 10 a day, and your best 2 count. Winning comes down to how well your child types, not how many hours they spend.",
  },
  {
    category: "Winning",
    q: "Can siblings both win?",
    a: "Yes. A household can win one cash prize per bracket per week, so siblings in different brackets can each take home a prize. Siblings in the same bracket share one shot at it that week. Each child can also win only one cash category per week — their highest-value one.",
  },
  {
    category: "The Grand Final",
    q: "Does my child have to appear on camera?",
    a: "Never. Every finalist's guardian picks one of three ways to take part: full camera; audio and avatar only; or a private proctored session with just the score made public. All three are scored identically and eligible for the same prize.",
  },
  {
    category: "The Grand Final",
    q: "Who makes the Grand Final?",
    a: "The top 8 in each bracket — 16 finalists in total — compete live on 26 September on passages nobody has seen before: heats, then semi-finals, then a head-to-head final.",
  },
  {
    category: "Money & billing",
    q: "How and when are prizes paid?",
    a: "Cash prizes are paid to the guardian on record, never to the child, within 10 business days of the result being announced — by bank transfer or another suitable method.",
  },
  {
    category: "Money & billing",
    q: "What if my subscription lapses mid-championship?",
    a: "Your child can compete in any week their subscription is active. A week's prizes require an active plan when that week closes (Sunday 23:59 WAT). If a renewal is due or a payment fails, we email you three days before the week closes with your child's current rank and what's at stake.",
  },
  {
    category: "Safety & privacy",
    q: "What do you show publicly about my child?",
    a: "Public leaderboards show your child's chosen handle only — never their real name, photo or school. You can ask us to remove your child from any public board at any time and we'll do it within 24 hours.",
  },
  {
    category: "Safety & privacy",
    q: "Is the competition fair?",
    a: "Every run is checked automatically for scripted or assisted typing, but nothing is auto-disqualified. A person reviews every flagged run and every prospective weekly winner before any result is announced.",
  },
  {
    category: "After",
    q: "What happens when the championship ends?",
    a: "The TypeMaster Term League opens 5 October: a free, ongoing monthly competition on the same leaderboards, with new prizes every month.",
  },
];

/* ---- Navigation ------------------------------------------------------- */

export const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/prizes", label: "Prizes" },
  { href: "/rules", label: "Rules" },
  { href: "/faq", label: "FAQ" },
];
