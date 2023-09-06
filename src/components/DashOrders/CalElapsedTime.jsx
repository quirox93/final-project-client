import { monthNames } from "./data";

function calculateElapsedTime(fromDate) {
  const currentDate = new Date();
  const initialDate = new Date(fromDate);
  const timeElapsed = currentDate - initialDate;

  const elapsedMinutes = Math.floor(timeElapsed / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMinutes / 60);

  const minutesRemaining = elapsedMinutes % 60;
  const daysPassed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const initialMonth = monthNames[initialDate.getMonth()];
  const elapsedHoursDays = Math.floor(elapsedHours - daysPassed * 24);
  const DayMonth = initialDate.getDate();
  const DayYear = initialDate.getFullYear();

  const LastOrder = () => {
    if (elapsedHours >= 24) {
      return `${daysPassed} D ${elapsedHoursDays} H ${minutesRemaining} M`;
    }
    if (elapsedHours >= 1 || elapsedHours < 24) {
      return `${elapsedHours} H ${minutesRemaining} M`;
    }
    return `${minutesRemaining} M`;
  };

  const dateFormat = (createdAt) => {
    return new Date(createdAt).toGMTString("en-US");
  };
  return {
    orderTime: LastOrder(),
    date: `${DayMonth} ${initialMonth} ${DayYear}`,
    dateFull: dateFormat(fromDate),
  };
}

const CalElapsedTime = ({ time, format }) => {
  const timeElapsed = calculateElapsedTime(time);
  return (
    <div className="bg-transparent p-0" key={time}>
      {timeElapsed[format]}
    </div>
  );
};

export default CalElapsedTime;
