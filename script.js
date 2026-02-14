document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('reveal');
        });
    });
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));

    // Song Library Logic
    if (document.getElementById('songs-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const songId = urlParams.get('id');
        
        // Fetch from your GitHub Raw URL
        fetch('https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/songs.json')
            .then(res => res.json())
            .then(data => {
                if (songId) renderSongDetail(data.find(s => s.id == songId));
                else renderSongList(data);
            });
    }
});

function renderSongList(songs) {
    const container = document.getElementById('songs-container');
    container.innerHTML = songs.map(s => `
        <div class="card" onclick="location.href='songs.html?id=${s.id}'" style="cursor:pointer">
            <h3>${s.title}</h3>
            <p>${s.lyrics.substring(0, 60)}...</p>
        </div>
    `).join('');
}

function copySongLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
}
