define(["highstock","common/util"],function(){var a={};return{init:function(b){!function(c,d){function e(b,c){var d="verticalLine_"+(new Date).getTime(),e=c.addPlotLine({value:b,width:2,color:"red",id:d}).svgElem.css({cursor:"pointer"}).attr("id",d).translate(0,0).on("mousedown",f).on("dblclick",g);return a[d]=e,e}function f(){i.annotate=!0;var f=d(this).attr("id"),g=a[f],j=!1;c.wrap(c.Pointer.prototype,"drag",function(a,c){if(i.annotate){if(j||(j=!0,d(b).one("mouseup",function(){i.annotate=!1,j=!1})),i.isInsidePlot(c.chartX-i.plotLeft,c.chartY-i.plotTop)&&g.element){h(g.element.id);var f=i.xAxis[0].toValue(c.chartX),k=i.xAxis[0];g=e(f,k)}}else a.call(this,c)})}function g(){var a=d(this).attr("id");h(a)}function h(b){d("#"+b).off(),delete a[b],i.xAxis[0].removePlotLine(b)}if(c){var i=d(b).highcharts();c.addEvent(i,"click",function(a){i.annotate&&(i.annotate=!1,e(a.xAxis[0].value,a.xAxis[0].axis),c.removeEvent(i,"click"))})}}(Highcharts,jQuery)}}});