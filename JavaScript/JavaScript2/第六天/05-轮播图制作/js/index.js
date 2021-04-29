window.addEventListener('load', function (e) {
    var arrow1 = document.querySelector('.arrow-l');
    var arrow2 = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //鼠标经过focus，显示左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow1.style.display = 'block';
        arrow2.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow1.style.display = 'none';
        arrow2.style.display = 'none';
        timer = setInterval(function () {
            arrow2.click();
        }, 2000)
    })
    //动态生成小圆圈,图片与圆圈的数量相等
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //记录当前小圆圈的索引号，通过自定义属性
        li.setAttribute('index', i);
        ol.appendChild(li);
        //小圆圈的排他思想，直接在生成的时候绑定点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈移动图片，移动的是ul
            //ul的移动距离是小圆圈的索引号乘上图片的宽度（负值）
            //animate(obj,target,callback);
            var index = this.getAttribute('index');
            //当我们点击了某个小li，就把这个li的索引号给num和circle
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    //把ol里面的第一个li设置为current
    ol.children[0].className = 'current';
    //克隆第一张图片，放到ul最后面
    var first = ul.children[0].cloneNode(true);//深拷贝
    ul.appendChild(first);
    //点击右侧按钮，图片滚动一张
    var num = 0;
    //circle控制小圆圈的播放
    var circle = 0;
    var flag = true;
    //右侧按钮
    arrow2.addEventListener('click', function (e) {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
                //打开节流阀
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    // 左侧按钮
    arrow1.addEventListener('click', function (e) {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }

    })
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //自动播放
    var timer = setInterval(function () {
        arrow2.click();
    }, 2000)
})