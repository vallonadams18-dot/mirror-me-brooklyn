import boothsJson from "./booths.json";
import locationsJson from "./locations.json";
import eventsJson from "./events.json";
import faqPageJson from "./faq-page.json";
import homeFaqsJson from "./home-faqs.json";
import type { Booth, EventPage, Faq, LocationPage } from "./types";

export const booths = boothsJson as Booth[];
export const locations = locationsJson as LocationPage[];
export const events = eventsJson as EventPage[];
export const faqPageFaqs = faqPageJson as Faq[];
export const homeFaqs = homeFaqsJson as Faq[];

export const getBooth = (slug: string) => booths.find((b) => b.slug === slug);
export const getLocation = (slug: string) =>
  locations.find((l) => l.slug === slug);
export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
