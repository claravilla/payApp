import { useContext } from "react";
import { LegoPaymentIdContext } from "../components/context/legoPaymentIdContext";
import PaymentResults from "../components/PaymentResults";

function Confirmation() {
    const { legoPaymentId, updateLegoPaymentId } = useContext(LegoPaymentIdContext);
    const newId = localStorage.getItem("id");
    updateLegoPaymentId(newId);
    return (
        <main>
            <PaymentResults legoPaymentId={legoPaymentId} />
        </main>
    );
}

export default Confirmation;
