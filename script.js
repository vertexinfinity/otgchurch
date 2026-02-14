let songsData = [];

async function fetchJSON(path) {
  const res = await fetch(path);
  return await res.json();
}

/* HERO */
async function loadHero() {
  const hero = await fetchJSON("./data/hero.json");
  document.getElementById("heroPill").innerText = hero.pill;
  document.getElementById("heroDesc").innerText = hero.description;
}

/* TIMINGS */
async function loadTimings() {
  const timings = await fetchJSON("./data/timings.json");

  // Hero timings
  const heroTimesDiv = document.getElementById("heroTimes");
  heroTimesDiv.innerHTML = "";
  timings.forEach(t => {
    heroTimesDiv.innerHTML += `<div class="hero-time-pill">${t.name}: ${t.time}</div>`;
  });

  // Service Times section
  const serviceDiv = document.getElementById("serviceTimes");
  serviceDiv.innerHTML = "";
  timings.forEach(t => {
    serviceDiv.innerHTML += `
      <div class="time-row">
        <span>${t.name}</span>
        <span>${t.time}</span>
      </div>
    `;
  });
}

/* LOCATION */
async function loadLocation() {
  const location = await fetchJSON("./data/location.json");
  document.getElementById("locationText").innerText = location.text;
  document.getElementById("locationAddress").innerText = location.address;
  document.getElementById("directionLink").href = location.googleMapsLink;
}

/* NEW HERE */
async function loadNewHere() {
  const newHere = await fetchJSON("./data/newHere.json");
  document.getElementById("newHereText").innerText = newHere.text;
}

/* CORE VALUES */
async function loadValues() {
  const values = await fetchJSON("./data/values.json");
  const div = document.getElementById("coreValues");
  div.innerHTML = "";

  values.forEach(v => {
    div.innerHTML += `
      <div class="mini-card">
        <div style="font-size:40px;">${v.icon}</div>
        <h3>${v.title}</h3>
        <p>${v.description}</p>
      </div>
    `;
  });
}

/* SERMONS */
async function loadSermons() {
  const sermons = await fetchJSON("./data/sermons.json");
  const div = document.getElementById("sermonList");
  div.innerHTML = "";

  sermons.forEach(s => {
    div.innerHTML += `
      <div class="mini-card">
        <h3>${s.title}</h3>
        <p>${s.date}</p>
        <a class="gold-link" href="${s.link}" target="_blank">Watch →</a>
      </div>
    `;
  });
}

/* EVENTS */
async function loadEvents() {
  const events = await fetchJSON("./data/events.json");
  const div = document.getElementById("eventsList");
  div.innerHTML = "";

  events.forEach(e => {
    div.innerHTML += `
      <div class="mini-card">
        <h3>${e.title}</h3>
        <p><b>${e.date}</b></p>
        <p>${e.description}</p>
      </div>
    `;
  });
}

/* GIVE */
async function loadGive() {
  const give = await fetchJSON("./data/give.json");
  document.getElementById("upiId").innerText = give.upiId;
  document.getElementById("accountName").innerText = give.accountName;
}

/* CONTACT */
async function loadContact() {
  const contact = await fetchJSON("./data/contact.json");
  document.getElementById("contactPhone").innerText = contact.phone;
  document.getElementById("contactEmail").innerText = contact.email;
  document.getElementById("whatsappLink").href = "https://wa.me/" + contact.whatsappNumber;
}

/* FOOTER */
async function loadFooter() {
  const footer = await fetchJSON("./data/footer.json");
  document.getElementById("footerText").innerText = footer.text;
}

/* SONGS */
async function loadSongs() {
  const songs = await fetchJSON("./data/songs.json");
  songsData = songs;

  renderSongs(songsData);

  document.getElementById("songSearchInput").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();

    const filtered = songsData.filter(song =>
      song.title.toLowerCase().includes(q) ||
      song.lyrics.toLowerCase().includes(q)
    );

    renderSongs(filtered);
  });

  // shared song link support
  const params = new URLSearchParams(window.location.search);
  const songId = params.get("song");

  if (songId) {
    const found = songsData.find(s => s.id === songId);
    if (found) showSong(found);
  }
}

function renderSongs(list) {
  const div = document.getElementById("songsList");
  div.innerHTML = "";

  list.forEach(song => {
    div.innerHTML += `
      <div class="mini-card" style="cursor:pointer;" onclick="openSong('${song.id}')">
        <h3>${song.title}</h3>
        <p>${song.category || ""}</p>
        <p style="color:#d19a22;font-weight:800;">View Lyrics →</p>
      </div>
    `;
  });
}

function openSong(id) {
  const song = songsData.find(s => s.id === id);
  if (!song) return;
  showSong(song);
}

function showSong(song) {
  document.getElementById("songView").style.display = "block";
  document.getElementById("songTitle").innerText = song.title;
  document.getElementById("songLyrics").innerText = song.lyrics;

  const shareUrl = `${window.location.origin}${window.location.pathname}?song=${song.id}#songs`;

  document.getElementById("copySongLink").onclick = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Song link copied!");
  };

  window.location.hash = "songs";
}

/* PRAYER FORM */
function setupPrayerForm() {
  const form = document.getElementById("prayerForm");
  const msg = document.getElementById("prayerSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.innerText = "Thank you! Your prayer request has been received.";
    form.reset();
  });
}

/* MOBILE MENU */
function setupMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  });
}

/* INIT */
loadHero();
loadTimings();
loadLocation();
loadNewHere();
loadValues();
loadSermons();
loadEvents();
loadGive();
loadContact();
loadFooter();
loadSongs();
setupPrayerForm();
setupMenu();
