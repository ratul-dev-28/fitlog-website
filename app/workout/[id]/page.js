import WorkoutDetailsClient from "./WorkoutDetailsClient";

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, index) => ({ id: String(index + 1) }));
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  return <WorkoutDetailsClient id={id} />;
}