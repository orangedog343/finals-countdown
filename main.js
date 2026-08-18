const old_papers = {
    "0653p2" : new Date("2026-03-02T09:00:00+05:30"),
    "0653p4" : new Date("2026-03-02T10:45:00+05:30"),
    "0653p6" : new Date("2026-03-03T09:00:00+05:30"),
    "0580p2" : new Date("2026-03-06T09:00:00+05:30"),
    "0580p4" : new Date("2026-03-07T10:00:00+05:30"),
    "fifth"  : new Date("2026-03-04T09:00:00+05:30"),
    "kanp1"  : new Date("2026-03-05T09:00:00+05:30"),
    "kanp2"  : new Date("2026-03-05T10:30:00+05:30"),
}
const papers = {
  "0500p1" : new Date("2026-09-25T09:00:00+05:30"),
  "0580p2" : new Date("2026-09-28T09:00:00+05:30"),
  "0580p4" : new Date("2026-09-29T09:00:00+05:30"),
  "0680p1" : new Date("2026-09-30T09:00:00+05:30"),
  "0680p2" : new Date("2026-10-01T09:00:00+05:30"),
  "0654p2" : new Date("2026-10-05T09:00:00+05:30"),
  "0654p4" : new Date("2026-10-05T10:30:00+05:30"),
  "0654p6" : new Date("2026-10-06T09:00:00+05:30"),
  "0457p2" : new Date("2026-10-07T09:00:00+05:30"),
  "0500p2" : new Date("2026-10-07T13:00:00+05:30"),
  "0470p1" : new Date("2026-09-30T09:00:00+05:30"),
  "0470p2" : new Date("2026-10-01T09:00:00+05:30"),
  "0470p4" : new Date("2026-10-08T09:00:00+05:30"),
}

const paperIDs = {}
function formatDate(date){
    const day = date.getDate();
    const weekday = date.toLocaleDateString("en-GB", {weekday : "short"});
    const month = date.toLocaleDateString("en-GB",   {month : "long"});
    // why can't english just use the same suffex for all numbers and why do the teens have to be so different :(
    let suffix = "th";
    if (day % 10 == 1 && day != 11) suffix = "st";
    if (day % 10 == 2 && day != 12) suffix = "nd";
    if (day % 10 == 3 && day != 13) suffix = "rd";
    let hours = date.getHours();
    const apm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    if (hours == 0) hours = 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${weekday}, ${day}${suffix} ${month} at ${hours}:${minutes}${apm}`;
}
function daysLeft(date){
    const now = new Date();
    let diffMs = date - now;
    if (diffMs <= 0) return "-";
    return Math.floor(diffMs / (24 * 60 * 60 * 1000));
}
function updatePaper(id){
    paperIDs[id].textContent = daysLeft(papers[id]);
}
function updatePapers(){
    Object.keys(papers).forEach(key => {
        updatePaper(key);
    })
    console.log("Updated papers");
    setTimeout(updatePapers, 10*1000);
}
document.addEventListener("DOMContentLoaded", ()=> {
    Object.keys(papers).forEach(key => {
        const paper_div = document.getElementById(key);
        paperIDs[key] = paper_div.querySelector(".count-number");
        paper_div.querySelector(".paper-date").textContent = formatDate(papers[key])
        console.log(formatDate(papers[key]));
    });
    updatePapers();
});
