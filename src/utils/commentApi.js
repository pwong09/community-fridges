import tokenService from "./tokenService";
const BASE_URL = '/api/'

export function create(fridgeId, comment) {
    console.log(comment, "commentsApi comment")
    return fetch(`${BASE_URL}fridges/${fridgeId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("something's wrong at create commentApi!");
    })
}