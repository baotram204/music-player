const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'PLAYER '

const btnPlay = $('.btn-toggle-play')
const audio = $('#audio')
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const player = $('.player')
const progressBar = $('.progress')
const btnNext = $('.btn-next')
const heading = $('h2')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const random = $('.fa-random')
const btnRepeat = $('.btn-repeat')
const repeat = $('.fa-refresh')
const playList = $('.playList')
const app = {
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    index : 0,
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig : function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
        // get là lấy ra, set là thêm key vào

    },
    songs: [
        {   
            name: 'See Tình',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song2.mp3',
            img: './img/seetinh.png',

        },

        {   
            name: 'Duyên âm',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song1.mp3',
            img: './img/duyenam.png',

        },

        {   
            name: 'Kẻ cắp gặp bà già',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song3.mp3',
            img: './img/kecapgapbagia.png',

        },

        {   
            name: 'Em đây chẳng phải Thúy Kiều',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song4.mp3',
            img: './img/emdaychangphaithuykieu.png',

        },

        {   
            name: 'Gieo quẻ',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song5.mp3',
            img: './img/gieoque.png',

        },

        {   
            name: 'Duyên âm',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song1.mp3',
            img: './img/duyenam.png',

        },

        {   
            name: 'See Tình',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song2.mp3',
            img: './img/seetinh.png',

        },

        {   
            name: 'Kẻ cắp gặp bà già',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song3.mp3',
            img: './img/kecapgapbagia.png',

        },

        {   
            name: 'Em đây chẳng phải Thúy Kiều',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song4.mp3',
            img: './img/emdaychangphaithuykieu.png',

        },

        {   
            name: 'Gieo quẻ',
            singer: 'Hoang Thuy Linh',
            path: 'songs/song5.mp3',
            img: './img/gieoque.png',

        }
    ],
    //render ra danh list songs
    render: function() {
        console.log (this)
        var html = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.index ? 'active' : ''}" data-index="${index}">
                <img src="${song.img}" alt="" class="thumb">    
                <div class="content">
                    <h3>${song.name}</h3>
                    <p>${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fa fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })

        playList.innerHTML = html.join('')
    },
    //định nghĩa properties
    defineProperties: function() {
       Object.defineProperty(this,'currentSong' ,{
            get : function() {
                return this.songs[this.index]
            },
     
       }); 
    },

    hangEvent: function() {


        var cdWidth = cd.offsetWidth
        var _this = this
        var bien = 0

        // Xử lí phóng to thu nhỏ CD
        document.onscroll = function () {
            let scroll = window.scrollY || document.documentElement.scrollTop
            var newcdWidth =cdWidth - scroll

            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0
            cd.style.opacity = newcdWidth / cdWidth
        }

        // Xử lí click bài hát
        btnPlay.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        //khi bài hát play
            audio.onplay = function () {
                _this.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()

            }

            //khi bài hát pause
            audio.onpause = function () {
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }

        //xử lí chạy progress theo bài hát
        audio.ontimeupdate = function () {
            let audioCurr = audio.currentTime
            let lengthAudio = 0
            if (audio.duration) {
                lengthAudio = audioCurr * 100 / audio.duration
            } 
            progressBar.value = lengthAudio
        }
        
        //Xử lí tua progress theo bài
        progressBar.onchange = function () {
            if (audio.duration) {
                let lengCurr = this.value * audio.duration / 100
                audio.currentTime = lengCurr   
            }
        }

        //xử lí CD quay ( animate)
        const cdThumbAnimate = cdThumb.animate ([
            
            // { transform: 'rotate(0deg)'},
            { transform : 'rotate(360deg)' }
        ], {
            duration : 10000, 
            iterations : Infinity,
            easing : 'linear'
        })
        cdThumbAnimate.pause()

        //xử lí next songs
        btnNext.onclick = function () {
            if (_this.isRandom ) {
                _this.isPlaying = true
                cdThumbAnimate.play()
                _this.playRamdomSong()
            } else {
                _this.isPlaying = false
                _this.nextSong()
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            audio.play()
            _this.render()
        }

        //xử lí prev songs
        btnPrev.onclick = function () {
            if (_this.isRandom ) {
                _this.playRamdomSong()
            } else {
                _this.prevSong()
                player.classList.add('playing')
            }
            audio.play()
            _this.render()
        }

        //xử lí turn on / off random
        btnRandom.onclick = function () {   
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            _this.isRandom = random.classList.toggle('active')
            _this.playRamdomSong()
        }

        //xử lí next song khi audio ended
        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play()
            } else {
                btnNext.click()
            }
        }

        //xử lí turn on / off repeat và lặp lại một song
        btnRepeat.onclick = () => {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            _this.isRepeat = repeat.classList.toggle('active')
        }

        //lắng nghe hành vi click vào playlist
        playList.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)')

            //xử lí click vào song or option
            if ( songNode || e.target.closest('.option')    ) { 

                //khi click vào song
                if ( songNode ) {
                    _this.index = Number(songNode.dataset.index)
                    console.log(_this.index)
                    _this.loadSong()
                    _this.render()
                    audio.play()
                }

                //khi click vào option
                if (e.target.closest('.option')) {
                    
                }
            }   
        }

    },

    loadSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path

    },
    loadConfig : function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong: function() { 
        this.index++
        if (this.index == this.songs.length) {
            this.index = 0
        }
        this.loadSong() 
        audio.play()
    },

    prevSong: function() {
        this.index--
        if (this.index < 0) {
            this.index = this.songs.length - 1
        }
        this.loadSong()
        audio.play()
    },

    playRamdomSong : function() {
        let newIndex = 0
        do
            newIndex = Math.floor(Math.random() * this.songs.length)
        while(newIndex === this.index)
        this.index = newIndex
        this.loadSong()
    },

    start: function () {
        //gán cấu hình từ config vào pp
        this.loadConfig()
        //Định nghĩa ra các hàm
        this.defineProperties()
    
        //xử lí thông tin event của dom
        this.hangEvent()

        //render ra playlist
        this.render()

        //load bài hát đầu tiên
        this.loadSong() 

        //hiển thị trạng thái ban đầu của btn repeat và random
        btnRandom.classList.toggle('active', this.isRandom)
        btnRepeat.classList.toggle('active', this.isRepeat)

    }
}

app.start()



