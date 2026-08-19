import { SITE, NAV_BOOTHS } from "./site";

type JsonLd = Record<string, unknown>;

export function businessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EntertainmentBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    telephone: "+1-347-383-5851",
    image: `${SITE.url}/img/hero-photo-booth-rental-nyc.jpg`,
    logo: `${SITE.url}/img/logo.png`,
    description:
      "Brooklyn-based, women-owned photo booth rental company serving all five boroughs of New York City and the tri-state area. Mirror, 360, glam, vogue, roaming, green screen, AI, GIF, magazine, studio and 3D slider booths, plus the Glambot, mosaic walls, champagne walls and flower walls.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      addressCountry: "US",
    },
    areaServed: [
      "Brooklyn",
      "Manhattan",
      "Queens",
      "The Bronx",
      "Staten Island",
      "Long Island",
      "Westchester",
      "New Jersey",
      "Connecticut",
    ].map((name) => ({ "@type": "Place", name })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
      bestRating: 5,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photo booth rentals",
      itemListElement: NAV_BOOTHS.map((b) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: b.label === "Roaming Booth" ? "Roaming Photo Booth" : b.label,
          url: `${SITE.url}${b.href}`,
        },
      })),
    },
    sameAs: [SITE.instagram, SITE.googleReviewsUrl],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#business` },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE.url}${opts.path}`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "Place", name: "New York City and the tri-state area" },
  };
}

export function localBusinessAreaJsonLd(opts: {
  areaName: string;
  path: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE.name} — Photo Booth Rental in ${opts.areaName}`,
    url: `${SITE.url}${opts.path}`,
    description: opts.description,
    parentOrganization: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "Place", name: opts.areaName },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path?: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE.url}${item.path}` } : {}),
    })),
  };
}
