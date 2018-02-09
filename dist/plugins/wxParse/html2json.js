'use strict';

/**
 * html2Json 改造来自: https://github.com/Jxck/html2json
 * 
 * 
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

var __placeImgeUrlHttps = "https";
var __emojisReg = '';
var __emojisBaseSrc = '';
var __emojis = {};
var wxDiscode = require('./wxDiscode.js');
var HTMLParser = require('./htmlparser.js');
// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
// Block Elements - HTML 5
var block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
function makeMap(str) {
    var obj = {},
        items = str.split(",");
    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }return obj;
}

function q(v) {
    return '"' + v + '"';
}

function removeDOCTYPE(html) {
    return html.replace(/<\?xml.*\?>\n/, '').replace(/<.*!doctype.*\>\n/, '').replace(/<.*!DOCTYPE.*\>\n/, '');
}

function trimHtml(html) {
    return html.replace(/\n+/g, '').replace(/<!--.*?-->/ig, '').replace(/\/\*.*?\*\//ig, '').replace(/[ ]+</ig, '<');
}

function html2json(html, bindName) {
    //处理字符串
    html = removeDOCTYPE(html);
    html = trimHtml(html);
    html = wxDiscode.strDiscode(html);
    //生成node节点
    var bufArray = [];
    var results = {
        node: bindName,
        nodes: [],
        images: [],
        imageUrls: []
    };
    var index = 0;
    HTMLParser(html, {
        start: function start(tag, attrs, unary) {
            //debug(tag, attrs, unary);
            // node for this element
            var node = {
                node: 'element',
                tag: tag
            };

            if (bufArray.length === 0) {
                node.index = index.toString();
                index += 1;
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                node.index = parent.index + '.' + parent.nodes.length;
            }

            if (block[tag]) {
                node.tagType = "block";
            } else if (inline[tag]) {
                node.tagType = "inline";
            } else if (closeSelf[tag]) {
                node.tagType = "closeSelf";
            }

            if (attrs.length !== 0) {
                node.attr = attrs.reduce(function (pre, attr) {
                    var name = attr.name;
                    var value = attr.value;
                    if (name == 'class') {
                        console.dir(value);
                        //  value = value.join("")
                        node.classStr = value;
                    }
                    // has multi attibutes
                    // make it array of attribute
                    if (name == 'style') {
                        console.dir(value);
                        //  value = value.join("")
                        node.styleStr = value;
                    }
                    if (value.match(/ /)) {
                        value = value.split(' ');
                    }

                    // if attr already exists
                    // merge it
                    if (pre[name]) {
                        if (Array.isArray(pre[name])) {
                            // already array, push to last
                            pre[name].push(value);
                        } else {
                            // single value, make it array
                            pre[name] = [pre[name], value];
                        }
                    } else {
                        // not exist, put it
                        pre[name] = value;
                    }

                    return pre;
                }, {});
            }

            //对img添加额外数据
            if (node.tag === 'img') {
                node.imgIndex = results.images.length;
                var imgUrl = node.attr.src;
                if (imgUrl[0] == '') {
                    imgUrl.splice(0, 1);
                }
                imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
                node.attr.src = imgUrl;
                node.from = bindName;
                results.images.push(node);
                results.imageUrls.push(imgUrl);
            }

            // 处理font标签样式属性
            if (node.tag === 'font') {
                var fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
                var styleAttrs = {
                    'color': 'color',
                    'face': 'font-family',
                    'size': 'font-size'
                };
                if (!node.attr.style) node.attr.style = [];
                if (!node.styleStr) node.styleStr = '';
                for (var key in styleAttrs) {
                    if (node.attr[key]) {
                        var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
                        node.attr.style.push(styleAttrs[key]);
                        node.attr.style.push(value);
                        node.styleStr += styleAttrs[key] + ': ' + value + ';';
                    }
                }
            }

            //临时记录source资源
            if (node.tag === 'source') {
                results.source = node.attr.src;
            }

            if (unary) {
                // if this tag dosen't have end tag
                // like <img src="hoge.png"/>
                // add to parents
                var parent = bufArray[0] || results;
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            } else {
                bufArray.unshift(node);
            }
        },
        end: function end(tag) {
            //debug(tag);
            // merge into parent tag
            var node = bufArray.shift();
            if (node.tag !== tag) console.error('invalid state: mismatch end tag');

            //当有缓存source资源时于于video补上src资源
            if (node.tag === 'video' && results.source) {
                node.attr.src = results.source;
                delete result.source;
            }

            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            }
        },
        chars: function chars(text) {
            //debug(text);
            var node = {
                node: 'text',
                text: text,
                textArray: transEmojiStr(text)
            };

            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                node.index = parent.index + '.' + parent.nodes.length;
                parent.nodes.push(node);
            }
        },
        comment: function comment(text) {
            //debug(text);
            // var node = {
            //     node: 'comment',
            //     text: text,
            // };
            // var parent = bufArray[0];
            // if (parent.nodes === undefined) {
            //     parent.nodes = [];
            // }
            // parent.nodes.push(node);
        }
    });
    return results;
};

function transEmojiStr(str) {
    // var eReg = new RegExp("["+__reg+' '+"]");
    //   str = str.replace(/\[([^\[\]]+)\]/g,':$1:')

    var emojiObjs = [];
    //如果正则表达式为空
    if (__emojisReg.length == 0 || !__emojis) {
        var emojiObj = {};
        emojiObj.node = "text";
        emojiObj.text = str;
        array = [emojiObj];
        return array;
    }
    //这个地方需要调整
    str = str.replace(/\[([^\[\]]+)\]/g, ':$1:');
    var eReg = new RegExp("[:]");
    var array = str.split(eReg);
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var emojiObj = {};
        if (__emojis[ele]) {
            emojiObj.node = "element";
            emojiObj.tag = "emoji";
            emojiObj.text = __emojis[ele];
            emojiObj.baseSrc = __emojisBaseSrc;
        } else {
            emojiObj.node = "text";
            emojiObj.text = ele;
        }
        emojiObjs.push(emojiObj);
    }

    return emojiObjs;
}

function emojisInit() {
    var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
    var emojis = arguments[2];

    __emojisReg = reg;
    __emojisBaseSrc = baseSrc;
    __emojis = emojis;
}

module.exports = {
    html2json: html2json,
    emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bWwyanNvbi5qcyJdLCJuYW1lcyI6WyJfX3BsYWNlSW1nZVVybEh0dHBzIiwiX19lbW9qaXNSZWciLCJfX2Vtb2ppc0Jhc2VTcmMiLCJfX2Vtb2ppcyIsInd4RGlzY29kZSIsInJlcXVpcmUiLCJIVE1MUGFyc2VyIiwiZW1wdHkiLCJtYWtlTWFwIiwiYmxvY2siLCJpbmxpbmUiLCJjbG9zZVNlbGYiLCJmaWxsQXR0cnMiLCJzcGVjaWFsIiwic3RyIiwib2JqIiwiaXRlbXMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJxIiwidiIsInJlbW92ZURPQ1RZUEUiLCJodG1sIiwicmVwbGFjZSIsInRyaW1IdG1sIiwiaHRtbDJqc29uIiwiYmluZE5hbWUiLCJzdHJEaXNjb2RlIiwiYnVmQXJyYXkiLCJyZXN1bHRzIiwibm9kZSIsIm5vZGVzIiwiaW1hZ2VzIiwiaW1hZ2VVcmxzIiwiaW5kZXgiLCJzdGFydCIsInRhZyIsImF0dHJzIiwidW5hcnkiLCJ0b1N0cmluZyIsInBhcmVudCIsInVuZGVmaW5lZCIsInRhZ1R5cGUiLCJhdHRyIiwicmVkdWNlIiwicHJlIiwibmFtZSIsInZhbHVlIiwiY29uc29sZSIsImRpciIsImNsYXNzU3RyIiwic3R5bGVTdHIiLCJtYXRjaCIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJpbWdJbmRleCIsImltZ1VybCIsInNyYyIsInNwbGljZSIsInVybFRvSHR0cFVybCIsImZyb20iLCJmb250U2l6ZSIsInN0eWxlQXR0cnMiLCJzdHlsZSIsImtleSIsInNvdXJjZSIsInVuc2hpZnQiLCJlbmQiLCJzaGlmdCIsImVycm9yIiwicmVzdWx0IiwiY2hhcnMiLCJ0ZXh0IiwidGV4dEFycmF5IiwidHJhbnNFbW9qaVN0ciIsImNvbW1lbnQiLCJlbW9qaU9ianMiLCJlbW9qaU9iaiIsImFycmF5IiwiZVJlZyIsIlJlZ0V4cCIsImVsZSIsImJhc2VTcmMiLCJlbW9qaXNJbml0IiwicmVnIiwiZW1vamlzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQUFJQSxzQkFBc0IsT0FBMUI7QUFDQSxJQUFJQyxjQUFjLEVBQWxCO0FBQ0EsSUFBSUMsa0JBQWtCLEVBQXRCO0FBQ0EsSUFBSUMsV0FBVyxFQUFmO0FBQ0EsSUFBSUMsWUFBWUMsUUFBUSxnQkFBUixDQUFoQjtBQUNBLElBQUlDLGFBQWFELFFBQVEsaUJBQVIsQ0FBakI7QUFDQTtBQUNBLElBQUlFLFFBQVFDLFFBQVEsb0dBQVIsQ0FBWjtBQUNBO0FBQ0EsSUFBSUMsUUFBUUQsUUFBUSx1VEFBUixDQUFaOztBQUVBO0FBQ0EsSUFBSUUsU0FBU0YsUUFBUSwwTEFBUixDQUFiOztBQUVBO0FBQ0E7QUFDQSxJQUFJRyxZQUFZSCxRQUFRLGtEQUFSLENBQWhCOztBQUVBO0FBQ0EsSUFBSUksWUFBWUosUUFBUSx3R0FBUixDQUFoQjs7QUFFQTtBQUNBLElBQUlLLFVBQVVMLFFBQVEsb0RBQVIsQ0FBZDtBQUNBLFNBQVNBLE9BQVQsQ0FBaUJNLEdBQWpCLEVBQXNCO0FBQ2xCLFFBQUlDLE1BQU0sRUFBVjtBQUFBLFFBQWNDLFFBQVFGLElBQUlHLEtBQUosQ0FBVSxHQUFWLENBQXRCO0FBQ0EsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLE1BQU1HLE1BQTFCLEVBQWtDRCxHQUFsQztBQUNJSCxZQUFJQyxNQUFNRSxDQUFOLENBQUosSUFBZ0IsSUFBaEI7QUFESixLQUVBLE9BQU9ILEdBQVA7QUFDSDs7QUFFRCxTQUFTSyxDQUFULENBQVdDLENBQVgsRUFBYztBQUNWLFdBQU8sTUFBTUEsQ0FBTixHQUFVLEdBQWpCO0FBQ0g7O0FBRUQsU0FBU0MsYUFBVCxDQUF1QkMsSUFBdkIsRUFBNkI7QUFDekIsV0FBT0EsS0FDRkMsT0FERSxDQUNNLGVBRE4sRUFDdUIsRUFEdkIsRUFFRkEsT0FGRSxDQUVNLG1CQUZOLEVBRTJCLEVBRjNCLEVBR0ZBLE9BSEUsQ0FHTSxtQkFITixFQUcyQixFQUgzQixDQUFQO0FBSUg7O0FBRUQsU0FBU0MsUUFBVCxDQUFrQkYsSUFBbEIsRUFBd0I7QUFDdEIsV0FBT0EsS0FDQUMsT0FEQSxDQUNRLE1BRFIsRUFDZ0IsRUFEaEIsRUFFQUEsT0FGQSxDQUVRLGNBRlIsRUFFd0IsRUFGeEIsRUFHQUEsT0FIQSxDQUdRLGVBSFIsRUFHeUIsRUFIekIsRUFJQUEsT0FKQSxDQUlRLFNBSlIsRUFJbUIsR0FKbkIsQ0FBUDtBQUtEOztBQUdELFNBQVNFLFNBQVQsQ0FBbUJILElBQW5CLEVBQXlCSSxRQUF6QixFQUFtQztBQUMvQjtBQUNBSixXQUFPRCxjQUFjQyxJQUFkLENBQVA7QUFDQUEsV0FBT0UsU0FBU0YsSUFBVCxDQUFQO0FBQ0FBLFdBQU9uQixVQUFVd0IsVUFBVixDQUFxQkwsSUFBckIsQ0FBUDtBQUNBO0FBQ0EsUUFBSU0sV0FBVyxFQUFmO0FBQ0EsUUFBSUMsVUFBVTtBQUNWQyxjQUFNSixRQURJO0FBRVZLLGVBQU8sRUFGRztBQUdWQyxnQkFBTyxFQUhHO0FBSVZDLG1CQUFVO0FBSkEsS0FBZDtBQU1BLFFBQUlDLFFBQVEsQ0FBWjtBQUNBN0IsZUFBV2lCLElBQVgsRUFBaUI7QUFDYmEsZUFBTyxlQUFVQyxHQUFWLEVBQWVDLEtBQWYsRUFBc0JDLEtBQXRCLEVBQTZCO0FBQ2hDO0FBQ0E7QUFDQSxnQkFBSVIsT0FBTztBQUNQQSxzQkFBTSxTQURDO0FBRVBNLHFCQUFLQTtBQUZFLGFBQVg7O0FBS0EsZ0JBQUlSLFNBQVNWLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkJZLHFCQUFLSSxLQUFMLEdBQWFBLE1BQU1LLFFBQU4sRUFBYjtBQUNBTCx5QkFBUyxDQUFUO0FBQ0gsYUFIRCxNQUdPO0FBQ0gsb0JBQUlNLFNBQVNaLFNBQVMsQ0FBVCxDQUFiO0FBQ0Esb0JBQUlZLE9BQU9ULEtBQVAsS0FBaUJVLFNBQXJCLEVBQWdDO0FBQzVCRCwyQkFBT1QsS0FBUCxHQUFlLEVBQWY7QUFDSDtBQUNERCxxQkFBS0ksS0FBTCxHQUFhTSxPQUFPTixLQUFQLEdBQWUsR0FBZixHQUFxQk0sT0FBT1QsS0FBUCxDQUFhYixNQUEvQztBQUNIOztBQUVELGdCQUFJVixNQUFNNEIsR0FBTixDQUFKLEVBQWdCO0FBQ1pOLHFCQUFLWSxPQUFMLEdBQWUsT0FBZjtBQUNILGFBRkQsTUFFTyxJQUFJakMsT0FBTzJCLEdBQVAsQ0FBSixFQUFpQjtBQUNwQk4scUJBQUtZLE9BQUwsR0FBZSxRQUFmO0FBQ0gsYUFGTSxNQUVBLElBQUloQyxVQUFVMEIsR0FBVixDQUFKLEVBQW9CO0FBQ3ZCTixxQkFBS1ksT0FBTCxHQUFlLFdBQWY7QUFDSDs7QUFFRCxnQkFBSUwsTUFBTW5CLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDcEJZLHFCQUFLYSxJQUFMLEdBQVlOLE1BQU1PLE1BQU4sQ0FBYSxVQUFVQyxHQUFWLEVBQWVGLElBQWYsRUFBcUI7QUFDMUMsd0JBQUlHLE9BQU9ILEtBQUtHLElBQWhCO0FBQ0Esd0JBQUlDLFFBQVFKLEtBQUtJLEtBQWpCO0FBQ0Esd0JBQUlELFFBQVEsT0FBWixFQUFxQjtBQUNqQkUsZ0NBQVFDLEdBQVIsQ0FBWUYsS0FBWjtBQUNBO0FBQ0FqQiw2QkFBS29CLFFBQUwsR0FBZ0JILEtBQWhCO0FBQ0g7QUFDRDtBQUNBO0FBQ0Esd0JBQUlELFFBQVEsT0FBWixFQUFxQjtBQUNqQkUsZ0NBQVFDLEdBQVIsQ0FBWUYsS0FBWjtBQUNBO0FBQ0FqQiw2QkFBS3FCLFFBQUwsR0FBZ0JKLEtBQWhCO0FBQ0g7QUFDRCx3QkFBSUEsTUFBTUssS0FBTixDQUFZLEdBQVosQ0FBSixFQUFzQjtBQUNsQkwsZ0NBQVFBLE1BQU0vQixLQUFOLENBQVksR0FBWixDQUFSO0FBQ0g7O0FBR0Q7QUFDQTtBQUNBLHdCQUFJNkIsSUFBSUMsSUFBSixDQUFKLEVBQWU7QUFDWCw0QkFBSU8sTUFBTUMsT0FBTixDQUFjVCxJQUFJQyxJQUFKLENBQWQsQ0FBSixFQUE4QjtBQUMxQjtBQUNBRCxnQ0FBSUMsSUFBSixFQUFVUyxJQUFWLENBQWVSLEtBQWY7QUFDSCx5QkFIRCxNQUdPO0FBQ0g7QUFDQUYsZ0NBQUlDLElBQUosSUFBWSxDQUFDRCxJQUFJQyxJQUFKLENBQUQsRUFBWUMsS0FBWixDQUFaO0FBQ0g7QUFDSixxQkFSRCxNQVFPO0FBQ0g7QUFDQUYsNEJBQUlDLElBQUosSUFBWUMsS0FBWjtBQUNIOztBQUVELDJCQUFPRixHQUFQO0FBQ0gsaUJBcENXLEVBb0NULEVBcENTLENBQVo7QUFxQ0g7O0FBRUQ7QUFDQSxnQkFBSWYsS0FBS00sR0FBTCxLQUFhLEtBQWpCLEVBQXdCO0FBQ3BCTixxQkFBSzBCLFFBQUwsR0FBZ0IzQixRQUFRRyxNQUFSLENBQWVkLE1BQS9CO0FBQ0Esb0JBQUl1QyxTQUFTM0IsS0FBS2EsSUFBTCxDQUFVZSxHQUF2QjtBQUNBLG9CQUFJRCxPQUFPLENBQVAsS0FBYSxFQUFqQixFQUFxQjtBQUNqQkEsMkJBQU9FLE1BQVAsQ0FBYyxDQUFkLEVBQWlCLENBQWpCO0FBQ0g7QUFDREYseUJBQVN0RCxVQUFVeUQsWUFBVixDQUF1QkgsTUFBdkIsRUFBK0IxRCxtQkFBL0IsQ0FBVDtBQUNBK0IscUJBQUthLElBQUwsQ0FBVWUsR0FBVixHQUFnQkQsTUFBaEI7QUFDQTNCLHFCQUFLK0IsSUFBTCxHQUFZbkMsUUFBWjtBQUNBRyx3QkFBUUcsTUFBUixDQUFldUIsSUFBZixDQUFvQnpCLElBQXBCO0FBQ0FELHdCQUFRSSxTQUFSLENBQWtCc0IsSUFBbEIsQ0FBdUJFLE1BQXZCO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBSTNCLEtBQUtNLEdBQUwsS0FBYSxNQUFqQixFQUF5QjtBQUNyQixvQkFBSTBCLFdBQVcsQ0FBQyxTQUFELEVBQVksT0FBWixFQUFxQixRQUFyQixFQUErQixPQUEvQixFQUF3QyxTQUF4QyxFQUFtRCxVQUFuRCxFQUErRCxtQkFBL0QsQ0FBZjtBQUNBLG9CQUFJQyxhQUFhO0FBQ2IsNkJBQVMsT0FESTtBQUViLDRCQUFRLGFBRks7QUFHYiw0QkFBUTtBQUhLLGlCQUFqQjtBQUtBLG9CQUFJLENBQUNqQyxLQUFLYSxJQUFMLENBQVVxQixLQUFmLEVBQXNCbEMsS0FBS2EsSUFBTCxDQUFVcUIsS0FBVixHQUFrQixFQUFsQjtBQUN0QixvQkFBSSxDQUFDbEMsS0FBS3FCLFFBQVYsRUFBb0JyQixLQUFLcUIsUUFBTCxHQUFnQixFQUFoQjtBQUNwQixxQkFBSyxJQUFJYyxHQUFULElBQWdCRixVQUFoQixFQUE0QjtBQUN4Qix3QkFBSWpDLEtBQUthLElBQUwsQ0FBVXNCLEdBQVYsQ0FBSixFQUFvQjtBQUNoQiw0QkFBSWxCLFFBQVFrQixRQUFRLE1BQVIsR0FBaUJILFNBQVNoQyxLQUFLYSxJQUFMLENBQVVzQixHQUFWLElBQWUsQ0FBeEIsQ0FBakIsR0FBOENuQyxLQUFLYSxJQUFMLENBQVVzQixHQUFWLENBQTFEO0FBQ0FuQyw2QkFBS2EsSUFBTCxDQUFVcUIsS0FBVixDQUFnQlQsSUFBaEIsQ0FBcUJRLFdBQVdFLEdBQVgsQ0FBckI7QUFDQW5DLDZCQUFLYSxJQUFMLENBQVVxQixLQUFWLENBQWdCVCxJQUFoQixDQUFxQlIsS0FBckI7QUFDQWpCLDZCQUFLcUIsUUFBTCxJQUFpQlksV0FBV0UsR0FBWCxJQUFrQixJQUFsQixHQUF5QmxCLEtBQXpCLEdBQWlDLEdBQWxEO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0EsZ0JBQUdqQixLQUFLTSxHQUFMLEtBQWEsUUFBaEIsRUFBeUI7QUFDckJQLHdCQUFRcUMsTUFBUixHQUFpQnBDLEtBQUthLElBQUwsQ0FBVWUsR0FBM0I7QUFDSDs7QUFFRCxnQkFBSXBCLEtBQUosRUFBVztBQUNQO0FBQ0E7QUFDQTtBQUNBLG9CQUFJRSxTQUFTWixTQUFTLENBQVQsS0FBZUMsT0FBNUI7QUFDQSxvQkFBSVcsT0FBT1QsS0FBUCxLQUFpQlUsU0FBckIsRUFBZ0M7QUFDNUJELDJCQUFPVCxLQUFQLEdBQWUsRUFBZjtBQUNIO0FBQ0RTLHVCQUFPVCxLQUFQLENBQWF3QixJQUFiLENBQWtCekIsSUFBbEI7QUFDSCxhQVRELE1BU087QUFDSEYseUJBQVN1QyxPQUFULENBQWlCckMsSUFBakI7QUFDSDtBQUNKLFNBdkhZO0FBd0hic0MsYUFBSyxhQUFVaEMsR0FBVixFQUFlO0FBQ2hCO0FBQ0E7QUFDQSxnQkFBSU4sT0FBT0YsU0FBU3lDLEtBQVQsRUFBWDtBQUNBLGdCQUFJdkMsS0FBS00sR0FBTCxLQUFhQSxHQUFqQixFQUFzQlksUUFBUXNCLEtBQVIsQ0FBYyxpQ0FBZDs7QUFFdEI7QUFDQSxnQkFBR3hDLEtBQUtNLEdBQUwsS0FBYSxPQUFiLElBQXdCUCxRQUFRcUMsTUFBbkMsRUFBMEM7QUFDdENwQyxxQkFBS2EsSUFBTCxDQUFVZSxHQUFWLEdBQWdCN0IsUUFBUXFDLE1BQXhCO0FBQ0EsdUJBQU9LLE9BQU9MLE1BQWQ7QUFDSDs7QUFFRCxnQkFBSXRDLFNBQVNWLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkJXLHdCQUFRRSxLQUFSLENBQWN3QixJQUFkLENBQW1CekIsSUFBbkI7QUFDSCxhQUZELE1BRU87QUFDSCxvQkFBSVUsU0FBU1osU0FBUyxDQUFULENBQWI7QUFDQSxvQkFBSVksT0FBT1QsS0FBUCxLQUFpQlUsU0FBckIsRUFBZ0M7QUFDNUJELDJCQUFPVCxLQUFQLEdBQWUsRUFBZjtBQUNIO0FBQ0RTLHVCQUFPVCxLQUFQLENBQWF3QixJQUFiLENBQWtCekIsSUFBbEI7QUFDSDtBQUNKLFNBN0lZO0FBOEliMEMsZUFBTyxlQUFVQyxJQUFWLEVBQWdCO0FBQ25CO0FBQ0EsZ0JBQUkzQyxPQUFPO0FBQ1BBLHNCQUFNLE1BREM7QUFFUDJDLHNCQUFNQSxJQUZDO0FBR1BDLDJCQUFVQyxjQUFjRixJQUFkO0FBSEgsYUFBWDs7QUFNQSxnQkFBSTdDLFNBQVNWLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkJXLHdCQUFRRSxLQUFSLENBQWN3QixJQUFkLENBQW1CekIsSUFBbkI7QUFDSCxhQUZELE1BRU87QUFDSCxvQkFBSVUsU0FBU1osU0FBUyxDQUFULENBQWI7QUFDQSxvQkFBSVksT0FBT1QsS0FBUCxLQUFpQlUsU0FBckIsRUFBZ0M7QUFDNUJELDJCQUFPVCxLQUFQLEdBQWUsRUFBZjtBQUNIO0FBQ0RELHFCQUFLSSxLQUFMLEdBQWFNLE9BQU9OLEtBQVAsR0FBZSxHQUFmLEdBQXFCTSxPQUFPVCxLQUFQLENBQWFiLE1BQS9DO0FBQ0FzQix1QkFBT1QsS0FBUCxDQUFhd0IsSUFBYixDQUFrQnpCLElBQWxCO0FBQ0g7QUFDSixTQWhLWTtBQWlLYjhDLGlCQUFTLGlCQUFVSCxJQUFWLEVBQWdCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUE1S1ksS0FBakI7QUE4S0EsV0FBTzVDLE9BQVA7QUFDSDs7QUFFRCxTQUFTOEMsYUFBVCxDQUF1QjlELEdBQXZCLEVBQTJCO0FBQ3pCO0FBQ0Y7O0FBRUUsUUFBSWdFLFlBQVksRUFBaEI7QUFDQTtBQUNBLFFBQUc3RSxZQUFZa0IsTUFBWixJQUFzQixDQUF0QixJQUEyQixDQUFDaEIsUUFBL0IsRUFBd0M7QUFDcEMsWUFBSTRFLFdBQVcsRUFBZjtBQUNBQSxpQkFBU2hELElBQVQsR0FBZ0IsTUFBaEI7QUFDQWdELGlCQUFTTCxJQUFULEdBQWdCNUQsR0FBaEI7QUFDQWtFLGdCQUFRLENBQUNELFFBQUQsQ0FBUjtBQUNBLGVBQU9DLEtBQVA7QUFDSDtBQUNEO0FBQ0FsRSxVQUFNQSxJQUFJVSxPQUFKLENBQVksaUJBQVosRUFBOEIsTUFBOUIsQ0FBTjtBQUNBLFFBQUl5RCxPQUFPLElBQUlDLE1BQUosQ0FBVyxLQUFYLENBQVg7QUFDQSxRQUFJRixRQUFRbEUsSUFBSUcsS0FBSixDQUFVZ0UsSUFBVixDQUFaO0FBQ0EsU0FBSSxJQUFJL0QsSUFBSSxDQUFaLEVBQWVBLElBQUk4RCxNQUFNN0QsTUFBekIsRUFBaUNELEdBQWpDLEVBQXFDO0FBQ25DLFlBQUlpRSxNQUFNSCxNQUFNOUQsQ0FBTixDQUFWO0FBQ0EsWUFBSTZELFdBQVcsRUFBZjtBQUNBLFlBQUc1RSxTQUFTZ0YsR0FBVCxDQUFILEVBQWlCO0FBQ2ZKLHFCQUFTaEQsSUFBVCxHQUFnQixTQUFoQjtBQUNBZ0QscUJBQVMxQyxHQUFULEdBQWUsT0FBZjtBQUNBMEMscUJBQVNMLElBQVQsR0FBZ0J2RSxTQUFTZ0YsR0FBVCxDQUFoQjtBQUNBSixxQkFBU0ssT0FBVCxHQUFrQmxGLGVBQWxCO0FBQ0QsU0FMRCxNQUtLO0FBQ0g2RSxxQkFBU2hELElBQVQsR0FBZ0IsTUFBaEI7QUFDQWdELHFCQUFTTCxJQUFULEdBQWdCUyxHQUFoQjtBQUNEO0FBQ0RMLGtCQUFVdEIsSUFBVixDQUFldUIsUUFBZjtBQUNEOztBQUVELFdBQU9ELFNBQVA7QUFDRDs7QUFFRCxTQUFTTyxVQUFULEdBQTZEO0FBQUEsUUFBekNDLEdBQXlDLHVFQUFyQyxFQUFxQztBQUFBLFFBQWxDRixPQUFrQyx1RUFBMUIsa0JBQTBCO0FBQUEsUUFBUEcsTUFBTzs7QUFDekR0RixrQkFBY3FGLEdBQWQ7QUFDQXBGLHNCQUFnQmtGLE9BQWhCO0FBQ0FqRixlQUFTb0YsTUFBVDtBQUNIOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2IvRCxlQUFXQSxTQURFO0FBRWIyRCxnQkFBV0E7QUFGRSxDQUFqQiIsImZpbGUiOiJodG1sMmpzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogaHRtbDJKc29uIOaUuemAoOadpeiHqjogaHR0cHM6Ly9naXRodWIuY29tL0p4Y2svaHRtbDJqc29uXHJcbiAqIFxyXG4gKiBcclxuICogYXV0aG9yOiBEaSAo5b6u5L+h5bCP56iL5bqP5byA5Y+R5bel56iL5biIKVxyXG4gKiBvcmdhbml6YXRpb246IFdlQXBwRGV2KOW+ruS/oeWwj+eoi+W6j+W8gOWPkeiuuuWdmykoaHR0cDovL3dlYXBwZGV2LmNvbSlcclxuICogICAgICAgICAgICAgICDlnoLnm7Tlvq7kv6HlsI/nqIvluo/lvIDlj5HkuqTmtYHnpL7ljLpcclxuICogXHJcbiAqIGdpdGh1YuWcsOWdgDogaHR0cHM6Ly9naXRodWIuY29tL2ljaW5keS93eFBhcnNlXHJcbiAqIFxyXG4gKiBmb3I6IOW+ruS/oeWwj+eoi+W6j+WvjOaWh+acrOino+aekFxyXG4gKiBkZXRhaWwgOiBodHRwOi8vd2VhcHBkZXYuY29tL3Qvd3hwYXJzZS1hbHBoYTAtMS1odG1sLW1hcmtkb3duLzE4NFxyXG4gKi9cclxuXHJcbnZhciBfX3BsYWNlSW1nZVVybEh0dHBzID0gXCJodHRwc1wiO1xyXG52YXIgX19lbW9qaXNSZWcgPSAnJztcclxudmFyIF9fZW1vamlzQmFzZVNyYyA9ICcnO1xyXG52YXIgX19lbW9qaXMgPSB7fTtcclxudmFyIHd4RGlzY29kZSA9IHJlcXVpcmUoJy4vd3hEaXNjb2RlLmpzJyk7XHJcbnZhciBIVE1MUGFyc2VyID0gcmVxdWlyZSgnLi9odG1scGFyc2VyLmpzJyk7XHJcbi8vIEVtcHR5IEVsZW1lbnRzIC0gSFRNTCA1XHJcbnZhciBlbXB0eSA9IG1ha2VNYXAoXCJhcmVhLGJhc2UsYmFzZWZvbnQsYnIsY29sLGZyYW1lLGhyLGltZyxpbnB1dCxsaW5rLG1ldGEscGFyYW0sZW1iZWQsY29tbWFuZCxrZXlnZW4sc291cmNlLHRyYWNrLHdiclwiKTtcclxuLy8gQmxvY2sgRWxlbWVudHMgLSBIVE1MIDVcclxudmFyIGJsb2NrID0gbWFrZU1hcChcImJyLGEsY29kZSxhZGRyZXNzLGFydGljbGUsYXBwbGV0LGFzaWRlLGF1ZGlvLGJsb2NrcXVvdGUsYnV0dG9uLGNhbnZhcyxjZW50ZXIsZGQsZGVsLGRpcixkaXYsZGwsZHQsZmllbGRzZXQsZmlnY2FwdGlvbixmaWd1cmUsZm9vdGVyLGZvcm0sZnJhbWVzZXQsaDEsaDIsaDMsaDQsaDUsaDYsaGVhZGVyLGhncm91cCxocixpZnJhbWUsaW5zLGlzaW5kZXgsbGksbWFwLG1lbnUsbm9mcmFtZXMsbm9zY3JpcHQsb2JqZWN0LG9sLG91dHB1dCxwLHByZSxzZWN0aW9uLHNjcmlwdCx0YWJsZSx0Ym9keSx0ZCx0Zm9vdCx0aCx0aGVhZCx0cix1bCx2aWRlb1wiKTtcclxuXHJcbi8vIElubGluZSBFbGVtZW50cyAtIEhUTUwgNVxyXG52YXIgaW5saW5lID0gbWFrZU1hcChcImFiYnIsYWNyb255bSxhcHBsZXQsYixiYXNlZm9udCxiZG8sYmlnLGJ1dHRvbixjaXRlLGRlbCxkZm4sZW0sZm9udCxpLGlmcmFtZSxpbWcsaW5wdXQsaW5zLGtiZCxsYWJlbCxtYXAsb2JqZWN0LHEscyxzYW1wLHNjcmlwdCxzZWxlY3Qsc21hbGwsc3BhbixzdHJpa2Usc3Ryb25nLHN1YixzdXAsdGV4dGFyZWEsdHQsdSx2YXJcIik7XHJcblxyXG4vLyBFbGVtZW50cyB0aGF0IHlvdSBjYW4sIGludGVudGlvbmFsbHksIGxlYXZlIG9wZW5cclxuLy8gKGFuZCB3aGljaCBjbG9zZSB0aGVtc2VsdmVzKVxyXG52YXIgY2xvc2VTZWxmID0gbWFrZU1hcChcImNvbGdyb3VwLGRkLGR0LGxpLG9wdGlvbnMscCx0ZCx0Zm9vdCx0aCx0aGVhZCx0clwiKTtcclxuXHJcbi8vIEF0dHJpYnV0ZXMgdGhhdCBoYXZlIHRoZWlyIHZhbHVlcyBmaWxsZWQgaW4gZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXHJcbnZhciBmaWxsQXR0cnMgPSBtYWtlTWFwKFwiY2hlY2tlZCxjb21wYWN0LGRlY2xhcmUsZGVmZXIsZGlzYWJsZWQsaXNtYXAsbXVsdGlwbGUsbm9ocmVmLG5vcmVzaXplLG5vc2hhZGUsbm93cmFwLHJlYWRvbmx5LHNlbGVjdGVkXCIpO1xyXG5cclxuLy8gU3BlY2lhbCBFbGVtZW50cyAoY2FuIGNvbnRhaW4gYW55dGhpbmcpXHJcbnZhciBzcGVjaWFsID0gbWFrZU1hcChcInd4eHhjb2RlLXN0eWxlLHNjcmlwdCxzdHlsZSx2aWV3LHNjcm9sbC12aWV3LGJsb2NrXCIpO1xyXG5mdW5jdGlvbiBtYWtlTWFwKHN0cikge1xyXG4gICAgdmFyIG9iaiA9IHt9LCBpdGVtcyA9IHN0ci5zcGxpdChcIixcIik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIG9ialtpdGVtc1tpXV0gPSB0cnVlO1xyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuZnVuY3Rpb24gcSh2KSB7XHJcbiAgICByZXR1cm4gJ1wiJyArIHYgKyAnXCInO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVET0NUWVBFKGh0bWwpIHtcclxuICAgIHJldHVybiBodG1sXHJcbiAgICAgICAgLnJlcGxhY2UoLzxcXD94bWwuKlxcPz5cXG4vLCAnJylcclxuICAgICAgICAucmVwbGFjZSgvPC4qIWRvY3R5cGUuKlxcPlxcbi8sICcnKVxyXG4gICAgICAgIC5yZXBsYWNlKC88LiohRE9DVFlQRS4qXFw+XFxuLywgJycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0cmltSHRtbChodG1sKSB7XHJcbiAgcmV0dXJuIGh0bWxcclxuICAgICAgICAucmVwbGFjZSgvXFxuKy9nLCAnJylcclxuICAgICAgICAucmVwbGFjZSgvPCEtLS4qPy0tPi9pZywgJycpXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcL1xcKi4qP1xcKlxcLy9pZywgJycpXHJcbiAgICAgICAgLnJlcGxhY2UoL1sgXSs8L2lnLCAnPCcpXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBodG1sMmpzb24oaHRtbCwgYmluZE5hbWUpIHtcclxuICAgIC8v5aSE55CG5a2X56ym5LiyXHJcbiAgICBodG1sID0gcmVtb3ZlRE9DVFlQRShodG1sKTtcclxuICAgIGh0bWwgPSB0cmltSHRtbChodG1sKTtcclxuICAgIGh0bWwgPSB3eERpc2NvZGUuc3RyRGlzY29kZShodG1sKTtcclxuICAgIC8v55Sf5oiQbm9kZeiKgueCuVxyXG4gICAgdmFyIGJ1ZkFycmF5ID0gW107XHJcbiAgICB2YXIgcmVzdWx0cyA9IHtcclxuICAgICAgICBub2RlOiBiaW5kTmFtZSxcclxuICAgICAgICBub2RlczogW10sXHJcbiAgICAgICAgaW1hZ2VzOltdLFxyXG4gICAgICAgIGltYWdlVXJsczpbXVxyXG4gICAgfTtcclxuICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICBIVE1MUGFyc2VyKGh0bWwsIHtcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKHRhZywgYXR0cnMsIHVuYXJ5KSB7XHJcbiAgICAgICAgICAgIC8vZGVidWcodGFnLCBhdHRycywgdW5hcnkpO1xyXG4gICAgICAgICAgICAvLyBub2RlIGZvciB0aGlzIGVsZW1lbnRcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB7XHJcbiAgICAgICAgICAgICAgICBub2RlOiAnZWxlbWVudCcsXHJcbiAgICAgICAgICAgICAgICB0YWc6IHRhZyxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChidWZBcnJheS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggPSBpbmRleC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICBpbmRleCArPSAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gYnVmQXJyYXlbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Lm5vZGVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggPSBwYXJlbnQuaW5kZXggKyAnLicgKyBwYXJlbnQubm9kZXMubGVuZ3RoXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChibG9ja1t0YWddKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnRhZ1R5cGUgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5saW5lW3RhZ10pIHtcclxuICAgICAgICAgICAgICAgIG5vZGUudGFnVHlwZSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xvc2VTZWxmW3RhZ10pIHtcclxuICAgICAgICAgICAgICAgIG5vZGUudGFnVHlwZSA9IFwiY2xvc2VTZWxmXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhdHRycy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuYXR0ciA9IGF0dHJzLnJlZHVjZShmdW5jdGlvbiAocHJlLCBhdHRyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBhdHRyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0ci52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSAnY2xhc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIHZhbHVlID0gdmFsdWUuam9pbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNsYXNzU3RyID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhcyBtdWx0aSBhdHRpYnV0ZXNcclxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIGl0IGFycmF5IG9mIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09ICdzdHlsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgdmFsdWUgPSB2YWx1ZS5qb2luKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVTdHIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm1hdGNoKC8gLykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYXR0ciBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1lcmdlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZVtuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmVbbmFtZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5IGFycmF5LCBwdXNoIHRvIGxhc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVtuYW1lXS5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSB2YWx1ZSwgbWFrZSBpdCBhcnJheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlW25hbWVdID0gW3ByZVtuYW1lXSwgdmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm90IGV4aXN0LCBwdXQgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlO1xyXG4gICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+WvuWltZ+a3u+WKoOmineWkluaVsOaNrlxyXG4gICAgICAgICAgICBpZiAobm9kZS50YWcgPT09ICdpbWcnKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmltZ0luZGV4ID0gcmVzdWx0cy5pbWFnZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdmFyIGltZ1VybCA9IG5vZGUuYXR0ci5zcmM7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1nVXJsWzBdID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nVXJsLnNwbGljZSgwLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGltZ1VybCA9IHd4RGlzY29kZS51cmxUb0h0dHBVcmwoaW1nVXJsLCBfX3BsYWNlSW1nZVVybEh0dHBzKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYXR0ci5zcmMgPSBpbWdVcmw7XHJcbiAgICAgICAgICAgICAgICBub2RlLmZyb20gPSBiaW5kTmFtZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMuaW1hZ2VzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLmltYWdlVXJscy5wdXNoKGltZ1VybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOWkhOeQhmZvbnTmoIfnrb7moLflvI/lsZ7mgKdcclxuICAgICAgICAgICAgaWYgKG5vZGUudGFnID09PSAnZm9udCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmb250U2l6ZSA9IFsneC1zbWFsbCcsICdzbWFsbCcsICdtZWRpdW0nLCAnbGFyZ2UnLCAneC1sYXJnZScsICd4eC1sYXJnZScsICctd2Via2l0LXh4eC1sYXJnZSddO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlQXR0cnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yJzogJ2NvbG9yJyxcclxuICAgICAgICAgICAgICAgICAgICAnZmFjZSc6ICdmb250LWZhbWlseScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3NpemUnOiAnZm9udC1zaXplJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGlmICghbm9kZS5hdHRyLnN0eWxlKSBub2RlLmF0dHIuc3R5bGUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmICghbm9kZS5zdHlsZVN0cikgbm9kZS5zdHlsZVN0ciA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHN0eWxlQXR0cnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5hdHRyW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ga2V5ID09PSAnc2l6ZScgPyBmb250U2l6ZVtub2RlLmF0dHJba2V5XS0xXSA6IG5vZGUuYXR0cltrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmF0dHIuc3R5bGUucHVzaChzdHlsZUF0dHJzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmF0dHIuc3R5bGUucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVTdHIgKz0gc3R5bGVBdHRyc1trZXldICsgJzogJyArIHZhbHVlICsgJzsnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/kuLTml7borrDlvZVzb3VyY2XotYTmupBcclxuICAgICAgICAgICAgaWYobm9kZS50YWcgPT09ICdzb3VyY2UnKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMuc291cmNlID0gbm9kZS5hdHRyLnNyYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHVuYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIHRhZyBkb3Nlbid0IGhhdmUgZW5kIHRhZ1xyXG4gICAgICAgICAgICAgICAgLy8gbGlrZSA8aW1nIHNyYz1cImhvZ2UucG5nXCIvPlxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRvIHBhcmVudHNcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBidWZBcnJheVswXSB8fCByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Lm5vZGVzID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1ZkFycmF5LnVuc2hpZnQobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZDogZnVuY3Rpb24gKHRhZykge1xyXG4gICAgICAgICAgICAvL2RlYnVnKHRhZyk7XHJcbiAgICAgICAgICAgIC8vIG1lcmdlIGludG8gcGFyZW50IHRhZ1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGJ1ZkFycmF5LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnRhZyAhPT0gdGFnKSBjb25zb2xlLmVycm9yKCdpbnZhbGlkIHN0YXRlOiBtaXNtYXRjaCBlbmQgdGFnJyk7XHJcblxyXG4gICAgICAgICAgICAvL+W9k+aciee8k+WtmHNvdXJjZei1hOa6kOaXtuS6juS6jnZpZGVv6KGl5LiKc3Jj6LWE5rqQXHJcbiAgICAgICAgICAgIGlmKG5vZGUudGFnID09PSAndmlkZW8nICYmIHJlc3VsdHMuc291cmNlKXtcclxuICAgICAgICAgICAgICAgIG5vZGUuYXR0ci5zcmMgPSByZXN1bHRzLnNvdXJjZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSByZXN1bHQuc291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYnVmQXJyYXkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLm5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gYnVmQXJyYXlbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50Lm5vZGVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQubm9kZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcmVudC5ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFyczogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICAgICAgLy9kZWJ1Zyh0ZXh0KTtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB7XHJcbiAgICAgICAgICAgICAgICBub2RlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgdGV4dEFycmF5OnRyYW5zRW1vamlTdHIodGV4dClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChidWZBcnJheS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBidWZBcnJheVswXTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubm9kZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5ub2RlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9kZS5pbmRleCA9IHBhcmVudC5pbmRleCArICcuJyArIHBhcmVudC5ub2Rlcy5sZW5ndGhcclxuICAgICAgICAgICAgICAgIHBhcmVudC5ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21tZW50OiBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgICAgICAvL2RlYnVnKHRleHQpO1xyXG4gICAgICAgICAgICAvLyB2YXIgbm9kZSA9IHtcclxuICAgICAgICAgICAgLy8gICAgIG5vZGU6ICdjb21tZW50JyxcclxuICAgICAgICAgICAgLy8gICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIC8vIH07XHJcbiAgICAgICAgICAgIC8vIHZhciBwYXJlbnQgPSBidWZBcnJheVswXTtcclxuICAgICAgICAgICAgLy8gaWYgKHBhcmVudC5ub2RlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBwYXJlbnQubm9kZXMgPSBbXTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBwYXJlbnQubm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxufTtcclxuXHJcbmZ1bmN0aW9uIHRyYW5zRW1vamlTdHIoc3RyKXtcclxuICAvLyB2YXIgZVJlZyA9IG5ldyBSZWdFeHAoXCJbXCIrX19yZWcrJyAnK1wiXVwiKTtcclxuLy8gICBzdHIgPSBzdHIucmVwbGFjZSgvXFxbKFteXFxbXFxdXSspXFxdL2csJzokMTonKVxyXG4gIFxyXG4gIHZhciBlbW9qaU9ianMgPSBbXTtcclxuICAvL+WmguaenOato+WImeihqOi+vuW8j+S4uuepulxyXG4gIGlmKF9fZW1vamlzUmVnLmxlbmd0aCA9PSAwIHx8ICFfX2Vtb2ppcyl7XHJcbiAgICAgIHZhciBlbW9qaU9iaiA9IHt9XHJcbiAgICAgIGVtb2ppT2JqLm5vZGUgPSBcInRleHRcIjtcclxuICAgICAgZW1vamlPYmoudGV4dCA9IHN0cjtcclxuICAgICAgYXJyYXkgPSBbZW1vamlPYmpdO1xyXG4gICAgICByZXR1cm4gYXJyYXk7XHJcbiAgfVxyXG4gIC8v6L+Z5Liq5Zyw5pa56ZyA6KaB6LCD5pW0XHJcbiAgc3RyID0gc3RyLnJlcGxhY2UoL1xcWyhbXlxcW1xcXV0rKVxcXS9nLCc6JDE6JylcclxuICB2YXIgZVJlZyA9IG5ldyBSZWdFeHAoXCJbOl1cIik7XHJcbiAgdmFyIGFycmF5ID0gc3RyLnNwbGl0KGVSZWcpO1xyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKyl7XHJcbiAgICB2YXIgZWxlID0gYXJyYXlbaV07XHJcbiAgICB2YXIgZW1vamlPYmogPSB7fTtcclxuICAgIGlmKF9fZW1vamlzW2VsZV0pe1xyXG4gICAgICBlbW9qaU9iai5ub2RlID0gXCJlbGVtZW50XCI7XHJcbiAgICAgIGVtb2ppT2JqLnRhZyA9IFwiZW1vamlcIjtcclxuICAgICAgZW1vamlPYmoudGV4dCA9IF9fZW1vamlzW2VsZV07XHJcbiAgICAgIGVtb2ppT2JqLmJhc2VTcmM9IF9fZW1vamlzQmFzZVNyYztcclxuICAgIH1lbHNle1xyXG4gICAgICBlbW9qaU9iai5ub2RlID0gXCJ0ZXh0XCI7XHJcbiAgICAgIGVtb2ppT2JqLnRleHQgPSBlbGU7XHJcbiAgICB9XHJcbiAgICBlbW9qaU9ianMucHVzaChlbW9qaU9iaik7XHJcbiAgfVxyXG4gIFxyXG4gIHJldHVybiBlbW9qaU9ianM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVtb2ppc0luaXQocmVnPScnLGJhc2VTcmM9XCIvd3hQYXJzZS9lbW9qaXMvXCIsZW1vamlzKXtcclxuICAgIF9fZW1vamlzUmVnID0gcmVnO1xyXG4gICAgX19lbW9qaXNCYXNlU3JjPWJhc2VTcmM7XHJcbiAgICBfX2Vtb2ppcz1lbW9qaXM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaHRtbDJqc29uOiBodG1sMmpzb24sXHJcbiAgICBlbW9qaXNJbml0OmVtb2ppc0luaXRcclxufTtcclxuXHJcbiJdfQ==