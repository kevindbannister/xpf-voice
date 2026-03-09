export type HistoryItem = {
  id: string;
  transcript: string;
  timestamp: string;
};

export const historyStore: HistoryItem[] = [
  {
    id: "h1",
    transcript: "Audio is silent.",
    timestamp: "12:47 PM",
  },
  {
    id: "h2",
    transcript: "Audio is silent.",
    timestamp: "12:47 PM",
  },
  {
    id: "h3",
    transcript:
      "Based on this, should these employees be adjusting their claim to essentially just reflect the holiday they've accrued...",
    timestamp: "12:45 PM",
  },
  {
    id: "h4",
    transcript:
      "Could you just double check with Sinead that she hasn't had any letters from the Insolvency service...",
    timestamp: "12:31 PM",
  },
];
