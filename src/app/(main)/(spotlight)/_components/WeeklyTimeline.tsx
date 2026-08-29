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
  // No timeline content — show an empty state instead of fabricated events.
  if (!events || events.length === 0) {
    return (
      <div className="bg-[#F5F5F7] custom_border p-8 md:p-12 custom_shadow !space-y-8 container">
        <h2 className="section_title 2xl:!text-6xl text-center">
          {title || "Weekly Timeline"}
        </h2>
        <p className="text-center text-secondary-black text-lg md:text-xl">
          No timeline information available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F7] custom_border rounded-2xl p-8 md:p-12 custom_shadow !space-y-8 container">
      {title && (
        <h2 className="section_title 2xl:!text-6xl text-center">{title}</h2>
      )}

      <div className="space-y-7 w-fit mx-auto">
        {events.map(event => (
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
