import Image from "next/image";

const logos = [
  { src: "/img/logos/spectrum-news-1.png", alt: "Spectrum News 1" },
  { src: "/img/logos/wellcare.png", alt: "WellCare" },
  { src: "/img/logos/lockton.png", alt: "Lockton" },
  { src: "/img/logos/graham.png", alt: "Graham — Caring for Kids & Families" },
  { src: "/img/logos/ps-335.png", alt: "P.S. 335 Granville T. Woods" },
  { src: "/img/logos/client-hearts.png", alt: "Client logo" },
  { src: "/img/logos/adidas.png", alt: "adidas" },
  { src: "/img/logos/google-cloud.png", alt: "Google Cloud" },
  { src: "/img/logos/figma.png", alt: "Figma" },
  { src: "/img/logos/macys.png", alt: "Macy's" },
  { src: "/img/logos/hellmanns.png", alt: "Hellmann's" },
  { src: "/img/logos/sexyhair.png", alt: "SexyHair" },
  { src: "/img/logos/oak-street-health.png", alt: "Oak St. Health" },
  { src: "/img/logos/ebin-new-york.png", alt: "EBIN New York" },
];

interface BrandLogosProps {
  bg?: "cream" | "white";
}

export function BrandLogos({ bg = "cream" }: BrandLogosProps) {
  return (
    <section
      className={`${bg === "cream" ? "bg-cream" : "bg-white"} px-4 py-14 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
          Brands we have worked with
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="h-12 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
