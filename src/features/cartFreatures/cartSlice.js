import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: window.localStorage.getItem("cartItems") ? JSON.parse(window.localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmaount: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            //action.payload===product
            if (state?.cartItems?.length > 0) {
                const index = state.cartItems.findIndex((el) => {
                    return el.id == action.payload.id;
                })
                if (index >= 0) {
                    state.cartItems[index].cartQuantity += 1;
                    toast.info(`Increased ${state.cartItems[index].title}'s Quantity`, {
                        position: "bottom-center"
                    })
                }
                else {
                    const tempProduct = { ...action.payload, cartQuantity: 1 };
                    state.cartItems.push(tempProduct);
                    toast.success(`${action.payload.title} Product Added To Cart`, {
                        position: "bottom-right", theme: "dark"
                    })
                }
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} Product Added To Cart`, {
                    position: "bottom-right", theme: "dark"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            //state.cartTotalQuantity+=1;
        },
        decreaseCart:(state,action)=>{
            const itemIndex = state.cartItems.findIndex((el) => {
                return el.id === action.payload.id;
            })
            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity-=1;
                toast.info(`Decreased ${action.payload.title}'s Quantity`, {
                    position: "bottom-center"
                })
            }
            else if(state.cartItems[itemIndex].cartQuantity===1){
                const nextCartItems=state.cartItems.filter((el)=>{
                    return el.id!==action.payload.id
                })
                state.cartItems=nextCartItems;
                toast.error(`${action.payload.title} removed from the cart`, {
                    position: "bottom-center"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart:(state,action)=>{
            state.cartItems=[];
            toast.error(`All products are removed from the cart`, {
                position: "bottom-center"
            })
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals:(state,action)=>{
            let {total,quantity}=state.cartItems.reduce((cartTotal,cartItem)=>{
                const {price,cartQuantity}=cartItem;
                const itemTotal=price*cartQuantity;
                cartTotal.total+=itemTotal;
                cartTotal.quantity+=cartQuantity;
                return cartTotal;
            },
            {
                total:0,
                quantity:0
            })
            total=parseFloat(total.toFixed(2))
            state.cartTotalAmaount=total;
            state.cartTotalQuantity=quantity;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart,decreaseCart,clearCart,getTotals } = cartSlice.actions;

export default cartSlice.reducer;