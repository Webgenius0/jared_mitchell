import React from "react";
import { Check } from "lucide-react";

type Tag = {
  label: string;
  position: number;
};

type Question = {
  title: string;
  tags: Tag[];
};

const QUESTIONS: Question[] = [
  {
    title: "Did the contestant successfully complete this challenge?",
    tags: [
      { label: "Prepration", position: 1 },
      { label: "Execution", position: 4 },
      { label: "Result", position: 6 },
      { label: "Overall performance", position: 9 },
    ],
  },
  {
    title: "Did this feel genuine?",
    tags: [
      { label: "Honest", position: 1 },
      { label: "Personal", position: 4 },
      { label: "Passionate", position: 6 },
      { label: "Real", position: 9 },
    ],
  },
  {
    title: "How unique or memorable was their approach?",
    tags: [
      { label: "Orginal", position: 1 },
      { label: "Intersting", position: 4 },
      { label: "Innovative", position: 6 },
      { label: "Engaging", position: 9 },
    ],
  },
  {
    title: "How unique or memorable was their approach?",
    tags: [
      { label: "Did the pitch convince you?", position: 1 },
      { label: "Did the community project inspire you?", position: 4 },
      { label: "Did the fundraiser make a difference?", position: 6 },
      { label: "Did the business impress you?", position: 9 },
    ],
  },
  {
    title: '"Overall, how well did this contestant perform in this challenge?"',
    tags: [{ label: "How It Applies", position: 1 }],
  },
];

const SCALE = Array.from({ length: 10 }, (_, i) => i + 1);

const RatingRow = ({ question }: { question: Question }) => {
  const tagByPosition = new Map(question.tags.map(t => [t.position, t]));

  return (
    <div className="border border-gray-200 rounded-xl px-6 pt-5 pb-4 ">
      <h3 className="text-base font-medium text-gray-900 mb-5">
        {question.title}
      </h3>

      {/* Scale row */}
      <div className="relative">
        <div className="grid grid-cols-10">
          {SCALE.map(n => (
            <div key={n} className="flex flex-col items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-gray-300" />
              <span className="text-sm text-gray-400">{n}</span>
            </div>
          ))}
        </div>
        <div className="h-px bg-gray-200 mt-3" />
      </div>

      {/* Tags row */}
      <div className="grid grid-cols-10 mt-3">
        {SCALE.map(n => {
          const tag = tagByPosition.get(n);
          if (!tag) return <div key={n} />;
          return (
            <div
              key={n}
              className="col-span-1 flex items-start gap-1.5 pr-2 -ml-1"
            >
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
              </span>
              <span className="text-sm  text-gray-700">{tag.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RoundStep = () => {
  return (
    <div className="py-10 px-4">
      <div className="container  mx-auto flex flex-col gap-6">
        {QUESTIONS.map((q, i) => (
          <RatingRow key={i} question={q} />
        ))}
      </div>
    </div>
  );
};

export default RoundStep;
