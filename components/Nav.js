import Link from 'next/link';
import NavStyles from './styles/NavStyles'
import User from './User';
import SignOut from './SignOut';
import { TOGGLE_CART_MUTATION } from './Cart';
import { Mutation } from 'react-apollo';
import CartCount from './CartCount';

const Nav = () => (
      <User>
        {({ data: { me } }) => (
            <NavStyles>
              <Link href="/items">
                <a>Shop</a>
              </Link>
              {me && (
                <>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
                <Link href="/me">
                  <a>Account</a>
                </Link>
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                {(toggleCart) => {
                  return(
                    <button onClick={toggleCart}>
                      Cart
                      <CartCount count={me.cart.reduce((tally, cartItem) => (
                        tally + cartItem.quantity
                  ) ,0)}></CartCount>
                    </button>
                  )
                }}
                </Mutation>
                <SignOut></SignOut>
                </>
              )}
              {!me && (
                <Link href="/login">
                <a>Log In</a>
              </Link>
              )}
              
        </NavStyles> 
        )}
    </User>
  );

export default Nav;