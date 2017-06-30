/**
 * Created by linshao on 2017/6/28.
 */

globalConfig = {
    server: "http://test.v2.api.boss.lejias.cn/",
    host: "http//test.v2.boss.lejias.cn/",
    pic_address: "http://test.api.boss.lejias.cn/picture/upload",
    appId:"dingoaop2sz9fntxxgaytz",
    state: 'dev',
    urlName: "",
    env: 'dev'
};

function indexOf(val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === val) return i;
    }
    return -1;
}