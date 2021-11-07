import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from '../Context.js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import PaymentField from './PaymentField';
import PaymentTotal from './PaymentTotal.js';
import loadingGif from '../Res/Images/loading.gif';

const PaymentForm = () => {
    const { setShoppingCartData, setShoppingCartTotal } = useContext(Context);
    const [success, setSuccess] = useState(false);
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [transactionId, setTransactionId] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const inputFields = [
        {
            title: 'Title',
            placeholder: 'Title (e.g. Mr, Mrs...)',
            state: title,
            setState: setTitle
        },
        {
            title: 'First Name',
            placeholder: 'first name',
            state: firstName,
            setState: setFirstName
        },
        {
            title: 'Last Name',
            placeholder: 'last name',
            state: lastName,
            setState: setLastName
        },
        {
            title: 'Date of Birth',
            placeholder: 'birth date (e.g. YYYY/MM/DD)',
            state: dob,
            setState: setDob
        },
        {
            title: 'City',
            placeholder: 'city',
            state: city,
            setState: setCity
        },
        {
            title: 'Country',
            placeholder: 'country',
            state: country,
            setState: setCountry
        },
    ]

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#fff",
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fff" },
                "::placeholder": { color: "#fff" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }

    const checkDataFormat = (date) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const year = Number(date.slice(0, 4));
        const month = date.slice(5, 6) === '0' ? Number(date.slice(6, 7)) : Number(date.slice(5, 7));
        const day = date.slice(8, 9) === '0' ? Number(date.slice(9)) : Number(date.slice(8));

        //check if length of input date is correct
        if(date.length !== 10) return false;
    
        //humans can't be 200 years old yet
        return day < 32 && day > 0 && month < 13 && month > 0 && year < currentYear && year > (Number(currentYear) - 200) ? true : false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if(!error){
            try {
                const { id } = paymentMethod;
                const response = await axios.post('http://localhost:4000/payment', { 
                    amount: 1000, 
                    id 
                });

                setTransactionId(id);
    
                if(response.data.success && title && firstName && lastName && checkDataFormat(dob) && city && country){
                    setSuccess(true); 
                    setShoppingCartData([]);
                    setShoppingCartTotal(0.00);

                    setTimeout(() => {
                        history.push('/');
                    }, 7000);
                } else {
                    alert('Missing/Incorrect input value/s. Make sure "Date of Birth" is a valid date and is in the format of YYYY/MM/DD');
                }   
            } catch (error){
                console.log('Error', error);
            }
        } else {
            console.log(error.message);
        }
    }

    return (
        //react 'fragment'; group child elements without adding extra nodes to DOM; slightly better performance
        <>
            {
                !success ?
                <form onSubmit={handleSubmit} className='Page__section--large payment__form col fw'>
                    <div className='payment__grid fw'>
                        {
                            inputFields.map((curr, index) => 
                                <PaymentField
                                    key={index}
                                    title={curr.title}
                                    placeholder={curr.placeholder}
                                    state={curr.state}
                                    setState={curr.setState}
                                />
                            )
                        }
                    </div>

                    <div className='Page__section--tiny fw ctr'>
                        <fieldset className='FormGroup'>
                            <div className='FormRow'>
                                <CardElement options={CARD_OPTIONS}/>
                            </div>
                        </fieldset>
                    </div>

                    <PaymentTotal/>

                    <div className='Page__section--tiny payment__btn-cont fw ctr'>
                        <button className='payment__btn'>Pay</button>
                    </div>
                </form> :
                <div className='Page__section--small payment__msg col fw'>
                    <h1>Payment Successfully Completed! Thank you for Shopping with 美团!</h1>
                    
                    <h2>You will now be automatically re-directed to the Home Page...</h2>

                    <h3>Transaction Id: {transactionId ? transactionId : '##########'}</h3>

                    <img src={loadingGif} alt='loading-gif'/>
                </div>
            }  
        </>
    )
}

export default PaymentForm;