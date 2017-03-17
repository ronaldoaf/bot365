// ==UserScript==
// @name         rclick
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*
// @match        https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    
    unsafeWindow.jQuery.fn.extend({rclick:function(){var a=function(a,b){return Math.round((a+b)/2)},b={x1:$(this).offset().left,y1:$(this).offset().top,x2:$(this).offset().left+$(this).width(),y2:$(this).offset().top+$(this).height()},c=function(a,b){var c=document.createEvent("MouseEvent"),d=document.elementFromPoint(a,b);c.initMouseEvent("click",!0,!0,unsafeWindow,null,a,b,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(c)};c(a(b.x1,b.x2),a(b.y1,b.y2))}});
})();
