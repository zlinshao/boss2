import {
    SHOWLOADING,
    HIDELOADING
} from './types'
import getters from './getters'

const state={
	loading:false
};

const mutations={
	/*loading*/
	[SHOWLOADING](state){
		state.loading=true;
	},
    [HIDELOADING](state){
        state.loading=false;
    },
};
export default{
    state,
    mutations,
    getters
}