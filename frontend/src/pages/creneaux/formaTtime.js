export function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  // Determine whether it's AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const hoursIn12HrFormat = hours % 12 || 12;
  
  return `${String(hoursIn12HrFormat).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
}
