Page({
  data:{
    cells: []
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'person_info',
      success: function(res){
        var data = res.data
        var cells = [[],[],[]]
        cells[0].push({title: '姓名', text: data.name == '' ? '未填写' : data.name, access: false, fn: ''})
        cells[0].push({title: '昵称', text: data.nickName == '' ? '未填写' : data.nickName, access: false, fn: ''})
        cells[0].push({title: '性别', text: data.gender == '' ? '未填写' : data.gender, access: false, fn: ''})
        cells[0].push({title: '年龄', text: data.age == '' ? '未填写' : data.age, access: false, fn: ''})
        cells[0].push({title: '生日', text: data.birthday == '' ? '未填写' : data.birthday, access: false, fn: ''})
        cells[0].push({title: '星座', text: data.constellation == '' ? '未填写' : data.constellation, access: false, fn: ''})
        cells[1].push({title: '公司', text: data.company == '' ? '未填写' : data.company, access: false, fn: ''})
        cells[1].push({title: '学校', text: data.school == '' ? '未填写' : data.school, access: false, fn: ''})
        cells[1].push({title: '手机号码', text: data.tel == '' ? '未填写' : data.tel, access: false, fn: ''})
        cells[1].push({title: '邮箱', text: data.email == '' ? '未填写' : data.email, access: false, fn: ''})
        cells[2].push({title: '个性签名', text: data.intro == '' ? '未填写' : data.intro, access: false, fn: ''})
        that.setData({
          cells: cells
        })
      }
    })
  }
})