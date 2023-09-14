import './checkout-item.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem =({cartItem}) => {
    const {name,id,imageUrl,price,quantity} = cartItem;
    const {clearItemFromCart,addItemToCart,removeItemFromCart} = useContext(CartContext);

    const removeItem = () =>{
        clearItemFromCart(cartItem);
    }
    const incrementQuantity = ()=>{
        addItemToCart(cartItem);
    }
    const decrementQuantity = () =>{
        removeItemFromCart(cartItem);
    }
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <div className='arrow' onClick={decrementQuantity}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={incrementQuantity}>
                    &#10095;
                </div>
            </div>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={removeItem}>&#10005;</div>
        </div>
    )

}
export default CheckoutItem;