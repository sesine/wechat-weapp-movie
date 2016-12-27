var douban = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
    data: {
        filmDetail: {},
        showLoading: true,
		showContent: false
    },
    onLoad: function(options) {
        var that = this
        var id = options.id
		douban.fetchFilmDetail.call(that, config.apiList.filmDetail, id, function(data){
			/// 判断是否收藏
			wx.getStorage({
			key: 'film_favorite',
				success: function(res){
					for (var i = 0; i < res.data.length; i++) {
						if (res.data[i].id == data.id) {
							that.setData({
								isFilmFavorite: true
							})
						}
					}
				}
			})
			// 存储浏览历史
			var date = util.getDate()
			var time = util.getTime()
			var film_history = []
			console.log('----进入----')
			wx.getStorage({
				key: 'film_history',
				success: function(res){
					film_history = res.data
					console.log('----获取缓存----')
					console.log(res.data)
					// 当前的数据
					var now_data = {
						time: time,
						data: data
					}
					// 今天的数据，没有时插入
					var sub_data = {
						date: date,
						films: []
					}
					sub_data.films.push(now_data)
					if (film_history.length == 0) { // 判断是否为空
						console.log('----为空插入----')
						film_history.push(sub_data)
					} else if ((film_history[0].date = date)) { //判断第一个是否为今天
						console.log('----今日插入----')
						console.log(film_history[0].films.length)
						for (var i = 0; i < film_history[0].films.length; i++) {
							// 如果存在则删除，添加最新的
							if (film_history[0].films[i].data.id == data.id) {
								film_history[0].films.splice(i,1)
							}
						}
						film_history[0].films.push(now_data)
					} else { // 不为今天(昨天)插入今天的数据
						console.log('----昨日插入今日----')
						film_history.push(sub_data)
					}
					wx.setStorage({
						key: 'film_history',
						data: film_history,
						success: function(res){
							console.log(res)
							console.log('----设置成功----')
						}
					})
					console.log(film_history)
				},
				fail: function(res) {
					console.log('----获取失败----')
					console.log(res)
				}
			})
		})
    },
	viewPersonDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.redirectTo({
		  url: '../personDetail/personDetail?id=' + data.id
		})
	},
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.redirectTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})
	},
	onPullDownRefresh: function() {
		var data = {
			id: this.data.filmDetail.id
		}
		this.onLoad(data)
	},
	favoriteFilm: function() {
		var that = this
		// 判断原来是否收藏，是则删除，否则添加
		wx.getStorage({
			key: 'film_favorite',
			success: function(res){
				var film_favorite = res.data
				if (that.data.isFilmFavorite) {
					// 删除
					for (var i = 0; i < film_favorite.length; i++) {
						if (film_favorite[i].id == that.data.filmDetail.id) {
							film_favorite.splice(i,1)
							that.setData({
								isFilmFavorite: false
							})
						}
					}
					wx.setStorage({
						key: 'film_favorite',
						data: film_favorite,
						success: function(res){
							console.log(res)
							console.log('----设置成功----')
						}
					})
				} else {
					// 添加
					film_favorite.push(that.data.filmDetail)
					wx.setStorage({
						key: 'film_favorite',
						data: film_favorite,
						success: function(res){
							that.setData({
								isFilmFavorite: true
							})
						}
					})
				}
			}
		})
	}
})