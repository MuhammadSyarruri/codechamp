// Fungsi untuk memformat waktu menjadi string MM:SS
export function formatToString(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Fungsi untuk mengonversi string MM:SS menjadi detik
export function formatToSeconds(timeString) {
  if (typeof timeString === "number") return timeString;
  if (!timeString || timeString === Infinity) return Infinity;
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
}
