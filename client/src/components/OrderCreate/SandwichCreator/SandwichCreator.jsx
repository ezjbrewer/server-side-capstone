import { Button, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter  } from "reactstrap"
import { getIngredientsByInput } from "../../../managers/ingredientManager.js";
import { createBread } from "./Ingredient Tabs/Bread.jsx";
import { createMeat } from "./Ingredient Tabs/Meat.jsx";
import { createTopping } from "./Ingredient Tabs/Topping.jsx";
import { useEffect, useState } from "react";

export const SandwichCreator = ({ setView, sandwichArr, setSandwichArr, loggedInUser }) => {
    const [sandwichIngredients, setSandwichIngredients] = useState([])
    const [tabInput, setTabInput] = useState(1)
    const [viewedIngredients, setViewedIngredients] = useState([])

    const [breadChoice, setBreadChoice] = useState({})
    const [meatChoice, setMeatChoice] = useState([])
    const [toppingChoice, setToppingChoice] = useState([])

    const [calories, setCalories] = useState(0)

    const [isVegetarian, setIsVegetarian] = useState(false)
    const [canAddSandwich, setAddSandwich] = useState(false)

    const [modal, setModal] = useState(false);

    useEffect(() => {
        getIngredientsByInput(tabInput).then(setViewedIngredients)
    }, [tabInput])

    useEffect(() => {
        if (breadChoice.id && toppingChoice.length !== 0) {
            setAddSandwich(true)
        } else {
            setAddSandwich(false)
        }
    }, [breadChoice, toppingChoice])

    useEffect(() => {
        let totalMeatCalories = 0
        let totalToppingCalories = 0
        
        meatChoice.forEach((meat) => {
            totalMeatCalories += meat.calories
        })

        toppingChoice.forEach((topping) => {
            totalToppingCalories += topping.calories
        })
        
        const totalCalories = breadChoice.calories + totalMeatCalories + totalToppingCalories
        setCalories(totalCalories)

    }, [breadChoice, meatChoice, toppingChoice])

    const toggleModal = () => setModal(!modal);

    const renderIngredients = () => {
        switch(tabInput) {
            case 1:
                return <div>{createBread(viewedIngredients, breadChoice, setBreadChoice)}</div>
            case 2:
                return <div>{createMeat(viewedIngredients, meatChoice, setMeatChoice, isVegetarian, setIsVegetarian)}</div>
            case 3:
                return <div>{createTopping(viewedIngredients, toppingChoice, setToppingChoice)}</div>
        }
    }

    const addSandwich = () => {
        if (canAddSandwich) {
            handleAddSandwich()
        } else {
            toggleModal();
        }
    }

    const handleAddSandwich = () => {
        const newSandwich = {
            customerId: loggedInUser?.id,
            ingredients: [],
            calories: 0
        }

        newSandwich.calories = calories
        newSandwich.ingredients.push(breadChoice)
        meatChoice.map((m) => {
            return newSandwich.ingredients.push(m)
        })
        toppingChoice.map((t) => {
            return newSandwich.ingredients.push(t)
        })

        const updatedSandwichArr = [...sandwichArr, newSandwich]
        
        setSandwichArr(updatedSandwichArr)
        setBreadChoice({})
        setMeatChoice([])
        setToppingChoice([])
        setView(1)
    }

    return (
        <div className="sandwich-creator-container">
            <Card className="btn-container">
                <CardBody className="tab-btn-container">
                    <Button
                        className="option-btn"
                        color="warning"
                        onClick={() => setView(1)}
                    >
                        Go Back
                    </Button>
                </CardBody>
                <CardBody className="tab-btn-container">
                    <Button
                        className="tab-btn"
                        color="success"
                        onClick={() => setTabInput(1)}
                    >
                        Bread
                    </Button>
                    <Button
                        className="tab-btn"
                        color="danger"
                        onClick={() => setTabInput(2)}
                    >
                        Meat
                    </Button>
                    <Button
                        className="tab-btn"
                        color="success"
                        onClick={() => setTabInput(3)}
                    >
                        Topping
                    </Button>
                </CardBody>
                <CardBody className="tab-btn-container">
                    <Button
                        className="option-btn"
                        color="warning"
                        onClick={() => addSandwich()}
                    >
                        Add to Order    
                    </Button>
                </CardBody>
            </Card>
            <Card className="ingredient-container">
                <CardBody>
                    {renderIngredients()}
                </CardBody>
            </Card>
            <Card className="display-container">
                <CardBody>
                    <h3>Current Sandwich</h3>
                    <div>
                        Bread: {!breadChoice.id ? "None" : breadChoice.name}
                    </div>
                    <div>
                        Meat: {meatChoice.length === 0 ? "None" : meatChoice
                            .map((m, index, array) => (
                                index === array.length - 1 ? m.name : ` ${m.name}, `
                        ))}
                    </div>
                    <div>
                        Topping: {toppingChoice.length === 0 ? "None" : toppingChoice
                            .map((i, index, array) => (
                                index === array.length - 1 ? i.name : ` ${i.name}, `
                        ))}
                    </div>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Incomplete Sandwich</ModalHeader>
                <ModalBody>
                    Please select at least one bread and one topping to add the sandwich to the order.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>Ok</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};