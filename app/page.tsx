"use client";

import { useEffect, useMemo, useState } from "react";

const slides = [
  { id: "opening", eyebrow: "Clinical learning deck", title: "The kissing disease\nis more than a sore throat.", short: "Opening" },
  { id: "pathogen", eyebrow: "01 · The pathogen", title: "Meet Epstein–Barr virus", short: "Pathogen" },
  { id: "transmission", eyebrow: "02 · Transmission", title: "A quiet journey through saliva", short: "Spread" },
  { id: "presentation", eyebrow: "03 · Presentation", title: "The classic clinical picture", short: "Symptoms" },
  { id: "exam", eyebrow: "04 · Physical exam", title: "Look beyond the tonsils", short: "Exam" },
  { id: "diagnosis", eyebrow: "05 · Diagnosis", title: "Build the case, then confirm", short: "Diagnosis" },
  { id: "management", eyebrow: "06 · Management", title: "Support, protect, reassess", short: "Care" },
  { id: "complications", eyebrow: "07 · Complications", title: "Know what changes the plan", short: "Risks" },
  { id: "recovery", eyebrow: "08 · Recovery", title: "Fatigue sets the pace", short: "Recovery" },
  { id: "quiz", eyebrow: "09 · Knowledge check", title: "One case. Three decisions.", short: "Quiz" },
];

const quiz = [
  {
    q: "A 19-year-old has fever, exudative pharyngitis, posterior cervical nodes and fatigue. Best initial test?",
    options: ["Heterophile antibody test", "Chest radiograph", "Blood culture"],
    answer: 0,
    rationale: "The clinical pattern strongly suggests infectious mononucleosis; a heterophile antibody test is a practical first test, though early false negatives occur.",
  },
  {
    q: "Which exam finding most strongly supports mononucleosis over routine streptococcal pharyngitis?",
    options: ["Posterior cervical lymphadenopathy", "Tonsillar exudate", "Fever"],
    answer: 0,
    rationale: "Posterior cervical lymphadenopathy is particularly characteristic. Fever and exudate occur in both illnesses.",
  },
  {
    q: "What single instruction matters most before discharge?",
    options: ["Avoid contact sports", "Start amoxicillin", "Restrict all fluids"],
    answer: 0,
    rationale: "Splenic enlargement can be clinically silent. Avoiding impact and heavy exertion reduces the risk of splenic rupture.",
  },
];

function OrbitalVirus() {
  return (
    <div className="virus-stage" aria-hidden="true">
      <div className="orbit orbit-a"><i /></div>
      <div className="orbit orbit-b"><i /></div>
      <div className="virus-core"><span>EBV</span><small>HHV-4</small></div>
      {Array.from({ length: 12 }).map((_, i) => <b key={i} style={{ "--i": i } as React.CSSProperties} />)}
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([0]);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (index: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    setCurrent(next);
    setRevealed((r) => r.includes(next) ? r : [...r, next]);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(current - 1); }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const score = useMemo(() => answers.reduce((n, a, i) => n + (a === quiz[i]?.answer ? 1 : 0), 0), [answers]);
  const answerQuiz = (choice: number) => {
    if (answers[quizStep] !== undefined) return;
    setAnswers((a) => [...a, choice]);
  };

  const slide = slides[current];

  return (
    <main className="deck">
      <header className="topbar">
        <button className="brand" onClick={() => go(0)} aria-label="Return to first slide">
          <span className="brand-mark">M</span>
          <span>MED / NOTES</span>
        </button>
        <div className="topic"><span className="pulse-dot" /> Infectious mononucleosis</div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open slide menu">
          <span /> <span />
        </button>
      </header>

      <nav className={`slide-menu ${menuOpen ? "open" : ""}`} aria-label="Slide navigation">
        <p>CONTENTS</p>
        {slides.map((s, i) => (
          <button key={s.id} className={i === current ? "active" : ""} onClick={() => go(i)}>
            <span>{String(i + 1).padStart(2, "0")}</span>{s.short}<i>{revealed.includes(i) ? "•" : ""}</i>
          </button>
        ))}
      </nav>

      <section className="slide-frame" aria-live="polite">
        <div className="slide-heading">
          <p>{slide.eyebrow}</p>
          <h1>{slide.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        </div>

        {current === 0 && (
          <div className="opening-grid animate-in">
            <div className="opening-copy">
              <p className="lede">A visual field guide to Epstein–Barr virus, from first contact to a safe return to activity.</p>
              <button className="primary" onClick={() => go(1)}>Begin the case <span>→</span></button>
              <div className="microcopy">10 slides · 7 min · interactive quiz</div>
            </div>
            <OrbitalVirus />
          </div>
        )}

        {current === 1 && (
          <div className="content-grid animate-in">
            <div className="stat-stack">
              <div className="big-stat"><strong>90%</strong><span>of adults show evidence of prior EBV infection</span></div>
              <div className="fact-strip"><span>Virus family</span><b>Herpesviridae</b><span>Primary target</span><b>B lymphocytes</b></div>
            </div>
            <div className="mechanism-card">
              <div className="cell-diagram"><span>B</span><i /><i /><i /><i /><i /><i /></div>
              <h3>Entry → latency</h3>
              <p>EBV infects oropharyngeal epithelial cells and B cells, then establishes lifelong latency.</p>
              <div className="accent-note"><b>Why symptoms happen</b><br />The dramatic illness reflects the immune response—especially activated CD8+ T cells—not simply viral burden.</div>
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="transmission-layout animate-in">
            <div className="route-line">
              {["Saliva", "Oropharynx", "B cells", "Immune response"].map((x, i) => <div key={x}><span>{i + 1}</span><b>{x}</b><small>{["close contact", "viral replication", "lifelong latency", "clinical illness"][i]}</small></div>)}
            </div>
            <div className="timeline-card">
              <div><span>Exposure</span><strong>Day 0</strong></div>
              <div className="timeline-bar"><i /></div>
              <div><span>Symptoms</span><strong>4–6 weeks</strong></div>
              <p>People can shed EBV before symptoms and intermittently long after recovery. Casual classroom or workplace contact is generally low risk.</p>
            </div>
          </div>
        )}

        {current === 3 && (
          <div className="symptom-grid animate-in">
            {[
              ["01", "Fever", "Often persistent, usually low-to-moderate grade"],
              ["02", "Pharyngitis", "Severe sore throat with tonsillar exudate"],
              ["03", "Lymph nodes", "Posterior cervical nodes are a classic clue"],
              ["04", "Fatigue", "May outlast the acute illness by several weeks"],
            ].map(([n, t, d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
            <div className="triad"><span>THE CLASSIC TRIAD</span><b>Fever + pharyngitis + lymphadenopathy</b></div>
          </div>
        )}

        {current === 4 && (
          <div className="exam-layout animate-in">
            <div className="body-map" aria-label="Clinical examination map">
              <div className="head"><i /><i /></div><div className="torso" />
              <span className="pin pin-a">A</span><span className="pin pin-b">B</span><span className="pin pin-c">C</span>
            </div>
            <div className="finding-list">
              <div><span>A</span><section><h3>Oropharynx</h3><p>Tonsillar erythema or exudate; palatal petechiae may appear.</p></section></div>
              <div><span>B</span><section><h3>Neck</h3><p>Symmetric posterior cervical lymphadenopathy is particularly suggestive.</p></section></div>
              <div><span>C</span><section><h3>Abdomen</h3><p>Splenomegaly may be subtle or absent on exam—do not rely on palpation alone for activity advice.</p></section></div>
              <aside>Also look for eyelid edema, hepatomegaly, and a diffuse rash—especially after aminopenicillin exposure.</aside>
            </div>
          </div>
        )}

        {current === 5 && (
          <div className="diagnosis-layout animate-in">
            <div className="diagnostic-path">
              <div><span>1</span><b>Clinical suspicion</b><small>triad + age + exposure</small></div>
              <i>↓</i>
              <div><span>2</span><b>CBC + differential</b><small>lymphocytosis; atypical lymphocytes</small></div>
              <i>↓</i>
              <div className="highlight"><span>3</span><b>Heterophile test</b><small>fast, specific; may miss early disease</small></div>
            </div>
            <div className="lab-card">
              <p>WHEN THE STORY AND TEST DISAGREE</p>
              <h3>Use EBV-specific serology</h3>
              <div className="serology-table">
                <span>VCA IgM</span><b>Acute infection</b>
                <span>VCA IgG</span><b>Appears in acute phase; persists</b>
                <span>EBNA IgG</span><b>Usually appears later; past infection</b>
              </div>
              <aside><b>Remember:</b> heterophile tests can be falsely negative during the first week and in young children.</aside>
            </div>
          </div>
        )}

        {current === 6 && (
          <div className="care-layout animate-in">
            <div className="care-list">
              {[["01", "Hydration + rest", "Treat the person, not the calendar."], ["02", "Pain + fever control", "Acetaminophen or an NSAID when appropriate."], ["03", "Activity restriction", "No contact sport or heavy exertion for at least 3 weeks from symptom onset; individualize return."], ["04", "Safety net", "Urgent review for severe abdominal pain, breathing difficulty, or inability to drink."]].map(([n,t,d]) => <div key={n}><span>{n}</span><section><b>{t}</b><p>{d}</p></section></div>)}
            </div>
            <div className="dont-card">
              <p>ROUTINE THERAPY?</p>
              <div><b>Antibiotics</b><span>NO</span></div>
              <div><b>Antivirals</b><span>NO</span></div>
              <div><b>Corticosteroids</b><span>ONLY SELECT CASES</span></div>
              <small>Steroids are reserved for serious complications such as impending airway obstruction—not uncomplicated illness.</small>
            </div>
          </div>
        )}

        {current === 7 && (
          <div className="risk-grid animate-in">
            <article className="risk-major"><p>CAN’T-MISS</p><h2>Splenic rupture</h2><strong>Sudden left upper-quadrant or referred shoulder pain, dizziness, collapse</strong><span>→ emergency assessment</span></article>
            <article><span className="risk-no">02</span><h3>Airway obstruction</h3><p>Marked tonsillar enlargement, stridor, drooling, or respiratory distress.</p></article>
            <article><span className="risk-no">03</span><h3>Hematologic</h3><p>Autoimmune hemolytic anemia or thrombocytopenia.</p></article>
            <article><span className="risk-no">04</span><h3>Neurologic / hepatic</h3><p>Rare encephalitis or Guillain–Barré syndrome; mild hepatitis is more common.</p></article>
          </div>
        )}

        {current === 8 && (
          <div className="recovery-layout animate-in">
            <div className="recovery-curve">
              <div className="curve-labels"><span>SYMPTOM LOAD</span><span>FUNCTION</span></div>
              <div className="curve"><i /><i /></div>
              <div className="weeks"><span>Week 0</span><span>Week 2</span><span>Week 4</span><span>Week 6+</span></div>
            </div>
            <div className="return-card">
              <p>RETURN-TO-ACTIVITY CHECK</p>
              {["Afebrile", "Clinically well", "No splenic pain", "Graded, low-impact restart"].map(x => <div key={x}><span>✓</span>{x}</div>)}
              <small>Decisions should be individualized. Ultrasound is not routinely required for every athlete and does not perfectly predict rupture risk.</small>
            </div>
          </div>
        )}

        {current === 9 && (
          <div className="quiz-layout animate-in">
            {quizStep < quiz.length ? (
              <div className="quiz-card">
                <div className="quiz-progress">QUESTION {quizStep + 1} / {quiz.length}<i style={{ width: `${((quizStep + 1) / quiz.length) * 100}%` }} /></div>
                <h2>{quiz[quizStep].q}</h2>
                <div className="answer-list">
                  {quiz[quizStep].options.map((o, i) => {
                    const chosen = answers[quizStep];
                    const cls = chosen === undefined ? "" : i === quiz[quizStep].answer ? "correct" : i === chosen ? "wrong" : "dim";
                    return <button className={cls} key={o} onClick={() => answerQuiz(i)}><span>{String.fromCharCode(65 + i)}</span>{o}</button>;
                  })}
                </div>
                {answers[quizStep] !== undefined && <div className="rationale"><b>{answers[quizStep] === quiz[quizStep].answer ? "Correct." : "Not quite."}</b> {quiz[quizStep].rationale}<button onClick={() => setQuizStep(quizStep + 1)}>{quizStep === quiz.length - 1 ? "See result" : "Next question"} →</button></div>}
              </div>
            ) : (
              <div className="results-card">
                <span>YOUR SCORE</span><strong>{score}/{quiz.length}</strong><h2>{score === quiz.length ? "Clinical instincts: sharp." : "A useful first pass."}</h2>
                <p>Keep the pattern in mind: posterior nodes, early false-negative testing, supportive care, and spleen-safe activity advice.</p>
                <button className="primary" onClick={() => { setQuizStep(0); setAnswers([]); }}>Try again <span>↻</span></button>
              </div>
            )}
            <div className="takeaway"><p>THE ONE-LINE TAKEAWAY</p><b>Recognize the triad. Confirm thoughtfully. Protect the spleen. Let recovery breathe.</b></div>
          </div>
        )}
      </section>

      <footer className="controls">
        <div className="progress"><i style={{ width: `${((current + 1) / slides.length) * 100}%` }} /></div>
        <span>{String(current + 1).padStart(2, "0")} <em>/ {String(slides.length).padStart(2, "0")}</em></span>
        <p>Use arrow keys to navigate</p>
        <div><button onClick={() => go(current - 1)} disabled={current === 0} aria-label="Previous slide">←</button><button onClick={() => go(current + 1)} disabled={current === slides.length - 1} aria-label="Next slide">→</button></div>
      </footer>
    </main>
  );
}
