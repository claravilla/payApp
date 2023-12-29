import axios from "axios";

const getPaymentMethods = async (country: string, token: string) => {
  const url = `${process.env.REACT_APP_PAYMENT_URL}/methods`;
  const response = await axios({
    method: "post",
    url: url,
    data: { countryCode: country },
    headers: {
      "x-api-Key": process.env.REACT_APP_API_KEY,
      authorization: `Bearer ${token}`,
    },
    validateStatus: function (status) {
      return (status >= 200 && status <= 299) || status === 422;
    },
  });
  return response;
};

export default getPaymentMethods;

