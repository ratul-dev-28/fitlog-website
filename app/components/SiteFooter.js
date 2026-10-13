import Link from "next/link";
import { assetPath } from "../lib/assetPath";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="brand footer-brand" href="/">
        <img src={assetPath("/brand/logo.png")} alt="" />
        <span>FIT<span>LOG</span></span>
      </Link>
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}