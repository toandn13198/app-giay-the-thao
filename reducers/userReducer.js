const isLogin=false

export const userReducer=(state=isLogin,action)=>{
    switch (action.type) {
        case 'IS_LOGIN':
            return state=action.data
        default:
            break;
    }
}