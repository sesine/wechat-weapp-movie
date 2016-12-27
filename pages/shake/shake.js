var util = require('../../util/util')
var config = require('../../comm/script/config')
var douban = require('../../comm/script/fetch')

// 重力感应参数
var SHAKE_THRESHOLD = 200
var lastUpdate = 0
var x, y, z, lastX, lastY, lastZ
Page({
  data:{
    x: 0,
    y: 0,
    z: 0,
    film: [], //摇中的电影
    films: [], //全部电影列表
    showFilm: false, //是否显示摇中的
    loaded: false, //数据是否载入完成，没有完成不可以摇
    shakeSoundUrl: config.shakeSound.startUrl,
    shakeCompleteSoundUrl: config.shakeSound.completeUrl,
    shakeWelcomeImg: config.shakeWelcomeImg,
    hasMore: true,
    debug: false //显示debug数据
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'shakeFilmList',
      success: function(res){
        if (res.data.length == 0) {
          // 如果缓存内无数据，则请求数据
          that.getData()
        } else {
          // 如果缓存内有数据，则获取数据
          that.setData({
            films: res.data,
            loaded: true
          })
        }
        that.shake() //开启监听重力感应
      }
    })
  },
  shake: function() {
    var that = this
    //摇一摇音效
    this.shakeSound = wx.createAudioContext('shakeSound')
    this.shakeCompleteSound = wx.createAudioContext('shakeCompleteSound')
    // 是否可以摇 5秒钟一次
    var flag = true
    wx.onAccelerometerChange(function(res) {
      that.setData({
        x: res.x,
        y: res.y,
        z: res.z,
      })
      var time = new Date()
      var curTime = time.getTime()
      if ((curTime - lastUpdate) > 100) {
        var diffTime = curTime -lastUpdate
        lastUpdate = curTime
        x = res.x
        y = res.y
        z = res.z
        var speed = Math.abs(x +y + z - lastX - lastY - lastZ) / diffTime * 10000
        if (speed > SHAKE_THRESHOLD) {
          // 判断数据是否载入和是否在允许的时间（5秒每次间隔）
          if (that.data.loaded && flag) {
            that.shakeSound.play()
            // 随机获取电影
            that.getFilm()
            setTimeout(function(){
              that.shakeCompleteSound.play()  
            },800)
            flag = false
            setTimeout(function(){
              flag = true
            },5000)
          }
        }
        lastX = x
        lastY = y
        lastZ = z
      }
    })
  },
  getData: function() {
    var that = this
    var start = 0
    var count = 250
    getPopular()
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 10000
    })
    // 超过10秒关闭载入动画并保存
    setTimeout(function(){
      done()
    },10000)
    function done() {
        that.setData({
          loaded: true
        })
        wx.hideToast()
        that.saveData(that.data.films)
    }
    function getPopular() {
      // 获取热映列表
      douban.fetchFilms.call(that, config.apiList.popular, start, count, function(data){ getComming() }, done)
    }
    function getComming() {
      // 获取待映列表
      douban.fetchFilms.call(that, config.apiList.coming, start, count, done, done)
    }
  },
  saveData: function(data) {
    wx.setStorage({
      key: 'shakeFilmList',
      data: data
    })
  },
  play: function(){
    this.shakeSound.play()
  },
  getFilm: function() {
    var that = this
    var length = that.data.films.length
    var index = that.getRandomNum(0, length - 1)
    that.setData({
      film: that.data.films[index],
      showFilm: true
    })
  },
  getRandomNum: function (min, max){
      var range = max - min;
      var rand = Math.random();
      var num = min + Math.round(rand * range); //四舍五入
      return num;
  },
  viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.redirectTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
  }
})