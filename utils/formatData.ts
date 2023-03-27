// utils/formatData.ts

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US").format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}
