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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci4xLmpzIl0sIm5hbWVzIjpbIk5ld3MiLCJkYXRhIiwibGlzdCIsImlkIiwidGl0bGUiLCJtZXRob2RzIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJyZXMiLCJmcm9tIiwiY29uc29sZSIsImxvZyIsInRhcmdldCIsInBhdGgiLCJzdWNjZXNzIiwiZmFpbCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxJLEdBQU87QUFDTEMsWUFBTSxDQUNKO0FBQ0VDLFlBQUksR0FETjtBQUVFQyxlQUFPO0FBRlQsT0FESTtBQURELEssUUFTUEMsTyxHQUFVO0FBQ1JDLHlCQUFtQiwyQkFBU0MsR0FBVCxFQUFjO0FBQy9CLFlBQUlBLElBQUlDLElBQUosS0FBYSxRQUFqQixFQUEyQjtBQUN6QjtBQUNBQyxrQkFBUUMsR0FBUixDQUFZSCxJQUFJSSxNQUFoQjtBQUNEO0FBQ0QsZUFBTztBQUNMUCxpQkFBTyxTQURGO0FBRUxRLGdCQUFNLG1CQUZEO0FBR0xDLG1CQUFTLGlCQUFTTixHQUFULEVBQWM7QUFDckI7QUFDQUUsb0JBQVFDLEdBQVIsQ0FBWUgsR0FBWjtBQUNELFdBTkk7QUFPTE8sZ0JBQU0sY0FBU1AsR0FBVCxFQUFjO0FBQ2xCO0FBQ0FFLG9CQUFRQyxHQUFSLENBQVlILEdBQVo7QUFDRDtBQVZJLFNBQVA7QUFZRDtBQWxCTyxLOzs7Ozs2QkFxQkQsQ0FBRTs7OztFQS9CcUIsZUFBS1EsUzs7a0JBQWxCZixJIiwiZmlsZSI6ImZvb3Rlci4xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIGRhdGEgPSB7XHJcbiAgICBsaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCIwXCIsXHJcbiAgICAgICAgdGl0bGU6IFwibG9hZGluZ1wiXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICBpZiAocmVzLmZyb20gPT09IFwiYnV0dG9uXCIpIHtcclxuICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiBcIuiHquWumuS5iei9rOWPkeagh+mimFwiLFxyXG4gICAgICAgIHBhdGg6IFwiL3BhZ2UvdXNlcj9pZD0xMjNcIixcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKCkge31cclxufVxyXG4iXX0=