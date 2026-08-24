const dates = [];
let countNumbers = [];
async function loadPapers() {
    const response = await fetch("papers.json");
    const papers = await response.json();

    displayPapers(papers);
}
function displayPapers(papers){
  let html = "";
  for (const subject in papers){
    let sub_obj = papers[subject];
    html += `<div class="subject" style="--h : ${sub_obj.color.hue}; --s : ${sub_obj.color.saturation}%;">\n`;
    html += `<h1>${subject}</h1>\n`;
    for (const paper in sub_obj.papers){
      let paper_dat = sub_obj.papers[paper];
      const date_str = formatDate(new Date(paper_dat.time))
      const paper_name = paper_dat.name === undefined ? `Paper ${paper}` : `Paper ${paper} (${paper_dat.name})`
      html += `<div class="paper" id="${sub_obj.code}p${paper}">
                    <div class="paper-details">
                        <div class="paper-name">${paper_name}</div>
                        <div class="paper-date">${date_str}</div>
                    </div>
                    <div class="countdown">
                        <div class="count-number">-</div>
                        <div class="count-label">days to go</div>
                    </div>
                </div>
`;
      dates.push(new Date(paper_dat.time));
    }
    html += "</div>\n";
  }
  console.log(`Generated HTML : \n ${html}`);
  document.getElementById("subjects").innerHTML = html;
  countNumbers = document.querySelectorAll(".count-number");
  updatePapers();
}
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
    countNumbers[id].textContent = daysLeft(dates[id]);
}
function updatePapers(){
    for (let i = 0; i < dates.length; i++){
        updatePaper(i);
  }
    console.log("Updated papers");
    setTimeout(updatePapers, 10*1000);
}
document.addEventListener("DOMContentLoaded", ()=> {
    loadPapers();
});
