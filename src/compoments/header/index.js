/**
 * Created by Administrator on 2017/6/15 0015.
 */
import LoadingComponent from './header.vue'


const Header={
    install:function (Vue) {
        Vue.component('Header',LoadingComponent)
    }
};
export default Header