"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "掌众传媒"
    }, _this.components = {}, _this.data = {
      winHeight: "",
      currentTab: 0, //预设nav当前项的值
      scrollLeft: 0, //tab标题的滚动条位置
      navList: [],
      newsList: [],
      orginList: [],
      typeid: 2550,
      page: 1,
      labelid: 36,
      lastid: 0,
      updatetime: 0
    }, _this.computed = {}, _this.methods = {
      // 滚动切换标签样式
      switchTab: function switchTab(e) {
        this.newsList = [];
        this.currentTab = e.detail.current;
        this.page = 1;
        this.getNewsList();
        //判断当前滚动超过一屏时，设置tab标题滚动条
        if (this.currentTab > 4) {
          this.scrollLeft = 300;
        } else {
          this.scrollLeft = 0;
        }
      },

      // 点击标题切换当前页时改变样式
      swichNav: function swichNav(item, index) {
        this.newsList = [];
        this.typeid = item.typeid;
        this.currentTab = index;
        this.getNewsList();
        console.log(this.typeid);
      },

      // 进入新闻详情
      onDetail: function onDetail(item) {
        console.log('id', item.id);
      },

      // 下拉刷新
      loadRefresh: function loadRefresh() {
        console.log("下载刷新");
        this.getNewsList();
      },

      // 上拉加载
      loadNext: function loadNext() {
        console.log("触发上拉加载");
        this.page++;
        this.getNewsList();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "getNav",

    // 获取导航栏数据
    value: function getNav() {
      var that = this;
      wx.request({
        url: that.$parent.config.api + "front/newsNav?&domain=K&cid=",
        success: function success(res) {
          that.navList = res.data.nav;
          that.$apply();
        }
      });
    }

    // 获取内容列表

  }, {
    key: "getNewsList",
    value: function getNewsList() {
      var that = this;
      console.log(1, that.lastid);
      wx.request({
        url: that.$parent.config.api + "front/list?labelId=" + that.labelid + "&lastid=" + that.lastid + "&updateTime=" + that.updatetime + "&arctypeId=" + that.typeid + "&flag=1&num=" + that.page + "&upperId=0&advertIds=&domain=K&cid=",
        success: function success(res) {
          // that.newsList = that.newsList.concat(res.data.news);
          that.originList = that.newsList;
          that.lastid = res.data.news[res.data.news.length - 1].id;
          that.updatetime = res.data.news[res.data.news.length - 1].updateTime;
          that.newsList = res.data.news;
          that.newsList.forEach(function (item) {
            var picSplit = item.litpic.split(",");
            item.litpic = picSplit;
          });
          that.newsList = that.originList.concat(that.newsList);
          that.$apply();
        }
      });
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      this.getNav();
      this.getNewsList();
    }
  }]);

  return Index;
}(_wepy2.default.page);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LjEuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJ3aW5IZWlnaHQiLCJjdXJyZW50VGFiIiwic2Nyb2xsTGVmdCIsIm5hdkxpc3QiLCJuZXdzTGlzdCIsIm9yZ2luTGlzdCIsInR5cGVpZCIsInBhZ2UiLCJsYWJlbGlkIiwibGFzdGlkIiwidXBkYXRldGltZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInN3aXRjaFRhYiIsImUiLCJkZXRhaWwiLCJjdXJyZW50IiwiZ2V0TmV3c0xpc3QiLCJzd2ljaE5hdiIsIml0ZW0iLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJvbkRldGFpbCIsImlkIiwibG9hZFJlZnJlc2giLCJsb2FkTmV4dCIsInRoYXQiLCJ3eCIsInJlcXVlc3QiLCJ1cmwiLCIkcGFyZW50IiwiYXBpIiwic3VjY2VzcyIsInJlcyIsIm5hdiIsIiRhcHBseSIsIm9yaWdpbkxpc3QiLCJuZXdzIiwibGVuZ3RoIiwidXBkYXRlVGltZSIsImZvckVhY2giLCJwaWNTcGxpdCIsImxpdHBpYyIsInNwbGl0IiwiY29uY2F0IiwiZ2V0TmF2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUNiQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxrQkFBWSxDQUZQLEVBRVU7QUFDZkMsa0JBQVksQ0FIUCxFQUdVO0FBQ2ZDLGVBQVMsRUFKSjtBQUtMQyxnQkFBVSxFQUxMO0FBTUxDLGlCQUFVLEVBTkw7QUFPTEMsY0FBTyxJQVBGO0FBUUxDLFlBQU0sQ0FSRDtBQVNMQyxlQUFTLEVBVEo7QUFVTEMsY0FBUSxDQVZIO0FBV0xDLGtCQUFZO0FBWFAsSyxRQWNQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7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Y0QsUUFBZDtBQUNELFdBSEQ7QUFJQWYsZUFBS3ZCLFFBQUwsR0FBZ0J1QixLQUFLVSxVQUFMLENBQWdCUSxNQUFoQixDQUF1QmxCLEtBQUt2QixRQUE1QixDQUFoQjtBQUNBdUIsZUFBS1MsTUFBTDtBQUNEO0FBdEJRLE9BQVg7QUF3QkQ7Ozs2QkFFUTtBQUNQLFdBQUtVLE1BQUw7QUFDQSxXQUFLN0IsV0FBTDtBQUNEOzs7O0VBeEdnQyxlQUFLVixJOztrQkFBbkJaLEsiLCJmaWxlIjoiaW5kZXguMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5o6M5LyX5Lyg5aqSXCJcbiAgfTtcbiAgY29tcG9uZW50cyA9IHt9O1xuICBkYXRhID0ge1xuICAgIHdpbkhlaWdodDogXCJcIixcbiAgICBjdXJyZW50VGFiOiAwLCAvL+mihOiuvm5hduW9k+WJjemhueeahOWAvFxuICAgIHNjcm9sbExlZnQ6IDAsIC8vdGFi5qCH6aKY55qE5rua5Yqo5p2h5L2N572uXG4gICAgbmF2TGlzdDogW10sXG4gICAgbmV3c0xpc3Q6IFtdLFxuICAgIG9yZ2luTGlzdDpbXSxcbiAgICB0eXBlaWQ6MjU1MCxcbiAgICBwYWdlOiAxLFxuICAgIGxhYmVsaWQ6IDM2LFxuICAgIGxhc3RpZDogMCxcbiAgICB1cGRhdGV0aW1lOiAwXG4gIH07XG5cbiAgY29tcHV0ZWQgPSB7fTtcblxuICBtZXRob2RzID0ge1xuICAgIC8vIOa7muWKqOWIh+aNouagh+etvuagt+W8j1xuICAgIHN3aXRjaFRhYihlKSB7XG4gICAgICB0aGlzLm5ld3NMaXN0ID0gW107XG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50O1xuICAgICAgdGhpcy5wYWdlPTE7XG4gICAgICB0aGlzLmdldE5ld3NMaXN0KCk7XG4gICAgICAvL+WIpOaWreW9k+WJjea7muWKqOi2hei/h+S4gOWxj+aXtu+8jOiuvue9rnRhYuagh+mimOa7muWKqOadoVxuICAgICAgaWYgKHRoaXMuY3VycmVudFRhYiA+IDQpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0gMzAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0gMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIOeCueWHu+agh+mimOWIh+aNouW9k+WJjemhteaXtuaUueWPmOagt+W8j1xuICAgIHN3aWNoTmF2KGl0ZW0saW5kZXgpIHtcbiAgICAgIHRoaXMubmV3c0xpc3QgPSBbXTtcbiAgICAgIHRoaXMudHlwZWlkID0gaXRlbS50eXBlaWQ7XG4gICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpbmRleDtcbiAgICAgIHRoaXMuZ2V0TmV3c0xpc3QoKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMudHlwZWlkKTtcbiAgICB9LFxuICAgIC8vIOi/m+WFpeaWsOmXu+ivpuaDhVxuICAgIG9uRGV0YWlsKGl0ZW0pe1xuICAgICAgY29uc29sZS5sb2coJ2lkJyxpdGVtLmlkKTtcbiAgICB9LFxuICAgIC8vIOS4i+aLieWIt+aWsFxuICAgIGxvYWRSZWZyZXNoKCkge1xuICAgICAgY29uc29sZS5sb2coXCLkuIvovb3liLfmlrBcIik7XG4gICAgICB0aGlzLmdldE5ld3NMaXN0KCk7XG4gICAgfSxcbiAgICAvLyDkuIrmi4nliqDovb1cbiAgICBsb2FkTmV4dCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwi6Kem5Y+R5LiK5ouJ5Yqg6L29XCIpO1xuICAgICAgdGhpcy5wYWdlKys7XG4gICAgICB0aGlzLmdldE5ld3NMaXN0KCk7XG4gICAgfVxuICB9O1xuICAvLyDojrflj5blr7zoiKrmoI/mlbDmja5cbiAgZ2V0TmF2KCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiB0aGF0LiRwYXJlbnQuY29uZmlnLmFwaSArIFwiZnJvbnQvbmV3c05hdj8mZG9tYWluPUsmY2lkPVwiLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHRoYXQubmF2TGlzdCA9IHJlcy5kYXRhLm5hdjtcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIOiOt+WPluWGheWuueWIl+ihqFxuICBnZXROZXdzTGlzdCgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zb2xlLmxvZygxLHRoYXQubGFzdGlkKTtcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDpcbiAgICAgICAgdGhhdC4kcGFyZW50LmNvbmZpZy5hcGkgK1xuICAgICAgICBcImZyb250L2xpc3Q/bGFiZWxJZD1cIiArXG4gICAgICAgIHRoYXQubGFiZWxpZCArXG4gICAgICAgIFwiJmxhc3RpZD1cIiArXG4gICAgICAgIHRoYXQubGFzdGlkICtcbiAgICAgICAgXCImdXBkYXRlVGltZT1cIiArXG4gICAgICAgIHRoYXQudXBkYXRldGltZSArXG4gICAgICAgIFwiJmFyY3R5cGVJZD1cIit0aGF0LnR5cGVpZCtcIiZmbGFnPTEmbnVtPVwiK3RoYXQucGFnZStcIiZ1cHBlcklkPTAmYWR2ZXJ0SWRzPSZkb21haW49SyZjaWQ9XCIsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgLy8gdGhhdC5uZXdzTGlzdCA9IHRoYXQubmV3c0xpc3QuY29uY2F0KHJlcy5kYXRhLm5ld3MpO1xuICAgICAgICB0aGF0Lm9yaWdpbkxpc3QgPSB0aGF0Lm5ld3NMaXN0O1xuICAgICAgICB0aGF0Lmxhc3RpZCA9IHJlcy5kYXRhLm5ld3NbcmVzLmRhdGEubmV3cy5sZW5ndGgtMV0uaWQ7XG4gICAgICAgIHRoYXQudXBkYXRldGltZSA9IHJlcy5kYXRhLm5ld3NbcmVzLmRhdGEubmV3cy5sZW5ndGgtMV0udXBkYXRlVGltZTtcbiAgICAgICAgdGhhdC5uZXdzTGlzdCA9IHJlcy5kYXRhLm5ld3M7XG4gICAgICAgIHRoYXQubmV3c0xpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICB2YXIgcGljU3BsaXQgPSBpdGVtLmxpdHBpYy5zcGxpdChcIixcIik7XG4gICAgICAgICAgaXRlbS5saXRwaWMgPSBwaWNTcGxpdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoYXQubmV3c0xpc3QgPSB0aGF0Lm9yaWdpbkxpc3QuY29uY2F0KHRoYXQubmV3c0xpc3QpO1xuICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuZ2V0TmF2KCk7XG4gICAgdGhpcy5nZXROZXdzTGlzdCgpO1xuICB9XG59XG4iXX0=