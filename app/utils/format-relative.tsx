export function formatRelative(date: Date) {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.floor(
    (now.getTime() - new Date(date).getTime()) / msPerDay
  );

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "1 day ago";
  } else if (diffInDays > 1) {
    return `${diffInDays} days ago`;
  } else {
    // date is in the future
    return "Today";
  }
}
