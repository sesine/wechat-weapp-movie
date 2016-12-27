Page({
  data:{
    pictures: [],
    nullTip: {
      tipText: '亲，没有上传照片哦',
      actionText: '上传',
      fn: 'uploadImg'
    }
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'gallery',
      success: function(res){
        that.setData({
          pictures: res.data
        })
      }
    })
  },
  uploadImg: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var tempFilePath = res.tempFilePaths[0]
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function(res) {
            var savedFilePath = res.savedFilePath
            console.log(savedFilePath)
            that.setData({
              pictures: that.data.pictures.concat(savedFilePath)
            })
            wx.setStorage({
              key: 'gallery',
              data: that.data.pictures
            })
          }
        })
      }
    })
  },
  previewImage: function(e) {
    var data =  e.currentTarget.dataset
    var index = data.index
    var that = this
    wx.previewImage({
      current: that.data.pictures[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: that.data.pictures
    })
  }
})