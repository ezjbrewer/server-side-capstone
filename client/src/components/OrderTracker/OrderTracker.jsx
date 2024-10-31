import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GetOrderById } from "../../managers/orderManager.js"
import { Button, Card, CardBody } from "reactstrap"
import "./OrderTracker.css"
import sandwichTrackGif from './sandwich-track.gif';

export const OrderTracker = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [order, setOrder] = useState({
        sandwiches: [],
        status: {}
    });

    useEffect(() => {
        GetOrderById(id).then((data) => {
            setOrder(data);
        });
    }, [id]);

    return (
        <Card>
            <div className="tracking-order-view">
                <Button 
                    color="warning"
                    className="tracking-btn"
                    onClick={() => navigate("/order/tracking")}
                    >
                        Tracking Hub
                </Button>
                <div className="order-tracker-container">
                    <div className="heading">
                        <div className="status-heading">
                            <h3>
                                Your order status is: {order?.status?.name}
                            </h3>
                        </div>
                    </div>
                    <img src={sandwichTrackGif} alt="Sandwich Track" className="sandwich-track-gif" />
                    <Card className="status-order">
                        <h3 className="order-heading">
                            Order
                        </h3>
                        <div className="sandwich-items">
                            {order.sandwiches.map((s) => (
                                <Card className="sandwich-card" key={s.id}>
                                    <h5>
                                        {s.sandwichIngredients.find((i) => i.ingredient.typeId === 1)?.ingredient.name} Sandwich
                                    </h5>
                                    <ul className="ingredient-list">
                                        {s.sandwichIngredients.map((ingredientItem) => (
                                            <li key={ingredientItem.id}>{ingredientItem.ingredient.name}</li>
                                        ))}
                                    </ul>
                                </Card>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Card>
    );
}