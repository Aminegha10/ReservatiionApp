import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const MyCustomCalendar = () => {
  const events = [
    {
      title: "Event 1",
      start: "2024-11-26T22:00:00", // Tuesday at 22:00
      end: "2024-11-26T23:00:00", // Ends at 23:00
    },
    {
      title: "Event 2",
      start: "2024-11-27T18:00:00", // Wednesday at 18:00
      end: "2024-11-27T19:30:00", // Ends at 19:30
    },
  ];

  return (
    <div className="bg-white h-screen w-full">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek" // Shows one week with time slots
        events={events} // Events to display
        slotMinTime="06:00:00" // Start time of slots (6 AM)
        slotMaxTime="24:00:00" // End time of slots (midnight)
        allDaySlot={false} // Hides the "All Day" slot
        hiddenDays={[0, 6]} // Hide Sunday (0) and Saturday (6)
        nowIndicator={true} // Show current time indicator
        headerToolbar={false} // Hides navigation and headers
        dayHeaderContent={(
          info // Customize day headers
        ) => info.date.toLocaleDateString("en-US", { weekday: "long" })}
      />
    </div>
  );
};

export default MyCustomCalendar;

