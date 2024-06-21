const apiUrl = "/api/Order"

export const GetOrderById = (id) => {
    return fetch(`${apiUrl}/${id}`).then((res) => res.json()) 
}

export const InitiateNewOrder = (order) => {
    return fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    }).then((res) => res.json());
}

export const GetOrdersByUserId = (userId) => {
  return fetch(`${apiUrl}/users/${userId}`).then((res) => res.json())
}

export const updateOrderStatus = (statusId, orderId) => {
  return fetch(`${apiUrl}/${statusIdId}`, {
      method: "PUT",
      headers: {
      "Content-type": "application/json",
      },
      body: JSON.stringify(orderId)
  }).then((res) => res.json())
}