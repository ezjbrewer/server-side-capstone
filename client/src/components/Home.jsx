import { Button, Card } from "reactstrap"
import { useNavigate } from "react-router-dom";

import "./Main.css"

export const Home = () => {
    const navigate = useNavigate();
    
    const welcomeMsgPart1 = "After an unsuccessful dog walking business, brothers Camillo and Giuseppe decided to throw their hand into crafting artisan sandwiches from their Sicilian hearts.";
    const welcomeMsgPart2 = "Fast-forward forty years to today, and they are now bringing their sandwiches to customers digitally. Try from the many different variations upon which a sandwich could be made!";

    return(
        <div className="home-page">
            <Card className="home-card">
                {welcomeMsgPart1}
                <br /><br />
                {welcomeMsgPart2}
            </Card>
            <div className="home-btn-card">
                <div>
                    <Button
                        color="warning"
                        className="home-btn"
                        onClick={() => navigate("/order")}>
                        Make an order!
                    </Button>
                </div>
            </div>
        </div>
    )
}