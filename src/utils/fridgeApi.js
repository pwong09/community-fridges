import tokenService from "./tokenService";

const BASE_URL = "/api/fridges/";

export function create(fridge) {
    // console.log(fridge.values(), "fridge.values from fridgeApi looks like this")
    return fetch(BASE_URL, {
        method: 'POST',
        body: fridge,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
    }
    
    }).then(res => res.json());
}

export function getAll() {
    return fetch(BASE_URL, {
        method: 'GET'
    })
    .then(res => res.json());
}

export function removeFridge(id) {
    return fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then(res => res.json());
}

export function updateFridge(id, stock) {
    return fetch(`${BASE_URL}${id}`, {
        method: 'PUT',
        body: JSON.stringify(stock),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json());
}

