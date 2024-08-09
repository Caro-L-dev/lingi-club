import moment from "moment";
import React, { useState } from "react";
import { Calendar, Event, momentLocalizer, SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setEvents([
      ...events,
      {
        start: new Date(start),
        end: new Date(end),
      },
    ]);
  };

  const handleSelectEvent = (event: Event) => {
    if (window.confirm("Voulez-vous supprimer cet événement?")) {
      setEvents(events.filter((evt) => evt !== event));
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        defaultView="month"
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default MyCalendar;
