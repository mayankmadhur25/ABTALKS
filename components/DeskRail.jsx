"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TallyStrip from "@/components/TallyStrip";

/*
 * Desktop navigation rail, 1024px and up.
 *
 * The brief calls desktop a secondary consideration, so this does not attempt
 * a second layout. It gives the narrow column a reason to be narrow: on a
 * laptop the product becomes a nav rail beside a sheet, which is what a
 * desktop app looks like anyway.
 *
 * Everything here is in-world. Nothing on the screen is addressed to anyone
 * except a student using the product.
 */
export default function DeskRail({ marks, currentDay, total, cohort }) {
  const path = usePathname();

  const links = [
    { href: "/", label: "The challenge" },
    { href: "/dashboard", label: "Your dashboard" },
    { href: `/day/${currentDay}`, label: `Tonight · Day ${currentDay}` },
  ];

  return (
    <aside className="hidden lg:block lg:w-[240px] lg:shrink-0 lg:pt-2">
      <Link
        href="/"
        className="font-display text-[20px] font-extrabold tracking-tight"
      >
        AB<span className="text-blue">Talks</span>
      </Link>

      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
        Cohort {cohort} · Day {currentDay} of {total}
      </p>

      <nav aria-label="Main" className="mt-6">
        <ul className="space-y-1">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? path === "/"
                : path.startsWith(link.href.split("?")[0]);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-xl border-[1.5px] px-3.5 py-2.5 text-[14px] font-semibold ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-transparent text-ink hover:border-ink hover:bg-card"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 rounded-xl border-[1.5px] border-ink bg-card p-3.5">
        <p className="font-mono text-[9.5px] uppercase tracking-widest text-ink-faint">
          Your 60 nights
        </p>
        <TallyStrip marks={marks} size="sm" className="mt-2" />
      </div>

      <p className="mt-6 text-[13px] leading-relaxed text-ink-soft">
        One commit and one post, every night, for sixty nights. What you leave
        with is the sixty things, not the number.
      </p>
    </aside>
  );
}
