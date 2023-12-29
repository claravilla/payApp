import {useNavigate} from 'react-router-dom';
import { TextBlock } from "@lego/skroll";
import HomeButton from './HomeButton';

function PaymentResults({legoPaymentId}: {legoPaymentId: string | undefined}) {
    const navigate = useNavigate();
      return (
        <section>
<TextBlock title="Your payment has been completed">
    The legoPaymentId for this order is <span style={{color:'green', fontWeight:'bold'}}>{legoPaymentId}</span>.
    </TextBlock>
    <HomeButton/>
        </section>
      )
}

export default PaymentResults;