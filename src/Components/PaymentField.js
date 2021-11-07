import React from 'react';

const PaymentField = ({ title, placeholder, state, setState }) => {
    return (
        <div className='payment__field col'>
            <h1>{title}</h1>

            <input placeholder={`Please input in your ${placeholder}`} type='text' value={state} onChange={e => setState(e.target.value)}/>
        </div>
    )
}

export default PaymentField;