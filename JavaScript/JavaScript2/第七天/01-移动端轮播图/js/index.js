window.addEventListener('load', function () {
    // alert('1');
    //获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    //利用定时器自动轮播图
    var index = 0;
    var flag = false;
    var timer = setInterval(function () {
        index++;
        var translateX = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);
    //等着我们过渡完成之后再去判断，监听过渡完成
    ul.addEventListener('transitionend', function () {
        // console.log('1');
        //无缝滚动
        if (index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        //小圆点变化效果
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

    //手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function (e) {
        //移动距离
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transform = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault();
    })
    ul.addEventListener('touchend', function (e) {
        //如果移动距离大于50像素，我们就播放上/下一张
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else if (moveX < 0) {
                    index++;
                }
                var translateX = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                var translateX = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
        }
        flag = false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translateX = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000);
    })

    // 返回顶部模块制作
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function (e) {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    })
})