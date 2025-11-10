import { useEffect, useMemo, useState } from "react";
import "./App.css";
// Wails auto-generates these bindings:
import { NewGame, Guess, GetState } from "../wailsjs/go/main/App.js";

const A2Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function HangmanSVG({ misses }) {
  // Draw parts progressively based on misses
  // 0..10 scale used in our game.go (MaxMisses = 10)
  return (
    <svg width="220" height="240" style={{ display: "block" }}>
      {/* gallows */}
      <line x1="10" y1="230" x2="210" y2="230" stroke="black" />
      <line x1="50" y1="230" x2="50" y2="20" stroke="black" />
      <line x1="50" y1="20" x2="150" y2="20" stroke="black" />
      <line x1="150" y1="20" x2="150" y2="40" stroke="black" />
      {/* parts */}
      {misses > 0 && <circle cx="150" cy="60" r="15" stroke="black" fill="none" />}        {/* head */}
      {misses > 1 && <line x1="150" y1="75" x2="150" y2="115" stroke="black" />}            {/* body */}
      {misses > 2 && <line x1="150" y1="85" x2="130" y2="100" stroke="black" />}            {/* arm L */}
      {misses > 3 && <line x1="150" y1="85" x2="170" y2="100" stroke="black" />}            {/* arm R */}
      {misses > 4 && <line x1="150" y1="115" x2="135" y2="145" stroke="black" />}           {/* leg L */}
      {misses > 5 && <line x1="150" y1="115" x2="165" y2="145" stroke="black" />}           {/* leg R */}
      {misses > 6 && <line x1="130" y1="100" x2="120" y2="95" stroke="black" />}            {/* hand L */}
      {misses > 7 && <line x1="170" y1="100" x2="180" y2="95" stroke="black" />}            {/* hand R */}
      {misses > 8 && <line x1="135" y1="145" x2="125" y2="150" stroke="black" />}           {/* shoe L */}
      {misses > 9 && <line x1="165" y1="145" x2="175" y2="150" stroke="black" />}           {/* shoe R */}
    </svg>
  );
}

export default function App() {
  const [state, setState] = useState({
    mask: "",
    misses: 0,
    maxMisses: 10,
    won: false,
    lost: false,
    guessed: "",
  });

  const guessedSet = useMemo(() => new Set(state.guessed?.split("") ?? []), [state.guessed]);

  useEffect(() => {
    // Start a new game on first load
    NewGame().then(setState);
  }, []);

  async function handleGuess(ch) {
    const s = await Guess(ch);
    setState(s);
  }

  async function handleNew() {
    const s = await NewGame();
    setState(s);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, color: "#111" }}>
      <h1>Hangman</h1>

      <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
        <HangmanSVG misses={state.misses} />
        <div>
          <div style={{ fontSize: 28, letterSpacing: 3, marginBottom: 10 }}>
            {state.mask || "_ _ _ _ _"}
          </div>
          <div>Misses: {state.misses} / {state.maxMisses}</div>
          {state.won && <div style={{ color: "green", marginTop: 8 }}>🎉 You won!</div>}
          {state.lost && <div style={{ color: "crimson", marginTop: 8 }}>💀 You lost.</div>}

          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(13, 1fr)", gap: 8, maxWidth: 520 }}>
            {A2Z.map((ch) => {
              const disabled = guessedSet.has(ch) || state.won || state.lost;
              return (
                <button
                  key={ch}
                  disabled={disabled}
                  onClick={() => handleGuess(ch)}
                  style={{
                    padding: "8px 0",
                    borderRadius: 8,
                    border: "1px solid #bbb",
                    cursor: disabled ? "not-allowed" : "pointer",
                    background: disabled ? "#eee" : "white",
                  }}
                >
                  {ch}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 16 }}>
            <button onClick={handleNew} style={{ padding: "8px 14px", borderRadius: 8 }}>
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
