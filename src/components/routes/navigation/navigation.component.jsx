import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as Crwnlogo } from '../../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropDown from "../../cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../../contexts/user.contexts";
import { CartContext } from "../../../contexts/cart.context";

import { SignOutUser } from "../../../utils/firebase/firebase.utils";

const Navigation = () => {

  const {currentUser, setCurrentUser} = useContext(UserContext);
  const {isCartopen} = useContext(CartContext);
    return(
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <Crwnlogo className="logo"/>
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={SignOutUser}> 
                SIGN OUT
                </NavLink>
              ):(
                <NavLink to='/auth'>
                SIGN IN
                </NavLink>
            )}
            <CartIcon/>
          </NavLinks>
          { isCartopen && <CartDropDown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
}
export default Navigation;