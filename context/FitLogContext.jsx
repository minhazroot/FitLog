"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const FitLogContext = createContext(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [doneIds, setDoneIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem(PLAN_KEY) || "[]"));
      setSaved(JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"));
      setDoneIds(JSON.parse(localStorage.getItem(DONE_KEY) || "[]"));
    } catch {
      setPlan([]);
      setSaved([]);
      setDoneIds([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(DONE_KEY, JSON.stringify(doneIds));
  }, [doneIds, hydrated]);

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast("Already in today's plan");
      return false;
    }
    if (plan.length >= 5) {
      toast.error("Today's plan can contain at most 5 lifts");
      return false;
    }
    setPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan");
    return true;
  };

  const saveForLater = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast("Already saved for later");
      return false;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
    return true;
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    setDoneIds((prev) => prev.filter((item) => item !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  };

  const markDone = (id) => {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    toast.success("Workout marked as done");
  };

  const value = useMemo(() => ({
    plan,
    saved,
    doneIds,
    hydrated,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    markDone,
  }), [plan, saved, doneIds, hydrated]);

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const value = useContext(FitLogContext);
  if (!value) throw new Error("useFitLog must be used inside FitLogProvider");
  return value;
}
