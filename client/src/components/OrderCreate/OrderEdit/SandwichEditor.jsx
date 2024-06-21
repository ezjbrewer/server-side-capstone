import { useEffect, useState } from "react"
import { EditBread } from "./Ingredient Tabs/EditBread.jsx"
import { EditMeat } from "./Ingredient Tabs/EditMeat.jsx"
import { EditTopping } from "./Ingredient Tabs/EditTopping.jsx"
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { getIngredientsByInput } from "../../../managers/ingredientManager.js"

export const SandwichEditor = ({sandwichToUpdate, updateIndex, setUpdateIndex, setView, sandwichArr, setSandwichArr, loggedInUser}) => {
    const [sandwichIngredients, setSandwichIngredients] = useState([])
    const [tabInput, setTabInput] = useState(1)
    const [viewedIngredients, setViewedIngredients] = useState([])

    const [breadChoice, setBreadChoice] = useState({}) 
    const [meatChoice, setMeatChoice] = useState([])
    const [toppingChoice, setToppingChoice] = useState([])

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
        if (sandwichToUpdate) {
            const currentIngredients = [...sandwichToUpdate.ingredients];
            setSandwichIngredients(currentIngredients);

            const bread = currentIngredients.find(ingredient => ingredient.typeId === 1);
            const meat = currentIngredients.filter(ingredient => ingredient.typeId === 2);
            const toppings = currentIngredients.filter(ingredient => ingredient.typeId > 2);

            setBreadChoice(bread || {});
            setMeatChoice(meat || []);
            setToppingChoice(toppings || []);
        }
    }, [sandwichToUpdate]);

    const toggleModal = () => setModal(!modal);

    const renderIngredients = () => {
        switch(tabInput) {
            case 1:
                return <div>{EditBread(viewedIngredients, breadChoice, setBreadChoice)}</div>
            case 2:
                return <div>{EditMeat(viewedIngredients, meatChoice, setMeatChoice, isVegetarian, setIsVegetarian)}</div>
            case 3:
                return <div>{EditTopping(viewedIngredients, toppingChoice, setToppingChoice)}</div>
        }
    }

    const addSandwich = () => {
        if (canAddSandwich) {
            handleEditSandwich()
        } else {
            toggleModal();
        }
    }

    const handleEditSandwich = () => {
        const updatedSandwich = {
            customerId: loggedInUser?.id,
            ingredients: [breadChoice, ...meatChoice, ...toppingChoice]
        }

        const updatedSandwichArr = [...sandwichArr];
        updatedSandwichArr[updateIndex] = updatedSandwich;

        setSandwichArr(updatedSandwichArr);
        setUpdateIndex(0);
        setView(1);

        setBreadChoice({});
        setMeatChoice([]);
        setToppingChoice([]);
        setSandwichIngredients([]);
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
                        Save Changes    
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
}