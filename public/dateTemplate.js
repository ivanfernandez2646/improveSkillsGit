function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_merge(e,r){if(1===arguments.length){for(var t=e[0],g=1;g<e.length;g++)t=pug_merge(t,e[g]);return t}for(var l in r)if("class"===l){var n=e[l]||[];e[l]=(Array.isArray(n)?n:[n]).concat(r[l]||[])}else if("style"===l){var n=pug_style(e[l]);n=n&&";"!==n[n.length-1]?n+";":n;var a=pug_style(r[l]);a=a&&";"!==a[a.length-1]?a+";":a,e[l]=n+a}else e[l]=r[l];return e}
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function dateTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002FdateTemplate.pug":"each item in listDatesToInsert[\"itemsDate\"]\r\n    li(class=\"list-group-item d-flex align-items-center date\")&attributes({'id': item.date})\r\n        div( class=\"flex-grow-1\") #{item.dateString}\r\n        span(class=\"mr-3 badge badge-pill badge-danger countNotes\") #{item.countNotes} notas\r\n        button(type=\"button\" class=\"close deleteDate\" aria-label=\"Close\" disabled)\r\n            span(aria-hidden=\"true\") &times;\r\n        "};
;var locals_for_with = (locals || {});(function (listDatesToInsert) {;pug_debug_line = 1;pug_debug_filename = "public\u002FdateTemplate.pug";
// iterate listDatesToInsert["itemsDate"]
;(function(){
  var $$obj = listDatesToInsert["itemsDate"];
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
;pug_debug_line = 2;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cli" + (pug_attrs(pug_merge([{"class": "list-group-item d-flex align-items-center date"},{'id': item.date}]), false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = item.dateString) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cspan class=\"mr-3 badge badge-pill badge-danger countNotes\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = item.countNotes) ? "" : pug_interp));
;pug_debug_line = 4;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + " notas\u003C\u002Fspan\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cbutton" + (" class=\"close deleteDate\""+" type=\"button\" aria-label=\"Close\""+pug_attr("disabled", true, true, false)) + "\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cspan aria-hidden=\"true\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "&times;\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
;pug_debug_line = 2;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cli" + (pug_attrs(pug_merge([{"class": "list-group-item d-flex align-items-center date"},{'id': item.date}]), false)) + "\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = item.dateString) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cspan class=\"mr-3 badge badge-pill badge-danger countNotes\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = item.countNotes) ? "" : pug_interp));
;pug_debug_line = 4;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + " notas\u003C\u002Fspan\u003E";
;pug_debug_line = 5;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cbutton" + (" class=\"close deleteDate\""+" type=\"button\" aria-label=\"Close\""+pug_attr("disabled", true, true, false)) + "\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "\u003Cspan aria-hidden=\"true\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "public\u002FdateTemplate.pug";
pug_html = pug_html + "&times;\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);
}.call(this,"listDatesToInsert" in locals_for_with?locals_for_with.listDatesToInsert:typeof listDatesToInsert!=="undefined"?listDatesToInsert:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}