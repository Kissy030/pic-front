import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router/index.tsx";
import { RouterProvider } from "react-router-dom";
import "./main.less";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
