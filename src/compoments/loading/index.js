/**
 * Created by Administrator on 2017/6/15 0015.
 */
import LoadingComponent from './loading.vue'

const Loading={
    install:function (Vue) {
        Vue.component('Loading',LoadingComponent)
    }
};
export default Loading