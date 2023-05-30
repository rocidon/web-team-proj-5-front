export default function convertTime(milisecond) {
  const day = new Date(Number(milisecond)).toLocaleDateString("ko-KR");
  const time = new Date(Number(milisecond)).toLocaleTimeString();
  return day + time;
}
