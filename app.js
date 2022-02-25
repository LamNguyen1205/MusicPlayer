const heading = document.querySelector("header h2");
const cdThumb = document.querySelector(".cd-thumb");
const audio = document.querySelector("#audio");
const btnPlay = document.querySelector(".btn-toggle-play");
const player = document.querySelector(".player");
const progress = document.querySelector("#progress");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const btnRandom = document.querySelector(".btn-random");
const btnLoop = document.querySelector(".btn-repeat");
console.log(btnNext);
const app = {
  songs: [
    {
      id: "1",
      name: "Thức giấc",
      singer: "Dalab",
      path: "./asset/ThucGiac-DaLAB-7048212.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg",
    },
    {
      id: "2",
      name: "Là do em xui thôi",
      singer: "Khói, Sofia, Châu Đăng Khoa",
      path: "./asset/2.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2022/01/06/3/8/5/b/1641464698758.jpg",
    },
    {
      id: "3",
      name: "Cưới em",
      singer: "B Ray",
      path: "./asset/1.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2022/02/14/9/a/9/8/1644831086860.jpg",
    },
    {
      id: "4",
      name: "Yêu Đương Khó Quá Thì Chạy Về Khóc Với Anh ",
      singer: "Erik",
      path: "./asset/YeuDuongKhoQuaThiChayVeKhocVoiAnh-ERIK-7128950.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2022/01/26/4/e/f/e/1643184497199.jpg",
    },
    {
      id: "5",
      name: "Tìm Được Nhau Khó Thế Nào",
      singer: "Anh Tú",
      path: "./asset/TimDuocNhauKhoTheNaoOriginalMovieSoundtrackFromChiaKhoaTramTy-AnhTuTheVoice-7127088.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2022/01/17/6/c/e/0/1642406689812.jpg",
    },
    {
      id: "6",
      name: "Sài Gòn đau lòng quá",
      singer: "Hứa Kim Tuyền",
      path: "./asset/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/03/27/d/2/9/1/1616859493571.jpg",
    },
  ],
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  render: function () {
    let htmls = "";
    this.songs.map((song) => {
      htmls += `
            <div class="song" id="${song.id}">
              <div
                class="thumb"
                style="
                  background-image: url('${song.image}');
                "
              ></div>
              <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
                    `;
    });
    document.querySelector(".playlist").innerHTML = htmls;
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cd = document.querySelector(".cd");
    const cdWidth = cd.offsetWidth;
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iteration: Infinity,
    });
    cdThumbAnimate.pause();
    //Xử lý phóng to thu nhỏ cd
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      console.log(newCdWidth);
      console.log(scrollTop);
      cd.style.opacity = newCdWidth / cdWidth;
    };
    //Xử lý btnPlay
    btnPlay.onclick = function () {
      // if (_this.isPlaying) {
      //   audio.pause();
      //   player.classList.remove("playing");
      //   _this.isPlaying = false;
      // } else {
      //   audio.play();
      //   player.classList.add("playing");
      //   _this.isPlaying = true;
      // }
      if (_this.isPlaying) {
        audio.pause();
        cdThumbAnimate.pause();
      } else {
        cdThumbAnimate.play();
        audio.play();
      }
    };
    audio.onplay = function () {
      player.classList.add("playing");
      _this.isPlaying = true;
    };
    audio.onpause = function () {
      player.classList.remove("playing");
      _this.isPlaying = false;
    };
    //Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        let progrssPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progrssPercent;
      }
    };
    progress.oninput = function (e) {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    };

    // Chuyển bài
    btnNext.onclick = function () {
      _this.currentIndex++;
      if (_this.currentIndex === _this.songs.length) _this.currentIndex = 0;
      _this.loadCurrentSong();
      audio.play();
    };

    // Lùi bài
    btnPrev.onclick = function () {
      _this.currentIndex--;
      if (_this.currentIndex === -1)
        _this.currentIndex = _this.songs.length - 1;
      _this.loadCurrentSong();
      audio.play();
    };

    // Random bài hát
    btnRandom.onclick = function () {
      _this.currentIndex = Math.floor(Math.random() * (_this.songs.length - 1));
      _this.loadCurrentSong();
      audio.play();
    };

    // Lăp lại bài hát
    btnLoop.onclick = function () {
      if (!_this.isRepeat) {
        btnLoop.style.color = "red";
        _this.isRepeat = true;
        audio.loop = true;
        console.log(_this.isRepeat);
      } else {
        this.style.color = "grey";
        _this.isRepeat = false;
        audio.loop = false;
        console.log(_this.isRepeat);
      }
    };
  },
  loadChoseSong: function () {
    const currentSong = document.querySelectorAll(".song");
    console.log(currentSong);
    currentSong.forEach((song, index) => {
      song.onclick = function () {
        app.currentIndex = index;
        app.loadCurrentSong();
        audio.play();
      };
    });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  start: function () {
    // Định nghĩa các thuộc tính của object
    this.defineProperties();
    // Xử lý các DOM event
    this.handleEvents();
    // get bài hát đầu tiên
    this.render();
    this.loadChoseSong();
    this.loadCurrentSong();
  },
};
app.start();
