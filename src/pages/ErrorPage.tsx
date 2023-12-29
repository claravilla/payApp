import { useContext } from "react";
import Error from "../components/Error";
import HomeButton from "../components/HomeButton";
import { LegoPaymentIdContext } from "../components/context/legoPaymentIdContext";

function ErrorPage() {
    const {legoPaymentId} = useContext(LegoPaymentIdContext);

    return (
    <>
    <header>Something went wrong</header>
    <Error message='We could not authorise your payment.' legoPaymentId={legoPaymentId}/>
    <HomeButton/>
    </>
    )
}

export default ErrorPage;