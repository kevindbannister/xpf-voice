import React, { useState } from 'react';
import DictionarySettings from '../components/settings/DictionarySettings';
import SnippetSettings from '../components/settings/SnippetSettings';
import HistorySettings from '../components/settings/HistorySettings';

type Section = 'General' | 'Voice' | 'Text' | 'Dictionary' | 'Snippets' | 'History';

export default function SettingsPage() {
  const [section, setSection] = useState<Section>('General');

  return (
    <div>
      <h2>Settings</h2>
      <nav>
        {(['General', 'Voice', 'Text', 'Dictionary', 'Snippets', 'History'] as Section[]).map((item) => (
          <button key={item} onClick={() => setSection(item)}>{item}</button>
        ))}
      </nav>

      {section === 'General' && <div>General settings</div>}
      {section === 'Voice' && <div>Voice settings</div>}
      {section === 'Text' && <div>Text settings</div>}
      {section === 'Dictionary' && <DictionarySettings />}
      {section === 'Snippets' && <SnippetSettings />}
      {section === 'History' && <HistorySettings />}
    </div>
  );
}
