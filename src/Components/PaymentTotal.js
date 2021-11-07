import React, { useContext } from 'react';
import { Context } from '../Context';

const PaymentTotal = () => {
    const { shoppingCartTotal } = useContext(Context);

    return (
        <div className='Page__section--tiny payment__btn-cont fw ctr'>
            <h1>TOTAL &ndash; ${!shoppingCartTotal ? '0.00' : shoppingCartTotal}</h1>
        </div>
    )
}

export default PaymentTotal;