export const formatTime = (hour) => {
  if (typeof hour === "number") {
    // Convert hour into 12-hour format
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    // Determine AM or PM
    const period = hour >= 12 ? "PM" : "AM";
    // Pad with leading zero for single-digit hours and return in HH:00 AM/PM format
    return `${String(formattedHour).padStart(2, "0")}:00 ${period}`;
  }
  return "";
};
