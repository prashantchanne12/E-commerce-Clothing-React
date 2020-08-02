import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartHidden } from "../../redux/cart/cart-selectors.js";
import { selectCurrentUser } from "../../redux/user/user-selector.js";
import { signOutStart } from "../../redux/user/user-actions";
// Connect is a Higher Order Component (HOC) that lets us modify our component to have access to things related to redux
// HOC are the functions that takes components are the arguments and returns you a souped up component
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header-styles";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown.jsx";

import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => signOutStart()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

// 'state' is the top level 'Root Reducer'
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const dispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, dispatchToProps)(Header);

/*
connect() return another function
so connect()() is equal to function()

-------------------------------------------

function add(x){
  return function(y){
    return x + y;
  };
}
 
var addTwo = add(2);
 
addTwo(4) === 6; // true
add(3)(4) === 7; // true
*/
