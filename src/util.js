export const postData=async(url, datas)=> {
    const response = await fetch(url, {
        'method' : 'POST',
        'Accept': '*',
        'Access-Control-Allow-Origin': '*',
        "headers": {
            'Content-Type' : 'application/json'
        },
        'body': JSON.stringify(datas)
    })
    return await response.json();
}

export const getData=async(url)=> {
    const response = await fetch(url, {
        'method' : 'GET',
        'Accept': '*',
        'Access-Control-Allow-Origin': '*',
        "headers": {
            'Content-Type' : 'application/json',
        },
        'body': JSON.stringify()
    })
    return await response.json();
}