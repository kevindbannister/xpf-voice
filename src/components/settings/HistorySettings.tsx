import React, { useState } from 'react';

type HistoryEntry = {
  id: string;
  createdAt: string;
  route: string;
  rawTranscript: string;
  finalText: string;
};

export default function HistorySettings() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const clearHistory = () => setHistory([]);

  return (
    <div>
      <h3>History</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Route</th>
            <th>Transcript</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {history.slice(0, 50).map((entry) => (
            <tr key={entry.id}>
              <td>{entry.createdAt}</td>
              <td>{entry.route}</td>
              <td>{entry.rawTranscript}</td>
              <td>{entry.finalText}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={clearHistory}>Clear History</button>
    </div>
  );
}
