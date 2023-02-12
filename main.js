const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



const app = {
    isPlaying: false,
    index : 0,
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
    render: function() {
        console.log (this)
        var html = this.songs.map(song => {
            return `
            <div class="song">
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

        $('.playList').innerHTML = html.join('')
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
        const btnPlay = $('.btn-toggle-play')
        const audio = $('#audio')
        const cd = $('.cd')
        const cdThumb = $('.cd-thumb')
        const player = $('.player')
        const progressBar = $('.progress')
        const nextSong = $('.fa-step-forward')

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
            
        }

        //xử lí chạy progress theo bài hát
        audio.ontimeupdate = function () {
            let audioCurr = audio.currentTime
            let lengthAudio = audioCurr * 100 / audio.duration
            progressBar.value = lengthAudio
        }
        console.log(bien)
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
            iteration : Infinity,
            easing : 'linear'
        })

        cdThumbAnimate.pause()

        //xử lí next songs 
        nextSong.onclick = function () {

        }
        
    },
    
    firstSong: function() {
        const heading = $('h2')
        const cdThumb = $('.cd-thumb')
        const audio = $('#audio')

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
    },

    start: function () {
        //Định nghĩa ra các hàm
        this.defineProperties()
    
        //xử lí thông tin event của dom
        this.hangEvent()

        //render ra playlist
        this.render()

        //load bài hát đầu tiên
        this.firstSong() 
    }
}

app.start()



