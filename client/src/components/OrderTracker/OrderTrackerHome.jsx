import { useEffect, useState } from "react"
import { GetOrdersByUserId } from "../../managers/orderManager.js"
import { Button, Card } from "reactstrap"
import { useNavigate } from "react-router-dom"

export const OrderTrackerHub = ({loggedInUser}) => {
    const [orders, setOrders] = useState([])

    const [activeOrders, setActiveOrders] = useState([])
    const [inactiveOrders, setInactiveOrders] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        GetOrdersByUserId(loggedInUser.id).then(setOrders)
    }, [loggedInUser])

    useEffect(() => {
        const aliveOrders = []
        const deadOrders = []
        
        orders.forEach((o) => {
            if (o.statusId > 3) {
                deadOrders.push(o)
            } else {
                aliveOrders.push(o)
            }
        })

        setActiveOrders(aliveOrders)
        setInactiveOrders(deadOrders)
    }, [orders])

    const convertDateToStr = (date) => {
        const dateObj = new Date(date);
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        const year = dateObj.getFullYear();
        
        let hours = dateObj.getHours();
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');

        const amORpm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    
        const formattedHours = hours.toString().padStart(2, '0');
        
        return `${month}-${day}-${year} • ${formattedHours}:${minutes} ${amORpm}`;
    };
    
    return(
        <div className="tracking-hub-container">
            <Card className="heading">
                <h1>
                    Track Orders
                </h1>
            </Card>
            <div className="tracking-orders">
                <Card key="0" className="active-orders-container">
                    <h2>
                        Active Orders
                    </h2>
                    {activeOrders.map((o) => (
                        <Card key={o.id} className="order-card">
                            <p>{convertDateToStr(o.orderReceived)}</p>
                            <h5>{o.sandwiches.length === 1 ? `${o.sandwiches.length} Sandwich` : `${o.sandwiches.length} Sandwiches`} • {o.status.name}</h5>
                            <p>{o.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                            <Button className="details-btn" color="warning" onClick={() => navigate(`/order/tracking/${o.id}`)}>
                                Details
                            </Button>
                        </Card>
                    ))}
                </Card>
                <Card key="inAct" className="inactive-orders-container">
                    <h2>
                        Past Orders
                    </h2>
                    {inactiveOrders.map((o) => (
                        <Card key={o.id} className="order-card">
                            <p>{convertDateToStr(o.orderReceived)}</p>
                            <h5>{o.sandwiches.length === 1 ? `${o.sandwiches.length} Sandwich` : `${o.sandwiches.length} Sandwiches`} • {o.status.name}</h5>
                            <p>{o.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                            <Button className="details-btn" color="warning" onClick={() => navigate(`/order/tracking/${o.id}`)}>
                                Details
                            </Button>
                        </Card>
                    ))}
                </Card>
            </div>
        </div>
    )
}