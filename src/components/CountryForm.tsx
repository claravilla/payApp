import { useState } from 'react';
import { Button } from "@lego/skroll";


function CountryForm({ handleSubmit }: any) {
  const [inputForm, setInputForm] = useState<{
    countryCode: string;
    amount: number;
  }>({ countryCode: "NL", amount: 10 });

  const handleInputChange = (e: any) => {

    const { name, value } = e.target;
    setInputForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (e: any) => {
    handleSubmit(inputForm);
    e.preventDefault();
  }

  return (
    <>
      <section className="country-form">
        <article className='input-container'>
          <label className='input-label'>Country</label>
          <input
            aria-label="Country"
            name="countryCode"
            type="text"
            placeholder="Type ISO country code"
            value={inputForm.countryCode}
            onChange={handleInputChange}
            className="input-value"
          />
        </article>
        <article className='input-container'>
          <label className='input-label'>Amount</label>
          <input
            aria-label="Amount"
            name="amount"
            type="number"
            placeholder="Type amount"
            onChange={handleInputChange}
            value={inputForm.amount}
            className="input-value"
          />
        </article>
        <Button
          type="submit"
          onClick={submitForm}
          text="Submit"
          appearance="standard"
          buttonVariant="primary"
        />
      </section>
    </>
  );
}

export default CountryForm;
