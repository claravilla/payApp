import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BrowserInfo, CardDetails, CreditCardProps, PaymentRequest } from "../types";
import getCurrency from "../utils/getCurrency";
import formatAmount from "../utils/formatAmount";
import Loader from "./Loader";

function CreditCard(props: { paymentDetails: CreditCardProps }) {
  const { amount, billingAddress, clientKey, countryCode, name, origin, paymentMethods, paymentReference, shopperIP, shopperEmail, token } = props.paymentDetails;
  const [error, setError] = useState("");
  const [checkout, setCheckout] = useState<any>(null);
  const [actionData, setActionData] = useState<any>(null);
  const [errorCardForm, setErrorCardForm] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const buildPaymentRequest = (
    cardDetails: CardDetails,
    browserInfo: BrowserInfo
  ): PaymentRequest => {
    const paymentRequest = {
      countryCode: countryCode,
      amount: {
        currency: getCurrency(countryCode),
        value: formatAmount(amount, countryCode),
      },
      paymentReference: paymentReference,
      returnUrl: "http://localhost:8080",
      shopperIP: shopperIP,
      shopperEmail: shopperEmail,
      paymentMethod: {
        type: "scheme",
        encryptedCardNumber: cardDetails.encryptedCardNumber,
        encryptedExpiryMonth: cardDetails.encryptedExpiryMonth,
        encryptedExpiryYear: cardDetails.encryptedExpiryYear,
        holderName: name,
        encryptedSecurityCode: cardDetails.encryptedSecurityCode,
      },
      browserInfo: { ...browserInfo },
      billingAddress: {
        ...billingAddress,
      },
      origin: origin,
    };
    return paymentRequest;
  };

  const submittingPayment = async (
    paymentData: PaymentRequest,
    token: string
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_PAYMENT_URL,
        data: paymentData,
        headers: {
          "x-api-Key": process.env.REACT_APP_API_KEY,
          authorization: `Bearer ${token}`,
        },
        validateStatus: function (status) {
          return (status >= 200 && status <= 299) || status === 422;
        },
      });
      const { legoPaymentId: id, resultCode } = response.data;
      localStorage.setItem("id", id);
      if (resultCode === "Authorised") {
        navigate("/confirmation");
      } else if (resultCode === "Refused") {
        navigate("/error");
      } else if (resultCode === "RedirectShopper") {
        localStorage.setItem("id", id);
        setActionData(response.data.action);
      } else {
        setIsSubmitting(false);
        setError("Sorry we could not process your payment");
      }
      return response;
    }
    catch (e) {
      setIsSubmitting(false);
      setError("Sorry we could not process your payment");
    }
  };

  const handleOnSubmitCard = async (state: any, component: any) => {
    if (!state.isValid) {
      setErrorCardForm("Please fill in all required fields");
    }
    setIsSubmitting(true);
    const data = buildPaymentRequest(
      state.data.paymentMethod,
      state.data.browserInfo
    );
    try {
      await submittingPayment(data, token);
    } catch (e: any) {
      setIsSubmitting(false);
      setError("Sorry we could not process your payment");
    }
  }

  useEffect(() => {
    const checkout = new AdyenCheckout({
      environment: "test",
      clientKey: clientKey,
      paymentMethodsResponse: { paymentMethods: paymentMethods },
      showPayButton: true,
    });
    if (checkout) {
      setCheckout(checkout);
      checkout
        .create("card", {
          onSubmit: handleOnSubmitCard,
          styles: {
            error: {
              color: "red",
              fontWeight: 600,
              fontSize: "16px",
            },
            validated: {
              color: "black",
            },
          },
        })
        .mount("#card-container");

    } else {
      setError(error);
    }
  }, []);


  useEffect(() => {
    if (checkout) {
      checkout.createFromAction(actionData).mount("#redirect-container");
    }
  }, [actionData]);

  return (
    <section>
      {error !== "" && <p>{error}</p>}
      {errorCardForm !== "" && <p>{errorCardForm}</p>}
      {paymentMethods.length === 0 && <p>No payment methods available</p>}
      <article className={isSubmitting ? "hidden" : undefined}>
        <article className="payment-container">
          <article id="card-container"></article>
        </article>
        <article id="redirect-container"></article>
      </article>
      <section className={isSubmitting ? undefined : "hidden"}>
        <Loader />
      </section>
    </section>

  );
}

export default CreditCard;

