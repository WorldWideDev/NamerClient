const API = 'https://localhost:5001/api/names';

export default class HttpService {
    static create(model) {
        return HttpService.post(model)
            .then(data => {
                console.log("response in service:", data);
                return data;
            })
            .catch(err => console.log('error in HttpService:', err));
    }
    static async get(type="") {
        const response = await fetch(`${API}/${type}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            // credentials: 'include', // *include, same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.json(); // parses JSON response
    }
    static async post(model) {
        console.log(model);
        const response = await fetch(API, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(model) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response
    }

}
