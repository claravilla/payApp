import {  render, screen } from "@testing-library/react"
import Error from "../../components/Error";

describe('Error should display the props correctly', ()=>{

   it('should display the message correctly', ()=> {
       render(<Error message="this works"/>);
       const message = screen.getByText("this works");
 
       expect(message).toBeInTheDocument();
    });
    it('should not display the legoPaymentId if not passed as prop', ()=> {
        render(<Error message="this works"/>);
        const legoPaymentId = screen.queryByText("1234");
        expect(legoPaymentId).not.toBeInTheDocument();
    })
    it('should display the legoPaymentId correctly', ()=> {
        render(<Error message="this works" legoPaymentId="1234"/>);
        const legoPaymentId = screen.getByText("1234");
        expect(legoPaymentId).toBeInTheDocument();
     });

})