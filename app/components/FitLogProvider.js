"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext(null);
const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export function useFitLog() {
  return useContext(FitLogContext);
}

export default function FitLogProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
    } catch {
      localStorage.removeItem("fitlog-plan");
      localStorage.removeItem("fitlog-saved");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [hydrated, plan, saved]);

  useEffect(() => {
    let cancelled = false;
    async function loadWorkouts() {
      for (const url of API_URLS) {
        try {
          const response = await fetch(url);
          if (!response.ok) continue;
          const data = await response.json();
          if (!Array.isArray(data)) continue;
          if (!cancelled) {
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
            setWorkouts(data.map((workout) => ({
              ...workout,
              image: workout.image || `${basePath}/brand/banner.png`,
            })));
          }
          break;
        } catch {
          // Try the fallback API before reporting an empty library.
        }
      }
      if (!cancelled) setLoading(false);
    }
    loadWorkouts();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function addToPlan(workout) {
    if (plan.some((item) => item.id === workout.id)) {
      setToast("Already in today's plan");
      return;
    }
    if (plan.length >= 5) {
      setToast("Today's plan is full");
      return;
    }
    setPlan((items) => [...items, { ...workout, done: false }]);
    setToast("Added to today's plan");
  }

  function saveForLater(workout) {
    if (saved.some((item) => item.id === workout.id)) {
      setToast("Already saved for later");
      return;
    }
    setSaved((items) => [...items, workout]);
    setToast("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan((items) => items.filter((item) => item.id !== id));
    setToast("Removed from today's plan");
  }

  function markDone(id) {
    setPlan((items) => items.map((item) => item.id === id ? { ...item, done: true } : item));
    setToast("Workout marked as done");
  }

  function removeSaved(id) {
    setSaved((items) => items.filter((item) => item.id !== id));
    setToast("Removed from saved workouts");
  }

  return (
    <FitLogContext.Provider value={{ workouts, loading, plan, saved, toast, setToast, addToPlan, saveForLater, removeFromPlan, markDone, removeSaved }}>
      {children}
      {toast && <div className="toast" role="status">{toast}</div>}
    </FitLogContext.Provider>
  );
}