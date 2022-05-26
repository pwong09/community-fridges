import tokenService from "./tokenService";

const BASE_URL = "/api/";

export function addComment(fridgeId, comment) {
    console.log(fridgeId, comment, "fridgesApi addComment");
    console.log(typeof(comment))
    return fetch(`${BASE_URL}/fridges/${fridgeId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            "Content-Type": "application/json"
    }
    
    }).then(res => res.json());
}

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