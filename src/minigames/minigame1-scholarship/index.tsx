import React from "react";

export const metadata = {
  title: "Scholarship Matcher",
  description:
    "Placeholder",
  id: "level-1",
};

const Minigame1: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Hi! I'm Game 1</h1>
      <p style={{ fontSize: "1.5rem", color: "#666" }}>
        Scholarship Matcher Module Loaded ✓
      </p>
    </div>
  );
};

export default Minigame1;
