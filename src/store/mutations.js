import {
    SHOWLOADING,
    HIDELOADING,
    HIDE
} from './types'
import getters from './getters'

const state={
	loading:false,
    isHide:false,
};

const mutations={
	/*loading*/
	[SHOWLOADING](state){
		state.loading=true;
	},
    [HIDELOADING](state){
        state.loading=false;
    },
    [HIDE](state){
        state.isHide = true;
    }
};
export default{
    state,
    mutations,
    getters
}