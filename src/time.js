export default function convertTime(milisecond) {
  // Created by jungjaeseung
  // timestamp(milisecond)를 보기 좋게 바꿔주는 함수.
  // DB에서 Int 자리수 제한 때문에 문자형으로 저장해 줄 수 밖에 없는데,
  // Number()함수를 통해 number형으로 바꿈.
  // new Date(param)에서 param에 숫자(milisecond)를 넣으면 날짜 형식으로 바꿔줌
  // 하지만 그러면 못생기게 나와서? .toDateString()과 .toTimeString()사용해서 이쁘게 나오게 함
  // 위 두 함수는 미국 표준으로 나와서, toLocaleSDateString()과 toLocaleTimeString()으로 사용. <- 현재 접속한 위치, 한국 표준시로 출력
  // 두 문자열을 +해주어 return 해주는 함수
  const day = new Date(Number(milisecond)).toLocaleDateString();
  const time = new Date(Number(milisecond)).toLocaleTimeString();
  return day + time;
}
