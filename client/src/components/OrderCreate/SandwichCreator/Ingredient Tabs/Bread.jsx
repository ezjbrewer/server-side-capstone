import { Label } from "reactstrap"

export const createBread = (viewedIngredients, breadChoice, setBreadChoice) => {
    
    const handleBreadChange = (i) => {
        setBreadChoice(i);
    };
   
    return(
        <div>
            <h3>Select your bread</h3>
            <div className="ingredient-options">
                {viewedIngredients.map((i) => (
                    <div key={i.id}>
                        <input
                            type="radio"
                            name="bread"
                            checked={breadChoice.id === i.id}
                            onChange={() => handleBreadChange(i)}
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