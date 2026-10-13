"use client";

import Link from "next/link";
import { useFitLog } from "../../components/FitLogProvider";
import { assetPath } from "../../lib/assetPath";

export default function WorkoutDetailsClient({ id }) {
  const { workouts, loading, plan, addToPlan, saveForLater } = useFitLog();
  const workout = workouts.find((item) => String(item.id) === String(id));

  if (loading) return <div className="loading-state detail-loading"><span className="spinner" /> Loading workouts…</div>;
  if (!workout) return <section className="not-found page-width"><p className="eyebrow">404 / LIFT NOT FOUND</p><h1>THAT MOVE<br />ISN&apos;T HERE.</h1><Link className="button button-primary" href="/">BACK TO THE LIBRARY <span aria-hidden="true">↗</span></Link></section>;

  return (
    <section className="detail-layout page-width">
      <div className="detail-visual"><img src={workout.image || assetPath("/brand/banner.png")} alt={workout.name} /><span className="detail-image-index">LIFT No. {String(workout.id).padStart(2, "0")}</span><span className="detail-side-label">FITLOG / MOVEMENT LIBRARY</span></div>
      <div className="detail-copy">
        <Link className="back-link" href="/">← ALL WORKOUTS</Link>
        <p className="eyebrow"><span /> MOVEMENT PROFILE</p>
        <h1>{workout.name}</h1>
        <p className="detail-description">{workout.description}</p>
        <div className="tag-row detail-tags">{workout.muscleGroups?.map((group) => <span className="tag" key={group}>{group}</span>)}</div>
        <div className="specs-panel"><p className="panel-label">KEY SPECS</p><div className="spec-grid"><div><span>EQUIPMENT</span><b>{workout.equipment}</b></div><div><span>DIFFICULTY</span><b>{workout.difficulty}</b></div><div><span>SETS</span><b>{workout.sets}</b></div><div><span>REPS</span><b>{workout.reps}</b></div><div><span>DURATION</span><b>{workout.duration} min</b></div><div><span>CALORIES</span><b>{workout.caloriesBurned} kcal</b></div><div><span>RATING</span><b>★ {workout.rating}</b></div></div></div>
        <div className="instructions"><p className="panel-label">INSTRUCTIONS <span>0{workout.instructions?.length || 0} STEPS</span></p><ol>{workout.instructions?.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></div>
        <div className="detail-actions"><button className="button button-primary" onClick={() => addToPlan(workout)} disabled={plan.length >= 5 || plan.some((item) => item.id === workout.id)}><span aria-hidden="true">＋</span> ADD TO TODAY&apos;S PLAN</button><button className="button button-outline" onClick={() => saveForLater(workout)}><span aria-hidden="true">☆</span> SAVE FOR LATER</button></div>
      </div>
    </section>
  );
}