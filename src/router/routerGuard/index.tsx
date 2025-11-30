import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useLoginStore } from "../../zustand";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const isLogged = useLoginStore((state) => state.isLogged);
  //   const setIsLogged = useLoginStore((state) => state.setIsLogged);
  if (!isLogged) return <Navigate to="/login"></Navigate>;
  return children;
}
