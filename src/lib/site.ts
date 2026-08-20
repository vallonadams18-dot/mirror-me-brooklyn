export const SITE = {
  name: "Magic Mirror Brooklyn",
  legalName: "Magic Mirror Brooklyn LLC",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.magicmirrorbrooklyn.com",
  email: "hello@mirrormebrooklyn.com",
  phone: "(917) 724-6051",
  phoneHref: "tel:+19177246051",
  bookingUrl: "https://magic-mirror-brooklyn-llc.checkcherry.com/reservation",
  instagram: "https://www.instagram.com/magicmirrorbk/",
  googleReviewsUrl:
    "https://www.google.com/maps/search/Magic+Mirror+Brooklyn+Photo+Booth+Rental",
  rating: 4.9,
  reviewCount: 210,
  reviewSource: "Google",
  basedIn: "Brooklyn",
} as const;

export const NAV_BOOTHS = [
  { href: "/mirror-photo-booth", label: "Mirror Photo Booth" },
  { href: "/360-photo-booth", label: "360 Photo Booth" },
  { href: "/glam-booth", label: "Glam Booth" },
  { href: "/vogue-booth", label: "Vogue Booth" },
  { href: "/roaming-photo-booth", label: "Roaming Booth" },
  { href: "/green-screen-photo-booth", label: "Green Screen Booth" },
  { href: "/mosaic-wall", label: "Mosaic Wall" },
  { href: "/branded-photo-booth", label: "Branded Booth" },
  { href: "/ai-photo-booth", label: "AI Photo Booth" },
  { href: "/glambot", label: "Glambot" },
  { href: "/magazine-booth", label: "Magazine Booth" },
  { href: "/gif-booth", label: "GIF Booth" },
  { href: "/3d-slider-booth", label: "3D Slider Booth" },
  { href: "/studio-booth", label: "Studio Booth" },
  { href: "/champagne-wall", label: "Champagne Wall" },
  { href: "/enclosed-photo-booth", label: "Enclosed Photo Booth" },
  { href: "/flower-wall-rental", label: "Flower Walls" },
] as const;

export const NAV_EVENTS = [
  { href: "/wedding-photo-booth", label: "Weddings" },
  { href: "/corporate-events", label: "Corporate Events" },
  { href: "/trade-show-photo-booth", label: "Trade Shows" },
  { href: "/special-occasions", label: "Special Occasions" },
] as const;

export const NAV_LOCATIONS = [
  { href: "/photo-booth-rental-brooklyn", label: "Brooklyn" },
  { href: "/photo-booth-rental-manhattan", label: "Manhattan" },
  { href: "/photo-booth-rental-queens", label: "Queens" },
  { href: "/photo-booth-rental-bronx", label: "The Bronx" },
  { href: "/photo-booth-rental-staten-island", label: "Staten Island" },
  { href: "/photo-booth-rental-long-island", label: "Long Island" },
  { href: "/photo-booth-rental-westchester", label: "Westchester" },
  { href: "/photo-booth-rental-new-jersey", label: "New Jersey" },
  { href: "/photo-booth-rental-connecticut", label: "Connecticut" },
  { href: "/photo-booth-rental-williamsburg", label: "Williamsburg" },
  { href: "/photo-booth-rental-dumbo", label: "DUMBO" },
  { href: "/photo-booth-rental-long-island-city", label: "Long Island City" },
] as const;
