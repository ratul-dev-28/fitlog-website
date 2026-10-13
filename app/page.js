"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import WorkoutCard from "./components/WorkoutCard";
import { useFitLog } from "./components/FitLogProvider";
import { assetPath } from "./lib/assetPath";

export default function HomePage() {
  const { workouts, loading } = useFitLog();
  const [sortBy, setSortBy] = useState("duration");
  const [search, setSearch] = useState("");
  const sortedWorkouts = useMemo(() => [...workouts]
    .filter((workout) => `${workout.name} ${workout.muscleGroups?.join(" ")}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a[sortBy === "calories" ? "caloriesBurned" : sortBy] - b[sortBy === "calories" ? "caloriesBurned" : sortBy]), [workouts, sortBy, search]);

  return (
    <>
      <section className="hero-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span /> WORKOUT LIBRARY <span className="eyebrow-rule" /></p>
          <h1>TRAIN WITH INTENT.<br /><em>LOG EVERY SET.</em></h1>
          <p className="hero-description">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <Link className="button button-primary" href="#library">BROWSE WORKOUTS <span aria-hidden="true">↘</span></Link>
          <div className="hero-footnote"><span>01 / 12</span><span>BUILT FOR THE WORK</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-vertical-label">STRENGTH / DAILY PRACTICE</div>
          <img src={assetPath("/brand/banner.png")} alt="Athlete training on a seated gym machine" />
          <div className="hero-stamp"><span>NO SHORTCUTS</span><b>FIT<br />FORGE</b></div>
          <div className="hero-orbit" />
        </div>
      </section>
      <section className="library-section page-width" id="library">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> TRAINING INDEX</p><h2>THE LIBRARY<span className="lime-dot">.</span></h2><p>Twelve lifts covering every major muscle group.</p></div>
          <div className="library-tools">
            <label className="search-field"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search lifts or muscles" aria-label="Search lifts or muscle groups" /></label>
            <label className="sort-field">SORT BY <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort workouts"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select><span aria-hidden="true">⌄</span></label>
          </div>
        </div>
        {loading ? <div className="loading-state"><span className="spinner" /> Loading workouts…</div> : workouts.length === 0 ? <div className="empty-state"><h3>LIBRARY UNAVAILABLE</h3><p>Workout data couldn&apos;t be loaded. Check your connection and try again.</p></div> : sortedWorkouts.length ? <div className="workout-grid">{sortedWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div> : <div className="empty-state"><h3>NO MATCHES</h3><p>Try another lift name or muscle group.</p></div>}
      </section>
    </>
  );
}