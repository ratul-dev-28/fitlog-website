"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "./FitLogProvider";
import { assetPath } from "../lib/assetPath";

export default function SiteHeader() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="FitLog home">
        <img src={assetPath("/brand/logo.png")} alt="" />
        <span>FIT<span>LOG</span></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link className={pathname === "/" ? "nav-link active" : "nav-link"} href="/">Workout</Link>
        <Link className={pathname === "/my-plan" ? "nav-link active" : "nav-link"} href="/my-plan">My Plan</Link>
      </nav>
      <div className="header-counts">
        <Link className="count-pill plan-pill" href="/my-plan"><span>Plan</span><b>{plan.length}</b></Link>
        <Link className="count-pill saved-pill" href="/my-plan?tab=saved"><span>Saved</span><b>{saved.length}</b></Link>
      </div>
    </header>
  );
}