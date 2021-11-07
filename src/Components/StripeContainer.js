import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm.js';

const PUBLIC_KEY = "pk_test_51JsQiiCo6B9E9k9LBBU8ntKc0RQPhWI0QjXhNzbxUN2EXmih0LGYX00SQYWpKlZeJToeaq9KkT22uLlno2nFTr8H002gLM6rr8";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    )
}

export default StripeContainer;