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
      list: [{
        id: "0",
        title: "loading"
      }]
    }, _this.methods = {
      onShareAppMessage: function onShareAppMessage(res) {
        if (res.from === "button") {
          // 来自页面内转发按钮
          console.log(res.target);
        }
        return {
          title: "自定义转发标题",
          path: "/page/user?id=123",
          success: function success(res) {
            // 转发成功
            console.log(res);
          },
          fail: function fail(res) {
            // 转发失败
            console.log(res);
          }
        };
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(News, [{
    key: "onLoad",
    value: function onLoad() {}
  }]);

  return News;
}(_wepy2.default.component);

exports.default = News;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5qcyJdLCJuYW1lcyI6WyJOZXdzIiwiZGF0YSIsImxpc3QiLCJpZCIsInRpdGxlIiwibWV0aG9kcyIsIm9uU2hhcmVBcHBNZXNzYWdlIiwicmVzIiwiZnJvbSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJwYXRoIiwic3VjY2VzcyIsImZhaWwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsSSxHQUFPO0FBQ0xDLFlBQU0sQ0FDSjtBQUNFQyxZQUFJLEdBRE47QUFFRUMsZUFBTztBQUZULE9BREk7QUFERCxLLFFBU1BDLE8sR0FBVTtBQUNSQyx5QkFBbUIsMkJBQVNDLEdBQVQsRUFBYztBQUMvQixZQUFJQSxJQUFJQyxJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekI7QUFDQUMsa0JBQVFDLEdBQVIsQ0FBWUgsSUFBSUksTUFBaEI7QUFDRDtBQUNELGVBQU87QUFDTFAsaUJBQU8sU0FERjtBQUVMUSxnQkFBTSxtQkFGRDtBQUdMQyxtQkFBUyxpQkFBU04sR0FBVCxFQUFjO0FBQ3JCO0FBQ0FFLG9CQUFRQyxHQUFSLENBQVlILEdBQVo7QUFDRCxXQU5JO0FBT0xPLGdCQUFNLGNBQVNQLEdBQVQsRUFBYztBQUNsQjtBQUNBRSxvQkFBUUMsR0FBUixDQUFZSCxHQUFaO0FBQ0Q7QUFWSSxTQUFQO0FBWUQ7QUFsQk8sSzs7Ozs7NkJBcUJELENBQUU7Ozs7RUEvQnFCLGVBQUtRLFM7O2tCQUFsQmYsSSIsImZpbGUiOiJmb290ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3cyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBkYXRhID0ge1xyXG4gICAgbGlzdDogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwiMFwiLFxyXG4gICAgICAgIHRpdGxlOiBcImxvYWRpbmdcIlxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgaWYgKHJlcy5mcm9tID09PSBcImJ1dHRvblwiKSB7XHJcbiAgICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldClcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiBcIuiHquWumuS5iei9rOWPkeagh+mimFwiLFxyXG4gICAgICAgIHBhdGg6IFwiL3BhZ2UvdXNlcj9pZD0xMjNcIixcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKCkge31cclxufVxyXG4iXX0=