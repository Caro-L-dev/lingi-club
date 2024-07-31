import moment from "moment";
import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css"; // Assurez-vous d'importer le fichier CSS personnalisé

const localizer = momentLocalizer(moment);

type Event = {
  start: Date;
  end: Date;
  title: string;
};

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([
        ...events,
        {
          start: new Date(start),
          end: new Date(end),
          title,
        },
      ]);
    }
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
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
