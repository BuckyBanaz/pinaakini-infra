"use client";
// Logo Cloud Marquee by olewandowski1, from 21st.dev
// https://21st.dev/olewandowski1/logo-cloud-3
// Adapted: logos passed in as props (image or wordmark) instead of hard-coded Remix icons;
// heading slot handed to the page.

import Image from "next/image";

export interface LogoItem {
  name: string;
  logo?: string;
}

export default function LogoCloudMarquee({ logos, placeholder = false }: { logos: LogoItem[]; placeholder?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center bg-background text-foreground">
      <style>{`
        @keyframes logo-cloud-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .logo-cloud-track {
          animation: logo-cloud-marquee 32s linear infinite;
        }
        .logo-cloud-mask:hover .logo-cloud-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-cloud-track {
            animation: none;
          }
        }
      `}</style>

      <div className="logo-cloud-mask relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="logo-cloud-track flex w-max items-center">
          {[...logos, ...logos].map(({ name, logo }, index) => (
            <div
              key={`${name}-${index}`}
              className="flex h-16 shrink-0 items-center gap-2.5 px-10 text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-hidden={index >= logos.length ? "true" : undefined}
            >
              {logo ? (
                <Image src={logo} alt={name} width={140} height={48} className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
              ) : (
                <span
                  className={`whitespace-nowrap text-lg font-semibold tracking-tight ${
                    placeholder ? "rounded-md border border-dashed border-border px-6 py-3 text-base font-medium text-muted-foreground/70" : ""
                  }`}
                >
                  {name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
