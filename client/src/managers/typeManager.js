const apiUrl = "/api/Type"

export const getAllTypes = () => {
    return fetch(`${apiUrl}`).then((res) => res.json())
} 