/**
 * Created by linshao on 2017/6/28.
 */

globalConfig = {
    server: 'http://test.v2.api.boss.lejias.cn/',                       //接口地址
    host: 'http//test.v2.boss.lejias.cn/',
    pic_address: 'http://test.v2.api.boss.lejias.cn/picture/upload',    //图片地址
    vedio_address: 'http://test.v2.api.boss.lejias.cn/picture/upload',  //视频地址
    appId:'dingoaop2sz9fntxxgaytz',
    state: 'dev',
    env: 'dev',
    urlName: '',                                                        //用户名
};

function indexOf(val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === val) return i;
    }
    return -1;
}