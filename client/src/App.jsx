import { useState } from "react";

export default function App() {
  const [medicine, setMedicine] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicine }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error);
    } catch {
      setAnswer("Server se connect nahi hua");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", fontFamily: "sans-serif" }}>
      <h2>Medicine Helper</h2>
      <input
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
        placeholder="Medicine ka naam"
        style={{ padding: 8, width: "70%" }}
      />
      <button onClick={ask} disabled={loading || !medicine} style={{ padding: 8 }}>
        {loading ? "Soch raha hai..." : "Pucho"}
      </button>
      <p style={{ whiteSpace: "pre-wrap", direction: "rtl" }}>{answer}</p>
    </div>
  );
}