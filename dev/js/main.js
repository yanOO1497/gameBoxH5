/**
 * Created by yanyuanyuan/媛媛 on 2018/2/23.
 * Description:
 */
import "../../lib/zepto.min"
import "../../lib/fx_methods"

function init() {
    $(".wrap-mask").hide();
    $(".page").hide();
    $(".text").hide();
}
// 字幕变化
function change(type,num){
    $("."+type).fadeOut();
    timer.push(setTimeout(function () {
        $("."+type).css('background-image', 'url(../images/date/'+num+'.png)').fadeIn();
    },800));
}
//天气字幕变化
function changeDate(date) {
    $(".date").fadeOut();
    timer.push(setTimeout(function () {
        $(".date").css('background-image', 'url(../images/date/'+date+'.png)').fadeIn();
    },800));
}
//字幕变化
function changeText(num) {
    $(".text").fadeOut();
    timer.push(setTimeout(function () {
        $(".text").css('background-image', 'url(../images/text/text'+num+'.png)').fadeIn();
    },800));
}
// var num=0;//当前页面，0代表开始也
// 存储定时队列
var timer=[];//定义定时器容器
//销毁所有定时器
function delTimer() {
    let l=timer.length;
    for(let i=0;i<=l;i++){
        window.clearTimeout(timer[i]);
    }
}
const page={
    num:0,//当前页码
    0:{
        reset(){
            $('.begin-title').show().parents(".num0").show();
            // $(".num0").show();
            $(".tr1-2").show();
        },
        enter(flag){
            // $('.begin-title').show().parents(".num0").show();
            $('.begin-title').fadeIn().tap(function () {
                $(this).hide()
                    .parents(".num0").fadeOut();
                page[1].reset();
                page[1].enter();
                changeDate(1);
                page.num=1;
            }).parents(".num0").show();
            // $(".num0").show();
        },
        out(){
            $(".num0").fadeOut();
        },

    },
    1:{
        reset(){
            $(".wrap-mask").show();
            // $(".tr1-2").show();
            // $(".num1-1").fadeIn().find('.time').removeClass("change");
            // $(".num1-2").hide().removeClass("out").removeClass("in").find(".text").hide();
            // $(".wrap").hide().find("tr1-2").hide();
            // $(".tr1-2>div").removeClass("ani");
            // $(".game-video").removeClass("in");
            // $(".light-box").hide();
            // $(".tr2").removeClass("ani");
        },
        enter(flag){
            $(".num1").show().addClass("enter");
            $(".tr1-2").addClass("enter");
            // $(".num1-2").addClass("enter");
            // $(".wrap").show().find("tr1-2").show();
            // $(".num1-1").fadeIn(2000);
            // timer.push(setTimeout(function(){
            //     $('.time').addClass("change");
            // },2000));
            // timer.push(setTimeout(function () {
            //     $(".num1-1").fadeOut();
            //     $(".game-video").addClass("in");
            //     $(".num1-2").addClass("in").fadeIn().find(".text").fadeIn();
            //     $(".tr1-2>div").addClass("ani");
            //     $(".light-box").fadeIn();
            // },3000));
            // timer.push(setTimeout(function(){
            //     changeText(1);
            //     $(".tr1-2").hide();//第1-2转场的遮挡
            // },4000));
        },
        out(){
            // $(".tr1-2>div").removeClass("ani");
            $(".num1-2").addClass("out");
            timer.push(setTimeout(function(){
                $(".tr2").addClass("ani");
            },1000));
            timer.t1_5=setTimeout(function () {
                $(".num1-2").hide();
            },2000)
        }
    },
    2:{
        reset(flag){
            if(flag===0){
                $(".num2").css('transform-origin',null).removeClass("out");
            }else{

            }
        },
        enter(flag){
            $(".num2").show();
            changeText(2);
        },
        out(flag){
            // delTimer();
            if(flag===0){
                $(".num2").css('transform-origin','right top').addClass("out");
            }
            timer.push(setTimeout(function () {
                $(".num2").hide();
            },900));
        }
    },
    3:{
        reset(flag){
            if(flag===0){

            }
            $(".num3").hide();
            $(".num3").removeClass("num2-3 tr");
            $(".teacher").removeClass("ani");
        },
        enter(flag){//flag用于判断是否顺序执行
            if(flag===0){
                $(".num3").addClass("num2-3").css({
                    display:'block',
                    opacity:1
                });
            }else{
                page[3].reset();
                $(".num3").addClass("tr-up")
            }
            changeText('3-1');
            timer.t3_1=setTimeout(function () {
                changeText('3-2');
                $(".tr3-4").show().find(".f-shadow").addClass("ani");
                // $(".teacher").addClass("ani");
            },3000)
        },
        out(flag){
            // delTimer();
            $("text").fadeOut();
            if(flag===0){//顺序下移
                $(".num3").css({
                    'transform-origin': 'top right',
                }).removeClass("num2-3").addClass("tr-down");
                timer.t3_2=setTimeout(function () {
                    $(".num3").fadeOut();
                },1000)
            }else{
                $(".num3").fadeOut();
            }
        }
    },
    4:{
        reset(flag){
            $(".num4").hide();
            if(flag===0){
                $(".num4").removeClass("tr-down");
            }
            // else{
            //     $(".num4").removeClass("tr-up");
            // }
            $(".num4").css({
                transform:'scale(1,1) translateY(0)'
            });
        },
        enter(flag){
            changeText('4-1');
            if(flag===0){
                page[4].reset(0);
                $(".tr3-4").addClass("tr-down");
                $(".f-shadow").removeClass("ani");
                $(".num4").show().css({
                    'transform-origin':'center',
                }).addClass("tr-down");
                timer.push(setTimeout(function () {
                    $(".tr3-4").hide().removeClass("down");
                    $(".num4-1").hide();
                    $(".num4-2").show().css({
                        transform: 'translate3d(3rem,-2rem,6rem)'
                    });
                },4500));//4500秒后进入4-2页面
            }else{
                page[4].reset();
                $(".num4").fadeIn();
                // $(".tr3-4").addClass("tr-up");
                // $(".num4").show().css({
                //     transform:'translateY(-56.675rem) scale(1,1)'
                // }).addClass("tr-up");
            }
        },
        out(flag){
            delTimer();
            if(flag===0){//顺序播放
                $(".tr4-5").css('display','block');
                $(".num4-2").addClass("ani");
                timer.push(setTimeout(function () {
                    $(".tr4-5").css('display',null);
                    $(".num4-2").hide();
                },2000));
            }else{

            }
        }
    },
    5:{
        reset(){
            $(".num5").removeClass("ani out");
        },
        enter(flag){
            $(".num5").show().css({
                transform:'scale(3,3) translate(9rem,-2rem)'
            });
            setTimeout(function () {
                $(".num5").addClass("ani");
            },1000)
        },
        out(){
            // $(".num5").fadeOut(2000);
            $(".num5").addClass("out");
        }
    },
    6:{
        reset(){
            $(".num6").removeClass("darken").addClass("light").find('video').show();
        },
        enter(flag){
            // page.num=6;
            // $(".num6").fadeIn(1000);
            $(".num6").addClass("enter").show();
            changeText("6-1");
            setTimeout(function () {
                $(".num6").addClass("darken").removeClass("light").find('video').hide();
                // changeText("6-2");
                change('text','6-1');
            },109/25*1000)
        },
        out(){
            $(".num6").fadeOut(2000);
        }
    },
    7:{
        reset(){

        },
        enter(flag){
            // page.num=7;
            $(".num7").show();
        },
        out(){
            // $(".num7").fadeOut(2000);
        }
    },
    8:{
        reset(){

        },
        enter(flag){

        },
        out(){
        }
    },
}
/*function changgPage(n){
    switch (n){
        case 0:
            page0();break;
        case 1:
            page1();break;
        case 2:
            page2();break;
        case 3:
            page3();break;

    }
}

function page0(){
    $('.begin-title').show().parents(".begin").fadeIn().tap(function () {
        $(this).hide()
            .parents(".begin").fadeOut();
        page1();
    });
}

function page1(){
    num=1;
    $(".num1-2").removeClass("in");
    $(".wrap").show();
    $(".num1-1").fadeIn(2000);

    setTimeout(function(){
        $(".num1-1").find('.time').addClass("change");
    },2000);

    setTimeout(function () {
        $(".num1-1").fadeOut();
        $(".num1-2").addClass("in").fadeIn();
        $(".tr1-2>div").addClass("ani");
        $(".light-box").fadeIn();
    },3000);

    setTimeout(function(){
        $(".tr1-2").fadeOut(2000);
    },4000);
    //循环播放内容
}

function page2(){
    //初始化，将page2个元素的状态恢复初始状态
    $(".num1-2").removeClass("out").addClass("out");
    setTimeout(function(){
        $(".num1-2").fadeOut(2500);
        $(".num2").fadeIn(2000);
    },3000);
}

function page3(){

}*/


$(function(){

    init();
    page[0].enter(0);
    // 向上滑和向右滑进入下一屏
    $("body").swipeUp(function(){
        let next=(page.num+1)%9;
        // if(page.num===8){
        //     $(".num"+page.num).fadeOut();
        //     $(".num"+next).show();
        // }else{
        //     page[next].reset();// 先对当前页的下一页复位
        //     if(next==3){
        //         // $(".num3").addClass("num2-3").css({
        //         //     display:'block',
        //         //     opacity:1
        //         // });
        //     }else{
        //         $(".num"+page.num).fadeOut();
        //         $(".num"+next).show();
        //     }
        // }
        // $(".num"+page.num).fadeOut();
        page[next].reset();
        // $(".num"+next).show();
        page[next].enter(0);
        page[page.num].out(0);
        $(".text").hide();
        page.num++;
        change('date',next);
    });
    $("body").swipeDown(function(){
        let last=(page.num+8)%9;
        // if(page.num===0){
        //     last=8;
        // }else{
        //     last=page.num-1
        // }
        page[last].reset();// 先对当前页的上一页复位
        // $(".num"+last).show();
        page[page.num-1].enter();
        $(".num"+page.num).fadeOut(1000);
        $(".text").hide();
        page.num--;
        // changeDate(last);
        change('date',last);
    });
    // $('.begin-title').tap(function () {
    //     $(this).hide()
    //         .parents(".begin").fadeOut();
    //     this.page1();
    // });
    // $("body").on('swipeRight',' swipeUp',function(){
    //     // page.page+page.num+1]();
    // });
    // $("body").on('swipeLeft',' swipeDown',function(){
    //     // page["page"+page.num-1]();
    // });
})