define(["exports","jquery","../websockets/binary_websockets","../navigation/menu","../common/marketutils","jquery-growl"],function(a,b,c,d,e){"use strict";function f(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var g=f(b),h=f(c),i=f(d),j=function(a){g["default"].growl.error({message:a.message})},k=function(){h["default"].send({active_symbols:"brief"}).then(function(a){var b=_(a.active_symbols).groupBy("market").map(function(a){var b=_.head(a),c={name:b.market,display_name:b.market_display_name};return c.submarkets=_(a).groupBy("submarket").map(function(a){var b=_.head(a),c={name:b.submarket,display_name:b.submarket_display_name};return c.instruments=_.map(a,function(a){return{symbol:a.symbol,display_name:a.display_name,is_disabled:a.is_trading_suspended||!a.exchange_is_open,pip:a.pip}}),c.is_disabled=_.every(c.instruments,"is_disabled"),c}).value(),c.is_disabled=_.every(c.submarkets,"is_disabled"),c}).value();b=e.getMarketPosition(b);var c=g["default"]("#nav-menu").find(".trade");i["default"].refreshMenu(c,b,function(a,b,c){h["default"].send({contracts_for:a}).then(function(d){require(["trade/tradeDialog"],function(e){return e.init({symbol:a,display_name:b,pip:c},d.contracts_for)})})["catch"](j)})})["catch"](j)},l=a.init=function(){require(["trade/tradeDialog"]),k(),require(["websockets/binary_websockets"],function(a){a.events.on("login",k),a.events.on("logout",k)});g["default"]("#nav-menu").find(".trade").on("mouseleave",k)};a["default"]={init:l}});