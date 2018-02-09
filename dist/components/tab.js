"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var News = function (_wepy$component) {
  _inherits(News, _wepy$component);

  function News() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, News);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = News.__proto__ || Object.getPrototypeOf(News)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      currentTab: 0, //  预设nav当前项的值
      scrollLeft: 0, //  tab标题的滚动条位置
      navList: [] //  导航栏列表
      // allSwiper: [], // 所有滑动数据
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(News, [{
    key: "getNav",

    // 获取导航栏数据
    value: function getNav() {
      var that = this;
      _wepy2.default.request({
        url: that.$parent.$parent.config.api + 'front/newsNav?&domain=K&cid=',
        success: function success(res) {
          that.navList = res.data.nav;
          // that.allSwiper = new Array(that.navList.length)
          that.$apply();
        }
      });
    }
  }, {
    key: "onLoad",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getNav();

              case 2:
              case "end":
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

  return News;
}(_wepy2.default.component);

exports.default = News;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYi5qcyJdLCJuYW1lcyI6WyJOZXdzIiwiZGF0YSIsImN1cnJlbnRUYWIiLCJzY3JvbGxMZWZ0IiwibmF2TGlzdCIsIm1ldGhvZHMiLCJ0aGF0IiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJjb25maWciLCJhcGkiLCJzdWNjZXNzIiwicmVzIiwibmF2IiwiJGFwcGx5IiwiZ2V0TmF2IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsSSxHQUFPO0FBQ0xDLGtCQUFZLENBRFAsRUFDVTtBQUNmQyxrQkFBWSxDQUZQLEVBRVU7QUFDZkMsZUFBUyxFQUhKLENBR1E7QUFDYjtBQUpLLEssUUFPUEMsTyxHQUFVLEU7Ozs7OztBQUdWOzZCQUNTO0FBQ1AsVUFBTUMsT0FBTyxJQUFiO0FBQ0EscUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxhQUFLRixLQUFLRyxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLE1BQXJCLENBQTRCQyxHQUE1QixHQUFrQyw4QkFENUI7QUFFWEMsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQlAsZUFBS0YsT0FBTCxHQUFlUyxJQUFJWixJQUFKLENBQVNhLEdBQXhCO0FBQ0E7QUFDQVIsZUFBS1MsTUFBTDtBQUNEO0FBTlUsT0FBYjtBQVFEOzs7Ozs7Ozs7O3VCQUVPLEtBQUtDLE1BQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXhCd0IsZUFBS0MsUzs7a0JBQWxCakIsSSIsImZpbGUiOiJ0YWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld3MgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgZGF0YSA9IHtcclxuICAgIGN1cnJlbnRUYWI6IDAsIC8vICDpooTorr5uYXblvZPliY3pobnnmoTlgLxcclxuICAgIHNjcm9sbExlZnQ6IDAsIC8vICB0YWLmoIfpopjnmoTmu5rliqjmnaHkvY3nva5cclxuICAgIG5hdkxpc3Q6IFtdLCAvLyAg5a+86Iiq5qCP5YiX6KGoXHJcbiAgICAvLyBhbGxTd2lwZXI6IFtdLCAvLyDmiYDmnInmu5HliqjmlbDmja5cclxuICB9XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBcclxuICB9O1xyXG4gIC8vIOiOt+WPluWvvOiIquagj+aVsOaNrlxyXG4gIGdldE5hdigpIHsgIFxyXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhhdC4kcGFyZW50LiRwYXJlbnQuY29uZmlnLmFwaSArICdmcm9udC9uZXdzTmF2PyZkb21haW49SyZjaWQ9JyxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgdGhhdC5uYXZMaXN0ID0gcmVzLmRhdGEubmF2XHJcbiAgICAgICAgLy8gdGhhdC5hbGxTd2lwZXIgPSBuZXcgQXJyYXkodGhhdC5uYXZMaXN0Lmxlbmd0aClcclxuICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgIGF3YWl0IHRoaXMuZ2V0TmF2KClcclxuICB9XHJcbn1cclxuIl19