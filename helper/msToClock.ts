// ✅ You can use a Quick one-liner hack
const ms = 54000000;
console.log(new Date(ms).toISOString().slice(11, 19)); // 👉️ 15:00:00

// ✅ Or create a reusable function
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export default function msToClock(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}
