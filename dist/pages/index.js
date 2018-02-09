'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      navigationBarTitleText: '知乎日报',
      enablePullDownRefresh: 'true',
      backgroundColor: '#eee'
    }, _this.data = {
      dateTime: 0, //  获取时间
      zhList: [], //  知乎日报列表
      zhTop: [], // 知乎日报轮播
      refreshTipAnimation: {}, // 刷新提示动画
      refreshInterval: {}, //  刷新渲染循环
      refreshNum: 1, //  刷新循环计数
      refreshIs: false, //  刷新状态
      loadMore: false //  上拉加载提示
    }, _this.methods = {
      /** 回到顶部 */
      onTop: function onTop() {
        _wepy2.default.pageScrollTo({
          scrollTop: 0
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onPullDownRefresh',


    /** 下拉刷新 */
    value: function onPullDownRefresh() {
      var _this2 = this;

      this.refreshIs = true;
      _wepy2.default.showNavigationBarLoading();
      this.getDate();
      setTimeout(function () {
        _this2.getZhiHuList();
      }, 2000);
    }

    /** 上拉加载 */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      var _this3 = this;

      this.loadMore = true;
      _wepy2.default.showNavigationBarLoading();
      setTimeout(function () {
        _this3.loadMore = false;
        _this3.dateTime--;
        _this3.getZhiHuList();
        _this3.$apply();
      }, 2000);
    }

    /** 获取日期 */

  }, {
    key: 'getDate',
    value: function getDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      var day = date.getDate();
      day = day < 10 ? '0' + day : day;
      this.dateTime = year.toString() + month.toString() + day.toString();
    }
    /** 获取知乎轮播 */

  }, {
    key: 'getZhiHuTop',
    value: function getZhiHuTop() {
      var that = this;
      _wepy2.default.request({
        url: that.$parent.config.zhapi + 'latest',
        success: function success(res) {
          that.zhTop = res.data.top_stories;
          that.$apply();
        }
      });
    }
    /** 获取知乎日报列表 */

  }, {
    key: 'getZhiHuList',
    value: function getZhiHuList() {
      var that = this;
      _wepy2.default.request({
        url: that.$parent.config.zhapi + 'before/' + that.dateTime,
        success: function success(res) {
          if (that.refreshIs) {
            that.zhList = [];
            _wepy2.default.stopPullDownRefresh();
            that.refreshInterval = setInterval(function () {
              that.refreshNum++;
              // 提示下拉效果
              that.tipAnimation.height(40).step();
              that.tipAnimation.opacity(1).step();
              that.refreshTipAnimation = this.tipAnimation.export();
              that.$apply();
            }.bind(that), 200);
            setTimeout(function () {
              that.tipAnimation.height(0).step();
              that.tipAnimation.opacity(0).step();
              that.refreshTipAnimation = that.tipAnimation.export();
              clearInterval(that.refreshInterval);
              that.refreshIs = false;
              that.$apply();
            }, 1600);
          }
          _wepy2.default.hideNavigationBarLoading();
          that.zhList = [].concat(_toConsumableArray(that.zhList), _toConsumableArray(res.data.stories));
          that.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // 下拉动画
      this.tipAnimation = _wepy2.default.createAnimation({
        duration: 1200,
        timingFunction: 'ease'
      });
      this.refreshTipAnimation = this.tipAnimation.export();
    }
  }, {
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getDate();

              case 2:
                _context.next = 4;
                return this.getZhiHuTop();

              case 4:
                _context.next = 6;
                return this.getZhiHuList();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImJhY2tncm91bmRDb2xvciIsImRhdGEiLCJkYXRlVGltZSIsInpoTGlzdCIsInpoVG9wIiwicmVmcmVzaFRpcEFuaW1hdGlvbiIsInJlZnJlc2hJbnRlcnZhbCIsInJlZnJlc2hOdW0iLCJyZWZyZXNoSXMiLCJsb2FkTW9yZSIsIm1ldGhvZHMiLCJvblRvcCIsInBhZ2VTY3JvbGxUbyIsInNjcm9sbFRvcCIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsImdldERhdGUiLCJzZXRUaW1lb3V0IiwiZ2V0WmhpSHVMaXN0IiwiJGFwcGx5IiwiZGF0ZSIsIkRhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwidG9TdHJpbmciLCJ0aGF0IiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJ6aGFwaSIsInN1Y2Nlc3MiLCJyZXMiLCJ0b3Bfc3RvcmllcyIsInN0b3BQdWxsRG93blJlZnJlc2giLCJzZXRJbnRlcnZhbCIsInRpcEFuaW1hdGlvbiIsImhlaWdodCIsInN0ZXAiLCJvcGFjaXR5IiwiZXhwb3J0IiwiYmluZCIsImNsZWFySW50ZXJ2YWwiLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJzdG9yaWVzIiwiY3JlYXRlQW5pbWF0aW9uIiwiZHVyYXRpb24iLCJ0aW1pbmdGdW5jdGlvbiIsImdldFpoaUh1VG9wIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUIsTUFGaEI7QUFHUEMsdUJBQWlCO0FBSFYsSyxRQUtUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETCxFQUNTO0FBQ2RDLGNBQVEsRUFG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WUFBTCxDQUFrQkcsT0FBbEIsQ0FBMEIsQ0FBMUIsRUFBNkJELElBQTdCO0FBQ0FaLG1CQUFLdEIsbUJBQUwsR0FBMkJzQixLQUFLVSxZQUFMLENBQWtCSSxNQUFsQixFQUEzQjtBQUNBRSw0QkFBY2hCLEtBQUtyQixlQUFuQjtBQUNBcUIsbUJBQUtuQixTQUFMLEdBQWlCLEtBQWpCO0FBQ0FtQixtQkFBS1QsTUFBTDtBQUNELGFBUEQsRUFPRyxJQVBIO0FBUUQ7QUFDRCx5QkFBSzBCLHdCQUFMO0FBQ0FqQixlQUFLeEIsTUFBTCxnQ0FBa0J3QixLQUFLeEIsTUFBdkIsc0JBQWtDOEIsSUFBSWhDLElBQUosQ0FBUzRDLE9BQTNDO0FBQ0FsQixlQUFLVCxNQUFMO0FBQ0Q7QUE3QlUsT0FBYjtBQStCRDs7OzZCQUVRO0FBQ1A7QUFDQSxXQUFLbUIsWUFBTCxHQUFvQixlQUFLUyxlQUFMLENBQXFCO0FBQ3ZDQyxrQkFBVSxJQUQ2QjtBQUV2Q0Msd0JBQWdCO0FBRnVCLE9BQXJCLENBQXBCO0FBSUEsV0FBSzNDLG1CQUFMLEdBQTJCLEtBQUtnQyxZQUFMLENBQWtCSSxNQUFsQixFQUEzQjtBQUNEOzs7Ozs7Ozs7O3VCQUdPLEtBQUsxQixPQUFMLEU7Ozs7dUJBQ0EsS0FBS2tDLFdBQUwsRTs7Ozt1QkFDQSxLQUFLaEMsWUFBTCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcEh5QixlQUFLaUMsSTs7a0JBQW5CdEQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnn6XkuY7ml6XmiqUnLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogJ3RydWUnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgZGF0ZVRpbWU6IDAsICAvLyAg6I635Y+W5pe26Ze0XG4gICAgemhMaXN0OiBbXSwgLy8gIOefpeS5juaXpeaKpeWIl+ihqFxuICAgIHpoVG9wOiBbXSwgLy8g55+l5LmO5pel5oql6L2u5pKtXG4gICAgcmVmcmVzaFRpcEFuaW1hdGlvbjoge30sIC8vIOWIt+aWsOaPkOekuuWKqOeUu1xuICAgIHJlZnJlc2hJbnRlcnZhbDoge30sIC8vICDliLfmlrDmuLLmn5Plvqrnjq9cbiAgICByZWZyZXNoTnVtOiAxLCAvLyAg5Yi35paw5b6q546v6K6h5pWwXG4gICAgcmVmcmVzaElzOiBmYWxzZSwgLy8gIOWIt+aWsOeKtuaAgVxuICAgIGxvYWRNb3JlOiBmYWxzZSAvLyAg5LiK5ouJ5Yqg6L295o+Q56S6XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgLyoqIOWbnuWIsOmhtumDqCAqL1xuICAgIG9uVG9wKCkge1xuICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqIOS4i+aLieWIt+aWsCAqL1xuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlZnJlc2hJcyA9IHRydWVcbiAgICB3ZXB5LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgdGhpcy5nZXREYXRlKClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0WmhpSHVMaXN0KClcbiAgICB9LCAyMDAwKVxuICB9XG5cbiAgLyoqIOS4iuaLieWKoOi9vSAqL1xuICBvblJlYWNoQm90dG9tKCkge1xuICAgIHRoaXMubG9hZE1vcmUgPSB0cnVlXG4gICAgd2VweS5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5sb2FkTW9yZSA9IGZhbHNlXG4gICAgICB0aGlzLmRhdGVUaW1lLS1cbiAgICAgIHRoaXMuZ2V0WmhpSHVMaXN0KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LCAyMDAwKVxuICB9XG5cbiAgLyoqIOiOt+WPluaXpeacnyAqL1xuICBnZXREYXRlKCkge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMVxuICAgIG1vbnRoID0gbW9udGggPCAxMCA/ICcwJyArIG1vbnRoIDogbW9udGhcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgICBkYXkgPSBkYXkgPCAxMCA/ICcwJyArIGRheSA6IGRheVxuICAgIHRoaXMuZGF0ZVRpbWUgPSB5ZWFyLnRvU3RyaW5nKCkgKyBtb250aC50b1N0cmluZygpICsgZGF5LnRvU3RyaW5nKClcbiAgfVxuICAvKiog6I635Y+W55+l5LmO6L2u5pKtICovXG4gIGdldFpoaUh1VG9wKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogdGhhdC4kcGFyZW50LmNvbmZpZy56aGFwaSArICdsYXRlc3QnLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHRoYXQuemhUb3AgPSByZXMuZGF0YS50b3Bfc3Rvcmllc1xuICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICAvKiog6I635Y+W55+l5LmO5pel5oql5YiX6KGoICovXG4gIGdldFpoaUh1TGlzdCgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6IHRoYXQuJHBhcmVudC5jb25maWcuemhhcGkgKyAnYmVmb3JlLycgKyB0aGF0LmRhdGVUaW1lLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmICh0aGF0LnJlZnJlc2hJcykge1xuICAgICAgICAgIHRoYXQuemhMaXN0ID0gW11cbiAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgICAgIHRoYXQucmVmcmVzaEludGVydmFsID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoTnVtKytcbiAgICAgICAgICAgICAgLy8g5o+Q56S65LiL5ouJ5pWI5p6cXG4gICAgICAgICAgICAgIHRoYXQudGlwQW5pbWF0aW9uLmhlaWdodCg0MCkuc3RlcCgpXG4gICAgICAgICAgICAgIHRoYXQudGlwQW5pbWF0aW9uLm9wYWNpdHkoMSkuc3RlcCgpXG4gICAgICAgICAgICAgIHRoYXQucmVmcmVzaFRpcEFuaW1hdGlvbiA9IHRoaXMudGlwQW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgIH0uYmluZCh0aGF0KSxcbiAgICAgICAgICAgIDIwMFxuICAgICAgICAgIClcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoYXQudGlwQW5pbWF0aW9uLmhlaWdodCgwKS5zdGVwKClcbiAgICAgICAgICAgIHRoYXQudGlwQW5pbWF0aW9uLm9wYWNpdHkoMCkuc3RlcCgpXG4gICAgICAgICAgICB0aGF0LnJlZnJlc2hUaXBBbmltYXRpb24gPSB0aGF0LnRpcEFuaW1hdGlvbi5leHBvcnQoKVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGF0LnJlZnJlc2hJbnRlcnZhbClcbiAgICAgICAgICAgIHRoYXQucmVmcmVzaElzID0gZmFsc2VcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICB9LCAxNjAwKVxuICAgICAgICB9XG4gICAgICAgIHdlcHkuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgdGhhdC56aExpc3QgPSBbLi4udGhhdC56aExpc3QsIC4uLnJlcy5kYXRhLnN0b3JpZXNdXG4gICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25TaG93KCkge1xuICAgIC8vIOS4i+aLieWKqOeUu1xuICAgIHRoaXMudGlwQW5pbWF0aW9uID0gd2VweS5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgZHVyYXRpb246IDEyMDAsXG4gICAgICB0aW1pbmdGdW5jdGlvbjogJ2Vhc2UnXG4gICAgfSlcbiAgICB0aGlzLnJlZnJlc2hUaXBBbmltYXRpb24gPSB0aGlzLnRpcEFuaW1hdGlvbi5leHBvcnQoKVxuICB9XG5cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIGF3YWl0IHRoaXMuZ2V0RGF0ZSgpXG4gICAgYXdhaXQgdGhpcy5nZXRaaGlIdVRvcCgpXG4gICAgYXdhaXQgdGhpcy5nZXRaaGlIdUxpc3QoKVxuICB9XG59XG4iXX0=