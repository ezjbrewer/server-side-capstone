import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Card } from "reactstrap"
import { GetUserById } from "../../managers/userProfileManager.js";
import "./Order.css"

export const OrderLanding = ({loggedInUser}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    useEffect(() => {
        GetUserById(loggedInUser.id).then(setUser)
    }, [loggedInUser])

    return(
    <Card className="order-landing-container">
        <div className="order-landing-welcome">
            <h2>
                Welcome {user.userName}!
            </h2>
        </div>
        <div className="order-landing-btn-container">
            <Button
                className="order-landing-btn"
                color="warning"
                onClick={() => navigate("/order/create")}
                >
                    Make some sandwiches
            </Button>
        </div>
    </Card>)
}