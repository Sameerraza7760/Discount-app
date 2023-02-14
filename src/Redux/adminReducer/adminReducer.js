export default function adminReducer(state={},action){
    switch (action.type){
        case 'admin-inform':return {
            ...state,action,admin:action.data
        }
        default :return state
    }

}