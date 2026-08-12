/**
 * Single source of truth for championship copy and structured data.
 * Landing-page summary sections and the full detail pages both read from here
 * so numbers and wording never drift apart.
 */

export const championship = {
  name: "RapKids TypeMaster Championship",
  year: 2026,
  prizePool: 4000,
  cashWinners: 15,
  grandFinalDate: "26 September",
  grandFinalDateLong: "Saturday 26 September 2026",
  host: "Jason",
  ageRange: "9–12",
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
    sub: "15 children win cash",
  },
  {
    value: 15,
    label: "Cash winners",
    sub: "Hundreds more win free months & badges",
  },
  {
    value: 9,
    suffix: "–12",
    label: "Ages",
    sub: "One group; everyone competes 9 to 12",
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
    title: "Register From the Parent Zone",
    body: "Enter each child in minutes; one subscription covers up to two kids.",
  },
  {
    n: "02",
    window: "12–23 Aug",
    tag: "Warm up",
    title: "Practice With Nothing on the Line",
    body: "Build the daily habit and find their footing. Nothing counts yet.",
  },
  {
    n: "03",
    window: "24 Aug – 20 Sep",
    tag: "Compete",
    title: "Four Weekly Heats",
    body: "Boards reset every Monday, so each week is a fresh shot at winning.",
  },
  {
    n: "04",
    window: "26 Sep",
    tag: "Grand Final",
    title: "The Live Grand Final",
    body: "The top 8 go head-to-head live, on brand-new passages.",
  },
];

/* ---- Why it's a fair fight ------------------------------------------- */

export const fairness = [
  {
    key: "agegroup",
    title: "One Age Group, One Fair Race",
    body: "Everyone competing is 9 to 12, so your child is always up against a genuinely even field.",
  },
  {
    key: "reset",
    title: "A Clean Slate Every Monday",
    body: "Every leaderboard resets to zero each week. Monday is always a fresh start, with three ways to win it: speed, accuracy and improvement.",
  },
  {
    key: "family",
    title: "One Subscription, the Whole Family",
    body: "Both children on your plan can enter, each with their own shot at a prize every week.",
  },
];

/* ---- Prizes ----------------------------------------------------------- */

export type PrizeRow = { name: string; amount: string; how: string };

export const weeklyPrizes: PrizeRow[] = [
  { name: "Week Champion", amount: "$300", how: "Highest score that week" },
  { name: "Most Improved", amount: "$200", how: "Biggest gain over your own baseline" },
  { name: "Accuracy Ace", amount: "$100", how: "Highest accuracy, min. 5 active days" },
];

export const finalPrizes: { place: string; amount: string }[] = [
  { place: "Grand Champion", amount: "$1,000" },
  { place: "Runner-Up", amount: "$400" },
  { place: "Third Place", amount: "$200" },
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
  "The Champion title; the one prize that isn't shared",
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
      "Entrants must be 9 to 12 as of 24 August 2026.",
      "An active RapKids subscription is required to enter, appear on the leaderboard or win a prize. Monthly is the minimum plan.",
      "Entry must be completed by a parent or legal guardian, who confirms consent on the child's behalf.",
      "Up to two child profiles per parent account may compete.",
    ],
  },
  {
    n: 2,
    title: "Age Group",
    points: [
      "The championship is open to children 9 to 12.",
      "Everyone competes together in one group, on one leaderboard.",
    ],
  },
  {
    n: 3,
    title: "How to Enter",
    points: [
      "Enter each child individually from the Parent Zone. Every entry needs a leaderboard handle, first name, date of birth and your consent.",
      "There's no cutoff for weekly prizes; join any week and compete for that week's prizes on equal terms.",
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
      "If your plan is due to renew or a payment fails, we'll email you three days before the week closes, naming your child's current rank and what's at stake.",
    ],
  },
  {
    n: 5,
    title: "Fair Play",
    points: [
      "Every run is checked automatically for signs of scripted or assisted typing.",
      "Nothing is auto-disqualified. Every flagged run, and every prospective weekly winner, is reviewed by a person before any result is announced.",
      "A child can win only one cash prize category per week; their highest-value one.",
      "A household can win at most one cash prize per week.",
      "Creating multiple profiles for one child, entering a false date of birth, or playing on another child's account is grounds for disqualification.",
    ],
  },
  {
    n: 6,
    title: "Prizes and Payment",
    points: [
      "Cash prizes are paid to the guardian on record, never to the child.",
      "Paid within 10 business days of the result being announced, by bank transfer or another suitable method.",
    ],
  },
  {
    n: 7,
    title: "The Grand Final",
    intro:
      "The top 8 across the four weekly heats play the Grand Final live on 26 September, in real time, on passages nobody has seen before.",
    points: [
      "The format is heats, then semi-finals, then a head-to-head final.",
      "The Grand Final is not streamed or broadcast, and no child appears on camera.",
      "Results are announced on finals day; public boards only ever show a child's chosen handle.",
    ],
  },
  {
    n: 8,
    title: "Privacy and Child Protection",
    points: [
      "Public leaderboards show your child's chosen handle only; never their real name, photo or school.",
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
    category: "Getting In",
    q: "Who can enter?",
    a: "Any child aged 9 to 12 (as of 24 August 2026) on an active RapKids subscription. A parent or guardian enters each child from the Parent Zone and confirms consent on their behalf.",
  },
  {
    category: "Getting In",
    q: "Do I need a separate subscription for each child?",
    a: "No. One RapKids subscription covers up to two child profiles, and both can enter; two entries, two chances at a prize, every week.",
  },
  {
    category: "Getting In",
    q: "Can we still join once it's started?",
    a: "Yes. There's no cutoff for weekly prizes; join any week and compete for that week's prizes on equal terms. To keep a Grand Final place possible, join by the start of Week 3 (7 September), since finalists need a scored week in at least 2 of the 4 weeks.",
  },
  {
    category: "Winning",
    q: "How is a run scored?",
    a: "Every run is scored on speed and accuracy, but accuracy counts for more. A child typing 40 words a minute at 98% accuracy beats a child typing 45 at 90%. Play all seven days in a week and you earn a 20% bonus on that week's score.",
  },
  {
    category: "Winning",
    q: "How many times can my child play?",
    a: "Practice is unlimited, always: any length, no cap. Scored attempts are capped at 10 a day, and your best 2 count. Winning comes down to how well your child types, not how many hours they spend.",
  },
  {
    category: "Winning",
    q: "Can siblings both win?",
    a: "A household can win one cash prize per week. Both your children compete on the same board, so they share the household's one shot at each week's cash; and any child can win only one cash category per week, their highest-value one.",
  },
  {
    category: "The Grand Final",
    q: "Is the Grand Final streamed or on camera?",
    a: "No. The Grand Final is played live on 26 September but it isn't streamed or broadcast, and no child ever appears on camera. Results are published afterward, and public leaderboards only ever show your child's chosen handle.",
  },
  {
    category: "The Grand Final",
    q: "Who makes the Grand Final?",
    a: "The top 8, eight finalists in total, compete live on 26 September on passages nobody has seen before: heats, then semi-finals, then a head-to-head final.",
  },
  {
    category: "Money & Billing",
    q: "How and when are prizes paid?",
    a: "Cash prizes are paid to the guardian on record, never to the child, within 10 business days of the result being announced, by bank transfer or another suitable method.",
  },
  {
    category: "Money & Billing",
    q: "What if my subscription lapses mid-championship?",
    a: "Your child can compete in any week their subscription is active. A week's prizes require an active plan when that week closes (Sunday 23:59 WAT). If a renewal is due or a payment fails, we email you three days before the week closes with your child's current rank and what's at stake.",
  },
  {
    category: "Safety & Privacy",
    q: "What do you show publicly about my child?",
    a: "Public leaderboards show your child's chosen handle only; never their real name, photo or school. You can ask us to remove your child from any public board at any time and we'll do it within 24 hours.",
  },
  {
    category: "Safety & Privacy",
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
