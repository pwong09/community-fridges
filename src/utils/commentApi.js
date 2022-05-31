import tokenService from "./tokenService";
const BASE_URL = '/api/'

export function create(fridgeId, comment) {
    console.log(comment)
    return fetch(`${BASE_URL}fridges/${fridgeId}/comments`, {
        method: 'POST',
        body: comment,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("something's wrong at create commentApi!");
    })
}