
async function api(path='', method='GET', body=null, token=null){

    const base = "http://localhost:8080/api/v1"
    const url = `${base}${path}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With' : 'XMLHttpRequest',
        },

    };

    if(token){
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if(body !== null) options.body = JSON.stringify(body);

    return fetch(url, options);
}



// USER DATA
let ts={
        fullName: "string",
        email: "string",
        password: "string",
        phone: "string",
        country: "string",
        billingAddress: "string",
        shippingAddress: "string",
        userRole: "admin"
}



// Functions

async function register(userBody){

    let response = await api("/users/register", "POST", userBody);

    let data = await response.json();

    return data;
}


async function getToken(){

    let response = await api("/users/login", "POST", {email:"test@test.com",password:"test"});

    const {jwtToken : token} = await response.json();
    
    
    return token;

}


async function getProducts(){       //add error here - change return outcome

    let token = await getToken();

    let response = await api("/products/all", "GET", body=null, token);
    let data = await response.json();

    return data.list;
}

async function createProduct(productBody){
    let token = await getToken();
    
    let response = await api("/products/add", "POST", productBody, token);
    const produs = await response.json();

    console.log(produs);

    return produs;
}


async function editProduct(productBody, productId){
    let token = await getToken();

    let response = await api(`/products/edit/${productId}`, productBody, token);
    const produsEditat = await response.json();

    console.log(produsEditat);
    
    return produsEditat;
}





// //faulty function
// function errorThrow(field){
//     console.log(`error, ${field} missing`);
//     let field = container.querySelector(`.${field}-section`);
//     `let ${field}error` = document.createElement('p');
//     `${field}error`.textContent = `ERROR please input ${field}` 
//     field.appendChild(`${field}error`);
// }





// {
//   "category": "string",
//   "description": "string",
//   "name": "string",
//   "price": 0,
//   "stock": 0,
//   "weight": 0
// }

// function isDecimal(num){
//     if(num % 2 == 1){
//         return true;
//     }
// }

//if(found)

// function validatePrice(string){
//     priceRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$|^0?\.\d{1,2}$/;
//     let match = string.match(priceRegex);
// }







// function addErrorStock() {
//   console.log(`please input an appropriate value for the stock`);
//   let errorField = document.createElement("p");
//   errorField.classList.add("errorXYZ");
//   errorField.textContent = `STOCK MUST BE A NUMBER or greater than 0`;

//   let stockField = container.querySelector(".stock-section");
//   stockField.appendChild(validateField("stock"));
// }