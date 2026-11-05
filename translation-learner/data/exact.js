// Meanings a close word cannot stand in for. The meaning network puts
// "dinner" next to lunch and "train" near bus, but each names a different
// thing, so a close word for one of these is shown as close and earns no
// credit: it scores like any other wrong word. Close words for people,
// actions and descriptions ("boy" for child, "consume" for eat) keep their
// partial credit. check.js fails if an id here is not in the matrix.
window.TL_EXACT = [
  // Things
  "book", "cat", "water", "tea", "coffee", "sushi", "rice", "lunch", "bill", "head", "car", "ship", "table", "train", "bus",
  // Places
  "station", "toilet", "hotel", "school", "restaurant",
  // Names and places
  "tanaka", "minjun", "anna", "ravi", "sami", "wang-ming", "tokyo", "moscow", "cairo", "beijing", "egypt",
  // Languages
  "english", "korean", "chinese", "arabic", "hindi", "klingon",
  // Days and times of day
  "today", "yesterday", "monday", "morning",
];
