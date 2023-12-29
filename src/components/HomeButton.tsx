import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button } from "@lego/skroll";

function HomeButton(){
    const navigate = useNavigate();

    const onClick = (navigate: NavigateFunction) => {
    navigate('/')}
    return (
        <Button type='button' text='Home' onClick={() => onClick(navigate)}/>
    )
}


export default HomeButton;