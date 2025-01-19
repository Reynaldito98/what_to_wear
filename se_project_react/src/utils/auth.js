import { baseUrl } from "./api";
import { checkResponse } from "./api";

const registerUser = (name, avatar, email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar, email, password }) 
    })
        .then(checkResponse)
}


const loginUser = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    })
        .then(checkResponse)
}

const getToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        }
    })
        .then(checkResponse)
}

export {registerUser, loginUser, getToken};