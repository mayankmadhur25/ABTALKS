"use client";

import { useState } from "react";

/*
 * The empty profile edge case.
 *
 * This was a button with no handler and a caption admitting as much, which is
 * developer commentary sitting inside a student's screen. A dead control reads
 * worse than a small working one, so it now does the smallest honest thing:
 * two fields, a save, and a confirmed state.
 *
 * State is local. Persistence is out of scope per the brief.
 */
export default function ProfileNudge({ track, shipped }) {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [line, setLine] = useState("");
  const [saved, setSaved] = useState(false);

  const ready = city.trim() !== "" && line.trim() !== "";

  if (saved) {
    return (
      <div className="rounded-2xl border-2 border-ink bg-green-deep p-5 text-white">
        <h2 className="font-display text-[17px] font-bold leading-tight tracking-tight">
          Your build shelf is public.
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed opacity-90">
          {city}
          {line ? ` · ${line}` : ""}. Recruiters searching {track} can find
          {shipped > 0 ? ` your ${shipped} repos` : " your work"} from now on.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-ink bg-blue p-5 text-white">
      <h2 className="font-display text-[17px] font-bold leading-tight tracking-tight">
        Complete your public profile
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed opacity-90">
        {shipped > 0
          ? `Add your city and one line about yourself, and recruiters searching ${track} can find these ${shipped} repos.`
          : `Add your city and one line about yourself. Do it tonight and everything you build from here is findable by recruiters searching ${track}.`}
      </p>

      {open ? (
        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="city" className="!text-white/70">
              City
            </label>
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Coimbatore"
              className="w-full rounded-xl border-[1.5px] border-white bg-transparent p-3 font-mono text-[12.5px] text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <label htmlFor="line" className="!text-white/70">
              One line about you
            </label>
            <input
              id="line"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              placeholder="3rd year CSE, learning frontend properly"
              className="w-full rounded-xl border-[1.5px] border-white bg-transparent p-3 font-mono text-[12.5px] text-white placeholder:text-white/50"
            />
          </div>
          <button
            type="button"
            disabled={!ready}
            onClick={() => setSaved(true)}
            className={`w-full rounded-xl px-4 py-3 text-[14px] font-semibold ${
              ready
                ? "bg-white text-blue"
                : "cursor-not-allowed border-[1.5px] border-white/40 text-white/50"
            }`}
          >
            {ready ? "Save and go public" : "Fill both fields"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-xl border-[1.5px] border-white bg-transparent px-4 py-3 text-[14px] font-semibold text-white"
        >
          Finish profile · 2 min
        </button>
      )}
    </div>
  );
}
