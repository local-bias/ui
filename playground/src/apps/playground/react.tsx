import React from "react";
import { createRoot } from "react-dom/client";
import { CheckAnimation, Loader } from "@konomi-app/ui-react";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("react-root");
  if (!root) {
    return;
  }
  createRoot(root).render(
    <div>
      <div>
        <div>loader</div>
        <div>
          <Loader />
          <CheckAnimation />
        </div>
      </div>
    </div>
  );
});
