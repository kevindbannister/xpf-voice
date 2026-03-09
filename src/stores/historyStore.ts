export type HistoryItem = {
  id: string;
  transcript: string;
  aiOutput: string;
  timestamp: string;
};

export const historyStore: HistoryItem[] = [
  {
    id: "h1",
    transcript: "Draft a follow-up email for the Acme onboarding call.",
    aiOutput: "Follow-up email draft generated with action items and next steps.",
    timestamp: "2026-03-08 09:42",
  },
  {
    id: "h2",
    transcript: "Summarize product standup notes and blockers.",
    aiOutput: "Standup summary created with blockers grouped by owner.",
    timestamp: "2026-03-08 11:08",
  },
  {
    id: "h3",
    transcript: "Create release note bullets for version 2.4.",
    aiOutput: "Release highlights drafted in concise marketing tone.",
    timestamp: "2026-03-08 14:15",
  },
  {
    id: "h4",
    transcript: "Turn brainstorming points into a project proposal.",
    aiOutput: "Proposal outline generated with scope, milestones, and risks.",
    timestamp: "2026-03-08 16:03",
  },
];
