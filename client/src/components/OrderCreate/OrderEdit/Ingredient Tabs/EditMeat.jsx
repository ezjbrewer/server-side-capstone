import { Label } from "reactstrap"

export const EditMeat = (viewedIngredients, meatChoice, setMeatChoice, isVegetarian, setIsVegetarian) => {
    
    const handleMeatChange = (i) => {
        const updatedMeatChoice = meatChoice.some(meat => meat.id === i.id)
            ? meatChoice.filter(meat => meat.id !== i.id)
            : [...meatChoice, i];
        setMeatChoice(updatedMeatChoice);
    };

    const handleVegetarianChoice = (event) => {
        setIsVegetarian(event.target.checked)
        if (event.target.checked) {
            setMeatChoice([])
        }
    }
    
    return(
        <div>
            <h3>Select your meat</h3>
            <p>Vegetarian will ensure no meat is added</p>
            <div className="ingredient-options">
                {viewedIngredients.map((i) => (
                    <div key={i.id}>
                        <input
                            type="checkbox"
                            name="meat"
                            checked={!isVegetarian && meatChoice.some(meat => meat.id === i.id)}
                            disabled={isVegetarian}
                            onChange={() => handleMeatChange(i)}
                        />
                        <Label>
                            {i.name}
                        </Label>
                    </div>
                ))}
                <div key="0">
                    <input
                        onChange={(e) => handleVegetarianChoice(e)} 
                        type="checkbox"
                        checked={isVegetarian}
                        name="vegetarian"
                    />
                    <Label>
                        Vegetarian
                    </Label>
                </div>
            </div>
        </div>
    )
}