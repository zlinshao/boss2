/**
 * Created by 乐伽运营 on 2017/9/13.
 */

let baseUrl = 'http://test.v2.api.boss.lejias.cn/';

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

    getDetails();

});

// 获取详情
function getDetails() {
    // let id = GetQueryString(id);
    let id = 80;

    let epContentLeft = $('#epContentLeft');
    let endText = $('#endText');
    let vedioCon = $('#vedioCon');
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: baseUrl + 'index/Staff_Square/showDetails?id='+id,
        success: (data) => {
            console.log(data);
            if (data.code==30020){
                // 成功
                let val = data.data[0];
                epContentLeft.children('h1').text(val.title);
                epContentLeft.children('.post_time_source').text(val.create_time);
                endText.html(val.content);

                // console.log(val.album.vedio_pic.length);
                if (val.album.vedio_pic.length!=0){
                    for (let i in val.album.vedio_pic){
                        // console.log(val.album.vedio_pic[i].raw);
                        $('<video></video>').attr({
                            'width' : '100%',
                            'src' : val.album.vedio_pic[i].raw,
                            'controls' : 'controls'
                        }).appendTo(vedioCon);
                    }
                } else {
                    vedioCon.hide()
                }
            }
        }
    })

}

// 获取url参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}