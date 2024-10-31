import { useEffect, useState } from "react"
import { SandwichCreator } from "./SandwichCreator/SandwichCreator.jsx"
import "./Order.css"
import { Button, Card, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip  } from "reactstrap"
import { InitiateNewOrder } from "../../managers/orderManager.js"
import { postSandwich } from "../../managers/sandwichManager.js"
import { useNavigate } from "react-router-dom"
import { SandwichEditor } from "./OrderEdit/SandwichEditor.jsx"

export const OrderCreate = ({loggedInUser}) => {
    const navigate = useNavigate()
    const [view, setView] = useState(1)
    const [sandwichArr, setSandwichArr] = useState([])
    const [price, setPrice] = useState(0)
    
    const [sandwichToDelete, setSandwichToDelete] = useState(null)
    const [sandwichToUpdate, setSandwichToUpdate] = useState(null)
    const [updateIndex, setUpdateIndex] = useState(0)

    const [modal, setModal] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipId, setTooltipId] = useState(null);

    useEffect(() => {
        let totalPrice = 0.00
    
        sandwichArr.forEach(sandwich => {
            sandwich.ingredients.forEach((ingredient) => {
                totalPrice += ingredient?.price || 0;
            });
        });
    
        setPrice(totalPrice);
    }, [sandwichArr]);
    
    const toggleModal = () => setModal(!modal)

    const toggleTooltip = (id) => {
        setTooltipId(id);
        setTooltipOpen(!tooltipOpen);
    };

    const confirmDeletion = (index) => {
        setSandwichToDelete(index)
        toggleModal()
    }

    const handleSandwichDelete = () => {
        if (sandwichToDelete !== null) {
            const filteredArr = sandwichArr.filter((_, i) => i !== sandwichToDelete)
            setSandwichArr(filteredArr)
            setSandwichToDelete(null)
            toggleModal()
        }
    }

    const handleSandwichUpdate = () => {
        setView(3)
    }

    const handleNewOrder = () => {
        const orderToPost = {
            TotalPrice: price,
            CustomerId: loggedInUser.id,
            StatusId: 1
        }
        InitiateNewOrder(orderToPost).then((order) => {
            const orderId = order.id

            sandwichArr.forEach((s) => {
                const postedSandwich = {
                    OrderId: orderId,
                    CustomerId: loggedInUser.id,
                    Ingredients: s.ingredients.map((i) => ({
                        id: i.id,
                        name: i.name,
                        price: i.price,
                        calories: i.calories,
                        typeId: i.typeId
                    }))
                }
                postSandwich(postedSandwich)
            })
            navigate(`/order/tracking/${orderId}`)
        })
    }

    const DefaultView = () => {
        return(
            <div className="order-view-container">
                <Card className="sandwich-list">
                    <h2>My Order</h2>
                    {sandwichArr.length === 0 ?
                        <div>
                            <li>No ingredients added</li>
                        </div>
                    :
                        <div className="sandwich-list-render">
                            {sandwichArr.map((s, index) => (
                                <div className="sandwich-item-display" key={index}>
                                    <div className="sandwich-item">
                                        <h5>
                                            {s.ingredients.find(i => i.typeId === 1)?.name} Sandwich • {s.calories} calories
                                        </h5>
                                        <ul>
                                            {s.ingredients.filter(i => i.typeId !== 1).map((i) => (
                                                <li key={i.id}>
                                                <span
                                                    id={`tooltip-${index}-${i.id}`}
                                                    onMouseEnter={() => toggleTooltip(`tooltip-${index}-${i.id}`)}
                                                    onMouseLeave={() => toggleTooltip(null)}
                                                >
                                                    {i.name}
                                                </span>
                                                <Tooltip
                                                    placement="right"
                                                    isOpen={tooltipOpen && tooltipId === `tooltip-${index}-${i.id}`}
                                                    target={`tooltip-${index}-${i.id}`}
                                                    toggle={() => toggleTooltip(`tooltip-${index}-${i.id}`)}
                                                >
                                                    <div className="ingredient-tooltip">
                                                        <p>{i.type.name}</p>
                                                        <p>{i.name}</p>
                                                        <p>{i.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                                                        <p>{i.calories} calories</p>
                                                        
                                                    </div>
                                                </Tooltip>
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="sandwich-options">
                                        <Button onClick={() => {setSandwichToUpdate(s); setUpdateIndex(index); handleSandwichUpdate()}} outline className="sandwich-option">✏️</Button>
                                        <Button onClick={() => confirmDeletion(index)} outline className="sandwich-option">🗑️</Button>
                                    </div>
                                </div>
                            ))}
                        </div>    
                    }
                    <div className="price-order">
                        Total {price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </div>
                </Card>
                <Card className="order-options">
                    <Button
                        onClick={() => setView(2)}
                        className="order-btn"
                        color="success"
                    >
                        Add a Sandwich
                    </Button>
                    <Button
                        disabled={sandwichArr.length === 0}
                        className="order-btn"
                        onClick={() => handleNewOrder()}
                        color={sandwichArr.length === 0 ? "danger" : "success"}
                    >
                        Send Order
                    </Button>
                </Card>
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this sandwich?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={handleSandwichDelete}>Delete</Button>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    const renderView = () => {
        switch(view) {
            case 1:
                return <div>{DefaultView()}</div>
            case 2:
                return <SandwichCreator setView={setView} sandwichArr={sandwichArr} setSandwichArr={setSandwichArr} loggedInUser={loggedInUser}/>
            case 3:
                return <SandwichEditor sandwichToUpdate={sandwichToUpdate} updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} setView={setView} sandwichArr={sandwichArr} setSandwichArr={setSandwichArr} loggedInUser={loggedInUser} />
        }
    }

    return(
        <div>
            {renderView()}
        </div>
    )
}