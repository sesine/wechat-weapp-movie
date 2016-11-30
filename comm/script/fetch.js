var config = require('./config.js')
var message = require('../../component/message/message')
module.exports = {
    fetchFilms: function(url, city, start, count, cb) {
      var that = this
      if (that.data.hasMore) {
        wx.request({
          url: url,
          data: {
            city: config.city,
            start: start,
            count: count
          },
          method: 'GET', 
          header: {
            "Content-Type": "application/json,application/json"
          },
          success: function(res){
            if(res.data.subjects.length === 0){
              that.setData({
                hasMore: false,
              })
            }else{
              that.setData({
                films: that.data.films.concat(res.data.subjects),
                start: that.data.start + res.data.subjects.length,
                showLoading: false
              })
            }
            wx.stopPullDownRefresh()
            typeof cb == 'function' && cb(res.data)
          },
          fail: function() {
            that.setData({
                showLoading: false
            })
            message.show.call(that,{
              content: '网络开小差了',
              icon: 'warning',
              duration: 3000
            })
          }
        })
      }
    },
    fetchFilmDetail: function(url, id, cb) {
      var that = this;
      wx.request({
        url: url + id,
        method: 'GET',
        header: {
          "Content-Type": "application/json,application/json"
        },
        success: function(res){
          that.setData({
            filmDetail: res.data,
            showLoading: false,
            showContent: true
          })
          wx.setNavigationBarTitle({
              title: res.data.title
          })
          wx.stopPullDownRefresh()
          typeof cb == 'function' && cb(res.data)
        },
        fail: function() {
          that.setData({
              showLoading: false
          })
          message.show.call(that,{
            content: '网络开小差了',
            icon: 'warning',
            duration: 3000
          })
        }
      })
    },
    fetchPersonDetail: function(url, id, cb) {
      var that = this;
      wx.request({
        url: url + id,
        method: 'GET', 
        header: {
          "Content-Type": "application/json,application/json"
        },
        success: function(res){
          that.setData({
            personDetail: res.data,
            showLoading: false,
            showContent: true
          })
          wx.setNavigationBarTitle({
              title: res.data.name
          })
          wx.stopPullDownRefresh()
          typeof cb == 'function' && cb(res.data)
        },
        fail: function() {
          that.setData({
              showLoading: false
          })
          message.show.call(that,{
            content: '网络开小差了',
            icon: 'warning',
            duration: 3000
          })
        }
      })
    },
    search: function(url, keyword, start, count, cb){
      var that = this
      var url = decodeURIComponent(url)
      if (that.data.hasMore) {
        wx.request({
          url: url + keyword,
          data: {
            start: start,
            count: count
          },
          method: 'GET',
          header: {
            "Content-Type": "application/json,application/json"
          },
          success: function(res){
            if(res.data.subjects.length === 0){
              that.setData({
                hasMore: false,
                showLoading: false
              })
            }else{
              that.setData({
                films: that.data.films.concat(res.data.subjects),
                start: that.data.start + res.data.subjects.length,
                showLoading: false
              })
              wx.setNavigationBarTitle({
                  title: keyword
              })
            }
            wx.stopPullDownRefresh()
            typeof cb == 'function' && cb(res.data)
          },
          fail: function() {
            that.setData({
                showLoading: false
            })
            message.show.call(that,{
              content: '网络开小差了',
              icon: 'warning',
              duration: 3000
            })
          }
        })
      }
    }
}