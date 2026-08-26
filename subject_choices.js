let jump_url = "";
let dialog = undefined;
const index_url = new URL("index.html", window.location.href);
document.getElementById("generate").addEventListener("click", ()=>{
  const math = document.querySelector('input[name="0580"]:checked');
  const sci = document.querySelector('input[name="sci"]:checked');
  const fifth = document.querySelector('input[name="fifth"]:checked');
  if (!fifth){
    alert("You need to select a fifth subject!");
    return;
  }
  let hash_parts = ["4"];
  switch(sci.value){
    case "0653core":
      hash_parts.push("0653p136");
      break;
    case "0653ext":
      hash_parts.push("0653p246");
      break;
    case "0654":
      hash_parts.push("0654p246");
      break;
  }
  switch(fifth.value){
    case "0680":
      hash_parts.push("0680p12");
      break;
    case "0470":
      hash_parts.push("0470p124");
      break;
    case "0400":
      hash_parts.push("0400p2");
      break;
    case "0648":
      hash_parts.push("0648p123");
      break;
  }
  switch (math.value){
    case "core":
      hash_parts.push("0580p13");
      break;
    case "extended":
      hash_parts.push("0580p24");
      break;
  }
  hash_parts.push("0500p12");
  hash_parts.push("0457p2");
  jump_url = index_url + "#" + hash_parts.join("/");
  dialog = document.getElementById("link-dialog");
  document.getElementById("link-output").value = jump_url;
  dialog.showModal();
})
document.getElementById("copy").addEventListener("click", ()=>{
  navigator.clipboard.writeText(jump_url);
  alert("URL copied to clipboard");
})
document.getElementById("jump").addEventListener("click", ()=>{
  window.location.href = jump_url;
})
document.getElementById("close").addEventListener("click", ()=>{
  dialog.close();
})
