const songs = [
      {
        title: "Shape of you",
        artist: "Ed Sheeran",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIuc60ex2PBsbCMnWa90Hkm_tBEA7ZGPlp3X8V9-VagQ&s=10",
        src: "Shape of you.mp3"
      },
      {
        title: "Love me like you Do",
        artist: "Ellie Goulding",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeAJ7i1zIrDiWzN6TFnk5rhrTIjlJzNemZVs7qHRiWSA&s",
        src: "Love me like you Do.mp3"
      },
      {
        title: "Darkhaast",
        artist: "Arijit Singh (Lyrics) Ft. Sunidhi Chauhan",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ2geyuXRjsD5wKc9oVbdZucwyAfnCb7JRrYiYM3idCw&s=10",
        src: "Darkhaast.mp3"
      }
    ];

    const audio = document.getElementById('audio');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const cover = document.getElementById('cover');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');
    const playlistEl = document.getElementById('playlist');

    let currentSongIndex = 0;
    let isPlaying = false;

    function initPlayer() {
      renderPlaylist();
      loadSong(songs[currentSongIndex]);
      audio.volume = volumeSlider.value;
    }

    function renderPlaylist() {
      playlistEl.innerHTML = '';
      songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${song.title}</span> <span>${song.artist}</span>`;
        if (index === currentSongIndex) li.classList.add('active');
        li.addEventListener('click', () => {
          currentSongIndex = index;
          loadSong(songs[currentSongIndex]);
          playAudio();
        });
        playlistEl.appendChild(li);
      });
    }

    function loadSong(song) {
      title.textContent = song.title;
      artist.textContent = song.artist;
      cover.src = song.cover;
      audio.src = song.src;
      audio.load();
      updatePlaylistHighlight();
    }

    function updatePlaylistHighlight() {
      const items = playlistEl.querySelectorAll('li');
      items.forEach((item, idx) => {
        if (idx === currentSongIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    function playAudio() {
      isPlaying = true;
      playIcon.classList.remove('fa-play');
      playIcon.classList.add('fa-pause');
      audio.play();
    }

    function pauseAudio() {
      isPlaying = false;
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
      audio.pause();
    }

    function prevSong() {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      loadSong(songs[currentSongIndex]);
      if (isPlaying) playAudio();
    }

    function nextSong() {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      loadSong(songs[currentSongIndex]);
      if (isPlaying) playAudio();
    }

    function formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgress(e) {
      const { currentTime, duration } = e.srcElement;
      if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
      }
    }

    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      if (duration) {
        audio.currentTime = (clickX / width) * duration;
      }
    }

    function setVolume(e) {
      audio.volume = e.target.value;
    }

    playBtn.addEventListener('click', () => (isPlaying ? pauseAudio() : playAudio()));
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressContainer.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);

    initPlayer();
