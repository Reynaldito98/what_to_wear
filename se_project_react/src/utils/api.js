const baseUrl = "https://what-to-wear-backend-ebon.vercel.app"
  
const headers = {
  "Content-type": "application/json",
}
 
const checkResponse = (res) => {
  if(res.ok){
    return res.json();
  } else{
    return Promise.reject(`Error: ${res.status}`);
  }
}

function getClothingItems() {
    return fetch(`${baseUrl}/items`, {
              headers: headers})
          .then(checkResponse)
}

function postClothingItem(name, weather, imageUrl, token) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name, weather, imageUrl
    })
  })
    .then(checkResponse)
}

function deleteClothingItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(checkResponse)
}

function editProfileInfo(name, avatar, token) {
  return  fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name, avatar 
  })
  })
    .then(checkResponse)
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(checkResponse)
}

function deleteCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(checkResponse)
}

export {getClothingItems, postClothingItem, deleteClothingItem, editProfileInfo, addCardLike, deleteCardLike, checkResponse, baseUrl};