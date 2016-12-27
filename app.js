var config = require('comm/script/config')
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function() {
    // 获取用户信息
    this.getUserInfo()
    //初始化缓存
    this.initStorage()
  },
  getUserInfo:function(cb){
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },
  getCity: function(cb) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude + '1'
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            ak: config.baiduAK,
            location: locationParam,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function(res){
            config.city = res.data.result.addressComponent.city.slice(0,-1)
            typeof cb == "function" && cb(res.data.result.addressComponent.city.slice(0,-1))
          },
          fail: function(res) {
            // 重新定位
            that.getCity();
          }
        })
      }
    })
  },
  initStorage: function() {
    wx.getStorageInfo({
      success: function(res) {
        // 判断电影收藏是否存在，没有则创建
        if (!('film_favorite' in res.keys)) {
          wx.setStorage({
            key: 'film_favorite',
            data: []
          })
        }
        // 判断人物收藏是否存在，没有则创建
        if (!('person_favorite' in res.keys)) {
          wx.setStorage({
            key: 'person_favorite',
            data: []
          })
        }
        // 判断电影浏览记录是否存在，没有则创建
        if (!('film_history' in res.keys)) {
          wx.setStorage({
            key: 'film_history',
            data: []
          })
        }
        // 判断人物浏览记录是否存在，没有则创建
        if (!('person_history' in res.keys)) {
          wx.setStorage({
            key: 'person_history',
            data: []
          })
        }
        // 个人信息默认数据
        var personInfo = {
          name: '',
          nickName: '',
          gender: '',
          age: '',
          birthday: '',
          constellation: '',
          company: '',
          school: '',
          tel: '',
          email:'',
          intro: ''
        }
        // 判断个人信息是否存在，没有则创建
        if (!('person_info' in res.keys)) {
          wx.setStorage({
            key: 'person_info',
            data: personInfo
          })
        }
        // 判断相册数据是否存在，没有则创建
        if (!('gallery' in res.keys)) {
          wx.setStorage({
            key: 'gallery',
            data: []
          })
        }
        // 判断背景卡选择数据是否存在，没有则创建
        if (!('skin' in res.keys)) {
          wx.setStorage({
            key: 'skin',
            data: ''
          })
        }
      }
    })
  }
})