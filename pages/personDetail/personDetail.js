var douban = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
    data: {
        personDetail: {},
        showLoading: true,
		showContent: false
    },
    onLoad: function(options) {
        var that = this
        var id = options.id
		douban.fetchPersonDetail.call(that, config.apiList.personDetail, id, function(data){
			/// 判断是否收藏
			wx.getStorage({
			key: 'person_favorite',
				success: function(res){
					for (var i = 0; i < res.data.length; i++) {
						if (res.data[i].id == data.id) {
							that.setData({
								isPersonFavorite: true
							})
						}
					}
				}
			})
			// 存储浏览历史
			var date = util.getDate()
			var time = util.getTime()
			var person_history = []
			console.log('----进入----')
			wx.getStorage({
			  key: 'person_history',
			  success: function(res){
				person_history = res.data
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
					persons: []
				}
				sub_data.persons.push(now_data)
				if (person_history.length == 0) { // 判断是否为空
					console.log('----为空插入----')
					person_history.push(sub_data)
				} else if ((person_history[0].date = date)) { //判断第一个是否为今天
					console.log('----今日插入----')
					console.log(person_history[0].persons.length)
					for (var i = 0; i < person_history[0].persons.length; i++) {
						// 如果存在则删除，添加最新的
						if (person_history[0].persons[i].data.id == data.id) {
							person_history[0].persons.splice(i,1)
						}
					}
					person_history[0].persons.push(now_data)
				} else { // 不为今天(昨天)插入今天的数据
					console.log('----昨日插入今日----')
					person_history.push(sub_data)
				}
				wx.setStorage({
					key: 'person_history',
					data: person_history,
					success: function(res){
						console.log(res)
						console.log('----设置成功----')
					}
				})
				console.log(person_history)
			  },
			  fail: function(res) {
				  console.log('----获取失败----')
				  console.log(res)
			  }
			})
		})
    },
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.redirectTo({
		  url: '../filmDetail/filmDetail?id=' + data.id
		})
	},
	onPullDownRefresh: function() {
		var data = {
			id: this.data.filmDetail.id
		}
		this.onLoad(data)
	},
	favoritePerson: function() {
		var that = this
		// 判断原来是否收藏，是则删除，否则添加
		wx.getStorage({
			key: 'person_favorite',
			success: function(res){
				var person_favorite = res.data
				if (that.data.isPersonFavorite) {
					// 删除
					for (var i = 0; i < person_favorite.length; i++) {
						if (person_favorite[i].id == that.data.personDetail.id) {
							person_favorite.splice(i,1)
							that.setData({
								isPersonFavorite: false
							})
						}
					}
					wx.setStorage({
						key: 'person_favorite',
						data: person_favorite,
						success: function(res){
							console.log(res)
							console.log('----设置成功----')
						}
					})
				} else {
					// 添加
					person_favorite.push(that.data.personDetail)
					wx.setStorage({
						key: 'person_favorite',
						data: person_favorite,
						success: function(res){
							that.setData({
								isPersonFavorite: true
							})
						}
					})
				}
			}
		})
	}
})