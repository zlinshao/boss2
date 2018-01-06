import * as types from './types'

export default{
	showLoading:({commit})=>{
        commit(types.SHOWLOADING)
    },
    hideLoading:({commit})=>{
        commit(types.HIDELOADING)
    },
    hide:({commit})=>{
        commit(types.HIDE)
    }
}
