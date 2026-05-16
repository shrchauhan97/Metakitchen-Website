/**
 * Single source of truth for brand copy, claims, citations, and content.
 * Edit values here — they flow to every page.
 */

export const BRAND = {
  name: 'MetaKitchen',
  tagline: 'The bread you already eat. Behaves differently.',
  shortDesc:
    'A line of low-GI staples. Made in India.',
  longDesc:
    'Chef-led, lab-tested low-GI bread for the way India actually eats. The Daily White is the flagship. The line follows.',
  parentCompany: 'MetaKitchen',
  city: 'Made in India',
  email: 'contact@evaa.enterprises',
}

/**
 * Proof — anchored to a real lab-tested GI on the Daily White.
 * Predictive Glycemic Index test, accredited Indian lab.
 */
export const PROOF = {
  gi: 38,
  giStandardWhiteBread: 70,
  giCategory: 'low',
  lab: {
    methodology: 'Predictive Glycemic Index test, accredited Indian lab.',
    summary:
      'Standard predictive GI protocol on the Daily White. The result came back at 38 — below the FSSAI low-GI threshold of 55.',
  },
  metrics: [
    {
      value: '38',
      label: 'Glycemic Index',
      sublabel: 'Lab-tested. White bread sits at 70.',
      tone: 'hero',
    },
    {
      value: '55',
      label: 'FSSAI low-GI threshold',
      sublabel: 'The Daily White comes in well below.',
      tone: 'support',
    },
    {
      value: '48 hr',
      label: 'Slow ferment',
      sublabel: 'Every loaf, no shortcuts.',
      tone: 'support',
    },
    {
      value: '0g',
      label: 'Added sugar',
      sublabel: 'No sweeteners. No preservatives.',
      tone: 'support',
    },
  ],
}

/**
 * Dr. Aara — voice-and-video AI avatar. Scan the QR, see her face, talk to her.
 * Conversation engine built in-house. Not a wrapper on someone else's model.
 */
export const AARA = {
  name: 'Dr. Aara',
  shortName: 'Aara',
  type: 'AI avatar',
  disclosure:
    'AI · in-house architecture · informational, not medical advice',
  shortDisclosure: 'AI · in-house architecture',
  oneLiner:
    "An AI you can see and talk to. Scan the QR on the loaf, her face shows up on your phone, you start talking. She speaks the way you actually speak — every Indian language, and the way you mix them.",
  capabilities: [
    {
      title: 'A conversation, not a chatbot.',
      body: 'She listens, asks, reasons. She remembers what you said last week. Built on our own conversation engine — not a wrapper on someone else\'s model.',
    },
    {
      title: 'The way India actually speaks.',
      body: 'Hindi, English, Tamil, Bengali, Marathi, Telugu — and the way you actually mix them. She follows the language you used last, not the one you picked in a dropdown.',
    },
    {
      title: 'She gets to know your eating, not just your bread.',
      body: 'She learns the patterns of your household — who shops, who decides, what your mother\'s morning has been doing. The household is the user, not just the individual.',
    },
  ],
  conversation: [
    {
      sender: 'aara',
      text: 'Three weeks in, your bread is showing up in three meals out of seven. That is the right place to be.',
      delay: 0,
    },
    {
      sender: 'user',
      text: 'Should I try the chia next?',
      delay: 1.6,
    },
    {
      sender: 'aara',
      text: 'The Daily White is hitting its stride for you. The chia is a good next step — a chewier bite, slower release. Try it on Sunday.',
      delay: 3.0,
    },
  ],
}

/**
 * Ingredient principles, not specifics. The exact blend depends on the loaf.
 */
export const INGREDIENTS = [
  {
    role: 'In',
    name: 'Whole grains, stone-ground.',
    body: 'Milled cool to keep the bran intact. The specific blend depends on the loaf.',
  },
  {
    role: 'In',
    name: 'Slow fermentation, two days.',
    body: 'A long, quiet rise. Develops the crumb. Lowers the GI.',
  },
  {
    role: 'In',
    name: 'Cultured fats. Salt.',
    body: 'No seed oils. Cultured for the richness without the inflammatory profile.',
  },
  {
    role: 'Not in',
    name: 'Maida. Added sugar.',
    body: 'The two things most Indian loaves start with. Neither is in ours.',
  },
  {
    role: 'Not in',
    name: 'Preservatives. Emulsifiers. Bromates.',
    body: 'The chemistry that lets a supermarket loaf last a fortnight. Ours lasts five days.',
  },
  {
    role: 'Not in',
    name: 'Seed oils.',
    body: 'Never. Not in any loaf we bake.',
  },
]

export const VALUES = [
  {
    title: 'Chefs first. Lab second.',
    body: 'The recipe came out of kitchens that have fed people for generations. The GI test came after, to confirm what taste already knew.',
  },
  {
    title: 'Priced like the bread you already buy.',
    body: 'A staple, not a luxury. The compromise was never supposed to be between taste, blood sugar, and rent.',
  },
  {
    title: 'Honest about edges.',
    body: 'We say what we have measured. We say what we have not. We tell you what is in the loaf, and what is not.',
  },
  {
    title: 'Made for the way India eats.',
    body: 'Toast and chai. The sandwich in the lunchbox. The Sunday French toast. Built to hold up.',
  },
]

export const TRUST = {
  trialInstitution: '',
  pressLogos: [],
  pullQuote: {
    text: '',
    author: '',
  },
}

export const WAITLIST = {
  endpoint: import.meta.env.VITE_WAITLIST_ENDPOINT || '',
  successHeadline: "You're on the list.",
  successBody:
    'We will get you a loaf in the first run. That is all this list is for.',
  errorBody:
    "Something didn't go through. Mail us at contact@evaa.enterprises and we'll add you manually.",
}

export const SEO = {
  '/': {
    title: 'MetaKitchen — The bread you already eat. Behaves differently.',
    description:
      'A chef-led loaf, lab-tested at GI 38. The Daily White is the flagship. The line follows.',
    canonical: 'https://metakitchen.io/',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'MetaKitchen — The Daily White, lab-tested at GI 38',
  },
  '/our-bread': {
    title: 'The Daily White — Low-GI Indian Bread, Lab-Tested at GI 38 | MetaKitchen',
    description:
      'A staple upgrade, built like a chef would build it. Lab-tested at GI 38 — below the FSSAI low-GI threshold of 55. No maida, no added sugar, no preservatives.',
    canonical: 'https://metakitchen.io/our-bread',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'The Daily White — MetaKitchen low-GI bread',
  },
  '/dr-aara': {
    title: 'Dr. Aara — Multilingual AI Nutrition Avatar | MetaKitchen',
    description:
      'An AI avatar you can see and talk to in Hindi, English, Tamil, Bengali, Marathi, Telugu. Scan the QR on the loaf, start a conversation. Built on our own engine.',
    canonical: 'https://metakitchen.io/dr-aara',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'Dr. Aara — MetaKitchen multilingual AI nutrition avatar',
  },
  '/science': {
    title: 'How We Tested the Daily White — Predictive GI Protocol | MetaKitchen',
    description:
      'One loaf. One lab. One number. The Daily White, predictive GI protocol at an accredited Indian lab. The number came back at 38.',
    canonical: 'https://metakitchen.io/science',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'How we tested the Daily White at GI 38',
  },
  '/story': {
    title: 'The Story — A Chef-led Low-GI Bread for India | MetaKitchen',
    description:
      "237 million Indians have diabetes or pre-diabetes. Most eat bread every morning. The Daily White is a chef's thesis on what that bread should be.",
    canonical: 'https://metakitchen.io/story',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'MetaKitchen — a chef-led low-GI bread for India',
  },
  '/privacy': {
    title: 'Privacy — MetaKitchen',
    description: 'How we handle your data.',
    canonical: 'https://metakitchen.io/privacy',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'MetaKitchen privacy policy',
    noindex: true,
  },
  '/terms': {
    title: 'Terms — MetaKitchen',
    description: 'Terms of use for metakitchen.io.',
    canonical: 'https://metakitchen.io/terms',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'MetaKitchen terms of use',
    noindex: true,
  },
}
