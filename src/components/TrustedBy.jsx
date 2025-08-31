// src/components/TrustedBy.jsx
const LOGOS = [
    {
      src: "https://growthzonecmsprodeastus.azureedge.net/sites/1165/2025/04/The-Chamber-Logo_Tagline.png",
      alt: "Kirkwood-Des Peres Area Chamber of Commerce",
      mono: true,
    },
    {
      src: "https://assets.livenationcdn.com/uploads/d7b685d8-d12a-41cf-9d91-0fb20315bb99.svg",
      alt: "Hollywood Casino Amphitheater",
      mono: true,
    },
    {
      src: "https://www.daveandbusters.com/content/dam/dnb/logos/DnB%20Logo%20FY25.png",
      alt: "Dave & Buster’s",
      mono: false,
    },
    {
      src: "https://bbk12e1-cdn.myschoolcdn.com/ftpimages/769/logo/LS%20logo-01.png",
      alt: "Lutheran High School South",
      mono: true,
    },
    // NEW: Pearl by David's (data URI)
    {
      src: "data:image/png;base64,PASTE_YOUR_BASE64_HERE", // pega aquí TODO tu string base64
      alt: "Pearl by David’s logo",
      mono: true, // ponlo en true si lo quieres en monocromo
    },
  ];
  
  export default function TrustedBy() {
    return (
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center text-xs uppercase tracking-widest text-gray-500">
            Trusted by
          </div>
  
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {LOGOS.map((logo) => (
              <li key={logo.alt} className="flex justify-center">
                <div className="relative h-12 w-40 md:h-14 md:w-44">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className={[
                      "absolute inset-0 h-full w-full object-contain transition-transform duration-200 hover:scale-[1.03]",
                      logo.mono ? "grayscale opacity-80 hover:opacity-100" : "opacity-90 hover:opacity-100",
                    ].join(" ")}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  