const apiUrl = "/api/Sandwich"

export const postSandwich = (sandwichObj) => {    
    return fetch(`${apiUrl}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sandwichObj)
    }).then((res) => res.json());
}