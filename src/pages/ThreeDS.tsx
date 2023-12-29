import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/context/authContext";
import { LegoPaymentIdContext } from "../components/context/legoPaymentIdContext";
import Loader from "../bb-web-component/components/Loader";

function ThreeDS() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { updateLegoPaymentId } = useContext(LegoPaymentIdContext);
  const [isLoading, setIsLoading] = useState(false);
  const paymentDetails = decodeURI(id as string);
  const { MD, PaRes } = JSON.parse(paymentDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || isLoading) {
      return;
    }
    const newId = localStorage.getItem("id");
    updateLegoPaymentId(newId);

    const postDetails = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_PAYMENT_URL}/${newId}/details`,
          headers: {
            "x-api-Key": process.env.REACT_APP_API_KEY,
            authorization: `Bearer ${token}`,
          },
          data: { details: { MD: MD, PaRes: PaRes } },
        });
        setIsLoading(false);
        const { resultCode } = response.data;
        if (resultCode === "Authorised") {
          navigate("/confirmation");
        } else {
          navigate("/error");
        }
      } catch (e) {
        navigate("/error");
      }
    };

    postDetails();
    setIsLoading(true);
  }, [token]);

  return (
    <>
      <header>Payment verification</header>
      <main>
      <Loader />
      <p>We are checking your payment</p>
      <p>Please wait - DO NOT REFRESH</p>
      </main>
    </>
  );
}

export default ThreeDS;
