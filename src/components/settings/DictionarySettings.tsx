import React, { useState } from 'react';

type DictionaryEntry = {
  trigger: string;
  replacement: string;
};

export default function DictionarySettings() {
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [trigger, setTrigger] = useState('');
  const [replacement, setReplacement] = useState('');

  const addEntry = () => {
    if (!trigger.trim()) return;
    setEntries((prev) => [...prev.filter((e) => e.trigger !== trigger.trim()), { trigger: trigger.trim(), replacement }]);
    setTrigger('');
    setReplacement('');
  };

  const removeEntry = (value: string) => {
    setEntries((prev) => prev.filter((entry) => entry.trigger !== value));
  };

  return (
    <div>
      <h3>Dictionary</h3>
      <table>
        <thead>
          <tr>
            <th>Trigger</th>
            <th>Replacement</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.trigger}>
              <td>{entry.trigger}</td>
              <td>{entry.replacement}</td>
              <td><button onClick={() => removeEntry(entry.trigger)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <input value={trigger} onChange={(e) => setTrigger(e.target.value)} placeholder="Trigger" />
      <input value={replacement} onChange={(e) => setReplacement(e.target.value)} placeholder="Replacement" />
      <button onClick={addEntry}>+ Add Dictionary Entry</button>
    </div>
  );
}
