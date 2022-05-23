import tokenService from "./tokenService";

const BASE_URL = "/api/fridges/";

export function create(fridge) {
    console.log(fridge)
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

    })
    .then(res => res.json());
}