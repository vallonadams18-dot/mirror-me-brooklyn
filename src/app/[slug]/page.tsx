import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoothPage } from "@/components/templates/BoothPage";
import { ComboPage } from "@/components/templates/ComboPage";
import { EventPage } from "@/components/templates/EventPage";
import { LocationPage } from "@/components/templates/LocationPage";
import {
  booths,
  combos,
  events,
  getBooth,
  getCombo,
  getEvent,
  getLocation,
  locations,
} from "@/data";
import { pageMeta } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [...booths, ...events, ...locations, ...combos].map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getBooth(slug) ?? getEvent(slug) ?? getLocation(slug) ?? getCombo(slug);
  if (!page) return {};
  return pageMeta({
    title: page.meta.title,
    description: page.meta.description,
    path: `/${slug}`,
    image: `/img/og/${slug}.jpg`,
    imageAlt: page.heroImg?.alt ?? page.meta.title,
  });
}

export default async function TemplatedPage({ params }: Props) {
  const { slug } = await params;

  const booth = getBooth(slug);
  if (booth) return <BoothPage booth={booth} />;

  const event = getEvent(slug);
  if (event) return <EventPage event={event} />;

  const location = getLocation(slug);
  if (location) return <LocationPage location={location} />;

  const combo = getCombo(slug);
  if (combo) return <ComboPage combo={combo} />;

  notFound();
}
