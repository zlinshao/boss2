/**
 * Created by 乐伽运营 on 2017/9/13.
 */

// let baseUrl = 'http://test.v2.api.boss.lejias.cn/';
let baseUrl = globalConfig.server;
let dict = {};
$(function () {

    // 回到顶部
    $(window).scroll(function () {
        var scrollt = document.documentElement.scrollTop + document.body.scrollTop;
        if ( scrollt > 200 ){
            $(".ns-side-totop").fadeIn(500);
        } else {
            $(".ns-side-totop").fadeOut(500);
        }
    });

    $(".ns-side-totop").click(function(){
        $("html,body").animate({scrollTop: 0}, 400);
    });

    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square/dict',
        success: (data) => {
            // console.log(data);
            dict = data;
            getRecommend();
        }
    });

    getDetails();

    // 评论功能
    $('#tieArea .submit-row').bind('click',function () {
        let id = GetQueryString('id');
        // console.log($(this).prev().children('textarea').val());
        let val = $(this).prev().children('textarea').val();
        if (val.length!=0){
            $.ajax({
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                url: baseUrl + 'code/Staff_Square/comment',
                data : {
                    article_id : id,
                    comment : val
                },
                success: (data) => {
                    // console.log(data);
                    if (data.code==30050){
                        // 成功
                        $('.tie-list').append(createComment(data.data));
                        $(this).prev().children('textarea').val('');
                        // console.log($('.post_comment_tiecount a').text())
                        $('.post_comment_tiecount a').text(parseInt($('.post_comment_tiecount a').text())+1);
                    } else {

                    }
                }
            })
        }
    })



});

// 获取图片地址
function getSrc(item){
    for (let i in item.album.staff_pic){
        return item.album.staff_pic[i].raw;
    }
}

// 获取详情
function getDetails() {
    let id = GetQueryString('id');
    // let id = 74;

    let epContentLeft = $('#epContentLeft');
    let endText = $('#endText');
    let vedioCon = $('#vedioCon');
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square/showDetails?id='+id,
        success: (data) => {
            // console.log(data);
            if (data.code==30020){
                // 成功
                let val = data.data[0];
                document.title = val.title;
                epContentLeft.children('h1').text(val.title);
                epContentLeft.children('.post_time_source').text(val.create_time);
                endText.html(val.content);
                $('.post_body .operation span').text(val.thumbs);
                if (val.is_thumbs){
                //     已赞过
                    $('.post_body .operation').addClass('current');
                } else {
                    // 点赞功能
                    $('.post_body .operation').bind('click',function () {
                        let id = GetQueryString('id');
                        // console.log(this)
                        $.ajax({
                            type: 'GET',
                            xhrFields: {
                                withCredentials: true
                            },
                            url: baseUrl + 'code/Staff_Square/thumbsUp?article_id=' + id,
                            success: (data) => {
                                // console.log(data);
                                if (data.code==30060){
                                    // 成功
                                    $('.post_body .operation').addClass('current');
                                    $('.post_body .operation span').text(data.data)
                                    /*$('.post_body .operation span').text(
                                        parseInt($('.post_body .operation span'))+1
                                    )*/
                                }
                            }
                        })
                    });
                }


                $('.post_comment_tiecount a').text(val.comments.length);

                // console.log(val.album.vedio_pic.length);
                if (val.album.length!=0){
                    if (val.album.vedio_pic.length!=0){
                        for (let i in val.album.vedio_pic){
                            // console.log(val.album.vedio_pic[i].raw);
                            $('<video></video>').attr({
                                'width' : '100%',
                                'src' : val.album.vedio_pic[i].raw,
                                'controls' : 'controls'
                            }).appendTo(vedioCon);
                        }
                    }
                } else {
                    vedioCon.hide()
                }
                // console.log(val.comments);
                for (let i = 0 ; i<val.comments.length ; i++){
                    $('.tie-list').append(createComment(val.comments[i]));
                }
            }
        }
    })

}

// 获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


// 评论
function createComment(item) {
    let div = $('<div></div>').addClass('single-tie').addClass('z-only-one');

    let photoDiv = $('<div></div>').addClass('photo').appendTo(div);
    let photoA = $('<a></a>').attr('href','javascript:;').appendTo(photoDiv);
    $('<img />').attr('src',item.pic_url).appendTo(photoA);

    let tieDiv = $('<div></div>').addClass('tie-bdy').appendTo(div);

    let bdyInner = $('<div></div>').addClass('bdy-inner').appendTo(tieDiv);
    let tieAuthor = $('<div></div>').addClass('tie-author').appendTo(bdyInner);
    $('<a></a>').addClass('name').attr('href','javascript:;').text(item.user_name).appendTo(tieAuthor);
    $('<span></span>').addClass('tie-time').text(item.create_time).appendTo(tieAuthor);

    $('<p></p>').addClass('tie-cnt').text(item.comment).appendTo(bdyInner);

    let toolBar = $('<div></div>').addClass('tool-bar').addClass('clearfix').appendTo(bdyInner);
    let mTool = $('<ul></ul>').addClass('m-tool').appendTo(toolBar);
    let mToolLi = $('<li></li>').appendTo(mTool);
    let replyA = $('<a></a>').attr('href','javascript:;').addClass('tie-operate').addClass('reply-btn').text('回复');

    replyA.appendTo(mToolLi);

    let reply = $('<div></div>').addClass('reply').appendTo(div);
    $('<textarea rows="2"></textarea>').appendTo(reply);
    let replyButton = $('<button></button>').addClass('replyBtn').text('回复');
    replyButton.appendTo(reply);

    $('<div></div>').addClass('clear').appendTo(div);

    let replyList = $('<div></div>').addClass('replyList').appendTo(div);
    if (item.reply!=undefined){
        for (let i = 0 ; i<item.reply.length ; i++){
            replyList.append(createReply(item.reply[i]));
        }
    }

    replyA.bind('click',function () {
        if (reply.css('display')=='none'){
            reply.show();
        } else {
            reply.hide();
            reply.children('textarea').val('');
        }
    });

    replyButton.bind('click',function () {
        // console.log(item.id);
        // console.log(item.article_id);
        // console.log($(this).prev().val());
        let replyVal = $(this).prev().val();
        if (replyVal.length!=0){
            $.ajax({
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                url: baseUrl + 'code/Staff_Square/comment',
                data : {
                    article_id : item.article_id,
                    response_id : item.id,
                    comment : replyVal
                },
                success: (data) => {
                    // console.log(data);
                    if (data.code==30050){
                        // 成功
                        replyList.append(createReply(data.data));
                        $(this).prev().val('');
                        $(this).parent().hide();
                    } else {

                    }
                }
            })
        }

    });
    return div;
}

// 回复
function createReply(item) {
    let div = $('<div></div>').addClass('replyItem').addClass('clearfix');

    let photoDiv = $('<div></div>').addClass('photo').addClass('replyPhoto').appendTo(div);
    let photoA = $('<a></a>').attr('href','javascript:;').appendTo(photoDiv);
    $('<img />').attr('src',item.pic_url).appendTo(photoA);

    let tieDiv = $('<div></div>').addClass('tie-bdy').appendTo(div);

    let bdyInner = $('<div></div>').addClass('bdy-inner').appendTo(tieDiv);
    let tieAuthor = $('<div></div>').addClass('tie-author').appendTo(bdyInner);
    $('<a></a>').addClass('name').attr('href','javascript:;').text(item.user_name).appendTo(tieAuthor);
    $('<span></span>').addClass('tie-time').text(item.create_time).appendTo(tieAuthor);

    $('<p></p>').addClass('tie-cnt').text(item.comment).appendTo(bdyInner);

    return div;

}


// 获取推荐
function getRecommend() {
    // 查看最多
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square',
        data : {
            browser_most : 1
        },
        success: (data) => {
            // console.log(data);
            if (data.code==30010){
                // 成功
                let val = data.data.list;
                // console.log(val);
                let recommendLike = $('.recommend.like');
                // console.log(recommendLike.find('.ep-title-3 a'))
                recommendLike.find('.ep-title-3 a').attr('href','detail.html?id='+val[0].id).text(val[0].title);
                let likeUl = recommendLike.find('.mod-f12list');
                for (let i = 1 ; i<val.length;i ++){
                    likeUl.append(createLike(val[i]));
                }
            } else {

            }
        }
    });
    // 评论最多
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'code/Staff_Square',
        data : {
            comment_most : 1
        },
        success: (data) => {
            // console.log(data);
            if (data.code==30010){
                // 成功
                let val = data.data.list;
                // console.log(val);
                let hotImgList = $('.recommend.hot ul.mod-imglist');
                let hotList = $('.recommend.hot .mod-f12list');
                if (val.length>2){
                    for (let i = 0 ; i<2 ; i++){
                        hotImgList.append(createHotFirst(val[i]));
                    }
                    for (let i = 2 ; i<val.length;i++){
                        hotList.append(createHot(val[i]));
                    }

                } else {
                    for (let i = 0 ; i<val.length ; i++){
                        hotImgList.append(createHotFirst(val[i]));
                    }
                }
            } else {

            }
        }
    });

}

// 创建大家都爱看
function createLike(item) {
    let li = $('<li></li>');

    $('<a></a>').addClass('cBlack').attr('href','javascript:;').text(dict.article_type[item.type]).appendTo(li);
    $('<span></span>').addClass('cLGray').text('|').appendTo(li);
    $('<a></a>').addClass('cBlack').attr('href','detail.html?id='+item.id).text(item.title).appendTo(li);

    return li;
}

// 创建热门推荐前两个
function createHotFirst(item) {
    let li = $('<li></li>');

    let imgA = $('<a></a>').attr({
        title : item.title,
        href : 'detail.html?id='+item.id
    }).appendTo(li);
    $('<img width="130" height="90" />').attr({
        alt : item.title,
        src : getSrc(item)
    }).appendTo(imgA);

    let h3 = $('<h3></h3>').appendTo(li);
    $('<a></a>').attr('href','detail.html?id='+item.id).text(item.title).appendTo(h3);

    return li;
}

// 热门推荐后五个
function createHot(item) {
    let li = $('<li></li>');

    $('<a></a>').attr('href','detail.html?id='+item.id).text(item.title).appendTo(li);

    return li;
}










