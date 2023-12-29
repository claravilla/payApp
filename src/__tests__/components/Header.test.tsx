import { render, screen } from "@testing-library/react"
import Header from "../../components/Header"

describe("Header", () => {
    it("renders the header text", () => {
        render(<Header />);
        const header = screen.queryByRole("heading", { name: 'Brickbank Pay app' });
        expect(header).toBeInTheDocument();
    })
})