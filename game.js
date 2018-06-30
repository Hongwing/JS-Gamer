(function () {
    console.log('game start')
    var ct = 3
    var direc = 10
    var width = 20
    var race = 21
    var me = {
        pos: 0,
        word: '🚀'
    }
    var timer_map = null
    var timer_me = null
    var timer_game = null
    var target = null
    var map = {
        speed: 0.9, // 下落速度
        /**
         * {
         * word: '',
         * pos: 0
         * }
         */
        mapData: [],
        height: 8
    }


    // game map
    var mapInit = function () {
        map.mapData = []
        for (let index = 0; index < map.height; index++) {
            map.mapData.push(getOneMapElement('宏', 4))
        }
    }

    var getOneMapElement = function (wd, ps) {
        var rdlist = ['-', '我', '好', '帅', '🐶', '🐒', '🐷', '🌹']
        return {
            word: rdlist[Math.round(Math.random()*rdlist.length)],
            pos: Math.round(Math.random()*18)
        }
    }

    var mapOn = function () {
        timer_map =  window.setInterval(function () {
            console.clear()
            console.log(' -  -  -  -  -  -  - 💢💢💢还有 '+ (race-1) + ' 💢💢💢 -  -  -  -  -  -  - ')
            downMap()
            mapPrint()
            gameCalc() // 游戏撞击计算
        }, map.speed * 1000)
    }

    var downMap = function () {
        race--
        for (let index = map.height - 1; index >= 0; index--) {
            const element = map.mapData[index];
            if (index === map.height - 1) { // last
                target = element
            } else {
                // down
                map.mapData[index + 1] = element
            }
        }
        map.mapData[0] = getOneMapElement('伟', 8)
    }

    var gameCalc = function () {
        if (direc === target.pos && target.word !== '-') {
            console.log(getOneLine('🔥', direc))
            console.log('booming, 你的小飞机🚀被炸毁了哟！')
            window.clearInterval(timer_map)
            window.clearInterval(timer_me)
        } else {
            if (race === 0) {
                console.log('恭喜，恭喜，胜利了！🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉')   
                window.clearInterval(timer_map)
                window.clearInterval(timer_me)             
            }
        }
    }

    var mePrint = function () {
        // game on 
        timer_me = window.setInterval(function () {
            console.log(getOneLine(me.word, direc))
        }, map.speed*1000)

    }

    var mapPrint = function () {
        for (let index = 0; index < map.height; index++) {
            const element = map.mapData[index];
            console.log(getOneLine(element.word, element.pos))
            console.log('\n')
        }
    }

    var getOneLine = function (word, pos) {
        var str = []
        if (pos < 0) {
            pos = 0
        }
        if (pos > width) {
            pos = width
        }
        str.push(' | ')
        for (let j = 0; j < pos; j++) {
            str.push(' - ')
        }
        str.push(word)
        for (let index = pos + 1; index < width; index++) {
            // console.log('-')
            str.push(' - ')
        }
        str.push(' | ')
        return str.join('')
    }

    window.onkeydown = function (e) {
        // console.log(e.code, e.which)
        // left 37 right 39
        if (e.which === 37) { // left
            direc--
            if (direc < 0) {
                direc = 0
            }
        }

        if (e.which === 39) { // right
            direc++
            if (direc > width) {
                direc = width
            }
        }
        // console.log(direc)
    }

    // game go 
    mapInit()
    timer_game = window.setInterval(function () {
        console.clear()
        console.log('-----------🎮🎮START🎮🎮------------')
        console.log('------------🏎️️️️🏎️ ' +ct + ' 🏎️🏎️------------')
        console.log('------------⬅️️⬅️控制➡️➡️------------')
        ct--
        if (ct === 0) {
            window.clearInterval(timer_game)
            mapOn()
            mePrint()
        }
    }, 1000)
})()