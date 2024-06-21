const apiUrl = "/api/userprofile"

export const GetUserById = (id) => {
    return fetch(`${apiUrl}/${id}`).then((res) => res.json())
}