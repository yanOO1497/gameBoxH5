/**
 * Created by yanyuanyuan/媛媛 on 2018/2/24.
 * Description:
 */
//fx_methods 以动画形式的show,hide,toggle和fade等方法.
(function ($, undefined) {
    var document = window.document, docElem = document.documentElement,
        origShow = $.fn.show, origHide = $.fn.hide, origToggle = $.fn.toggle;

    //底层方法，调用$.fn.animate方法
    function anim(el, speed, opacity, scale, callback) {
        if (typeof speed == 'function' && !callback) callback = speed, speed = undefined;
        var props = {opacity: opacity};
        if (scale) {
            props.scale = scale;
            //设置元素变换的基点，默认为(50% 50% 0)，第三个参数为可选，当为3D变化时，可传第三个参数
            el.css($.fx.cssPrefix + 'transform-origin', 'top left')
        }
        return el.animate(props, speed, null, callback)
    }

    //底层方法：隐藏显示的元素
    function hide(el, speed, scale, callback) {
        return anim(el, speed, 0, scale, function () {
            //调用原先的方法，即设置元素的display属性为none($.fn.hide)
            origHide.call($(this));
            callback && callback.call(this)
        })
    }

    //首先调用原先的$.fn.show方法将元素display属性设置为block，然后设置opacity属性为0，再进行过渡opacity为1，宽高设置为原先的
    $.fn.show = function (speed, callback) {
        origShow.call(this);
        if (speed === undefined) speed = 0;
        else this.css('opacity', 0);
        return anim(this, speed, 1, '1,1', callback)
    };

    //隐藏元素效果(通过设置opacity为0隐藏元素，同时设置scale有切换效果，设置切换原点为0、0，宽高为0)
    $.fn.hide = function (speed, callback) {
        //如果speed参数为undefined，即过渡时间为undefined，那么直接调用核心方法里面的隐藏元素方法
        if (speed === undefined) return origHide.call(this);
        else return hide(this, speed, '0,0', callback)
    };

    //如果speed不符合要求，那么直接调用原先的$.fn.toggle方法，否则进行进行判断当前显示状态并切换
    $.fn.toggle = function (speed, callback) {
        if (speed === undefined || typeof speed == 'boolean')
            return origToggle.call(this, speed);
        else return this.each(function () {
            var el = $(this);
            el[el.css('display') == 'none' ? 'show' : 'hide'](speed, callback)
        })
    };

    //淡入淡出总函数，相比而言去掉了scale变化
    $.fn.fadeTo = function (speed, opacity, callback) {
        return anim(this, speed, opacity, null, callback)
    };

    //淡入(如果之前的opacity大于0，那么记录下来，然后设置opacity为0，然后过渡到记录值；如果opacity<=0，那么直接过渡到1)
    $.fn.fadeIn = function (speed, callback) {
        var target = this.css('opacity');
        if (target > 0) this.css('opacity', 0);
        else target = 1;
        return origShow.call(this).fadeTo(speed, target, callback)
    };

    //淡出
    $.fn.fadeOut = function (speed, callback) {
        return hide(this, speed, null, callback)
    };

    //淡入淡出切换
    $.fn.fadeToggle = function (speed, callback) {
        return this.each(function () {
            var el = $(this);
            el[
                (el.css('opacity') == 0 || el.css('display') == 'none') ? 'fadeIn' : 'fadeOut'
                ](speed, callback)
        })
    }
})(Zepto);