const WEEKS = [
  [0, 0, 0, 0, 0, 0, 1], [2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22], [23, 24, 25, 26, 27, 28, 29], [30, 31, 0, 0, 0, 0, 0]
];
const TODAY = 21;
const LONG_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SHORT_DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const CALENDARS = [
  { id: "us", name: "United States", kicker: "Government · Washington", native: "Gregorian 2026", marks: { 4: "Coast Guard Day", 26: "Women's Equality Day" } },
  { id: "cn", name: "China", kicker: "Government · Beijing", native: "Bingwu, 7th moon", marks: { 1: "Army Day", 19: "Qixi Festival" } },
  { id: "ru", name: "Russia", kicker: "Government · Moscow", native: "Gregorian 2026", marks: { 22: "State Flag Day", 27: "Day of Cinema" } },
  { id: "jud", name: "Judaism", kicker: "Faith · Hebrew", native: "Av–Elul 5786", marks: { 14: "Rosh Chodesh Elul", 21: "Erev Shabbat" }, today: { title: "Erev Shabbat", date: "8 Elul 5786 · begins at sundown", body: "The eve of the Sabbath, and the eighth day of Elul — the month of preparation before the High Holy Days. Candles are lit eighteen minutes before sunset.", italic: "Elul is read as an acronym for “I am my beloved’s and my beloved is mine.”" } },
  { id: "chr", name: "Christianity", kicker: "Faith · Liturgical", native: "Ordinary Time", marks: { 6: "Transfiguration", 15: "Assumption" } },
  { id: "isl", name: "Islam", kicker: "Faith · Hijri", native: "Safar–Rabiʿ I 1448", marks: { 24: "Rabiʿ al-Awwal begins" } },
  { id: "hin", name: "Hinduism", kicker: "Faith · Panchang", native: "Bhadrapada 1948", marks: { 28: "Raksha Bandhan" } },
  { id: "bud", name: "Buddhism", kicker: "Faith · Uposatha", native: "B.E. 2570", marks: { 13: "New-moon Uposatha", 28: "Full-moon Uposatha" } }
];

let view = "landing";
const app = document.querySelector("#app");

function go(nextView) {
  view = nextView;
  render();
}

function cell(day, calendar, withLabel = false) {
  if (!day) return '<div class="daycell blank" aria-hidden="true"></div>';
  const label = calendar.marks[day];
  const marked = Boolean(label);
  const state = day === TODAY && marked ? "today" : marked ? "marked" : "";
  const labelMarkup = withLabel && label ? `<div class="detail-label">${label}</div>` : "";
  return `<button class="daycell ${state}" ${marked ? `aria-label="${day} August: ${label}"` : 'tabindex="-1"'} ${marked ? `data-view="${calendar.id}"` : "disabled"}>${day}${labelMarkup}</button>`;
}

function calendarCard(calendar, faith = false) {
  const days = WEEKS.flat().map(day => cell(day, calendar)).join("");
  const weekdays = (faith ? SHORT_DAYS : LONG_DAYS).map(day => `<span>${day}</span>`).join("");
  const listed = Object.entries(calendar.marks).map(([day, label]) => `<div class="obs-row ${Number(day) === TODAY ? "today" : ""}"><span class="obs-day">${day}</span><span class="obs-label">${label}</span></div>`).join("");
  return `<article class="calendar-card glass ${faith ? "faith-card" : "state-card"}"
    aria-label="${calendar.name} calendar"><div class="card-meta"><div class="card-kicker">${calendar.kicker}</div>${faith ? "" : `<div class="native">${calendar.native}</div>`}</div><div class="card-title">${calendar.name}</div>${faith ? `<div class="native">${calendar.native}</div>` : ""}<div class="weekdays">${weekdays}</div><div class="day-grid">${days}</div><div class="observances">${listed}</div></article>`;
}

function navbar() {
  return `<nav class="navbar glass" aria-label="Calendars">${CALENDARS.map(calendar => `<button class="navbtn ${calendar.id === view ? "active" : ""}" data-view="${calendar.id}" aria-current="${calendar.id === view ? "page" : "false"}">${calendar.name}</button>`).join("")}</nav>`;
}

function detail(calendar) {
  const days = WEEKS.flat().map(day => cell(day, calendar, true)).join("");
  const weekdays = LONG_DAYS.map(day => `<span>${day}</span>`).join("");
  const today = calendar.today || { title: calendar.marks[TODAY] || "No observance today", date: `21 August 2026 · ${calendar.native}`, body: "Nothing is marked on today’s date in this calendar. The observances listed for the month are shown at right; select any highlighted day in the grid to read it.", italic: "" };
  const list = Object.entries(calendar.marks).map(([day, label]) => `<div class="also-row"><span class="also-day">${day}</span><span>${label}</span></div>`).join("");
  return `<section class="detail"><div class="detail-panel glass"><div class="detail-heading"><div class="detail-title">${calendar.name}</div><div class="detail-native">${calendar.native}</div></div><div class="month-label">August 2026</div><div class="weekdays">${weekdays}</div><div class="detail-grid">${days}</div></div><aside class="detail-panel side-panel glass"><div class="today-kicker">Today</div><div class="today-title">${today.title}</div><div class="today-date">${today.date}</div><div class="today-body">${today.body}</div>${today.italic ? `<div class="today-italic">${today.italic}</div>` : ""}<div class="also-title">Also this month</div><div class="also-list">${list}</div><button class="btn btn-secondary home-btn" data-view="landing">All eight calendars</button></aside></section>`;
}

function render() {
  const calendar = CALENDARS.find(item => item.id === view);
  app.innerHTML = `<div class="app"><header class="masthead"><button class="brand" data-view="landing">Eight Calendars</button><div class="dateline">Friday, 21 August 2026 &nbsp;·&nbsp; Observance Desk</div></header>${navbar()}${calendar ? detail(calendar) : `<section class="landing"><div class="card-row states-row">${CALENDARS.slice(0, 3).map(item => calendarCard(item)).join("")}</div><div class="card-row faith-row">${CALENDARS.slice(3).map(item => calendarCard(item, true)).join("")}</div></section>`}</div>`;
}

app.addEventListener("click", event => {
  const target = event.target.closest("[data-view]");
  if (target) go(target.dataset.view);
});

render();
