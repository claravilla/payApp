import { useContext } from "react";
import { LegoPaymentIdContext } from "../components/context/legoPaymentIdContext";
import PaymentResults from "../components/PaymentResults";

function Confirmation() {
    const {legoPaymentId} = useContext(LegoPaymentIdContext);
    return (
        <main>
            <PaymentResults legoPaymentId={legoPaymentId}/>
        </main>
    );
}

export default Confirmation;
