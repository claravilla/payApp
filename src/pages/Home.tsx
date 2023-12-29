import { useContext, useState } from 'react';
import { AuthContext } from "../components/context/authContext";
import CreditCard from "../bb-web-component/components/CreditCard";
import CountryForm from "../components/CountryForm";
import Error from '../components/Error';
import Header from "../components/Header";
import TestCards from "../components/TestCards";
import Spinner from '../components/Spinner';
import getPaymentMethod from '../utils/getPaymentMethod';
import { PaymentMethod } from "../bb-web-component/types";

function Home() {

  const { token, refreshToken } = useContext(AuthContext);
  const [creditCardPayments, setCreditCardPayments] = useState<Array<PaymentMethod>>([]);
  const [amount, setAmount] = useState<number>(0);
  const [countryCode, setCountryCode] = useState<string>("");
  const [isPaymentMethodLoading, setIsPaymentMethodLoading] = useState<boolean>(false);
  const [errorPaymentMethods, setErrorPaymentMethods] = useState("");
  const [noPaymentMethod, setNoPaymentMethod] = useState<boolean>(false);


  const submitCountryForm = async (input: {
    countryCode: string;
    amount: string
  }) => {
    try {
      setIsPaymentMethodLoading(true);
      setAmount(Number(input.amount));
      setCountryCode(input.countryCode);
      const result = await getPaymentMethod(
        input.countryCode.toUpperCase(),
        token
      );
      const filteredResult: PaymentMethod[] =
        result.data.providerFormat.paymentMethods.filter(
          (paymentMethod: PaymentMethod) => paymentMethod.type === 'scheme'
        );
      setCreditCardPayments(filteredResult);


      if (filteredResult.length === 0) {
        setNoPaymentMethod(true);
      }
      setIsPaymentMethodLoading(false);
      return result;
    } catch (e: any) {
      if (e.message === "Incoming token has expired") {
        const newToken = refreshToken();
        const result = await getPaymentMethod(
          input.countryCode.toUpperCase(),
          newToken
        );
        const filteredResult =
          result.data.providerFormat.paymentMethods.filter(
            (paymentMethod: PaymentMethod) => paymentMethod.type === 'scheme'
          );
        if (filteredResult.length === 0) {
          setNoPaymentMethod(true);
          setCreditCardPayments(filteredResult);
          setIsPaymentMethodLoading(false);
        } else {
          console.log('error', e)
          setErrorPaymentMethods(e);
          setIsPaymentMethodLoading(false);
        }
      }
    }
  };

  return (
    <>
      <Header />
      <CountryForm handleSubmit={submitCountryForm} />
      {isPaymentMethodLoading && <Spinner />}
      {!isPaymentMethodLoading && errorPaymentMethods !== '' && <Error message={errorPaymentMethods} />}
      {(!isPaymentMethodLoading && noPaymentMethod) && <Error message="No payment methods available" />}
      {(!isPaymentMethodLoading && creditCardPayments.length > 0) && <CreditCard paymentDetails={
        {
          amount: amount,
          billingAddress: {
            street: "Scare Road",
            houseNumberOrName: "324",
            postalCode: "12345",
            city: "Monstropolis",
            stateOrProvince: "CA",
            country: "US",
          },
          clientKey: process.env.REACT_APP_ADYEN_CLIENT_KEY as string,
          countryCode: countryCode,
          name: 'Mike Vasoski',
          origin: '"http://localhost:3000",',
          paymentMethods: creditCardPayments,
          paymentReference: `T${Math.floor(Math.random() * 1000000000) + 1}`,
          shopperIP: "shopperIP",
          shopperEmail: "mike@monsterinc.com",
          token: token,
        }} />
      }
      <TestCards />
    </>
  );
}
export default Home;

