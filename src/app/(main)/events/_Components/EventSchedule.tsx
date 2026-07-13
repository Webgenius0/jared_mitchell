"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CMSEventsPageVideo, CalendarEventItem } from "@/Types/cms";
import { getCalendarEvents } from "@/lib/Services/cms_service";

interface EventScheduleProps {
  video?: CMSEventsPageVideo;
}

const EventSchedule = ({ video }: EventScheduleProps) => {
  const [calendarEvents, setCalendarEvents] = useState<
    { title: string; date: string; url?: string }[]
  >([]);

  useEffect(() => {
    getCalendarEvents()
      .then(res => {
        const mapped = res.events.map((event: CalendarEventItem) => ({
          title: event.title,
          date: event.start_date.split("T")[0],
        }));
        setCalendarEvents(mapped);
      })
      .catch(console.error);
  }, []);

  const handleDateClick = (arg: any) => {
    alert("Date clicked: " + arg.dateStr);
  };

  return (
    <section className="py-20 container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Upcoming Events
      </h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          right: "prev,next",
        }}
        height="auto"
        fixedWeekCount={false}
        dayMaxEventRows={1}
        dateClick={handleDateClick}
        events={calendarEvents}
      />
    </section>
  );
};

export default EventSchedule;
