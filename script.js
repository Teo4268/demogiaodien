document.addEventListener("DOMContentLoaded", function () {
  const songs = document.querySelectorAll(".song-card");
  const volumeSlider = document.querySelector(".volume-slider");

  songs.forEach((song) => {
    const playBtn = song.querySelector(".play-btn");
    const audio = song.querySelector("audio");
    const progressBar = song.querySelector(".progress-bar");
    const progress = song.querySelector(".progress");
    const timeDisplay = song.querySelector(".time");

    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        document.querySelectorAll("audio").forEach(a => a.pause());
        document.querySelectorAll(".play-btn").forEach(btn => btn.innerHTML = '<i class="fas fa-play"></i>');
        document.querySelectorAll(".song-card").forEach(card => card.classList.remove("playing"));

        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        song.classList.add("playing");
      } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        song.classList.remove("playing");
      }
    });

    audio.addEventListener("timeupdate", () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = percent + "%";
      let currentTime = formatTime(audio.currentTime);
      let duration = formatTime(audio.duration);
      timeDisplay.textContent = `${currentTime} / ${duration}`;
    });

    progressBar.addEventListener("click", (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      audio.currentTime = (clickX / rect.width) * audio.duration;
    });

    function formatTime(seconds) {
      let h = Math.floor(seconds / 3600);
      let m = Math.floor((seconds % 3600) / 60);
      let s = Math.floor(seconds % 60);
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
  });

  volumeSlider.addEventListener("input", (e) => {
    document.querySelectorAll("audio").forEach(a => a.volume = e.target.value);
  });
});
