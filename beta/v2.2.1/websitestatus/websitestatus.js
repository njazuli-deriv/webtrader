define(["jquery","../websockets/binary_websockets","../accountstatus/accountstatus"],function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}var e=d(a),f=d(b),g=d(c),h=function(a){e["default"](".webtrader-dialog").parent().each(function(){var b=1*e["default"](this).css("top").replace("px","");a>=b&&e["default"](this).animate({top:a},300)})},i=function(a){if("up"===a.website_status.site_status.toLowerCase()){var b=e["default"]("#msg-notification");b.is(":visible")&&!g["default"].is_shown()&&b.slideUp(500)&&h(110)}else{var c=e["default"]("#msg-notification"),d=e["default"]('<div class="error-msg"/>').append(a.website_status.message||"Seems like our servers are down, we are working on fixing it.".i18n());c.html(d)&&c.slideDown(500)&&h(140)}};f["default"].events.on("website_status",i),f["default"].cached.send({website_status:1,subscribe:1}).then(i)});