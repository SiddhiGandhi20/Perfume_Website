import React, { useState } from 'react';
import Exclusive from './Exclusive';
import Cart from './Cart';
import Women from './Women';
import Men from './Men';

const CartState = () => {
  const [cart, setCart] = useState([]);

  return (
    <div>
      {/* Pass cart and setCart as props to Exclusive, Women, Men, and Cart components */}
      <Exclusive cart={cart} setCart={setCart} />
      <Women cart={cart} setCart={setCart} />
      <Men cart={cart} setCart={setCart} />
      <Cart cartItems={cart} setCart={setCart} />
    </div>
  );
};

export default CartState;
