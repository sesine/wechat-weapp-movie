<p align="center"><a href="https://sesine.com/mina" target="_blank"><img src="https://static.sesine.com/wechat-weapp-movie/logo.png" width="128" hegiht="128" alt="logo"></a></p>

# 🎬 电影推荐小程序 v2.0

🎉 查看页面UI请点击：[https://sesine.com/mina](https://sesine.com/mina/) 

🌠 此项目使用了大部分微信的api，封装了一些UI组件。如果对您有帮助，请给一个⭐️Star。如果在使用过程中发现问题，请给我 [反馈](https://github.com/sesine/wechat-weapp-movie/issues/new) 我会尽量在第一时间解决。

## 🔌 使用方法

1. 克隆或下载此项目
2. 在微信开发者工具导入此项目
3. 域名设置
- 如果有自己的APPID，可以使用自己的APPID，并在微信后台添加可信域名 `https://sesine.com/` 和 `https://sesine.com/mina/api/`。
- 如果没有自己的APPID，可以使用测试APPID。开发时勾选 `不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书` 的选项，如果需要在手机上预览，并且出现api无法访问的问题。请在 [微信小程序测试号管理](https://developers.weixin.qq.com/sandbox) 里面添加上一条中的二个可信域名。
4. 开发、体验与反馈。发现问题时，可以给我 [反馈](https://github.com/sesine/wechat-weapp-movie/issues/new)


## ❤️ 感谢与支持
- 豆瓣api https://sesine.com/ (代理豆瓣api)

> 由于微信服务器请求豆瓣api次数过多，已经禁止微信小程序请求。请使用新的api地址请求，请将原来的api请求地址从 `https://api.douban.com/v2/` 改为 `https://sesine.com/mina/api/` 即可，api请求的参数不变。

- 百度地图 http://lbsyun.baidu.com/

## 🚀 v2.0更新内容

- 将搜索从页面转移到首页面的搜索框
- 增加了电影与人物的浏览历史、收藏功能
- 添加“我的页面”（重头戏）
- 添加摇一摇、相册模块
- 添加设置功能，可清除缓存、编辑个人资料、查看手机信息、更新地理位置
- 添加关于页面，里面列举除了项目中所有使用到的api

## 📅 更新日志

> v1.0的旧版本代码可以通过master分支中的 [tag](https://github.com/sesine/wechat-weapp-movie/tree/v1.0) 中找到

- **v1.8.0** 2016-11-20
    + 1.添加下拉刷新功能
    + 2.列表改为模板渲染
    + 3.封装了api请求的代码提高可复用性

- **v1.7.0** 2016-11-21
    + 1.添加人物的详情页
    + 2.将电影详情和人物详情的网络请求进行了封装

- **v1.6.0** 2016-11-22
    + 1.添加了消息通知组件
    + 2.搜索页调整
    + 3.调整了目录结构，整合静态资源(dist)和组件文件(component)

- **v1.5.0** 2016-11-25
    + 1.将网络请求从wx.request改为fetch的方式
    + 2.完成搜索功能
    + 3.完成消息通知组件
    + 4.删除了没有用到的util文件夹

- **v1.4.0** 2016-12-03
    + 1.将电影列表的下拉刷新从scroll-view的bindscrolltolower改为Page的onReachBottom事件触发
    + 2.将“我的”页面的文件补全，功能列表改为数据渲染，添加跳转。新增换肤
    + 3.删除了tabBar中的搜索选项，添加“我的”选项
    + 4.首页搜索栏（点击跳转到搜索页）添加轮播图
    + 5.添加定位功能，在小程序载入时进行定位
    + 6.添加浏览记录、收藏、相册、设置、摇一摇功能（都在开发中）

- **v1.3.0** 2016-12-04
    + 1.将api列表 banner列表、搜索关键词列表、皮肤列表整合配置文件(config.js)
    + 2.完成换肤、设置、个人资料（还差修改）、摇一摇功能（再次进入不能摇的问题还需解决）
    + 3.添加util文件及文件夹，用于封装获取并格式化时间等工具类方法
    + 4.消息组件修改，删除了成功、失败等情况，避免与wx.showToast重合，添加了网络不正常的提示
    + 5.电影详情页面添加存储浏览历史的功能

- **v1.2.0** 2016-12-06
    + 1.完成电影收藏和人物收藏功能
    + 2.搜索页面添加为空时的提示页面并封装成组件

- **v1.1.0** 2016-12-14
    + 1.完成相册功能和关于页面
    + 2.添加定位功能（gps）

- **v1.0.0** 2016-12-24
    + 1.相册的背景图片方式改成image标签的方式
    + 2.添加摇一摇debug测试开关变量
