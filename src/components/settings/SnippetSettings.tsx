import React, { useState } from 'react';

type Snippet = {
  trigger: string;
  output: string;
};

export default function SnippetSettings() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [trigger, setTrigger] = useState('');
  const [output, setOutput] = useState('');

  const addSnippet = () => {
    if (!trigger.trim()) return;
    setSnippets((prev) => [...prev.filter((s) => s.trigger !== trigger.trim()), { trigger: trigger.trim(), output }]);
    setTrigger('');
    setOutput('');
  };

  const removeSnippet = (value: string) => {
    setSnippets((prev) => prev.filter((snippet) => snippet.trigger !== value));
  };

  return (
    <div>
      <h3>Snippets</h3>
      <table>
        <thead>
          <tr>
            <th>Trigger</th>
            <th>Output</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {snippets.map((snippet) => (
            <tr key={snippet.trigger}>
              <td>{snippet.trigger}</td>
              <td>{snippet.output}</td>
              <td><button onClick={() => removeSnippet(snippet.trigger)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <input value={trigger} onChange={(e) => setTrigger(e.target.value)} placeholder="Trigger" />
      <input value={output} onChange={(e) => setOutput(e.target.value)} placeholder="Output" />
      <button onClick={addSnippet}>+ Add Snippet</button>
    </div>
  );
}
