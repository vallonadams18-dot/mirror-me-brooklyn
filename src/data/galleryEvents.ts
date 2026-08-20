import type { Img } from "./types";

export interface GalleryEventVideo {
  src: string;
  poster: string;
  label: string;
}

export interface GalleryEvent {
  id: string;
  title: string;
  sub: string;
  photos: Img[];
  videos?: GalleryEventVideo[];
}

/**
 * The /gallery page is organized per event: every shoot gets its own
 * section with its own scrolling strip (and video clips where we have
 * them). Newest events first.
 */
export const galleryEvents: GalleryEvent[] = [
  {
    id: "lexi-wood-hanky-panky",
    title: "Lexi Wood by Hanky Panky — brand launch",
    sub: "Roaming booth coverage from the Lexi Wood launch party at a Manhattan lounge — custom branded print frame on every shot.",
    photos: [
      { src: "/img/gallery-hp-01.jpg", alt: "Guest in a cropped blazer and satin trousers posing at the Lexi Wood by Hanky Panky launch" },
      { src: "/img/gallery-hp-02.jpg", alt: "Side pose in a cropped blazer at the Hanky Panky brand launch party" },
      { src: "/img/gallery-hp-03.jpg", alt: "Four friends posing together at the Lexi Wood launch party" },
      { src: "/img/gallery-hp-04.jpg", alt: "Group of four guests smiling at the Hanky Panky launch" },
      { src: "/img/gallery-hp-05.jpg", alt: "Two guests posing in a paisley slip dress and tailored suit" },
      { src: "/img/gallery-hp-06.jpg", alt: "Two friends smiling for the roaming booth at the brand launch" },
      { src: "/img/gallery-hp-07.jpg", alt: "Guest in a colorful print blazer with a yellow mini bag" },
      { src: "/img/gallery-hp-08.jpg", alt: "Bold print blazer and white lace tights at the Lexi Wood launch" },
      { src: "/img/gallery-hp-09.jpg", alt: "Two friends in black mini dresses posing for the booth" },
      { src: "/img/gallery-hp-10.jpg", alt: "Close-up booth shot in a striped dress and pearl necklace" },
      { src: "/img/gallery-hp-11.jpg", alt: "Guest in a black faux-leather bomber jacket at the launch party" },
      { src: "/img/gallery-hp-12.jpg", alt: "Couple posing back to back — leopard jacket and graphic tee" },
      { src: "/img/gallery-hp-13.jpg", alt: "Couple posing at the booth — lace corset and studded western jacket" },
      { src: "/img/gallery-hp-14.jpg", alt: "Three guests laughing together at the Hanky Panky launch" },
      { src: "/img/gallery-hp-15.jpg", alt: "Side profile pose in a cropped gray blazer at the launch" },
      { src: "/img/gallery-hp-16.jpg", alt: "Guest in a cropped gray blazer and satin skirt at the brand party" },
      { src: "/img/gallery-hp-17.jpg", alt: "Two friends striking a playful pose at the Lexi Wood launch" },
      { src: "/img/gallery-hp-18.jpg", alt: "Two friends smiling in a navy set and a green jersey" },
    ],
    videos: [
      { src: "/video/hanky-panky-1.mp4", poster: "/img/hanky-panky-v1.jpg", label: "Booth clip from the Lexi Wood by Hanky Panky launch — 1" },
      { src: "/video/hanky-panky-2.mp4", poster: "/img/hanky-panky-v2.jpg", label: "Booth clip from the Lexi Wood by Hanky Panky launch — 2" },
      { src: "/video/hanky-panky-3.mp4", poster: "/img/hanky-panky-v3.jpg", label: "Booth clip from the Lexi Wood by Hanky Panky launch — 3" },
      { src: "/video/hanky-panky-4.mp4", poster: "/img/hanky-panky-v4.jpg", label: "Booth clip from the Lexi Wood by Hanky Panky launch — 4" },
      { src: "/video/hanky-panky-5.mp4", poster: "/img/hanky-panky-v5.jpg", label: "Booth clip from the Lexi Wood by Hanky Panky launch — 5" },
      { src: "/video/hanky-panky-6.mp4", poster: "/img/hanky-panky-v6.jpg", label: "Booth clip from the Lexi Wood by Hanky Panky launch — 6" },
    ],
  },
  {
    id: "macys-flushing-fall-preview",
    title: "Macy's Flushing — Fall Fashion Preview",
    sub: "In-store activation at Macy's Flushing with an Oktoberfest-themed print frame — booth clips from the fall fashion preview.",
    photos: [],
    videos: [
      { src: "/video/macys-flushing-1.mp4", poster: "/img/macys-flushing-v1.jpg", label: "Booth clip from the Macy's Flushing Fall Fashion Preview — 1" },
      { src: "/video/macys-flushing-2.mp4", poster: "/img/macys-flushing-v2.jpg", label: "Booth clip from the Macy's Flushing Fall Fashion Preview — 2" },
      { src: "/video/macys-flushing-3.mp4", poster: "/img/macys-flushing-v3.jpg", label: "Booth clip from the Macy's Flushing Fall Fashion Preview — 3" },
      { src: "/video/macys-flushing-4.mp4", poster: "/img/macys-flushing-v4.jpg", label: "Booth clip from the Macy's Flushing Fall Fashion Preview — 4" },
      { src: "/video/macys-flushing-5.mp4", poster: "/img/macys-flushing-v5.jpg", label: "Booth clip from the Macy's Flushing Fall Fashion Preview — 5" },
      { src: "/video/macys-flushing-6.mp4", poster: "/img/macys-flushing-v6.jpg", label: "Booth clip from the Macy's Flushing Fall Fashion Preview — 6" },
    ],
  },
  {
    id: "google-cloud-figma",
    title: "Google Cloud × Figma — community mixer",
    sub: "Blue and orange flower wall with a custom logo sign and branded print frames for a Google Cloud × Figma design community event.",
    photos: [
      { src: "/img/gallery-gcf-01.jpg", alt: "Eight guests crowd into the frame at the Google Cloud × Figma event — flower wall photo booth by Magic Mirror Brooklyn" },
      { src: "/img/gallery-gcf-02.jpg", alt: "Two guests with cocktails in front of the orange and blue flower wall at the Google Cloud × Figma mixer" },
      { src: "/img/gallery-gcf-03.jpg", alt: "Two guests posing under the Google Cloud Figma sign at the branded flower wall" },
      { src: "/img/gallery-gcf-04.jpg", alt: "Frame from an animated booth GIF at the Google Cloud × Figma event" },
      { src: "/img/gallery-gcf-05.jpg", alt: "Four guests raising glasses at the Google Cloud × Figma community event photo booth" },
      { src: "/img/gallery-gcf-06.jpg", alt: "Two guests posing with paper fans — custom Google Cloud × Figma print frame" },
      { src: "/img/gallery-gcf-07.jpg", alt: "Four colleagues smiling at the Google Cloud × Figma event flower wall" },
      { src: "/img/gallery-gcf-08.jpg", alt: "Five friends posing together at the Google Cloud × Figma event" },
      { src: "/img/gallery-gcf-09.jpg", alt: "Guest posing solo in front of the flower wall — Google Cloud × Figma branded print" },
      { src: "/img/gallery-gcf-10.jpg", alt: "Two guests with paper fans at the Google Cloud × Figma summer event" },
      { src: "/img/gallery-gcf-11.jpg", alt: "Five colleagues with paper fans at the Google Cloud × Figma booth" },
      { src: "/img/gallery-gcf-12.jpg", alt: "Two friends striking a playful pose at the Google Cloud × Figma flower wall" },
      { src: "/img/gallery-gcf-13.jpg", alt: "Guest smiling in front of the orange and blue flower wall at the Google Cloud × Figma event" },
      { src: "/img/gallery-gcf-14.jpg", alt: "Two guests cooling off with fans at the Google Cloud × Figma event photo booth" },
      { src: "/img/gallery-gcf-15.jpg", alt: "Three guests blowing kisses at the Google Cloud × Figma photo booth" },
      { src: "/img/gallery-gcf-16.jpg", alt: "Two guests posing back to back with fans at the Google Cloud × Figma event" },
    ],
  },
  {
    id: "evelyn-hill-glow-2025",
    title: "Evelyn Hill Inc — Glow company dinner",
    sub: "Neon glow theme against a gold velvet curtain, LED props, and a custom laser print frame designed for the 2025 company dinner.",
    photos: [
      { src: "/img/gallery-eh-01.jpg", alt: "Guest in a blue dress at the Evelyn Hill Inc glow party — gold velvet curtain backdrop" },
      { src: "/img/gallery-eh-02.jpg", alt: "Guest posing in front of the velvet curtain at the Evelyn Hill Inc company dinner" },
      { src: "/img/gallery-eh-03.jpg", alt: "Guest flashing peace signs with LED glow accessories at the Evelyn Hill Inc party" },
      { src: "/img/gallery-eh-04.jpg", alt: "Frame from an animated booth GIF at the Evelyn Hill Inc glow party" },
      { src: "/img/gallery-eh-05.jpg", alt: "Two friends in blue dresses with glow necklaces at the Evelyn Hill Inc company dinner" },
      { src: "/img/gallery-eh-06.jpg", alt: "Four guests posing for the roaming booth at the Evelyn Hill Inc glow party" },
      { src: "/img/gallery-eh-07.jpg", alt: "Four friends together at the Evelyn Hill Inc company dinner — neon print frame" },
      { src: "/img/gallery-eh-08.jpg", alt: "Three guests smiling at the Evelyn Hill Inc Company Dinner 2025 — custom glow print template" },
      { src: "/img/gallery-eh-09.jpg", alt: "Three bartenders posing at the bar during the Evelyn Hill Inc company dinner" },
      { src: "/img/gallery-eh-10.jpg", alt: "Guest in a rhinestone dress posing against floral wallpaper at the Evelyn Hill Inc party" },
    ],
  },
  {
    id: "bronx-summer-kickoff-2025",
    title: "Bronx Summer Kickoff Party",
    sub: "90s block-party theme with a custom four-shot strip template — boomboxes, bucket hats and airbrushed tees, June 2025.",
    photos: [
      { src: "/img/gallery-bx-01.jpg", alt: "Two friends in airbrushed graffiti tees at the Bronx Summer Kickoff Party — 90s themed photo strip" },
      { src: "/img/gallery-bx-02.jpg", alt: "Guests in bucket hats with an inflatable boombox at the Bronx Summer Kickoff Party" },
      { src: "/img/gallery-bx-03.jpg", alt: "Two friends posing back to back at the Bronx Summer Kickoff Party photo booth" },
      { src: "/img/gallery-bx-04.jpg", alt: "Three coworkers striking poses at the 90s themed Bronx Summer Kickoff Party" },
      { src: "/img/gallery-bx-05.jpg", alt: "Three friends posing at the Bronx Summer Kickoff Party — custom 90s print strip" },
      { src: "/img/gallery-bx-06.jpg", alt: "Big group selfie in the photo booth at the Bronx Summer Kickoff Party" },
      { src: "/img/gallery-bx-07.jpg", alt: "Three coworkers goofing around in the booth at the Bronx Summer Kickoff Party" },
      { src: "/img/gallery-bx-08.jpg", alt: "Three colleagues with drinks posing at the Bronx Summer Kickoff Party booth" },
      { src: "/img/gallery-bx-09.jpg", alt: "The team crowding into the frame at the Bronx Summer Kickoff Party" },
      { src: "/img/gallery-bx-10.jpg", alt: "Three friends in 90s outfits at the Bronx Summer Kickoff Party photo booth" },
      { src: "/img/gallery-bx-11.jpg", alt: "Two guests hamming it up at the Bronx Summer Kickoff Party booth" },
      { src: "/img/gallery-bx-12.jpg", alt: "Six colleagues together at the Bronx Summer Kickoff Party photo booth" },
      { src: "/img/gallery-bx-13.jpg", alt: "Two friends posing at the 90s themed Bronx Summer Kickoff Party" },
      { src: "/img/gallery-bx-14.jpg", alt: "Three coworkers in scrubs at the Bronx Summer Kickoff Party photo strip" },
    ],
  },
  {
    id: "barentz-nyscc-2025",
    title: "Barentz — NYSCC Suppliers' Day 2025",
    sub: "Pink and cream flower wall with a custom Barentz logo sign, branded props and print frames at the NYSCC 2025 Suppliers' Day.",
    photos: [
      { src: "/img/gallery-bz-01.jpg", alt: "Two Barentz team members laughing at the NYSCC 2025 Suppliers' Day — pink flower wall with custom logo sign" },
      { src: "/img/gallery-bz-02.jpg", alt: "Four colleagues with Celebrate Success and NYSCC 2025 signs at the Barentz flower wall" },
      { src: "/img/gallery-bz-03.jpg", alt: "Two guests holding Celebrate Success and NYSCC 2025 signs at the Barentz booth" },
      { src: "/img/gallery-bz-04.jpg", alt: "Three guests with the NYSCC 2025 sign at the Barentz flower wall" },
      { src: "/img/gallery-bz-05.jpg", alt: "Two guests having fun with a CEO prop at the Barentz NYSCC 2025 activation" },
      { src: "/img/gallery-bz-06.jpg", alt: "Two guests holding a Success prop at the Barentz flower wall" },
      { src: "/img/gallery-bz-07.jpg", alt: "Three colleagues with Boss and Barentz props at NYSCC 2025" },
      { src: "/img/gallery-bz-08.jpg", alt: "Two guests toasting at the Barentz NYSCC 2025 booth" },
      { src: "/img/gallery-bz-09.jpg", alt: "Three friends with drinks at the Barentz flower wall at NYSCC 2025" },
      { src: "/img/gallery-bz-10.jpg", alt: "Couple posing at the Barentz branded flower wall at NYSCC 2025" },
      { src: "/img/gallery-bz-11.jpg", alt: "Six colleagues crowding in with props at the Barentz booth" },
      { src: "/img/gallery-bz-12.jpg", alt: "Four guests with Success and solution props at the Barentz flower wall" },
      { src: "/img/gallery-bz-13.jpg", alt: "Two guests holding the NYSCC 2025 sign at the Barentz activation" },
      { src: "/img/gallery-bz-14.jpg", alt: "Three colleagues posing at the Barentz flower wall at NYSCC 2025" },
      { src: "/img/gallery-bz-15.jpg", alt: "Five colleagues together at the Barentz NYSCC 2025 booth" },
      { src: "/img/gallery-bz-16.jpg", alt: "Guest holding a Celebrate Success sign at the Barentz flower wall" },
      { src: "/img/gallery-bz-17.jpg", alt: "Two guests with the NYSCC 2025 sign at the Barentz branded backdrop" },
      { src: "/img/gallery-bz-18.jpg", alt: "Guest posing at the Barentz flower wall at NYSCC 2025" },
      { src: "/img/gallery-bz-19.jpg", alt: "Three Barentz team members at the NYSCC 2025 Suppliers' Day booth" },
      { src: "/img/gallery-bz-20.jpg", alt: "Two guests with a Barentz prop at the branded flower wall" },
    ],
  },
  {
    id: "lay-out-adidas-juneteenth-2025",
    title: "The Lay Out × adidas — Juneteenth '25",
    sub: "Sky-blue backdrop with Spread Joy and Juneteenth '25 print frames for The Lay Out's celebration with adidas, June 2025.",
    photos: [
      { src: "/img/gallery-lo-01.jpg", alt: "Four friends posing at The Lay Out x adidas Juneteenth event — Spread Joy print frame" },
      { src: "/img/gallery-lo-02.jpg", alt: "Two friends at The Lay Out x adidas photo booth against the sky-blue backdrop" },
      { src: "/img/gallery-lo-03.jpg", alt: "Motorcycle club crew posing together at The Lay Out x adidas Juneteenth event" },
      { src: "/img/gallery-lo-04.jpg", alt: "Four friends pointing at the camera — Juneteenth '25 print frame at The Lay Out" },
      { src: "/img/gallery-lo-05.jpg", alt: "Guest posing solo at The Lay Out Juneteenth '25 photo booth" },
      { src: "/img/gallery-lo-06.jpg", alt: "Three friends smiling at The Lay Out x adidas event — Spread Joy frame" },
      { src: "/img/gallery-lo-07.jpg", alt: "Two friends at the Juneteenth '25 photo booth at The Lay Out celebration" },
      { src: "/img/gallery-lo-08.jpg", alt: "Three friends laughing at The Lay Out x adidas booth — Spread Joy print" },
      { src: "/img/gallery-lo-09.jpg", alt: "Big group of friends crowding the frame at The Lay Out Juneteenth '25 celebration" },
    ],
  },
  {
    id: "graham-windham-celebration",
    title: "Graham — staff celebration",
    sub: "Greenery wall with hashtag props and a custom watercolor print frame for Graham's staff celebration.",
    photos: [
      { src: "/img/gallery-gr-01.jpg", alt: "Six colleagues with props at the Graham staff celebration — greenery wall photo booth" },
      { src: "/img/gallery-gr-02.jpg", alt: "Two guests with props at the Graham celebration greenery wall" },
      { src: "/img/gallery-gr-03.jpg", alt: "Guests posing at the Graham celebration photo booth" },
      { src: "/img/gallery-gr-04.jpg", alt: "Colleagues with hashtag props at the Graham event" },
      { src: "/img/gallery-gr-05.jpg", alt: "Colleagues smiling at the Graham celebration — greenery wall backdrop" },
      { src: "/img/gallery-gr-06.jpg", alt: "Guests with a Celebrity Status prop at the Graham event booth" },
      { src: "/img/gallery-gr-07.jpg", alt: "Friends loaded up with hashtag props at the Graham celebration" },
      { src: "/img/gallery-gr-08.jpg", alt: "Colleagues with a FAM sign at the Graham staff celebration" },
      { src: "/img/gallery-gr-09.jpg", alt: "Guests with a Fresh sign at the Graham event photo booth" },
      { src: "/img/gallery-gr-10.jpg", alt: "Colleagues with Bae and Vip props at the Graham celebration" },
      { src: "/img/gallery-gr-11.jpg", alt: "Two guests holding a Cute sign at the Graham event" },
      { src: "/img/gallery-gr-12.jpg", alt: "Two friends joking around at the Graham celebration photo booth" },
      { src: "/img/gallery-gr-13.jpg", alt: "Two guests posing at the Graham celebration — greenery wall" },
    ],
  },
  {
    id: "recognition-ceremony-2026",
    title: "2026 Recognition Ceremony",
    sub: "Blue flower wall with a custom lemon-themed print template designed for the ceremony.",
    photos: [
      { src: "/img/gallery-rc-01.jpg", alt: "Seven colleagues smiling at the blue flower wall — 2026 Recognition Ceremony print" },
      { src: "/img/gallery-rc-02.jpg", alt: "Three guests posing at the blue flower wall at the recognition ceremony" },
      { src: "/img/gallery-rc-03.jpg", alt: "Two friends smiling at the blue flower wall photo booth" },
      { src: "/img/gallery-rc-04.jpg", alt: "Three guests blowing kisses at the recognition ceremony photo booth" },
    ],
  },
  {
    id: "valence-care-gala",
    title: "Valence Care Family of Companies — winter gala",
    sub: "January 2024 · navy tufted backdrop, a props table working overtime, and a custom logo print template.",
    photos: [
      { src: "/img/gallery-vc-01.jpg", alt: "Big group with props at the Valence Care gala photo booth — navy tufted backdrop" },
      { src: "/img/gallery-vc-02.jpg", alt: "Two guests posing at the Valence Care winter gala photo booth" },
      { src: "/img/gallery-vc-03.jpg", alt: "Guests posing with props at the Valence Care company gala" },
      { src: "/img/gallery-vc-04.jpg", alt: "Colleagues celebrating at the Valence Care gala photo booth" },
      { src: "/img/gallery-vc-05.jpg", alt: "Guests at the Valence Care recognition gala booth with custom logo print" },
    ],
  },
];
