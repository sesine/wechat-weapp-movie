var douban = require('../../comm/script/fetch')
var url = 'https://api.douban.com/v2/movie/celebrity/'
Page({
    data: {
        personDetail: {},
        showLoading: true,
		showContent: false
    },
    onLoad: function(options) {
        var that = this
        var id = options.id
        that.setData({
            id: options.id
        })
		douban.fetchPersonDetail.call(that, url, id)
    },
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.redirectTo({
		  url: '../filmDetail/filmDetail?id=' + data.id
		})
	},
	onPullDownRefresh: function() {
		var data = {
			id: this.data.id
		}
		this.onLoad(data)
	}
})