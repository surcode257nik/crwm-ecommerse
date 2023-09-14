import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import { CartDropDownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';

const CartDropDown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = ()=>{
        navigate('/checkout')
    }
    return(
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (
                        <CartItem key= {item.id} cartItem={item}/>
                    ))) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckout}>CHECKOUT</Button>
        </CartDropDownContainer>
    )
}
export default CartDropDown;