import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerForm from "../components/CustomerForm";
import PopcornSelector from "../components/PopcornSelector";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import OrderSummary from "../components/OrderSummary";

function OrderPage() {

  const navigate =
  useNavigate();

  const [step,setStep] =
  useState(1);

  const [formData,setFormData] =
  useState({

    customer:{
      name:"",
      phone:"",
      email:""
    },

    addressInfo:{
      address:"",
      landmark:"",
      city:"",
      pincode:""
    },

    paymentMethod:"COD",

    // items:[
    //   {
    //     flavor:"",
    //     size:"",
    //     quantity:1,
    //     price:0
    //   }
    // ]
    items:[]
  });

  const next = () =>
  setStep(step + 1);

  const prev = () =>
  setStep(step - 1);

  switch(step){

    case 1:
      return (
        <CustomerForm
          formData={formData}
          setFormData={setFormData}
          next={next}
        />
      );

    case 2:
      return (
        <PopcornSelector
          formData={formData}
          setFormData={setFormData}
          next={next}
          prev={prev}
        />
      );

    case 3:
      return (
        <AddressForm
          formData={formData}
          setFormData={setFormData}
          next={next}
          prev={prev}
        />
      );

    case 4:
      return (
        <PaymentForm
          formData={formData}
          setFormData={setFormData}
          next={next}
          prev={prev}
        />
      );

    case 5:
      return (
        <OrderSummary
          formData={formData}
          prev={prev}
          navigate={navigate}
        />
      );

    default:
      return null;
  }
}

export default OrderPage;