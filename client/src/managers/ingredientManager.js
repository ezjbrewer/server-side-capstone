const apiUrl = "/api/ingredient"

export const getIngredientsByInput = (input) => {
    return fetch (`${apiUrl}/${input}`).then((res) => res.json());
}

export const getAllIngredients = () => {
    return fetch(`${apiUrl}`).then((res) => res.json());
}

export const deleteIngredient = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        }
    })
}

export const editIngredient = (typeId, ingredient) => {
    return fetch(`${apiUrl}/${typeId}`, {
        method: "PUT",
        headers: {
        "Content-type": "application/json",
        },
        body: JSON.stringify(ingredient)
    }).then((res) => res.json())
}

export const postIngredient = (ingredient) => {
    return fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        },
        body: JSON.stringify(ingredient)
    }).then((res) => res.json())
}

export const getIngredientById = (id) => {
    return fetch(`${apiUrl}/ingredient/${id}`).then((res) => res.json())
}