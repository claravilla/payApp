import { fireEvent, render, screen } from "@testing-library/react"
import CountryForm from "../../components/CountryForm"


describe('Test country form component', ()=> {
    it('should render amount field', ()=> {
        render(<CountryForm/>)
        const amountField = screen.getByPlaceholderText('Type amount');
        expect(amountField).toBeInTheDocument();
    });
    it('should render country field', ()=> {
        render(<CountryForm/>)
        const countryField = screen.getByPlaceholderText('Type ISO country code');
        expect(countryField).toBeInTheDocument();
    });
    it('should render the submit button', ()=> {
        render(<CountryForm/>);
        const button = screen.getByText('Submit');
        expect(button).toBeInTheDocument();
    });
    it('should display the right text in the country field', async ()=> {
        render(<CountryForm/>);
        const countryInput = screen.getByLabelText('Country') as HTMLInputElement;
        const countryValue = 'NZ';
        fireEvent.change(countryInput,{target: {value: countryValue}});
        expect(countryInput.value).toBe(countryValue);
    })

    it('should display the right amount in the amount field', async ()=> {
        render(<CountryForm/>);
        const amountInput = screen.getByLabelText('Amount')
        fireEvent.change(amountInput,{target: {value: 100}});
        expect(amountInput).toHaveValue(100);
    })

    it('should submit correctly', ()=> {
        const handleSubmit = jest.fn();
        render(<CountryForm handleSubmit={handleSubmit}/>);
        const countryInput = screen.getByLabelText('Country')
        const amountInput = screen.getByLabelText('Amount')
        const submitButton = screen.getByRole('button');
        fireEvent.change(countryInput,{target: {value: 'NZ'}});
        fireEvent.change(amountInput,{target: {value: 100}});
        fireEvent.click(submitButton);
        expect(handleSubmit).toHaveBeenCalled();
        expect(handleSubmit).toHaveBeenCalledWith({
            countryCode: 'NZ',
            amount: '100'
        });
       
    } )
})