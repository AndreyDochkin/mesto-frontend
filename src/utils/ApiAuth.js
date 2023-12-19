export default class ApiAuth {
    constructor(options) {
        this.baseUrl = options.baseUrl;
    }

    _getJson = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    makeRequest = (path, method, body, token) => {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return fetch(`${this.baseUrl}${path}`, options).then(this._getJson);
    };

    registerUser = (email, password) => this.makeRequest("/signup", "POST", { email, password }, null);
    loginUser = (email, password) => this.makeRequest("/signin", "POST", { email, password }, null);
    // checkToken = (token) => this.makeRequest("/users/me", "GET", null, token);
    checkToken(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(this._getJson);
    }
   
}


