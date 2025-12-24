"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const EventSchedule = () => {
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
        events={[
          { title: "Business Leaders Summit", date: "2025-12-08" },
          { title: "Annual Community Gala", date: "2025-12-15" },
          { title: "Contemporary Art Showcase", date: "2025-12-22" },
          { title: "Winter Networking Mixer", date: "2025-12-30" },
        ]}
      />
    </section>
  );
};

export default EventSchedule;
