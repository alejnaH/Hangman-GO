import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { NewGame, Guess } from "../wailsjs/go/main/App.js";

const A2Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function HangmanSVG({ misses }) {
  return (
    <svg width="220" height="240" style={{ display: "block" }}>
      <line x1="10" y1="230" x2="210" y2="230" stroke="black" />
      <line x1="50" y1="230" x2="50" y2="20" stroke="black" />
      <line x1="50" y1="20" x2="150" y2="20" stroke="black" />
      <line x1="150" y1="20" x2="150" y2="40" stroke="black" />
      {misses > 0 && <circle cx="150" cy="60" r="15" stroke="black" fill="none" />}        
      {misses > 1 && <line x1="150" y1="75" x2="150" y2="115" stroke="black" />}            
      {misses > 2 && <line x1="150" y1="85" x2="130" y2="100" stroke="black" />}            
      {misses > 3 && <line x1="150" y1="85" x2="170" y2="100" stroke="black" />}            
      {misses > 4 && <line x1="150" y1="115" x2="135" y2="145" stroke="black" />}           
      {misses > 5 && <line x1="150" y1="115" x2="165" y2="145" stroke="black" />}           
      {misses > 6 && <line x1="130" y1="100" x2="120" y2="95" stroke="black" />}            
      {misses > 7 && <line x1="170" y1="100" x2="180" y2="95" stroke="black" />}            
      {misses > 8 && <line x1="135" y1="145" x2="125" y2="150" stroke="black" />}           
      {misses > 9 && <line x1="165" y1="145" x2="175" y2="150" stroke="black" />}           
    </svg>
  );
}

export default function App() {
  const [started, setStarted] = useState(false); 

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
    if (started) {
      NewGame().then(setState);
    }
  }, [started]);

  async function handleGuess(ch) {
    const s = await Guess(ch);
    setState(s);
  }

  async function handleNew() {
    const s = await NewGame();
    setState(s);
  }

  if (!started) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "linear-gradient(135deg, #e9ed6cff, #dee13cff)",
          color: "#222222ff",
          textAlign: "center",
        }}
      >
        <img 
        src="/hangman_logo.jpg" 
        alt="Hangman Logo" 
        style={{ width: 200, marginBottom: 20 }} 
      />
        <h1 style={{ fontSize: "64px", marginBottom: "20px" }}>Welcome to Hangman</h1>
        <button
          onClick={() => setStarted(true)}
          style={{
            fontSize: "24px",
            padding: "12px 30px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#757d00ff",
            color: "white",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
        >
          Start playing!
        </button>
      </div>
    );
  }

  return (
  <div
    style={{
      fontFamily: "system-ui, sans-serif",
      padding: 24,
      color: "#222222ff",
      background: "linear-gradient(135deg, #e9ed6cff, #dee13cff)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <h1 style={{ fontSize: "64px", marginBottom: "20px" }}>Hangman</h1>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      <HangmanSVG misses={state.misses} />

      <div
        style={{
          fontSize: 28,
          letterSpacing: 4,
          marginBottom: 16,
          padding: "8px 16px",
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: 12,
          border: "2px solid #bbb",
          minWidth: "240px",
        }}
      >
        {state.mask || "_ _ _ _ _"}
      </div>

      <div style={{ fontSize: 18, marginBottom: 16 }}>
        Misses: <strong>{state.misses}</strong> / {state.maxMisses}
      </div>

      {state.won && (
        <div style={{ color: "green", marginBottom: 12, fontSize: 20 }}> you won </div>
      )}
      {state.lost && (
        <div style={{ color: "crimson", marginBottom: 12, fontSize: 20 }}> you lost </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(13, 1fr)",
          gap: 10,
          maxWidth: 700,
        }}
      >
        {A2Z.map((ch) => {
          const disabled = guessedSet.has(ch) || state.won || state.lost;
          return (
            <button
              key={ch}
              disabled={disabled}
              onClick={() => handleGuess(ch)}
              style={{
                padding: "12px 0",
                borderRadius: 12,
                border: "2px solid #777",
                cursor: disabled ? "not-allowed" : "pointer",
                background: disabled ? "#eee" : "#fff",
                fontWeight: "bold",
                fontSize: "18px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => !disabled && (e.target.style.transform = "scale(1.2)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
            >
              {ch}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 20 }}>
        <button
          onClick={handleNew}
          style={{
            padding: "12px 24px",
            borderRadius: 12,
            border: "none",
            backgroundColor: "#757d00ff",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
        >
          New Game
        </button>

        <button
          onClick={() => setStarted(false)}
          style={{
            padding: "12px 24px",
            borderRadius: 12,
            border: "none",
            backgroundColor: "#f6f6f6ff",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
        >
          Exit
        </button>
      </div>
    </div>
  </div>
);

}
