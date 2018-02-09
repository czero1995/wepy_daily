## 预览

![](https://user-gold-cdn.xitu.io/2018/2/9/161798ff76c69ab5?w=373&h=636&f=gif&s=3261853)
## 参考文档
* 小程序文档: [https://mp.weixin.qq.com/debug/wxadoc/dev/](https://mp.weixin.qq.com/debug/wxadoc/dev/)
* WePY框架: [https://github.com/Tencent/wepy](https://github.com/Tencent/wepy)
* 富文本解析: [https://github.com/icindy/wxParse](https://github.com/icindy/wxParse)
* less autoprefix(部份机型上使用display: flex;会出现兼容性问题): [https://github.com/Tencent/wepy/wiki/WePY-%E4%BD%BF%E7%94%A8less-autoprefix]( https://github.com/Tencent/wepy/wiki/WePY-%E4%BD%BF%E7%94%A8less-autoprefix)
* 上拉刷新下拉加载:[https://juejin.im/post/5a781c756fb9a063606eb742?utm_source=gold_browser_extension](https://juejin.im/post/5a781c756fb9a063606eb742?utm_source=gold_browser_extension)
## 项目结构

![](https://user-gold-cdn.xitu.io/2018/2/9/161794601c09e324?w=574&h=465&f=png&s=31383)

## 接口
* 知乎日报API分析：
[https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)
* 轮播：[https://news-at.zhihu.com/api/4/news/latest](https://news-at.zhihu.com/api/4/news/latest)
* 列表：[https://news-at.zhihu.com/api/4/news/before/20180208](https://news-at.zhihu.com/api/4/news/before/20180208)
* 详情：[https://news-at.zhihu.com/api/4/news/9670311](https://news-at.zhihu.com/api/4/news/9670311)

## 源码
[https://github.com/czero1995/wepy_daily.git](https://github.com/czero1995/wepy_daily.git)

## 运行
    git clone https://github.com/czero1995/wepy_daily.git
    cd wepy_daily
    npm install
    wepy build --watch
    打开微信开发者工具，添加项目，项目目录指定dist文件夹