// Output 12 Maret 2024
export const convertDate = (date: string) => {
  const newDate = new Date(date);

  const monthIndonesia = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  return `${newDate.getDay()} ${monthIndonesia[newDate.getMonth()]} ${newDate.getFullYear()}`;
};
