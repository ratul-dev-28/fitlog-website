"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { WorkoutStats } from "../components/WorkoutCard";
import { useFitLog } from "../components/FitLogProvider";

export default function MyPlanPage() {
  const { loading, plan, saved, removeFromPlan, removeSaved, markDone } = useFitLog();
  const [tab, setTab] = useState("plan");
  const [search, setSearch] = useState("");
  useEffect(() => {
    setTab(new URLSearchParams(window.location.search).get("tab") === "saved" ? "saved" : "plan");
  }, []);
  const visibleItems = tab === "plan" ? plan : saved;
  const filteredItems = useMemo(() => visibleItems.filter((item) => `${item.name} ${item.muscleGroups?.join(" ")}`.toLowerCase().includes(search.toLowerCase())), [visibleItems, search]);
  const minutes = plan.reduce((sum, item) => sum + Number(item.duration || 0), 0);
  const calories = plan.reduce((sum, item) => sum + Number(item.caloriesBurned || 0), 0);

  return (
    <section className="plan-page page-width">
      <div className="plan-heading"><div><p className="eyebrow"><span /> YOUR DAILY LOG</p><h1>MY PLAN<span className="lime-dot">.</span></h1><p>Cap of five lifts for today. Finish them, then load more.</p></div><div className="plan-date"><span>TRAINING DAY</span><b>{new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "2-digit" }).format(new Date()).toUpperCase()}</b></div></div>
      <div className="metrics-row"><div className="metric"><span>EXERCISES</span><b>{plan.length}<small> / 05</small></b></div><div className="metric"><span>MINUTES</span><b>{minutes}<small> MIN</small></b></div><div className="metric"><span>CALORIES</span><b>{calories}<small> KCAL</small></b></div></div>
      <div className="plan-toolbar"><div className="plan-tabs" role="tablist" aria-label="Plan lists"><button role="tab" aria-selected={tab === "plan"} className={tab === "plan" ? "tab-button selected" : "tab-button"} onClick={() => setTab("plan")}>TODAY&apos;S PLAN <span>{plan.length}</span></button><button role="tab" aria-selected={tab === "saved"} className={tab === "saved" ? "tab-button selected" : "tab-button"} onClick={() => setTab("saved")}>SAVED <span>{saved.length}</span></button></div><label className="search-field plan-search"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your lifts" aria-label="Search plan workouts" /></label></div>
      {loading ? <div className="loading-state"><span className="spinner" /> Loading workouts…</div> : filteredItems.length === 0 ? <div className="plan-empty"><div className="empty-mark">＋</div><p className="eyebrow">{search ? "NO MATCHES" : "NOTHING HERE YET"}</p><h2>{search ? "NO LIFTS FOUND." : "THE WORK STARTS HERE."}</h2><p>{search ? "Try another lift name or muscle group." : "Browse the library and add a lift to get today moving."}</p><Link className="button button-primary" href="/">GO TO WORKOUTS <span aria-hidden="true">↗</span></Link></div> : <div className="plan-list">{filteredItems.map((item) => <article className={`plan-card${item.done ? " is-done" : ""}`} key={item.id}><Link className="plan-thumb" href={`/workout/${item.id}`}><img src={item.image || "/brand/banner.png"} alt="" loading="lazy" /></Link><div className="plan-card-info"><div className="tag-row">{item.muscleGroups?.slice(0, 2).map((group) => <span className="tag" key={group}>{group}</span>)}</div><Link className="plan-card-title" href={`/workout/${item.id}`}>{item.name}</Link><p className="equipment-line">{item.equipment}</p><WorkoutStats workout={item} /></div><div className="plan-card-actions"><Link className="button button-outline view-button" href={`/workout/${item.id}`}>VIEW DETAILS <span aria-hidden="true">↗</span></Link>{tab === "plan" && <button className={item.done ? "button button-done" : "button button-outline done-button"} onClick={() => markDone(item.id)} disabled={item.done}><span aria-hidden="true">✓</span> {item.done ? "DONE" : "MARK AS DONE"}</button>}<button className="remove-button" onClick={() => tab === "plan" ? removeFromPlan(item.id) : removeSaved(item.id)} aria-label={`Remove ${item.name}`} title="Remove">×</button></div></article>)}</div>}
      <div className="plan-limit"><span>PLAN CAP</span><div>{Array.from({ length: 5 }, (_, index) => <i className={index < plan.length ? "filled" : ""} key={index} />)}</div><span>{plan.length} / 5</span></div>
    </section>
  );
}