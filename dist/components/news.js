'use strict';

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
        id: '0',
        title: 'loading'
      }]
    }, _this.methods = {
      tap: function tap() {
        // this.num = this.num + 1
        console.log(this.$name + ' tap');
      },
      add: function add() {
        var len = this.list.length;
        this.list.push({ id: len + 1, title: 'title_' + len });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(News, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return News;
}(_wepy2.default.component);

exports.default = News;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3MuanMiXSwibmFtZXMiOlsiTmV3cyIsImRhdGEiLCJsaXN0IiwiaWQiLCJ0aXRsZSIsIm1ldGhvZHMiLCJ0YXAiLCJjb25zb2xlIiwibG9nIiwiJG5hbWUiLCJhZGQiLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLEksR0FBTztBQUNMQyxZQUFNLENBQ0o7QUFDRUMsWUFBSSxHQUROO0FBRUVDLGVBQU87QUFGVCxPQURJO0FBREQsSyxRQVNQQyxPLEdBQVU7QUFDUkMsU0FEUSxpQkFDRDtBQUNMO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS0MsS0FBTCxHQUFhLE1BQXpCO0FBQ0QsT0FKTztBQUtSQyxTQUxRLGlCQUtEO0FBQ0wsWUFBSUMsTUFBTSxLQUFLVCxJQUFMLENBQVVVLE1BQXBCO0FBQ0EsYUFBS1YsSUFBTCxDQUFVVyxJQUFWLENBQWUsRUFBQ1YsSUFBSVEsTUFBTSxDQUFYLEVBQWNQLE9BQU8sV0FBV08sR0FBaEMsRUFBZjtBQUNEO0FBUk8sSzs7Ozs7NkJBV0EsQ0FDVDs7OztFQXRCK0IsZUFBS0csUzs7a0JBQWxCZCxJIiwiZmlsZSI6Im5ld3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgbGlzdDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnMCcsXHJcbiAgICAgICAgICB0aXRsZTogJ2xvYWRpbmcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgdGFwICgpIHtcclxuICAgICAgICAvLyB0aGlzLm51bSA9IHRoaXMubnVtICsgMVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIHRhcCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIGFkZCAoKSB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGlzdC5sZW5ndGhcclxuICAgICAgICB0aGlzLmxpc3QucHVzaCh7aWQ6IGxlbiArIDEsIHRpdGxlOiAndGl0bGVfJyArIGxlbn0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgfVxyXG4gIH1cclxuIl19