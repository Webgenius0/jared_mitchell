import { timelineData as staticTimeline } from "@/Components/Data/data";

interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  points: string[];
}

interface WeeklyTimelineProps {
  title?: string;
  events?: TimelineEvent[];
}

const WeeklyTimeline = ({ title, events }: WeeklyTimelineProps) => {
  const data = {
    title: title || staticTimeline.title,
    events: events || staticTimeline.events,
  };

  return (
    <div className="bg-[#F5F5F7] custom_border rounded-2xl p-8 md:p-12 custom_shadow !space-y-8 container">
      <h2 className="section_title 2xl:!text-6xl text-center">
        {data.title}
      </h2>

      <div className="space-y-7 w-fit mx-auto">
        {data?.events.map(event => (
          <div
            key={event.id}
            className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6"
          >
            <div className="text-sm md:text-xl text-secondary-black">
              {event.time}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg md:text-2xl text-primary-black">
                {event.title}
              </h3>

              <ul className="space-y-3 list-disc list-inside text-secondary-black text-sm md:text-xl">
                {event.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTimeline;
