const anime = [
  {id:"aot",title:"Attack on Titan",subtitle:"The Final Season",genre:"Action • Dark Fantasy",rating:"9.4",cover:"assets/covers/attack-on-titan.jpeg",episodes:0,description:"A titan-sized placeholder entry. Add licensed episodes later from the Developer Panel."},
  {id:"bleach",title:"Bleach",subtitle:"Thousand-Year Blood War",genre:"Action • Supernatural",rating:"9.1",cover:"assets/covers/bleach.jpeg",episodes:0,description:"A Bleach entry prepared for future episode metadata and licensed video sources."},
  {id:"lom",title:"Lord of Mysteries",subtitle:"Mystery • Fantasy",genre:"Mystery • Fantasy",rating:"9.0",cover:"assets/covers/lord-of-mysteries.jpeg",episodes:0,description:"A mystery-fantasy entry ready for ASTHRo episode management."},
  {id:"rezero",title:"Re:Zero",subtitle:"Starting Life in Another World",genre:"Fantasy • Isekai",rating:"8.9",cover:"assets/covers/rezero.jpeg",episodes:0,description:"A Re:Zero entry ready for future episode metadata."},
  {id:"mushoku",title:"Mushoku Tensei",subtitle:"Jobless Reincarnation",genre:"Fantasy • Isekai",rating:"8.8",cover:"assets/covers/mushoku-tensei.jpeg",episodes:0,description:"A prepared anime card for future licensed episode uploads."},
  {id:"witch",title:"Witch Hat Atelier",subtitle:"Atelier",genre:"Fantasy • Adventure",rating:"8.7",cover:"assets/covers/witch-hat-atelier.jpeg",episodes:0,description:"A magical-world entry ready for the ASTHRo catalog."},
  {id:"chainsaw",title:"Chainsaw Man",subtitle:"Reze Arc",genre:"Action • Horror",rating:"9.0",cover:"assets/covers/chainsaw-man-reze-arc.jpeg",episodes:0,description:"Reze Arc entry prepared for future licensed content."},
  {id:"eminence",title:"The Eminence in Shadow",subtitle:"Season",genre:"Action • Fantasy",rating:"8.6",cover:"assets/covers/eminence-in-shadow.jpeg",episodes:0,description:"An ASTHRo catalog entry ready for episodes."}
];

const chapters = {
  1:"The room was quiet. Outside, the city carried on as if nothing had changed.\n\nI stared at the same sentence for the fifth time. Some thoughts refuse to become words. Others become words before you can stop them.\n\nMaybe that was the real beginning of re:think.",
  2:"There are moments when a memory feels more real than the room around you.\n\nI wrote down three questions. Then I crossed out the first two. The third remained:\n\nWhat if the answer was never supposed to be found?",
  3:"Night arrived without permission. The screen glowed against the dark, and the unfinished page waited.\n\nThis time I did not ask what happened next.\n\nI asked why I wanted to know."
};

let currentChapter = 1;

function renderAnime(list=anime){
  const grid=document.getElementById("animeGrid");
  grid.innerHTML=list.map(a=>`
    <article class="anime-card" onclick="openAnime('${a.id}')">
      <div class="anime-poster">
        <img src="${a.cover}" alt="${a.title}" loading="lazy">
        <span class="status">${a.episodes ? a.episodes+" EPS" : "READY"}</span>
      </div>
      <div class="anime-info">
        <h3>${a.title}</h3>
        <p>${a.genre}</p>
        <div class="rating">★ ${a.rating}</div>
      </div>
    </article>`).join("");
  document.getElementById("animeCount").textContent=list.length;
}

function renderTrending(){
  const row=document.getElementById("trendingRow");
  row.innerHTML=anime.slice(0,4).map((a,i)=>`
    <article class="trend-card" onclick="openAnime('${a.id}')">
      <img src="${a.cover}" alt="${a.title}" loading="lazy">
      <div class="trend-copy"><span>#0${i+1} TRENDING</span><h3>${a.title}</h3></div>
    </article>`).join("");
}

function openAnime(id){
  const a=anime.find(x=>x.id===id); if(!a)return;
  document.getElementById("modalImage").src=a.cover;
  document.getElementById("modalTitle").textContent=a.title;
  document.getElementById("modalMeta").textContent=`${a.subtitle} · ★ ${a.rating}`;
  document.getElementById("modalDescription").textContent=a.description;
  const eps=a.episodes||0;
  document.getElementById("episodePreview").innerHTML=eps
    ? Array.from({length:Math.min(eps,8)},(_,i)=>`<div>Episode ${String(i+1).padStart(2,"0")} <span style="float:right;color:#e92d45">Ready</span></div>`).join("")
    : `<div>No episodes added yet. The Developer Panel is ready for episode entries.</div>`;
  document.getElementById("animeModal").classList.add("show");
}
function closeAnime(){document.getElementById("animeModal").classList.remove("show")}

function openChapter(n){
  currentChapter=n;
  document.getElementById("chapterModal").classList.add("show");
  updateChapter();
}
function updateChapter(){
  document.getElementById("chapterTitle").textContent=`Chapter ${String(currentChapter).padStart(2,"0")}`;
  document.getElementById("readerText").textContent=chapters[currentChapter]||"This chapter is not written yet.";
}
function changeChapter(delta){
  const next=currentChapter+delta;
  if(next<1||next>3)return;
  currentChapter=next;updateChapter();
}
function closeChapter(){document.getElementById("chapterModal").classList.remove("show")}

function demoLogin(){
  alert("Demo mode: the interface is ready. Connect Firebase Authentication in the backend phase for real accounts.");
}

const searchOverlay=document.getElementById("searchOverlay");
document.getElementById("searchOpen").onclick=()=>{searchOverlay.classList.add("show");document.getElementById("searchInput").focus()};
document.getElementById("searchClose").onclick=()=>searchOverlay.classList.remove("show");
document.getElementById("searchInput").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase().trim();
  const results=anime.filter(a=>(a.title+" "+a.genre+" "+a.subtitle).toLowerCase().includes(q));
  document.getElementById("searchResults").innerHTML=q?results.map(a=>`
    <div class="search-result" onclick="searchOverlay.classList.remove('show');openAnime('${a.id}')">
      <img src="${a.cover}" alt="">
      <div><b>${a.title}</b><br><small>${a.genre}</small></div>
    </div>`).join(""):"";
});
document.getElementById("showAllAnime").onclick=()=>document.getElementById("animeGrid").scrollIntoView({behavior:"smooth"});

renderAnime();renderTrending();
