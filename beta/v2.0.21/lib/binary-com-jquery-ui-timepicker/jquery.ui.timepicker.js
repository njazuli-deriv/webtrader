!function($){function Timepicker(){this.debug=!0,this._curInst=null,this._disabledInputs=[],this._timepickerShowing=!1,this._inDialog=!1,this._dialogClass="ui-timepicker-dialog",this._mainDivId="ui-timepicker-div",this._inlineClass="ui-timepicker-inline",this._currentClass="ui-timepicker-current",this._dayOverClass="ui-timepicker-days-cell-over",this.regional=[],this.regional[""]={hourText:"Hour",minuteText:"Minute",amPmText:["AM","PM"],closeButtonText:"Done",nowButtonText:"Now",deselectButtonText:"Deselect"},this._defaults={showOn:"focus",button:null,showAnim:"fadeIn",showOptions:{},appendText:"",beforeShow:null,onSelect:null,onClose:null,timeSeparator:":",periodSeparator:" ",showPeriod:!1,showPeriodLabels:!0,showLeadingZero:!0,showMinutesLeadingZero:!0,altField:"",defaultTime:"now",myPosition:"left top",atPosition:"left bottom",onHourShow:null,onMinuteShow:null,hours:{starts:0,ends:23},minutes:{starts:0,ends:55,interval:5,manual:[]},rows:4,showHours:!0,showMinutes:!0,optionalMinutes:!1,showCloseButton:!1,showNowButton:!1,showDeselectButton:!1,maxTime:{hour:null,minute:null},minTime:{hour:null,minute:null}},$.extend(this._defaults,this.regional[""]),this.tpDiv=$('<div id="'+this._mainDivId+'" class="ui-timepicker ui-widget ui-helper-clearfix ui-corner-all " style="display: none"></div>')}function extendRemove(a,b){$.extend(a,b);for(var c in b)(null==b[c]||void 0==b[c])&&(a[c]=b[c]);return a}$.extend($.ui,{timepicker:{version:"0.3.3"}});var PROP_NAME="timepicker",tpuuid=(new Date).getTime();$.extend(Timepicker.prototype,{markerClassName:"hasTimepicker",log:function(){this.debug},_widgetTimepicker:function(){return this.tpDiv},setDefaults:function(a){return extendRemove(this._defaults,a||{}),this},_attachTimepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("time:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline="div"==nodeName||"span"==nodeName;target.id||(this.uuid+=1,target.id="tp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),"input"==nodeName?(this._connectTimepicker(target,inst),this._setTimeFromField(inst)):inline&&this._inlineTimepicker(target,inst)},_newInst:function(a,b){var c=a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:c,input:a,inline:b,tpDiv:b?$('<div class="'+this._inlineClass+' ui-timepicker ui-widget  ui-helper-clearfix"></div>'):this.tpDiv}},_connectTimepicker:function(a,b){var c=$(a);b.append=$([]),b.trigger=$([]),c.hasClass(this.markerClassName)||(this._attachments(c,b),c.addClass(this.markerClassName).keydown(this._doKeyDown).keyup(this._doKeyUp).bind("setData.timepicker",function(a,c,d){b.settings[c]=d}).bind("getData.timepicker",function(a,c){return this._get(b,c)}),$.data(a,PROP_NAME,b))},_doKeyDown:function(a){var b=$.timepicker._getInst(a.target),c=!0;if(b._keyEvent=!0,$.timepicker._timepickerShowing)switch(a.keyCode){case 9:$.timepicker._hideTimepicker(),c=!1;break;case 13:return $.timepicker._updateSelectedValue(b),$.timepicker._hideTimepicker(),!1;case 27:$.timepicker._hideTimepicker();break;default:c=!1}else 36==a.keyCode&&a.ctrlKey?$.timepicker._showTimepicker(this):c=!1;c&&(a.preventDefault(),a.stopPropagation())},_doKeyUp:function(a){var b=$.timepicker._getInst(a.target);$.timepicker._setTimeFromField(b),$.timepicker._updateTimepicker(b)},_attachments:function(a,b){var c=this._get(b,"appendText"),d=this._get(b,"isRTL");b.append&&b.append.remove(),c&&(b.append=$('<span class="'+this._appendClass+'">'+c+"</span>"),a[d?"before":"after"](b.append)),a.unbind("focus.timepicker",this._showTimepicker),a.unbind("click.timepicker",this._adjustZIndex),b.trigger&&b.trigger.remove();var e=this._get(b,"showOn");if(("focus"==e||"both"==e)&&(a.bind("focus.timepicker",this._showTimepicker),a.bind("click.timepicker",this._adjustZIndex)),"button"==e||"both"==e){var f=this._get(b,"button");null==f&&(f=$('<button class="ui-timepicker-trigger" type="button">...</button>'),a.after(f)),$(f).bind("click.timepicker",function(){return $.timepicker._timepickerShowing&&$.timepicker._lastInput==a[0]?$.timepicker._hideTimepicker():b.input.is(":disabled")||$.timepicker._showTimepicker(a[0]),!1})}},_inlineTimepicker:function(a,b){var c=$(a);c.hasClass(this.markerClassName)||(c.addClass(this.markerClassName).append(b.tpDiv).bind("setData.timepicker",function(a,c,d){b.settings[c]=d}).bind("getData.timepicker",function(a,c){return this._get(b,c)}),$.data(a,PROP_NAME,b),this._setTimeFromField(b),this._updateTimepicker(b),b.tpDiv.show())},_adjustZIndex:function(a){a=a.target||a;var b=$.timepicker._getInst(a);b.tpDiv.css("zIndex",$.timepicker._getZIndex(a)+1)},_showTimepicker:function(a){if(a=a.target||a,"input"!=a.nodeName.toLowerCase()&&(a=$("input",a.parentNode)[0]),!$.timepicker._isDisabledTimepicker(a)&&$.timepicker._lastInput!=a){$.timepicker._hideTimepicker();var b=$.timepicker._getInst(a);$.timepicker._curInst&&$.timepicker._curInst!=b&&$.timepicker._curInst.tpDiv.stop(!0,!0);var c=$.timepicker._get(b,"beforeShow");extendRemove(b.settings,c?c.apply(a,[a,b]):{}),b.lastVal=null,$.timepicker._lastInput=a,$.timepicker._setTimeFromField(b),$.timepicker._inDialog&&(a.value=""),$.timepicker._pos||($.timepicker._pos=$.timepicker._findPos(a),$.timepicker._pos[1]+=a.offsetHeight);var d=!1;$(a).parents().each(function(){return d|="fixed"==$(this).css("position"),!d});var e={left:$.timepicker._pos[0],top:$.timepicker._pos[1]};if($.timepicker._pos=null,b.tpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.timepicker._updateTimepicker(b),!b.inline&&"object"==typeof $.ui.position){b.tpDiv.position({of:b.input,my:$.timepicker._get(b,"myPosition"),at:$.timepicker._get(b,"atPosition"),collision:"flip"});var e=b.tpDiv.offset();$.timepicker._pos=[e.top,e.left]}if(b._hoursClicked=!1,b._minutesClicked=!1,e=$.timepicker._checkOffset(b,e,d),b.tpDiv.css({position:$.timepicker._inDialog&&$.blockUI?"static":d?"fixed":"absolute",display:"none",left:e.left+"px",top:e.top+"px"}),!b.inline){var f=$.timepicker._get(b,"showAnim"),g=$.timepicker._get(b,"duration"),h=function(){$.timepicker._timepickerShowing=!0;var a=$.timepicker._getBorders(b.tpDiv);b.tpDiv.find("iframe.ui-timepicker-cover").css({left:-a[0],top:-a[1],width:b.tpDiv.outerWidth(),height:b.tpDiv.outerHeight()})};$.timepicker._adjustZIndex(a),$.effects&&$.effects[f]?b.tpDiv.show(f,$.timepicker._get(b,"showOptions"),g,h):b.tpDiv[f||"show"](f?g:null,h),f&&g||h(),b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus(),$.timepicker._curInst=b}}},_getZIndex:function(a){for(var b,c,d=$(a),e=0;d.length&&d[0]!==document;)b=d.css("position"),("absolute"===b||"relative"===b||"fixed"===b)&&(c=parseInt(d.css("zIndex"),10),isNaN(c)||0===c||c>e&&(e=c)),d=d.parent();return e},_refreshTimepicker:function(a){var b=this._getInst(a);b&&this._updateTimepicker(b)},_updateTimepicker:function(a){a.tpDiv.empty().append(this._generateHTML(a)),this._rebindDialogEvents(a)},_rebindDialogEvents:function(a){var b=$.timepicker._getBorders(a.tpDiv),c=this;a.tpDiv.find("iframe.ui-timepicker-cover").css({left:-b[0],top:-b[1],width:a.tpDiv.outerWidth(),height:a.tpDiv.outerHeight()}).end().find(".ui-timepicker-minute-cell").unbind().bind("click",{fromDoubleClick:!1},$.proxy($.timepicker.selectMinutes,this)).bind("dblclick",{fromDoubleClick:!0},$.proxy($.timepicker.selectMinutes,this)).end().find(".ui-timepicker-hour-cell").unbind().bind("click",{fromDoubleClick:!1},$.proxy($.timepicker.selectHours,this)).bind("dblclick",{fromDoubleClick:!0},$.proxy($.timepicker.selectHours,this)).end().find(".ui-timepicker td a").unbind().bind("mouseout",function(){$(this).removeClass("ui-state-hover"),-1!=this.className.indexOf("ui-timepicker-prev")&&$(this).removeClass("ui-timepicker-prev-hover"),-1!=this.className.indexOf("ui-timepicker-next")&&$(this).removeClass("ui-timepicker-next-hover")}).bind("mouseover",function(){c._isDisabledTimepicker(a.inline?a.tpDiv.parent()[0]:a.input[0])||($(this).parents(".ui-timepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),-1!=this.className.indexOf("ui-timepicker-prev")&&$(this).addClass("ui-timepicker-prev-hover"),-1!=this.className.indexOf("ui-timepicker-next")&&$(this).addClass("ui-timepicker-next-hover"))}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end().find(".ui-timepicker-now").bind("click",function(a){$.timepicker.selectNow(a)}).end().find(".ui-timepicker-deselect").bind("click",function(a){$.timepicker.deselectTime(a)}).end().find(".ui-timepicker-close").bind("click",function(){$.timepicker._hideTimepicker()}).end()},_generateHTML:function(a){var b,c,d,e,f=1==this._get(a,"showPeriod"),g=1==this._get(a,"showPeriodLabels"),h=1==this._get(a,"showLeadingZero"),i=1==this._get(a,"showHours"),j=1==this._get(a,"showMinutes"),k=this._get(a,"amPmText"),l=this._get(a,"rows"),m=0,n=0,o=0,p=0,q=0,r=0,s=Array(),t=this._get(a,"hours"),u=null,v=0,w=this._get(a,"hourText"),x=this._get(a,"showCloseButton"),y=this._get(a,"closeButtonText"),z=this._get(a,"showNowButton"),A=this._get(a,"nowButtonText"),B=this._get(a,"showDeselectButton"),C=this._get(a,"deselectButtonText"),D=x||z||B;for(b=t.starts;b<=t.ends;b++)s.push(b);if(u=Math.ceil(s.length/l),g){for(v=0;v<s.length;v++)s[v]<12?o++:p++;v=0,m=Math.floor(o/s.length*l),n=Math.floor(p/s.length*l),l!=m+n&&(o&&(!p||!m||n&&o/m>=p/n)?m++:n++),q=Math.min(m,1),r=m+1,u=Math.ceil(0==m?p/n:0==n?o/m:Math.max(o/m,p/n))}if(e='<table class="ui-timepicker-table ui-widget-content ui-corner-all"><tr>',i){for(e+='<td class="ui-timepicker-hours"><div class="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">'+w+'</div><table class="ui-timepicker">',c=1;l>=c;c++){for(e+="<tr>",c==q&&g&&(e+='<th rowspan="'+m.toString()+'" class="periods" scope="row">'+k[0]+"</th>"),c==r&&g&&(e+='<th rowspan="'+n.toString()+'" class="periods" scope="row">'+k[1]+"</th>"),d=1;u>=d;d++)g&&r>c&&s[v]>=12?e+=this._generateHTMLHourCell(a,void 0,f,h):(e+=this._generateHTMLHourCell(a,s[v],f,h),v++);e+="</tr>"}e+="</table></td>"}if(j&&(e+='<td class="ui-timepicker-minutes">',e+=this._generateHTMLMinutes(a),e+="</td>"),e+="</tr>",D){var E='<tr><td colspan="3"><div class="ui-timepicker-buttonpane ui-widget-content">';z&&(E+='<button type="button" class="ui-timepicker-now ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+a.id.replace(/\\\\/g,"\\")+'" >'+A+"</button>"),B&&(E+='<button type="button" class="ui-timepicker-deselect ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+a.id.replace(/\\\\/g,"\\")+'" >'+C+"</button>"),x&&(E+='<button type="button" class="ui-timepicker-close ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+a.id.replace(/\\\\/g,"\\")+'" >'+y+"</button>"),e+=E+"</div></td></tr>"}return e+="</table>"},_updateMinuteDisplay:function(a){var b=this._generateHTMLMinutes(a);a.tpDiv.find("td.ui-timepicker-minutes").html(b),this._rebindDialogEvents(a)},_generateHTMLMinutes:function(a){var b,c,d="",e=this._get(a,"rows"),f=Array(),g=this._get(a,"minutes"),h=null,j=0,k=1==this._get(a,"showMinutesLeadingZero"),l=this._get(a,"onMinuteShow"),m=this._get(a,"minuteText");for(g.starts||(g.starts=0),g.ends||(g.ends=59),g.manual||(g.manual=[]),b=g.starts;b<=g.ends;b+=g.interval)f.push(b);for(i=0;i<g.manual.length;i++){var n=g.manual[i];"number"!=typeof n||0>n||n>59||$.inArray(n,f)>=0||f.push(n)}if(f.sort(function(a,b){return a-b}),h=Math.round(f.length/e+.49),l&&0==l.apply(a.input?a.input[0]:null,[a.hours,a.minutes]))for(j=0;j<f.length;j+=1)if(b=f[j],l.apply(a.input?a.input[0]:null,[a.hours,b])){a.minutes=b;break}for(d+='<div class="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">'+m+'</div><table class="ui-timepicker">',j=0,c=1;e>=c;c++){for(d+="<tr>";c*h>j;){var b=f[j],o="";void 0!==b&&(o=10>b&&k?"0"+b.toString():b.toString()),d+=this._generateHTMLMinuteCell(a,b,o),j++}d+="</tr>"}return d+="</table>"},_generateHTMLHourCell:function(a,b,c,d){var e=b;b>12&&c&&(e=b-12),0==e&&c&&(e=12),10>e&&d&&(e="0"+e);var f="",g=!0,h=this._get(a,"onHourShow"),i=this._get(a,"maxTime"),j=this._get(a,"minTime");return void 0==b?f='<td><span class="ui-state-default ui-state-disabled">&nbsp;</span></td>':(h&&(g=h.apply(a.input?a.input[0]:null,[b])),g&&(!isNaN(parseInt(i.hour))&&b>i.hour&&(g=!1),!isNaN(parseInt(j.hour))&&b<j.hour&&(g=!1)),f=g?'<td class="ui-timepicker-hour-cell" data-timepicker-instance-id="#'+a.id.replace(/\\\\/g,"\\")+'" data-hour="'+b.toString()+'"><a class="ui-state-default '+(b==a.hours?"ui-state-active":"")+'">'+e.toString()+"</a></td>":'<td><span class="ui-state-default ui-state-disabled '+(b==a.hours?" ui-state-active ":" ")+'">'+e.toString()+"</span></td>")},_generateHTMLMinuteCell:function(a,b,c){var d="",e=!0,f=a.hours,g=this._get(a,"onMinuteShow"),h=this._get(a,"maxTime"),i=this._get(a,"minTime");return g&&(e=g.apply(a.input?a.input[0]:null,[a.hours,b])),void 0==b?d='<td><span class="ui-state-default ui-state-disabled">&nbsp;</span></td>':(e&&null!==f&&(!isNaN(parseInt(h.hour))&&!isNaN(parseInt(h.minute))&&f>=h.hour&&b>h.minute&&(e=!1),!isNaN(parseInt(i.hour))&&!isNaN(parseInt(i.minute))&&f<=i.hour&&b<i.minute&&(e=!1)),d=e?'<td class="ui-timepicker-minute-cell" data-timepicker-instance-id="#'+a.id.replace(/\\\\/g,"\\")+'" data-minute="'+b.toString()+'" ><a class="ui-state-default '+(b==a.minutes?"ui-state-active":"")+'" >'+c+"</a></td>":'<td><span class="ui-state-default ui-state-disabled" >'+c+"</span></td>")},_destroyTimepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(b.hasClass(this.markerClassName)){var d=a.nodeName.toLowerCase();$.removeData(a,PROP_NAME),"input"==d?(c.append.remove(),c.trigger.remove(),b.removeClass(this.markerClassName).unbind("focus.timepicker",this._showTimepicker).unbind("click.timepicker",this._adjustZIndex)):("div"==d||"span"==d)&&b.removeClass(this.markerClassName).empty()}},_enableTimepicker:function(a){var b=$(a),c=b.attr("id"),d=$.data(a,PROP_NAME);if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if("input"==e){a.disabled=!1;var f=this._get(d,"button");$(f).removeClass("ui-state-disabled").disabled=!1,d.trigger.filter("button").each(function(){this.disabled=!1}).end()}else if("div"==e||"span"==e){var g=b.children("."+this._inlineClass);g.children().removeClass("ui-state-disabled"),g.find("button").each(function(){this.disabled=!1})}this._disabledInputs=$.map(this._disabledInputs,function(a){return a==c?null:a})}},_disableTimepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(b.hasClass(this.markerClassName)){var d=a.nodeName.toLowerCase();if("input"==d){var e=this._get(c,"button");$(e).addClass("ui-state-disabled").disabled=!0,a.disabled=!0,c.trigger.filter("button").each(function(){this.disabled=!0}).end()}else if("div"==d||"span"==d){var f=b.children("."+this._inlineClass);f.children().addClass("ui-state-disabled"),f.find("button").each(function(){this.disabled=!0})}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b}),this._disabledInputs[this._disabledInputs.length]=b.attr("id")}},_isDisabledTimepicker:function(a){if(!a)return!1;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return!0;return!1},_checkOffset:function(a,b,c){var d=a.tpDiv.outerWidth(),e=a.tpDiv.outerHeight(),f=a.input?a.input.outerWidth():0,g=a.input?a.input.outerHeight():0,h=document.documentElement.clientWidth+$(document).scrollLeft(),i=document.documentElement.clientHeight+$(document).scrollTop();return b.left-=this._get(a,"isRTL")?d-f:0,b.left-=c&&b.left==a.input.offset().left?$(document).scrollLeft():0,b.top-=c&&b.top==a.input.offset().top+g?$(document).scrollTop():0,b.left-=Math.min(b.left,b.left+d>h&&h>d?Math.abs(b.left+d-h):0),b.top-=Math.min(b.top,b.top+e>i&&i>e?Math.abs(e+g):0),b},_findPos:function(a){for(var b=this._getInst(a),c=this._get(b,"isRTL");a&&("hidden"==a.type||1!=a.nodeType);)a=a[c?"previousSibling":"nextSibling"];var d=$(a).offset();return[d.left,d.top]},_getBorders:function(a){var b=function(a){return{thin:1,medium:2,thick:3}[a]||a};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkExternalClick:function(a){if($.timepicker._curInst){var b=$(a.target);b[0].id==$.timepicker._mainDivId||0!=b.parents("#"+$.timepicker._mainDivId).length||b.hasClass($.timepicker.markerClassName)||b.hasClass($.timepicker._triggerClass)||!$.timepicker._timepickerShowing||$.timepicker._inDialog&&$.blockUI||$.timepicker._hideTimepicker()}},_hideTimepicker:function(a){var b=this._curInst;if(b&&(!a||b==$.data(a,PROP_NAME))&&this._timepickerShowing){var c=this._get(b,"showAnim"),d=this._get(b,"duration"),e=function(){$.timepicker._tidyDialog(b),this._curInst=null};$.effects&&$.effects[c]?b.tpDiv.hide(c,$.timepicker._get(b,"showOptions"),d,e):b.tpDiv["slideDown"==c?"slideUp":"fadeIn"==c?"fadeOut":"hide"](c?d:null,e),c||e(),this._timepickerShowing=!1,this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.tpDiv))),this._inDialog=!1;var f=this._get(b,"onClose");f&&f.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b])}},_tidyDialog:function(a){a.tpDiv.removeClass(this._dialogClass).unbind(".ui-timepicker")},_getInst:function(a){try{return $.data(a,PROP_NAME)}catch(b){throw"Missing instance data for this timepicker"}},_get:function(a,b){var c=a.settings[b];return void 0!==c?"array"==$.type(c)||"object"==$.type(c)?$.extend(!0,this._defaults[b],c):c:this._defaults[b]},_setTimeFromField:function(a){if(a.input.val()!=a.lastVal){var b=this._get(a,"defaultTime"),c="now"==b?this._getCurrentTimeRounded(a):b;if(0==a.inline&&""!=a.input.val()&&(c=a.input.val()),c instanceof Date)a.hours=c.getHours(),a.minutes=c.getMinutes();else{var d=a.lastVal=c;if(""==c)a.hours=-1,a.minutes=-1;else{var e=this.parseTime(a,d);a.hours=e.hours,a.minutes=e.minutes}}$.timepicker._updateTimepicker(a)}},_optionTimepicker:function(a,b,c){var d=this._getInst(a);if(2==arguments.length&&"string"==typeof b)return"defaults"==b?$.extend({},$.timepicker._defaults):d?"all"==b?$.extend({},d.settings):this._get(d,b):null;var e=b||{};"string"==typeof b&&(e={},e[b]=c),d&&(extendRemove(d.settings,e),this._curInst==d&&(this._hideTimepicker(),this._updateTimepicker(d)),d.inline&&this._updateTimepicker(d))},_setTimeTimepicker:function(a,b){var c=this._getInst(a);c&&(this._setTime(c,b),this._updateTimepicker(c),this._updateAlternate(c,b))},_setTime:function(a,b,c){var d=a.hours,e=a.minutes;if(b instanceof Date)a.hours=b.getHours(),a.minutes=b.getMinutes();else{var b=this.parseTime(a,b);a.hours=b.hours,a.minutes=b.minutes}d==a.hours&&e==a.minutes||c||a.input.trigger("change"),this._updateTimepicker(a),this._updateSelectedValue(a)},_getCurrentTimeRounded:function(a){var b=new Date,c=b.getMinutes(),d=this._get(a,"minutes"),e=Math.round(c/d.interval)*d.interval;return b.setMinutes(e),b},parseTime:function(a,b){var c=new Object;if(c.hours=-1,c.minutes=-1,!b)return"";var d=this._get(a,"timeSeparator"),e=this._get(a,"amPmText"),f=this._get(a,"showHours"),g=this._get(a,"showMinutes"),h=this._get(a,"optionalMinutes"),i=1==this._get(a,"showPeriod"),j=b.indexOf(d);if(-1!=j?(c.hours=parseInt(b.substr(0,j),10),c.minutes=parseInt(b.substr(j+1),10)):!f||g&&!h?!f&&g&&(c.minutes=parseInt(b,10)):c.hours=parseInt(b,10),f){var k=b.toUpperCase();c.hours<12&&i&&-1!=k.indexOf(e[1].toUpperCase())&&(c.hours+=12),12==c.hours&&i&&-1!=k.indexOf(e[0].toUpperCase())&&(c.hours=0)}return c},selectNow:function(a){var b=$(a.target).attr("data-timepicker-instance-id"),c=$(b),d=this._getInst(c[0]),e=new Date;d.hours=e.getHours(),d.minutes=e.getMinutes(),this._updateSelectedValue(d),this._updateTimepicker(d),this._hideTimepicker()},deselectTime:function(a){var b=$(a.target).attr("data-timepicker-instance-id"),c=$(b),d=this._getInst(c[0]);d.hours=-1,d.minutes=-1,this._updateSelectedValue(d),this._hideTimepicker()},selectHours:function(a){var b=$(a.currentTarget),c=b.attr("data-timepicker-instance-id"),d=parseInt(b.attr("data-hour")),e=a.data.fromDoubleClick,f=$(c),g=this._getInst(f[0]),h=1==this._get(g,"showMinutes");if($.timepicker._isDisabledTimepicker(f.attr("id")))return!1;b.parents(".ui-timepicker-hours:first").find("a").removeClass("ui-state-active"),b.children("a").addClass("ui-state-active"),g.hours=d;var i=this._get(g,"onMinuteShow"),j=this._get(g,"maxTime"),k=this._get(g,"minTime");return!i&&isNaN(parseInt(j.minute))&&isNaN(parseInt(k.minute))||this._updateMinuteDisplay(g),this._updateSelectedValue(g),g._hoursClicked=!0,(g._minutesClicked||e||0==h)&&$.timepicker._hideTimepicker(),!1},selectMinutes:function(a){var b=$(a.currentTarget),c=b.attr("data-timepicker-instance-id"),d=parseInt(b.attr("data-minute")),e=a.data.fromDoubleClick,f=$(c),g=this._getInst(f[0]),h=1==this._get(g,"showHours");return $.timepicker._isDisabledTimepicker(f.attr("id"))?!1:(b.parents(".ui-timepicker-minutes:first").find("a").removeClass("ui-state-active"),b.children("a").addClass("ui-state-active"),g.minutes=d,this._updateSelectedValue(g),g._minutesClicked=!0,g._hoursClicked||e||0==h?($.timepicker._hideTimepicker(),!1):!1)},_updateSelectedValue:function(a){var b=this._getParsedTime(a);a.input&&(a.input.val(b),a.input.trigger("change"));var c=this._get(a,"onSelect");return c&&c.apply(a.input?a.input[0]:null,[b,a]),this._updateAlternate(a,b),b},_getParsedTime:function(a){if(-1==a.hours&&-1==a.minutes)return"";(a.hours<a.hours.starts||a.hours>a.hours.ends)&&(a.hours=0),(a.minutes<a.minutes.starts||a.minutes>a.minutes.ends)&&(a.minutes=0);var b="",c=1==this._get(a,"showPeriod"),d=1==this._get(a,"showLeadingZero"),e=1==this._get(a,"showHours"),f=1==this._get(a,"showMinutes"),g=1==this._get(a,"optionalMinutes"),h=this._get(a,"amPmText"),i=a.hours?a.hours:0,j=a.minutes?a.minutes:0,k=i?i:0,l="";-1==k&&(k=0),-1==j&&(j=0),c&&(0==a.hours&&(k=12),a.hours<12?b=h[0]:(b=h[1],k>12&&(k-=12)));var m=k.toString();d&&10>k&&(m="0"+m);var n=j.toString();return 10>j&&(n="0"+n),e&&(l+=m),!e||!f||g&&0==n||(l+=this._get(a,"timeSeparator")),!f||g&&0==n||(l+=n),e&&b.length>0&&(l+=this._get(a,"periodSeparator")+b),l},_updateAlternate:function(a,b){var c=this._get(a,"altField");c&&$(c).each(function(a,c){$(c).val(b)})},_getTimeAsDateTimepicker:function(a){var b=this._getInst(a);return-1==b.hours&&-1==b.minutes?"":((b.hours<b.hours.starts||b.hours>b.hours.ends)&&(b.hours=0),(b.minutes<b.minutes.starts||b.minutes>b.minutes.ends)&&(b.minutes=0),new Date(0,0,0,b.hours,b.minutes,0))},_getTimeTimepicker:function(a){var b=this._getInst(a);return this._getParsedTime(b)},_getHourTimepicker:function(a){var b=this._getInst(a);return void 0==b?-1:b.hours},_getMinuteTimepicker:function(a){var b=this._getInst(a);return void 0==b?-1:b.minutes}}),$.fn.timepicker=function(a){$.timepicker.initialized||($(document).mousedown($.timepicker._checkExternalClick),$.timepicker.initialized=!0),0===$("#"+$.timepicker._mainDivId).length&&$("body").append($.timepicker.tpDiv);var b=Array.prototype.slice.call(arguments,1);return"string"!=typeof a||"getTime"!=a&&"getTimeAsDate"!=a&&"getHour"!=a&&"getMinute"!=a?"option"==a&&2==arguments.length&&"string"==typeof arguments[1]?$.timepicker["_"+a+"Timepicker"].apply($.timepicker,[this[0]].concat(b)):this.each(function(){"string"==typeof a?$.timepicker["_"+a+"Timepicker"].apply($.timepicker,[this].concat(b)):$.timepicker._attachTimepicker(this,a)}):$.timepicker["_"+a+"Timepicker"].apply($.timepicker,[this[0]].concat(b))},$.timepicker=new Timepicker,$.timepicker.initialized=!1,$.timepicker.uuid=(new Date).getTime(),$.timepicker.version="0.3.3",window["TP_jQuery_"+tpuuid]=$}(jQuery);