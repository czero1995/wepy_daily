"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _footer = require('./../components/footer.js');

var _footer2 = _interopRequireDefault(_footer);

var _wxParse = require('./../plugins/wxParse/wxParse.js');

var _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Detail = function (_wepy$page) {
  _inherits(Detail, _wepy$page);

  function Detail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Detail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "详情页"
    }, _this.components = {
      footer: _footer2.default
    }, _this.data = {
      detailContent: {},
      detailBody: {},
      id: ""
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Detail, [{
    key: "getContent",
    value: function getContent() {
      var that = this;
      _wepy2.default.request({
        url: that.$parent.config.zhapi + that.id,
        success: function success(res) {
          that.detailContent = res.data;
          that.detailBody = that.detailContent.body;
          console.log(that.detailContent);
          that.detailBody = _wxParse2.default.wxParse("body", "html", that.detailBody, that, 0);
          that.$apply();
        }
      });
    }
  }, {
    key: "onLoad",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(option) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.id = option.id;
                _context.next = 3;
                return this.getContent();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad(_x) {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImZvb3RlciIsImRhdGEiLCJkZXRhaWxDb250ZW50IiwiZGV0YWlsQm9keSIsImlkIiwidGhhdCIsInJlcXVlc3QiLCJ1cmwiLCIkcGFyZW50IiwiemhhcGkiLCJzdWNjZXNzIiwicmVzIiwiYm9keSIsImNvbnNvbGUiLCJsb2ciLCJ3eFBhcnNlIiwiJGFwcGx5Iiwib3B0aW9uIiwiZ2V0Q29udGVudCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYTtBQUNYQztBQURXLEssUUFHYkMsSSxHQUFPO0FBQ0xDLHFCQUFlLEVBRFY7QUFFTEMsa0JBQVksRUFGUDtBQUdMQyxVQUFJO0FBSEMsSzs7Ozs7aUNBS007QUFDWCxVQUFNQyxPQUFPLElBQWI7QUFDQSxxQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLGFBQUtGLEtBQUtHLE9BQUwsQ0FBYVgsTUFBYixDQUFvQlksS0FBcEIsR0FBNEJKLEtBQUtELEVBRDNCO0FBRVhNLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJOLGVBQUtILGFBQUwsR0FBcUJTLElBQUlWLElBQXpCO0FBQ0FJLGVBQUtGLFVBQUwsR0FBa0JFLEtBQUtILGFBQUwsQ0FBbUJVLElBQXJDO0FBQ0FDLGtCQUFRQyxHQUFSLENBQVlULEtBQUtILGFBQWpCO0FBQ0FHLGVBQUtGLFVBQUwsR0FBa0Isa0JBQVFZLE9BQVIsQ0FDaEIsTUFEZ0IsRUFFaEIsTUFGZ0IsRUFHaEJWLEtBQUtGLFVBSFcsRUFJaEJFLElBSmdCLEVBS2hCLENBTGdCLENBQWxCO0FBT0FBLGVBQUtXLE1BQUw7QUFDRDtBQWRVLE9BQWI7QUFnQkQ7Ozs7MkZBQ1lDLE07Ozs7O0FBQ1gscUJBQUtiLEVBQUwsR0FBVWEsT0FBT2IsRUFBakI7O3VCQUNNLEtBQUtjLFVBQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWpDMEIsZUFBS0MsSTs7a0JBQXBCdkIsTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XG5pbXBvcnQgZm9vdGVyIGZyb20gXCIuLi9jb21wb25lbnRzL2Zvb3RlclwiO1xuaW1wb3J0IFd4UGFyc2UgZnJvbSBcIi4uL3BsdWdpbnMvd3hQYXJzZS93eFBhcnNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLor6bmg4XpobVcIixcbiAgfTtcbiAgY29tcG9uZW50cyA9IHtcbiAgICBmb290ZXI6IGZvb3RlclxuICB9O1xuICBkYXRhID0ge1xuICAgIGRldGFpbENvbnRlbnQ6IHt9LFxuICAgIGRldGFpbEJvZHk6IHt9LFxuICAgIGlkOiBcIlwiXG4gIH07XG4gIGdldENvbnRlbnQoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogdGhhdC4kcGFyZW50LmNvbmZpZy56aGFwaSArIHRoYXQuaWQsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgdGhhdC5kZXRhaWxDb250ZW50ID0gcmVzLmRhdGE7XG4gICAgICAgIHRoYXQuZGV0YWlsQm9keSA9IHRoYXQuZGV0YWlsQ29udGVudC5ib2R5O1xuICAgICAgICBjb25zb2xlLmxvZyh0aGF0LmRldGFpbENvbnRlbnQpO1xuICAgICAgICB0aGF0LmRldGFpbEJvZHkgPSBXeFBhcnNlLnd4UGFyc2UoXG4gICAgICAgICAgXCJib2R5XCIsXG4gICAgICAgICAgXCJodG1sXCIsXG4gICAgICAgICAgdGhhdC5kZXRhaWxCb2R5LFxuICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGFzeW5jIG9uTG9hZChvcHRpb24pIHtcbiAgICB0aGlzLmlkID0gb3B0aW9uLmlkO1xuICAgIGF3YWl0IHRoaXMuZ2V0Q29udGVudCgpO1xuICB9XG59XG4iXX0=