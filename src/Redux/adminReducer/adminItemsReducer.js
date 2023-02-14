export default function adminItemsReducer(state={},action){
    
    switch (action.type){
     
        case 'admin-Items':return {
            ...state,action,adItems:action.data
           
        }
       
        default :return state
    }

}