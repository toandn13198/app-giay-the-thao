import { getStoreCart,addStoreCart } from "../AsynStore"
//get data form AsyncStorage

//reducer
const defaulState={
    Cart:[],
    isLogin:false,
    ipConfig:'192.168.1.3',
  }

export const reducer = (state=defaulState,action)=>{
    switch (action.type) {
      case 'ADD_TO_CART':
            let check=0
            state.Cart.map((e,i)=>{
                if(e.id==action.data.id&&e.color==action.data.color&&e.size==action.data.size){
                e.num=e.num+1
                check=1;
                }
            })
            if(check!=0){
                addStoreCart( {...state,Cart:[...state.Cart]} )
                return {...state,Cart:[...state.Cart]}
            }else{
                addStoreCart( {...state,Cart:[...state.Cart,action.data]} )
                return {...state,Cart:[...state.Cart,action.data]}
            }
      case 'REMOVE_FROM_CART':
            addStoreCart(
                {...state,Cart:state.Cart.filter(item=>!(item.id===action.data.id&&item.color===action.data.color&&item.size===action.data.size))}
            )
            return {...state,Cart:state.Cart.filter(item=>!(item.id===action.data.id&&item.color===action.data.color&&item.size===action.data.size))}
        case 'REMOVE_ALL_CART':
            addStoreCart({...state,Cart:[]});
            return {...state,Cart:[]}
      case 'ADD_QUANTILY':
            state.Cart.map((e,i)=>{
            if(e.id==action.data.id&&e.color==action.data.color&&e.size==action.data.size){
                e.num=e.num+1
            }
            })
            addStoreCart({...state,Cart:[...state.Cart]})
            return {...state,Cart:[...state.Cart]}
      case 'SUB_QUANTILY':
            state.Cart.map((e,i)=>{
            if(e.id==action.data.id&&e.color==action.data.color&&e.size==action.data.size&&e.num>1){
                e.num=e.num-1
            }
            })
            addStoreCart({...state,Cart:[...state.Cart]})
            return {...state,Cart:[...state.Cart]}
     case 'IS_LOGIN':
            return {...state,isLogin:action.setLogin}
      default:
        addStoreCart(state)
        return state;
    }
  }