/**
 * Created by 乐伽运营 on 2017/9/12.
 */

var bannerData = [
    {
        href : 'javascript:;',
        src : 'src/assets/square/dcbb82986743478a901a412ae1d4501e20170911113132.jpeg',
        name : '《极致追击》曝终极海报'
    },
    {
        href : 'javascript:;',
        src : 'src/assets/square/60d3c0c1b29a4b73987e064196a29c9520170911110540.jpeg',
        name : '胡巴变超模压轴走秀引热捧'
    },
    {
        href : 'javascript:;',
        src : 'src/assets/square/203f6e3af7034fba841d8335d7ba093320170911111640.jpeg',
        name : '《妖猫传》曝十二角色海报'
    },
    {
        href : 'javascript:;',
        src : 'src/assets/square/0593cc0c7f9b4e0abff151f655e09f4420170911103556.jpeg',
        name : '《缝纫机乐队》发四美海报'
    }
];
let bannerLength = bannerData.length;   // 轮播数量
let index = 0;

$(function () {
    // 轮播图
    banner();
    // 信息流切换
    newTab();
});

// 轮播图
function banner() {
    let main_slide = $('.main_slide');

    let slide_scroll = $('.slide_scroll');
    // let slide_page = $('.slide_scroll .slide_page');
    let slide_nav = $('.slide_nav ul');

    for (let i = 0 ; i<bannerLength ; i++){
        slide_scroll.append(createBanner(bannerData[i]));
        slide_nav.append(createBannerNav());
    }
    slide_scroll.css({
        'left':0,
        'width':bannerLength*799+'px'
    });

    let silde_li = slide_nav.find('li');
    // console.log(silde_li);
    $(silde_li[0]).find('span').addClass('current')

    silde_li.hover(function (e) {
        // console.log($(e.target).parent().index());
        index = $(e.target).parent().index();

        changeBanner();
    });

    // 自动播放
    let auto = setInterval(autoPlay,4500);

    // 关闭轮播
    main_slide.hover(
        function () {
            clearInterval(auto);
        },
        function () {
            auto = setInterval(autoPlay,4500);
        }
    );


    // 下一张
    $('.main_slide .slide_next').bind('click',function () {
        // console.log('prev')
        if (index==bannerLength-1){
            index = 0
        } else {
            index ++;
        }
        changeBanner()
    });
    // 上一张
    $('.main_slide .slide_prev').bind('click',function () {
        // console.log('next')
        if (index==0){
            index = bannerLength-1
        } else {
            index --;
        }
        changeBanner()
    })

}

// 轮播
function createBanner(item) {
    let slide_page = $('<div></div>').addClass('slide_page');

    let a = $('<a></a>').attr('href',item.href);
    $('<img width="100%" height="100%" />').attr('src',item.src).appendTo(a);
    $('<h3></h3>').text(item.name).appendTo(a);
    a.appendTo(slide_page);

    return slide_page;
}

// 轮播按钮
function createBannerNav() {
    let li = $('<li></li>');

    $('<span></span>').appendTo(li);

    return li;
}

// 自动播放
function autoPlay() {

    if (index==bannerLength-1){
        index = 0
    } else {
        index ++;
    }
    changeBanner();

}

function changeBanner() {
    let slide_scroll = $('.slide_scroll');
    let slide_nav = $('.slide_nav ul');
    let silde_li = slide_nav.find('li');

    slide_scroll.stop().animate({'left':-index*799+'px'},750);
    $(silde_li).find('span').removeClass('current');
    $(silde_li[index]).find('span').addClass('current')
}


// 信息流切换
function newTab() {
    let tabIndex = 0;

    let nav_item = $('.nav_item');
    let newsdata_item = $('.newsdata_item');

    nav_item.find('a').bind('click',function (e) {
        // console.log($(e.target).parent().index());
        tabIndex = $(e.target).parent().index();
        nav_item.find('a').removeClass('current');
        $(this).addClass('current');
        newsdata_item.hide();
        $(newsdata_item[tabIndex]).show();
    });

    // 加载更多
    $('.load_more_btn').bind('click',function () {
        console.log(tabIndex)
    })

}