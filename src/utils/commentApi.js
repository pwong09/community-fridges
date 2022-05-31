import tokenService from "./tokenService";
const BASE_URL = '/api/'

export function create(postId, comment) {
    return fetch(`${BASE_URL}fridges/${postId}/comments`, {
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