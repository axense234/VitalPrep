const convertLocalToUTCWeekday = (localWeekday: number) => {
  const currentDate = new Date();
  const localSelectedWeekday = localWeekday;
  const utcWeekday =
    (localSelectedWeekday + currentDate.getTimezoneOffset() / 60 + 24) % 7;
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[utcWeekday];
};

export default convertLocalToUTCWeekday;
