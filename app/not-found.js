import Link from "next/link";

export default function NotFound() {
  return <section className="not-found page-width"><p className="eyebrow"><span /> 404 / PAGE NOT FOUND</p><h1>WRONG TURN.<br />RIGHT TRAINING.</h1><p>This page isn&apos;t in the FitLog library.</p><Link className="button button-primary" href="/">BACK TO WORKOUTS <span aria-hidden="true">↗</span></Link></section>;
}