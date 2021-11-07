import React from 'react';
import StripeContainer from '../Components/StripeContainer';

const Checkout = () => {
    return (
        <div className='Page ctr'>
            <div className='Page__section--large fw ctr'>
                <StripeContainer/>
            </div>
        </div>
    )
}

export default Checkout;