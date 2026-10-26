"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Download,
  Share2,
  ArrowRight,
} from "lucide-react";

interface Step {
  id: number;
  stageId: number;
  title: string;
  description: string;
}

const STEPS_STAGE_1: Step[] = [
  {
    id: 1,
    stageId: 1,
    title: "Keep the invoice.",
    description:
      "Save the original bill and a photo or PDF copy. The warranty normally starts on the invoice date.",
  },
  {
    id: 2,
    stageId: 1,
    title: "Register the product.",
    description:
      "Many brands ask you to register on their website or app; some add extra warranty when you do.",
  },
  {
    id: 3,
    stageId: 1,
    title: "Read the warranty card once.",
    description:
      "Note how long it lasts, what it covers, and what it excludes.",
  },
  {
    id: 4,
    stageId: 1,
    title: "Record the condition.",
    description:
      "Take a few dated photos of the product once it is installed or unboxed.",
  },
];

const STEPS_STAGE_2: Step[] = [
  {
    id: 5,
    stageId: 2,
    title: "Record the fault.",
    description:
      "Take a clear photo or short video of the problem as soon as you see it, with the date visible if you can.",
  },
  {
    id: 6,
    stageId: 2,
    title: "Raise the complaint in writing.",
    description:
      "Use email, the brand's website or its app, not only a phone call, so there is a record.",
  },
  {
    id: 7,
    stageId: 2,
    title: "Note every reference number.",
    description:
      "Write down the complaint or ticket number, the date and the name of anyone you speak to.",
  },
];

const STEPS_STAGE_3: Step[] = [
  {
    id: 8,
    stageId: 3,
    title: "Ask for the job sheet.",
    description:
      "Ask the technician for a copy of the visit report or job sheet before they leave.",
  },
  {
    id: 9,
    stageId: 3,
    title: "Ask what was tested.",
    description:
      "Ask which test or instrument was used to reach the diagnosis.",
  },
  {
    id: 10,
    stageId: 3,
    title: "Take your own photos.",
    description:
      "Photograph the product and anything the technician points to, during the visit.",
  },
];

const STEPS_STAGE_4: Step[] = [
  {
    id: 11,
    stageId: 4,
    title: "Ask for the reason in writing.",
    description:
      "Request a written explanation that names the exact cause and the evidence for it.",
  },
  {
    id: 12,
    stageId: 4,
    title: "Ask for the technical report.",
    description:
      "If the refusal rests on an inspection, ask for that inspection report.",
  },
  {
    id: 13,
    stageId: 4,
    title: "Escalate inside the company.",
    description:
      "Most brands list a grievance or escalation contact on their website. Write to it, quoting your complaint number.",
  },
  {
    id: 14,
    stageId: 4,
    title: "Keep it factual.",
    description:
      "Stick to dates, documents and photos. Calm, written records are what a consumer forum or regulator will look at.",
  },
  {
    id: 15,
    stageId: 4,
    title: "Know your consumer helpline.",
    description:
      "Most countries run a free consumer helpline or online complaint portal that can guide you on the next step.",
  },
];

export default function ClaimReadyLandingPage() {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("claim_ready_checked_steps");
      if (saved) {
        setCheckedSteps(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleStep = (id: number) => {
    setCheckedSteps((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("claim_ready_checked_steps", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "CLAIM READY",
          text: "A free checklist for anyone about to file a warranty claim.",
          url: window.location.href,
        });
        return;
      } catch {
        // fallback
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-neutral text-on-surface flex flex-col font-sans">
      {/* TICKER (DESIGN.md line 190, 307) */}
      <div className="ticker-container bg-primary-soft border-b border-primary-border py-3 px-4 overflow-hidden select-none">
        <div className="flex items-center w-max animate-ticker hover:[animation-play-state:paused]">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-10 text-primary-ink text-[10px] font-mono tracking-[0.16em] uppercase whitespace-nowrap pr-10"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                CLAIM READY
              </span>
              <span className="text-primary-border">/</span>
              <span>A free checklist for anyone about to file a warranty claim.</span>
              <span className="text-primary-border">/</span>
              <span>A warranty claim is decided on records. Keep yours, and ask for theirs in writing.</span>
              <span className="text-primary-border">/</span>
              <span>15 steps in the checklist.</span>
              <span className="text-primary-border">/</span>
              <span>4 records to keep before anything goes wrong.</span>
              <span className="text-primary-border">/</span>
              <span>1 rule: if it is not in writing, it did not happen.</span>
              <span className="text-primary-border">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* HEADER: strictly one line: logo, two links ("The 15 steps", "Key numbers"), and Download button */}
      <header className="sticky top-0 z-40 bg-surface/92 backdrop-blur-md border-b border-outline h-[72px] transition-all">
        <div className="max-w-shell mx-auto h-full px-4 sm:px-8 lg:px-10 flex items-center justify-between gap-3">
          {/* Logo */}
          <a href="#" className="flex items-center flex-shrink-0">
            <span className="text-on-surface-strong font-extrabold text-[17px] sm:text-[20px] tracking-tight">
              CLAIM READY
            </span>
          </a>

          {/* Two links: hidden on small screens so logo and download button fit cleanly on phones */}
          <nav className="hidden sm:flex items-center gap-6 sm:gap-8 text-[14px] sm:text-[15px] font-medium text-on-surface-variant">
            <a href="#the-15-steps" className="hover:text-on-surface-strong transition-colors whitespace-nowrap">
              The 15 steps
            </a>
            <a href="#key-numbers" className="hover:text-on-surface-strong transition-colors whitespace-nowrap">
              Key numbers
            </a>
          </nav>

          {/* Download button */}
          <div className="flex items-center flex-shrink-0">
            <a
              href="/claim-ready-checklist.txt"
              download="claim-ready-checklist.txt"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-secondary hover:bg-primary text-on-secondary text-[13px] sm:text-[13.5px] font-medium px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-sm hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-surface py-20 sm:py-28 lg:py-32 border-b border-outline">
          <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 bg-primary-soft border border-primary-border text-primary-ink text-[10px] font-mono tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>CLAIM READY</span>
                </div>

                <h1 className="headline-display text-on-surface-strong mb-5">
                  CLAIM READY
                </h1>

                <p className="body-lead font-normal text-on-surface-variant max-w-[62ch] mb-8">
                  A free checklist for anyone about to file a warranty claim.
                </p>

                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <a
                    href="/claim-ready-checklist.txt"
                    download="claim-ready-checklist.txt"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-strong text-on-primary text-[15px] font-semibold px-7 py-3.5 rounded-full shadow-raised transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Download the checklist</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#the-15-steps"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface hover:bg-surface-muted text-on-surface-strong border border-outline text-[15px] font-semibold px-7 py-3.5 rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>The 15 steps</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Document Card */}
              <div className="lg:col-span-5 w-full">
                <div className="bg-surface rounded-md border border-outline p-6 sm:p-8 shadow-card relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-outline pb-4 mb-6">
                    <span className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-on-surface-variant">
                      CLAIM READY
                    </span>
                    <span className="bg-primary-soft border border-primary-border text-primary-ink font-mono text-[10px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
                      15 steps in the checklist.
                    </span>
                  </div>

                  <div className="bg-surface-2 border border-outline rounded-sm p-5 mb-6">
                    <p className="font-mono text-[14px] text-primary-ink leading-relaxed">
                      &ldquo;A warranty claim is decided on records. Keep yours, and ask for theirs in writing.&rdquo;
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-sm bg-surface border border-outline text-[13.5px] font-medium text-on-surface-strong">
                      BEFORE ANYTHING GOES WRONG
                    </div>
                    <div className="p-3 rounded-sm bg-surface border border-outline text-[13.5px] font-medium text-on-surface-strong">
                      WHEN THE FAULT APPEARS
                    </div>
                    <div className="p-3 rounded-sm bg-surface border border-outline text-[13.5px] font-medium text-on-surface-strong">
                      WHEN A TECHNICIAN VISITS
                    </div>
                    <div className="p-3 rounded-sm bg-secondary text-white text-[13.5px] font-medium">
                      IF THE CLAIM IS REFUSED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WHO THIS IS FOR (Show full sentence once, remove 4 device cards) */}
        <section id="who-this-is-for" className="py-20 sm:py-28 lg:py-36 bg-surface-muted border-b border-outline">
          <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col items-start max-w-shell-narrow">
              <div className="inline-flex items-center gap-2 bg-primary-soft border border-primary-border text-primary-ink text-[10px] font-mono tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>WHO THIS IS FOR</span>
              </div>
              <h2 className="headline-lg text-on-surface-strong mb-6">
                WHO THIS IS FOR
              </h2>
              {/* Full sentence once */}
              <p className="text-[19px] sm:text-[22px] leading-[1.7] text-on-surface font-normal">
                Anyone whose phone, TV, laptop or appliance stopped working while it is still under warranty,
                and who wants the claim to be decided on facts, in writing.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: THE IDEA IN ONE LINE */}
        <section id="the-idea-in-one-line" className="py-20 sm:py-24 bg-surface border-b border-outline">
          <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-primary-soft border border-primary-border text-primary-ink text-[10px] font-mono tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>THE IDEA IN ONE LINE</span>
              </div>
              <h2 className="headline-lg text-on-surface-strong">
                THE IDEA IN ONE LINE
              </h2>
            </div>

            <div className="bg-secondary rounded-[26px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-raised scanline-pattern border border-white/10">
              <div className="relative z-10 flex flex-col items-start">
                <p className="font-mono text-[22px] sm:text-[30px] lg:text-[36px] font-medium leading-[1.3] text-primary-bright max-w-[34ch] tracking-tight">
                  &ldquo;A warranty claim is decided on records. Keep yours, and ask for theirs in writing.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WRAPPER FOR THE 15 STEPS */}
        <div id="the-15-steps">
          {/* SECTION: BEFORE ANYTHING GOES WRONG (Steps 1-4) */}
          <section id="before-anything-goes-wrong" className="py-20 sm:py-28 lg:py-36 bg-surface-muted border-b border-outline">
            <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
              <div className="flex flex-col items-start mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-primary-soft border border-primary-border text-primary-ink text-[10px] font-mono tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>BEFORE ANYTHING GOES WRONG</span>
                </div>
                <h2 className="headline-lg text-on-surface-strong mb-5">
                  BEFORE ANYTHING GOES WRONG
                </h2>
                <p className="body-lead text-on-surface-variant max-w-[62ch]">
                  4 records to keep before anything goes wrong.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {STEPS_STAGE_1.map((step) => {
                  const isChecked = !!checkedSteps[step.id];
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      className={`rounded-md border p-6 sm:p-7 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                        isChecked
                          ? "bg-primary-soft/40 border-primary shadow-sm"
                          : "bg-surface border-outline hover:border-outline-strong shadow-card hover:shadow-raised hover:-translate-y-0.5"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <span className="font-mono text-[12px] font-bold text-primary">
                            {step.id}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                              isChecked
                                ? "bg-primary border-primary text-white"
                                : "border-outline-strong bg-white hover:border-primary"
                            }`}
                          >
                            {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>

                        <h3
                          className={`text-[19px] font-bold mb-3 tracking-tight ${
                            isChecked ? "text-primary-ink line-through opacity-80" : "text-on-surface-strong"
                          }`}
                        >
                          {step.id}. {step.title}
                        </h3>

                        <p className="text-[16px] leading-[1.72] text-on-surface">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION: WHEN THE FAULT APPEARS (Steps 5-7) */}
          <section id="when-the-fault-appears" className="py-20 sm:py-28 lg:py-36 bg-surface border-b border-outline">
            <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
              <div className="flex flex-col items-start mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-primary-soft border border-primary-border text-primary-ink text-[10px] font-mono tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>WHEN THE FAULT APPEARS</span>
                </div>
                <h2 className="headline-lg text-on-surface-strong mb-5">
                  WHEN THE FAULT APPEARS
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEPS_STAGE_2.map((step) => {
                  const isChecked = !!checkedSteps[step.id];
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      className={`rounded-md border p-6 sm:p-7 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                        isChecked
                          ? "bg-primary-soft/40 border-primary shadow-sm"
                          : "bg-surface border-outline hover:border-outline-strong shadow-card hover:shadow-raised hover:-translate-y-0.5"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <span className="font-mono text-[12px] font-bold text-primary">
                            {step.id}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                              isChecked
                                ? "bg-primary border-primary text-white"
                                : "border-outline-strong bg-white hover:border-primary"
                            }`}
                          >
                            {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>

                        <h3
                          className={`text-[19px] font-bold mb-3 tracking-tight ${
                            isChecked ? "text-primary-ink line-through opacity-80" : "text-on-surface-strong"
                          }`}
                        >
                          {step.id}. {step.title}
                        </h3>

                        <p className="text-[16px] leading-[1.72] text-on-surface">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION: WHEN A TECHNICIAN VISITS (Steps 8-10) */}
          <section id="when-a-technician-visits" className="py-20 sm:py-28 lg:py-36 bg-surface-muted border-b border-outline">
            <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
              <div className="flex flex-col items-start mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-primary-soft border border-primary-border text-primary-ink text-[10px] font-mono tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>WHEN A TECHNICIAN VISITS</span>
                </div>
                <h2 className="headline-lg text-on-surface-strong mb-5">
                  WHEN A TECHNICIAN VISITS
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEPS_STAGE_3.map((step) => {
                  const isChecked = !!checkedSteps[step.id];
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      className={`rounded-md border p-6 sm:p-7 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                        isChecked
                          ? "bg-primary-soft/40 border-primary shadow-sm"
                          : "bg-surface border-outline hover:border-outline-strong shadow-card hover:shadow-raised hover:-translate-y-0.5"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <span className="font-mono text-[12px] font-bold text-primary">
                            {step.id}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                              isChecked
                                ? "bg-primary border-primary text-white"
                                : "border-outline-strong bg-white hover:border-primary"
                            }`}
                          >
                            {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>

                        <h3
                          className={`text-[19px] font-bold mb-3 tracking-tight ${
                            isChecked ? "text-primary-ink line-through opacity-80" : "text-on-surface-strong"
                          }`}
                        >
                          {step.id}. {step.title}
                        </h3>

                        <p className="text-[16px] leading-[1.72] text-on-surface">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION: IF THE CLAIM IS REFUSED (Steps 11-15: Dark Section) */}
          <section
            id="if-the-claim-is-refused"
            className="py-20 sm:py-28 lg:py-36 bg-secondary text-on-secondary relative overflow-hidden"
          >
            <div className="absolute inset-0 scanline-pattern opacity-40 pointer-events-none" />

            <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
              <div className="flex flex-col items-start mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-primary-bright/40 text-primary-bright text-[10px] font-mono tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-bright" />
                  <span>IF THE CLAIM IS REFUSED</span>
                </div>

                <h2 className="headline-lg text-white mb-5">
                  IF THE CLAIM IS REFUSED
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {STEPS_STAGE_4.map((step) => {
                  const isChecked = !!checkedSteps[step.id];
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      className={`rounded-md border p-6 sm:p-7 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                        isChecked
                          ? "bg-white/20 border-primary-bright shadow-raised"
                          : "bg-white/10 border-white/15 hover:border-primary-bright/60 hover:bg-white/[0.13]"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <span className="font-mono text-[12px] font-bold text-primary-bright">
                            {step.id}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                              isChecked
                                ? "bg-primary-bright border-primary-bright text-secondary"
                                : "border-white/30 bg-white/5 hover:border-primary-bright"
                            }`}
                          >
                            {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>

                        <h3
                          className={`text-[19px] font-bold mb-3 tracking-tight ${
                            isChecked ? "text-primary-bright line-through opacity-80" : "text-white"
                          }`}
                        >
                          {step.id}. {step.title}
                        </h3>

                        <p className="text-[16px] leading-[1.72] text-white/80">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* SECTION: KEY NUMBERS (Heading 'KEY NUMBERS FOR THE PAGE' hidden per request 1) */}
        <section id="key-numbers" className="py-20 sm:py-28 lg:py-36 bg-surface-muted border-b border-outline">
          <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
            {/* Stat Grid */}
            <div className="rounded-md border border-outline shadow-card overflow-hidden bg-outline grid grid-cols-1 md:grid-cols-3 gap-[1px]">
              {/* Stat Cell 1 */}
              <div className="bg-surface p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="stat-number text-on-surface-strong mb-3">
                    15
                  </div>
                </div>
                <p className="text-[16px] font-medium text-on-surface leading-relaxed">
                  15 steps in the checklist.
                </p>
              </div>

              {/* Stat Cell 2 */}
              <div className="bg-surface p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="stat-number text-on-surface-strong mb-3">
                    4
                  </div>
                </div>
                <p className="text-[16px] font-medium text-on-surface leading-relaxed">
                  4 records to keep before anything goes wrong.
                </p>
              </div>

              {/* Stat Cell 3 (HOT CELL in emerald) */}
              <div className="bg-surface p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-soft rounded-full -mr-12 -mt-12 pointer-events-none" />
                <div>
                  <div className="stat-number text-primary mb-3">
                    1
                  </div>
                </div>
                <p className="text-[16px] font-bold text-primary-ink leading-relaxed">
                  1 rule: if it is not in writing, it did not happen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CALL TO ACTION (Heading 'CALL TO ACTION' hidden per request 1) */}
        <section className="py-20 sm:py-28 lg:py-36 bg-surface border-b border-outline">
          <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
            {/* Two Action Cards matching content.txt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="bg-surface rounded-md border border-outline p-8 sm:p-10 shadow-card hover:shadow-raised transition-all flex flex-col justify-between">
                <div>
                  <h3 className="headline-md text-on-surface-strong text-[24px] mb-6">
                    Download the checklist and keep it with your invoices.
                  </h3>
                </div>

                <div className="pt-6 border-t border-outline flex flex-wrap items-center gap-4">
                  <a
                    href="/claim-ready-checklist.txt"
                    download="claim-ready-checklist.txt"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-strong text-white text-[15px] font-semibold px-6 py-3.5 rounded-full shadow-raised transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download the checklist</span>
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface rounded-md border border-outline p-8 sm:p-10 shadow-card hover:shadow-raised transition-all flex flex-col justify-between">
                <div>
                  <h3 className="headline-md text-on-surface-strong text-[24px] mb-6">
                    Share it with a friend who just bought something expensive.
                  </h3>
                </div>

                <div className="pt-6 border-t border-outline flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-white text-[15px] font-semibold px-6 py-3.5 rounded-full shadow-raised transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER & NOTE (Heading 'FOOTER NOTE' hidden per request 1) */}
      <footer className="bg-surface-muted border-t border-outline pt-16 pb-12">
        <div className="max-w-shell mx-auto px-5 sm:px-8 lg:px-10">
          {/* Note content without heading */}
          <div className="mb-14 p-6 sm:p-8 rounded-md bg-surface border border-outline shadow-sm">
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              Claim Ready is a free, general guide. It is not legal advice. For your own case, check the warranty terms for your product and your country&apos;s consumer rules.
            </p>
          </div>

          {/* Three columns using clean links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-outline text-[14px]">
            {/* Col 1 */}
            <div>
              <span className="font-extrabold text-[17px] text-on-surface-strong tracking-tight block mb-2">
                CLAIM READY
              </span>
              <p className="text-on-surface-variant leading-relaxed">
                A free checklist for anyone about to file a warranty claim.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-strong mb-3">
                CLAIM READY
              </div>
              <ul className="space-y-2 text-on-surface-variant">
                <li>
                  <a href="#the-15-steps" className="hover:text-on-surface-strong transition-colors">
                    The 15 steps
                  </a>
                </li>
                <li>
                  <a href="#key-numbers" className="hover:text-on-surface-strong transition-colors">
                    Key numbers
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <ul className="space-y-2 text-on-surface-variant">
                <li>15 steps in the checklist.</li>
                <li>4 records to keep before anything goes wrong.</li>
                <li className="font-semibold text-primary">
                  1 rule: if it is not in writing, it did not happen.
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-on-surface-muted">
            <p>
              Claim Ready
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wider">
              A warranty claim is decided on records. Keep yours, and ask for theirs in writing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
