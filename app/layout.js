import "./globals.css";
import FitLogProvider from "./components/FitLogProvider";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata = {
  title: "FitLog | Train with intent",
  description: "A focused workout library and daily training log.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </FitLogProvider>
      </body>
    </html>
  );
}