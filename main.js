const dates = [];
let countNumbers = [];
async function loadPapers() {
    const response = await fetch("papers.json");
    const papers = await response.json();
    displayPapers(filter_papers(papers));
}
function filter_papers(papers){
  // only keeps the ones in the url
  const taken_subs = [];
  const taken_papers = {};
  const hash = window.location.hash
  const hash_parts = hash.slice(1).split("/");
  const zone = hash_parts[0];
 console.log(hash_parts);
 hash_parts.shift();
  console.log(hash_parts);
  if (zone != "4"){
    throw new Error("Zone has to be 4");
  }
  console.log(`zone : ${zone}`);
  for (const hash_part of hash_parts){
    const [code, papers] = hash_part.split("p");
    taken_subs.push(code);
    taken_papers[code] = [];
    for (const paper of papers){
      paper_name = `${code}p${paper}`;
      console.log(paper_name);
      taken_papers[code].push(paper);
    } 
  }
  code_nameref = {};
  paper_ref = {};
  for (const subject in papers){
    let sub_obj = papers[subject];
    code_nameref[sub_obj.code] = [subject, sub_obj];
    paper_ref[sub_obj.code] = {};
    for (const paper in sub_obj.papers){
      paper_dat = sub_obj.papers;
      paper_ref[sub_obj.code][paper] = papers[subject].papers[paper];
    }
  }
  const new_papers = {};
  for (const subject of taken_subs){
    if (!(subject in code_nameref)){
      document.write(`<h1> ERROR : SUBJECT ${subject} DOES NOT EXIST IN TIMETABLE.</h1>`);
    }
    const [sub_name, sub_ref] = code_nameref[subject];
    new_papers[sub_name] = sub_ref;
    new_papers[sub_name].papers = {};
    const new_codes_papers = new_papers[sub_name].papers;
    for (const paper of taken_papers[subject]){
      console.log(`adding paper ${paper}`)
      if (!(paper in paper_ref[subject])){
        document.write(`<h1> ERROR : PAPER ${subject}p${paper} DOES NOT EXIST IN TIMETABLE.</h1>`)
      }
      new_codes_papers[`p${paper}`] = paper_ref[subject][paper];
    }

  } 
  console.log(new_papers);
  return new_papers;
}
function displayPapers(papers){
  let html = "";
  for (const subject in papers){
    let sub_obj = papers[subject];
    //if (!taken_subs.includes(sub_obj.code)) continue;
    html += `<div class="subject" style="--h : ${sub_obj.color.hue}; --s : ${sub_obj.color.saturation}%;">\n`;
    html += `<h1>${subject}</h1>\n`;
    for (let paper in sub_obj.papers){
      let paper_dat = sub_obj.papers[paper];
      //if (!taken_papers.includes(`${sub_obj.code}p${paper}`)) continue;
      const date_str = formatDate(new Date(paper_dat.time))
      paper = paper.slice(1);
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
window.addEventListener("hashchange", ()=> {
  window.location.reload();
});
