import Link from "next/link";
import { assetPath } from "../lib/assetPath";

export function WorkoutStats({ workout }) {
  return (
    <div className="workout-stats">
      <span><i aria-hidden="true">◷</i>{workout.duration} min</span>
      <span><i aria-hidden="true">◉</i>{workout.caloriesBurned} kcal</span>
      <span><i aria-hidden="true">★</i>{workout.rating}</span>
    </div>
  );
}

export default function WorkoutCard({ workout }) {
  return (
    <Link className="workout-card" href={`/workout/${workout.id}`}>
      <div className="workout-photo">
        <img src={workout.image || assetPath("/brand/banner.png")} alt={workout.name} loading="lazy" />
        <span className="photo-index">{String(workout.id).padStart(2, "0")}</span>
      </div>
      <div className="workout-card-body">
        <div className="tag-row">{workout.muscleGroups?.slice(0, 2).map((group) => <span className="tag" key={group}>{group}</span>)}</div>
        <h3>{workout.name}</h3>
        <p className="equipment-line">{workout.equipment}</p>
        <WorkoutStats workout={workout} />
      </div>
    </Link>
  );
}