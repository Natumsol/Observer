/**
 * @description：jQuery的极简版本
 * @author：Yoghurts
 * @github:http://github.com/natumsol
 */
(function() {
    var root = this;
    var $ = function(selector, context) {
        var context = context || document;
        var id = /\s*#\w+\s*/;
        var className = /(\s*\.\w+\s*)\1*/;
        var tagName = /\s*\w+\s*/;
        if (className.test(selector)) {
            var className = selector.replace(/\s*\.\s*/g, " ").trim();
            return context.getElementsByClassName(className);
        } else if (id.test(selector)) {
            return context.getElementById(selector.trim().replace(/^#/, ""));
        } else if (tagName.test(selector)) {
            return context.getElementsByTagName(selector.trim());
        } else {
            throw new Error("选择器错误!");
        }
    };
    $.slice = Array.prototype.slice;

    function whichTransitionEvent() {
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }
        for (var t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    $.transitionend = whichTransitionEvent();

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = $;
        }
        exports.$ = $;
    } else {
        root.$ = $;
    }
}.call(this))
