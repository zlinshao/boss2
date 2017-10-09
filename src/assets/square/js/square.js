/**
 * Created by 乐伽运营 on 2017/9/12.
 */
// let baseUrl = 'http://test.v2.api.boss.lejias.cn/';
let baseUrl = globalConfig.server;

var bannerData = [];
let bannerLength = 0;   // 轮播数量
let index = 0;

let dict = {};

$(function () {
    // 获取字典

    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square/dict',
        success: (data) => {
            // console.log(data);
            dict = data;
            // 新闻
            getNews();
        }
    });

    // 轮播图数据
    getBanner();
    // 获取次标题
    getSubtitle();
    // 热门导读
    getHot();
    // 人物志
    getPeople();

    // 信息流切换
    newTab();
});

// 获取图片地址
function getSrc(item){
    for (let i in item.album.staff_pic){
        return item.album.staff_pic[i].raw;
    }
}
/**************************************************************************************************/


// 获取轮播图
function getBanner() {
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square',
        data : {
            type : 7,
            status : 2
        },
        success: (data) => {
            if (data.code==30010){
                bannerData = data.data.list;
                bannerLength = bannerData.length;
                // console.log(bannerLength);
                // 轮播图
                banner();
            }

        }
    })
}

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
    // console.log(item);
    // console.log(item.album.staff_pic);
    let src = getSrc(item);

    let slide_page = $('<div></div>').addClass('slide_page');

    let a = $('<a></a>').attr('href','detail.html?id='+item.id)
        .bind('click',function () {
            addSeen(item.id)
        });
    $('<img width="100%" height="100%" />').attr('src',src).appendTo(a);
    $('<h3></h3>').text(item.title).appendTo(a);
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

/**************************************************************************************************/

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

/**************************************************************************************************/


// 获取次标题
function getSubtitle() {
    let subtitle = [];
    let banner_pics = $('.banner_pics');

    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square',
        data : {
            type : 8,
            status : 2
        },
        success: (data) => {
            if (data.code==30010){
                // console.log(data.data.list[0]);
                banner_pics.append(createSubtitle(data.data.list[0]));
                // subtitle.push(data.data.list[0]);
            }

        }
    });
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square',
        data : {
            type : 9,
            status : 2
        },
        success: (data) => {
            if (data.code==30010){
                // console.log(data.data.list[0])
                banner_pics.append(createSubtitle(data.data.list[0]));
                // subtitle.push(data.data.list[0]);
            }

        }
    });
    // console.log(subtitle);
}

// 次标题
function createSubtitle(item) {
    let div = $('<div></div>').addClass('bpic');

    let a = $('<a></a>').attr('href','detail.html?id='+item.id);
    $('<img width="399" height="195" />').attr({
        'src' : getSrc(item),
        'alt' : item.title
    }).appendTo(a);
    $('<h3></h3>').text(item.title).appendTo(a);

    a.appendTo(div);

    return div;
}

/**************************************************************************************************/

// 热门导读
function getHot() {
    let left_sidebar = $('.left_sidebar ul.scroll_list');

    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square',
        data : {
            type : 6,
            status : 2
        },
        success: (data) => {
            if (data.code==30010){
                // console.log(data.data.list);
                for (let i = 0 ; i<data.data.list.length ; i++){
                    left_sidebar.append(createHot(data.data.list[i]));
                }
            }

        }
    });
}

function createHot(item) {
    let li = $('<li></li>').addClass('scroll_item');

    let columDiv = $('<div></div>').addClass('column_pic').appendTo(li);
    let firstDiv = $('<div></div>').addClass('first_content').appendTo(columDiv);
    let picTopDiv = $('<div></div>').addClass('pic_top').appendTo(firstDiv);
    $('<div></div>').addClass('mask').appendTo(picTopDiv);
    let a = $('<a></a>').attr('href','detail.html?id='+item.id).addClass('pic').appendTo(picTopDiv)
        .bind('click',function () {
            addSeen(item.id)
        });
    $('<img width="105" height="65" />').attr({
        'src' : getSrc(item),
        'alt' : item.title
    }).appendTo(a);

    let h3 = $('<h3></h3>').appendTo(firstDiv);
    $('<a></a>').attr('href','detail.html?id='+item.id).text(item.title).appendTo(h3)
        .bind('click',function () {
            addSeen(item.id)
        });

    return li;
}

/**************************************************************************************************/

// 人物志
function getPeople() {
    let rg_video = $('.rg_video');

    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square',
        data : {
            type : 5,
            status : 2
        },
        success: (data) => {
            if (data.code==30010){
                // console.log(data.data.list);
                for (let i = 0 ; i<data.data.list.length ; i++){
                    rg_video.append(createPeople(data.data.list[i]));
                }
            }

        }
    });
}

function createPeople(item) {
    let div = $('<div></div>').addClass('rg_pic_wrap');

    let picDiv = $('<div></div>').addClass('first_pic').appendTo(div);
    let a = $('<a></a>').attr('href','detail.html?id='+item.id).appendTo(picDiv)
        .bind('click',function () {
            addSeen(item.id)
        });

    $('<img width="300" height="195" />').attr({
        'src' : getSrc(item),
        'alt' : item.title
    }).appendTo(a);
    let h3 = $('<h3></h3>').text(item.title).appendTo(a);
    return div;
}

/**************************************************************************************************/
// 新闻
function getNews() {

    for (let i = 1 ; i<=4 ; i++){
        // console.log(i)
        getNew(i);
    }
}

function getNew(type) {
    let newsdata_item = $('li.newsdata_item .ndi_main');
    // console.log(type);
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square',
        data : {
            type : type,
            status : 2
        },
        success: (data) => {
            // console.log(data);
            if (data.code!=30010){
                $(newsdata_item[type-1]).children('div.row_message').show();
            } else {
                for (let i = 0 ; i<data.data.list.length ; i++){
                    $(newsdata_item[type-1]).append(createNew(data.data.list[i]));
                }
            }
        }
    });
}


function createNew(item) {
    let div = $('<div></div>').addClass('data_row').addClass('news_article').addClass('clearfix');

    let picA = $('<a></a>').addClass('na_pic').attr('href','detail.html?id='+item.id).appendTo(div)
        .bind('click',function () {
        addSeen(item.id)
    });
    $('<img width="190" height="120" />').attr({
        'src' : getSrc(item),
        'alt' : item.title
    }).appendTo(picA);

    let detailDiv = $('<div></div>').addClass('na_detail').addClass('clearFix').appendTo(div);

    let titleDiv = $('<div></div>').addClass('news_title').appendTo(detailDiv);
    let titleH3 = $('<h3></h3>').appendTo(titleDiv);
    $('<a></a>').attr('href','detail.html?id='+item.id).text(item.title).appendTo(titleH3)
        .bind('click',function () {
            addSeen(item.id)
        });

    let tagDiv = $('<div></div>').addClass('news_tag').appendTo(detailDiv);
    $('<a></a>').attr('href','detail.html?id='+item.id).addClass('link').text(dict.article_type[item.type]).appendTo(tagDiv)
        .bind('click',function () {
            addSeen(item.id)
        });
    $('<span></span>').addClass('time').text(item.create_time).appendTo(tagDiv);

    let shareDiv1 = $('<div></div>').addClass('share-join').addClass('clearfix').appendTo(detailDiv);
    let shareA1 = $('<a></a>').attr('href','detail.html?id='+item.id).addClass('join-count').appendTo(shareDiv1)
        .bind('click',function () {
            addSeen(item.id)
        });
    let tieDiv1 = $('<div></div>').addClass('tie-wrap').appendTo(shareA1);
    $('<span></span>').addClass('tie-icon').html('<i class="fa fa-eye"></i> '+item.browser).appendTo(tieDiv1);   // 查看
    $('<span></span>').addClass('tie-icon').html('<i>查看</i> '+item.browser).appendTo(tieDiv1);   // 查看

    let shareDiv2 = $('<div></div>').addClass('share-join').addClass('clearfix').appendTo(detailDiv);
    let shareA2 = $('<a></a>').attr('href','detail.html?id='+item.id).addClass('join-count').appendTo(shareDiv2)
        .bind('click',function () {
            addSeen(item.id)
        });
    let tieDiv2 = $('<div></div>').addClass('tie-wrap').appendTo(shareA2);
    $('<span></span>').addClass('tie-icon').html('<i class="fa fa-thumbs-o-up"></i> '+item.thumbs).appendTo(tieDiv2);   // 查看
    $('<span></span>').addClass('tie-icon').html('<i>点赞</i> '+item.thumbs).appendTo(tieDiv2);   // 查看

    return div;
}


// 查看次数加一
function addSeen(id) {
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square/showDetails?id=' + id+'&front=-1',
        success: (data) => {
        }
    })
}





