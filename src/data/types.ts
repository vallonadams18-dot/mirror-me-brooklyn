export interface Img {
  src: string;
  alt: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

export interface ProseBlock {
  heading: string;
  paragraphs: string[];
}

export interface LinkCard {
  href: string;
  title: string;
  desc: string;
}

export interface Booth {
  slug: string;
  breadcrumb: string;
  meta: PageMeta;
  h1: string;
  heroSub: string;
  /** Optional real "starting at" price shown in the hero, e.g. "$899 for 3 hours". Omit unless a real, confirmed figure exists — never fabricate one. */
  startingPrice?: string;
  heroImg: Img;
  includedLabel: string;
  included: string[];
  video: {
    src: string;
    poster: string;
    label: string;
    heading: string;
    sub: string;
  } | null;
  prose: ProseBlock[];
  bestFor: string[];
  galleryHeading: string;
  gallery: Img[];
  areasHeading: string;
  areasSub: string;
  areaLinks: string[];
  faqHeading: string;
  faqs: Faq[];
  related: LinkCard[];
  cta: { heading: string; sub: string };
  comboLinks?: LinkCard[];
}

export interface LocationPage {
  slug: string;
  breadcrumb: string;
  eyebrow: string;
  meta: PageMeta;
  h1: string;
  heroSub: string;
  heroImg: Img;
  introHeading: string;
  introParas: string[];
  travelNote: string;
  nbHeading: string;
  nbSub: string;
  neighborhoods: string[];
  boothsHeading: string;
  boothsSub: string;
  boothCards: { href: string; img: string; alt: string; title: string; desc: string }[];
  galleryHeading: string;
  gallery: Img[];
  eventsHeading: string;
  step1: string;
  faqHeading: string;
  faqs: Faq[];
  alsoServing: LinkCard[];
  cta: { heading: string; sub: string };
  comboLinks?: LinkCard[];
}

export interface EventPage {
  slug: string;
  breadcrumb: string;
  meta: PageMeta;
  h1: string;
  heroSub: string;
  heroImg: Img;
  checklist: { title: string; desc: string }[];
  prose: ProseBlock[];
  recEyebrow: string;
  recHeading: string;
  recSub: string;
  recCards: {
    href: string;
    img: string;
    alt: string;
    video: boolean;
    title: string;
    desc: string;
  }[];
  galleryEyebrow: string;
  galleryHeading: string;
  gallerySub?: string | null;
  gallery: Img[];
  areasHeading: string;
  areasSub: string;
  faqHeading: string;
  faqs: Faq[];
  browseHeading: string | null;
  browse: LinkCard[];
  cta: { heading: string; sub: string };
  comboLinks?: LinkCard[];
  relatedPost?: LinkCard;
}

export interface BlogPost {
  slug: string;
  meta: PageMeta;
  h1: string;
  /** ISO date string, e.g. "2026-08-21" */
  date: string;
  /** 1-2 sentence summary shown on the /blog index card */
  excerpt: string;
  heroImg: Img;
  body: ProseBlock[];
  faqs?: Faq[];
  related?: LinkCard[];
  cta: { heading: string; sub: string };
}

export interface ComboPage {
  slug: string;
  breadcrumb: string;
  meta: PageMeta;
  h1: string;
  heroSub: string;
  heroImg: Img;
  boothHref: string;
  boothLabel: string;
  includedLabel: string;
  included: string[];
  introHeading: string;
  introParas: string[];
  locationHref: string;
  locationLabel: string;
  neighborhoods: string[];
  galleryHeading: string;
  gallery: Img[];
  faqHeading: string;
  faqs: Faq[];
  cta: { heading: string; sub: string };
}
