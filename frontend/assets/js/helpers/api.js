export const AsyncGetApi =  async (url) => {

    let accessToken = 'Bearer ' + localStorage.getItem('access_token').replace(/["']/g, "");

    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", accessToken);
    headers.append("mode", 'cors');
    headers.append("credentials", 'include');

    let requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    }

    return fetch(url,requestOptions)
}

export const AsyncPostApi =  async (url, method = 'POST', data = {}) => {

    let accessToken = 'Bearer ' + localStorage.getItem('access_token').replace(/["']/g, "");

    return fetch(url, { 
        method: method,
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Accept' : 'application/json', 
            'Content-Type': 'application/json',
            'Authorization' : accessToken
        },
    })
}

export const loginApi = async (url, formRequest) => {
    return fetch(url, { 
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(formRequest),
        headers: { 'Content-Type': 'application/json' },
    })
} 