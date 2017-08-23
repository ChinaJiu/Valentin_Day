$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });
    var reg= /^[A-Za-z]+$/;
    var str=/，|。|\\|\//;
    var aSmall = /^.*[a-z]+.*$/;
    var aBig = /^.*[A-Z]+.*$/;
    var textObj = $('.t-text2>div>div:first-of-type').attr('class');
    var textIndex=2;
    var motionObj = {};
    var sound_1;
    var tl1 = new TimelineMax(),
        tl2 = new TimelineMax(),
        txtContainer=$('.s-span1');
    //定义时间动画，取决于页面的多少，动态增加，不用管
    $('.page>div').each(function(i){
        motionObj["page"+(i+1)] = new TimelineMax();
    });
    //预加载图片，音乐
    var loadingPath='images/';
    var manifest=[
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'bg2.jpg'},
        {src:loadingPath+'bt1.png'},
        {src:loadingPath+'bt2.png'},
        {src:loadingPath+'bt3.png'},
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'p1-1.png'},
        {src:loadingPath+'p1-2.png'},
        {src:loadingPath+'p1-3.png'},
        {src:loadingPath+'p1-4.png'},
        {src:loadingPath+'p1-5.png'},
        {src:loadingPath+'p1-6.png'},
        {src:loadingPath+'p1-7.png'},
        {src:loadingPath+'p1-8.png'},
        {src:loadingPath+'p1-9.png'},
        {src:loadingPath+'p1-10.png'},
        {src:loadingPath+'p1-11.png'},
        {src:loadingPath+'p1-12.png'},
        {src:loadingPath+'p1-13.png'},
        {src:loadingPath+'p1-14.png'},
        {src:loadingPath+'p1-15.png'},
        {src:loadingPath+'p1-16.png'}

    ];
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("progress", handleOverallProgress, this);
    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);
    //queue.loadFile({id:"sound_1", src:"images/bg.mp3"});

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(false);
    //loading
    function handleOverallProgress(event){
        $('.loadingtxt').text(Math.ceil(event.loaded*100)+"%");
    }

    function handleComplete() {
        $('.loading').remove();
        initPageMotion();
        //sound_1 = createjs.Sound.play("sound_1",{loop:-1});
    }
    //初始化动画
    function initPageMotion(){
        $(".main").fadeIn(500,function(){
            //motionObj['page'+1].play();
            tl1.play();
            tl2.play();

        });
        tl2.add(TweenMax.from($('.p1-1'),.6,{alpha:0}));
        tl2.add(TweenMax.from($('.p1-2'),.6,{alpha:0}));
        tl2.add(TweenMax.staggerFrom(['.p1-3','.p1-4','.p1-5','.p1-6'],.6,{alpha:0,x:-300,ease:Back.easeOut},0.1));
        //tl2.add(TweenMax.from($('.s-span1>div'),1, {alpha:0}));
        tl2.add(TweenMax.staggerFrom($('.s-span1>div'), 0.8, {alpha:0,rotationY:"-270deg", top:80, transformOrigin: "50% 50% -80", ease:Back.easeOut}, 0.06));
        tl2.add(TweenMax.staggerTo($('.s-span1>div'), 0.6, {rotationX:"360deg", color:"red", transformOrigin:"50% 50% 10"}, 0.02));
        tl2.add(TweenMax.staggerTo($('.s-span1>div'), 1.5, {repeat:-1,yoyo:true,repeatDelay:1, color:"white"}, 0.02));
        tl2.pause();
        tl1.add(TweenMax.staggerFrom(['.p1-9','.p1-10','.p1-11','.p1-12','.p1-13','.t-text2'],.6, {delay:3,alpha:0,y:100,ease:Back.easeOut }, 0.1))
        tl1.add(TweenMax.staggerFrom(".btn", 2, {scale:0.5, opacity:0, ease:Elastic.easeOut, force3D:true}, 0.2))
        tl1.pause();

            var textareaBool = true;
        $(".bt3").on(touchstart,function(){
            var textareaVal = $('#t-word1').val().length;
            if(textareaVal<14 && textIndex==1){
                alert('为了保证密码效果,请将字数控制在14-24字之间');
                textareaBool = false;
            }else{
                textareaBool=true;
            }
            if(textareaBool){
                $('.page1').fadeOut(function () {
                    $('.page2').fadeIn(function () {
                        $('.p1-15').delay(500).fadeIn(function () {
                            $(this).delay(1500).fadeOut(function () {
                                    //截图
                                if(true) {
                                    html2canvas(document.getElementById("page2"), {
                                        allowTaint: true,
                                        taintTest: false,
                                        onrendered: function (canvas) {
                                            //canvas.width = 640;
                                            //canvas.height = 1039;
                                            //生成base64图片数据
                                            var dataUrl = canvas.toDataURL();
                                            var newImg = document.createElement("img");
                                            newImg.src = dataUrl;
                                            newImg.className = 'img-1'
                                            $(".page2>div").remove();
                                            $('body').append(newImg);
                                            console.log("制作成功！长按图片马上保存吧！");
                                            alert('保存');
                                        }
                                    });
                                }
                            });
                        })
                    });
                })
                //TweenMax.staggerTo(".btn", 0.5, {opacity:0, y:-100, ease:Back.easeIn}, 0.1);
                var textNum = $('#t-word1').val().length;
                var textFirst1 = $('#t-word1').val().slice(0,textNum/2);
                var textSecond1 = $('#t-word1').val().slice(textNum/2,textNum);
                console.log(textNum,textFirst1,textSecond1)

                var textFirst2 = $('.'+textObj+'').find('.s-1').text();
                var textSecond2 = $('.'+textObj+'').find('.s-2').text();
                console.log(textFirst2,textSecond2);

                if(textIndex==2){
                    //第一句的宽度
                    var TextWidth2_1 = getwidthF(textFirst2);
                    //第二局的宽度
                    var TextWidth2_2 = getwidthF(textSecond2);
                    $('.f-1').css('width',TextWidth2_1);
                    $('.f-2').css('width',TextWidth2_2);


                    $('.f-1').text(textFirst2);
                    $('.f-2').text(textSecond2);

                }else{
                    //第一句的宽度
                    var TextWidth1_1 = getwidthF(textFirst1);
                    //第二局的宽度
                    var TextWidth1_2 = getwidthF(textSecond1);
                    $('.f-1').css('width',TextWidth1_1);
                    $('.f-2').css('width',TextWidth1_2);
                    ////宽扁程度
                    //var box2_width = $('.box2-1').width()-20;
                    //
                    //var f1_width = $('.f-1').width();
                    //var f1_height = $('.f-1').height();
                    //TweenMax.set('.f-1',{scaleY:box2_width/f1_height,scaleX:box2_width/f1_width,x:-f1_width/2+160,y:-f1_height/2+160})
                    //
                    //var f2_width = $('.f-2').width();
                    //var f2_height = $('.f-2').height();
                    //TweenMax.set('.f-2',{rotation:90,scaleY:box2_width/f2_height,scaleX:box2_width/f2_width,x:-f2_width/2+160,y:-f2_height/2+160})

                    $('.f-1').text(textFirst1);
                    $('.f-2').text(textSecond1);

                }
                //宽扁程度
                var box2_width = $('.box2-1').width()-50;

                var f1_width = $('.f-1').width();
                var f1_height = $('.f-1').height();
                TweenMax.set('.f-1',{scaleY:box2_width/f1_height,scaleX:box2_width/f1_width,x:-f1_width/2+160,y:-f1_height/2+160})

                var f2_width = $('.f-2').width();
                var f2_height = $('.f-2').height();
                TweenMax.set('.f-2',{rotation:90,scaleY:box2_width/f2_height,scaleX:box2_width/f2_width,x:-f2_width/2+160,y:-f2_height/2+160})
            }
        });
    }

    // 宽度
    function getwidthF(textFirst1){
        var TextWidth=0;
        for(var i = 0;i < textFirst1.length;i++){
            if(aSmall.test(textFirst1[i])){
                TextWidth+=28;
            }else if(aBig.test(textFirst1[i])){
                TextWidth+=36;
            }else{
                TextWidth+=50;
            }
        }
        return TextWidth;
    }
//var divContent = '湿哒哒撒打算的大厦';
//    var data = "data:image/svg+xml," +
//        "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>" +
//        "<foreignObject width='100%' height='100%'>" +
//        "<div xmlns='http://www.w3.org/1999/xhtml' style='width: 100%;height: 100%; font-size:56px;font-family:Helvetica'>" +
//        divContent +
//        "</div>" +
//        "</foreignObject>" +
//        "</svg>";
//    var img = new Image();
//    img.src = data;
//    document.getElementById('box2-1').appendChild(img);



    if(str.test('萨。达')) {
        console.log(2);
    }else{
        console.log(44);
    }

    //TweenMax.set('.f-2',{scaleY:6,scaleX:.7,x:-$('.f-2').width()/2+160,rotation:90})

    var bt1Boor = true;
    $('.bt1').on(touchstart, function () {
        $('.t-text1').fadeOut(function () {
            $('.t-text2').fadeIn(function () {
                bt1Boor = true;
                textIndex = 2;
                });
        })
        if(bt1Boor){
            bt1Boor = false;
            var targetTop = $('.t-text2').height();
            TweenMax.to($('.t-text2>div'),.6, {y: -targetTop, ease: Expo.easeInOut,onComplete: function () {
                $('.t-text2>div').append($('.t-text2>div>div:first-of-type'));
                TweenMax.set('.t-text2>div',{y:0})
                textObj = $('.t-text2>div>div:first-of-type').attr('class');
                console.log(textObj)
                bt1Boor = true;
            }})
        }
    })
    $('.bt2').on(touchstart, function () {
        bt1Boor = false;
        $('.t-text2').fadeOut(function () {
            $('.t-text1').fadeIn();
            textIndex = 1;
            document.getElementById("bt2").focus();
        })
    })



    //阻止屏幕双击以后向上位移
    //当有表单页的时候，要关闭阻止事件，否则不能输入文字了
    function initPreventPageDobuleTap(isPreventPageDobuleTap){
        if(isPreventPageDobuleTap){
            $('.page').on(touchstart,function(e){
                e.preventDefault();
            })
        }else{
            $('.page').off(touchstart);
        }
    }
    //阻止屏幕双击以后向上位移
    //音乐按钮
    $('.musicicon').on(touchstart,function(){
        if($(this).hasClass('musicrotate')){
            sound_1.pause();
            $(this).removeClass('musicrotate');
        }else{
            sound_1.play();
            $(this).addClass('musicrotate');
        }
    })

});