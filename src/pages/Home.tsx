import React from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { historyStore } from "../stores/historyStore";

const badges = ["🔥 2 weeks", "🚀 1,169 words", "👍 89 WPM"];

export default function Home() {
  return (
    <div className="page-frame">
      <div className="welcome-row">
        <h1>Welcome back, Kev</h1>
        <div className="stats">
          {badges.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <section className="hero">
        <h2>Make Flow sound like you</h2>
        <p>
          Flow adapts to how you write in different apps. Personalize your style for messages, work chats, emails,
          and other apps so every word sounds like you.
        </p>
        <Button>Start now</Button>
      </section>

      <h3 className="section-title">Your transcription history</h3>
      <Card className="feed-card">
        {historyStore.map((item) => (
          <div className="feed-row" key={item.id}>
            <strong>{item.timestamp}</strong>
            <span>{item.transcript}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
