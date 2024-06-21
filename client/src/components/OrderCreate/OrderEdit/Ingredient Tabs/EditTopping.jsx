import { Label } from "reactstrap"

export const EditTopping = (viewedIngredients, toppingChoice, setToppingChoice) => {
    
    const handleToppingChange = (i) => {
        const updatedToppingChoice = toppingChoice.some(topping => topping.id === i.id)
            ? toppingChoice.filter(topping => topping.id !== i.id)
            : [...toppingChoice, i];
        setToppingChoice(updatedToppingChoice);
    };
    
    
    
    return(
        <div>
            <h3>Select your toppings</h3>
            <div className="ingredient-options">
                {viewedIngredients.map((i) => (
                    <div key={i.id}>
                        <input
                            type="checkbox"
                            name="topping"
                            checked={toppingChoice.some(topping => topping.id === i.id)}
                            onChange={() => handleToppingChange(i)}
                        />
                        <Label>
                            {i.name}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    )
}