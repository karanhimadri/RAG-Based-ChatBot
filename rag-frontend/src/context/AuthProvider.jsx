"use client";
import { supabase } from "@/lib/supabase";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(undefined);
const User = {
  id: "",
  name: "",
  email: ""
}

export default function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(User);
  const [credits, setCredits] = useState(100);
  const [isAuthModelOpen, setIsAuthModelOpen] = useState(false)

  const fetchCredits = useCallback(async (userId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/credits?user_id=${userId}`);
      if (!response.ok) {
        console.log("Error fetching credits");
      }

      const data = await response.json();
      setCredits(data?.credits)
    } catch (err) {
      console.error("Credits API error:", err.message);
      setCredits(data?.credits)
    }
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email,
          name: data.session.user.user_metadata?.name || ""
        });
        setLoggedIn(true);
        fetchCredits(data.session.user.id)
      }
    };

    fetchUser();
  }, [])

  const login = useCallback(async (uData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: uData.email,
      password: uData.password
    });

    console.log(error)
    if (error) return error;
    console.log(data)

    if (data.user) setUser({
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || ""
    });
    setLoggedIn(true);
    return data;
  }, []);

  const signUp = useCallback(async (uData) => {
    const { data, error } = await supabase.auth.signUp({
      email: uData.email,
      password: uData.password,
      options: { data: { name: uData.name } } // store name in metadata
    });

    console.log(error)
    if (error) return error;
    console.log(data)

    // Signup give a session immediately
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: uData.name
      });
      setLoggedIn(true);
    }
    return data;
  }, []);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return error;
    setUser(User);
    setLoggedIn(false);
  }, []);

  const consumeCredits = useCallback((amount = 1) => {
    setCredits((c) => Math.max(0, c - amount));
  }, []);

  const value = {
    isAuthModelOpen,
    isLoggedIn,
    user,
    credits,
    login,
    logout,
    signUp,
    consumeCredits,
    setIsAuthModelOpen,
    fetchCredits
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
