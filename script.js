let siteData = null;
let songsData = [];

async function loadSiteData() {
  const res = await fetch("./siteData.json");
  siteData = await res.json();

  document.getElementById("heroPill").innerText = siteData.hero.pill;
  document.getElementById("heroDesc").innerText = siteData.hero.description;

  // Service times
  const serviceDiv = document.getElementById("serviceTimes");
  serviceDiv.innerHTML = "";
  siteData.serviceTimes.forEach(item => {
    serviceDiv.innerHTML += `
      <div class="time-row">
        <span>${item.name}</span>
        <span>${item.time}</span>
      </div>
    `;
  });

  // Location
  document.getElementById("locationText").innerText = siteData.location.text;
  document.getElementById("locationAddress").innerText = siteData.location.address;
  document.getElementById("directionLink").href = siteData.location.googleMapsLink;

  // Core Values
  const valuesDiv = document.getElementById("coreValues");
  valuesDiv.innerHTML = "";
  siteData.coreValues.forEach(v => {
    valuesDiv.innerHTML += `
      <div class="mini-card">
        <div style="font-size:40px;">${v.icon}</div>
        <h3>${v.title}</h3>
        <p>${v.description}</p>
      </div>
    `;
  });

  // Sermons
  const sermonDiv = document.getElementById("sermonList");
  sermonDiv.innerHTML = "";
  siteData.sermons.forEach(s => {
    sermonDiv.innerHTML += `
      <div class="mini-card">
        <h3>${s.title}</h3>
        <p>${s.date}</p>
        <a class="link-arrow" href="${s.link}" target="_blank">Watch →</a>
      </div>
    `;
  });

  // Events
  const eventsDiv = document.getElementById("eventsList");
  eventsDiv.innerHTML = "";
  siteData.events.forEach(e => {
    eventsDiv.innerHTML += `
      <div class="mini-card">
        <h3>${e.title}</h3>
        <p>${e.date}</p>
        <p>${e.description}</p>
      </div>
    `;
  });

  // Give
  document.getElementById("upiId").innerText = siteData.give.upiId;
  document.getElementById("accountName").innerText = siteData.give.accountName;

  // Contact
  document.getElementById("contactPhone").innerText = siteData.contact.phone;
  document.getElementById("contactEmail").innerText = siteData.contact.email;

  const wa = `https://wa.me/${siteData.contact.whatsappNumber}`;
  document.getElementById("whatsappLink").href = wa;

  // Footer
  document.getElementById("footerText").innerText = siteData.footerText;
}

async function loadSongs() {
  const res = await fetch("./songs.json");
  songsData = await res.json();

  renderSongs(songsData);

  const input = document.getElementById("songSearchInput");
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    const filtered = songsData.filter(song =>
      song.title.toLowerCase().includes(q) ||
      song.lyrics.toLowerCase().includes(q)
    );
    renderSongs(filtered);
  });

  // If user opened shared song link
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
        <p style="color:#d19a22;font-weight:700;">View Lyrics →</p>
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

function setupPrayerForm() {
  const form = document.getElementById("prayerForm");
  const msg = document.getElementById("prayerSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.innerText = "Thank you! Your prayer request has been received.";
    form.reset();
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", () => {
    if (links.style.display === "flex") {
      links.style.display = "none";
    } else {
      links.style.display = "flex";
      links.style.flexDirection = "column";
      links.style.position = "absolute";
      links.style.top = "70px";
      links.style.right = "20px";
      links.style.background = "white";
      links.style.padding = "20px";
      links.style.borderRadius = "14px";
      links.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
    }
  });
}

loadSiteData();
loadSongs();
setupPrayerForm();
setupMobileMenu();
