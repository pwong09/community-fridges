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
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("something's wrong at create fridgeApi!");
    })
}

export function getAll() {
    return fetch(BASE_URL, {
        method: 'GET'
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("something's wrong at getAll fridgeApi!");
    })
}

export function removeFridge(id) {
    return fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("something's wrong at removeFridge fridgeApi!");
    })
}

export function updateFridge(id, stock) {
    return fetch(`${BASE_URL}${id}`, {
        method: 'PUT',
        body: JSON.stringify(stock),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("something's wrong at updateFridge fridgeApi");
    })
}

export function getOne(id) {
    console.log(id,"fridge id")
    return fetch(`${BASE_URL}${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("something's wrong at getOne fridgeApi!");
    })
}

export function getSome(search) {
    console.log(search, "search term");
    return fetch(`${BASE_URL}filter/${search}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("something's wrong at getSome fridgeApi!");
    })
}
