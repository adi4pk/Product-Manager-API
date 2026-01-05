
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

async function userLogin(username, pass){
    let response = await api("/users/login", "POST", {email:username, password:pass});  //<--body

    const {jwtToken : token} = await response.json();

    console.log(`user is logged on: ${username}`, token);
    return token;
}

// async function getUsers(){

//     let token = await getToken();

//     let response = await api("/users/all", "GET", null, token);

//     let data = await response.json();

//     console.log(data.list);
//     return data.list;
// }

async function getCategories(){
    
    let token = await getToken();

    let response = await api("/categories/all", "GET", null, token);
    let data = await response.json();

    // console.log(data.list.name);

    return data.list;
}


async function loadCategs(){

    let categoryList = await getCategories();
    populateCategories(categoryList);

    console.log(categoryList);
}

async function getAllProducts(){       //add error here - change return outcome

    // let token = await getToken();
    let token = localStorage.getItem('authToken');

    let response = await api("/products/all", "GET", body=null, token);
    let data = await response.json();

    return data.list;
}

async function addToCart(productBody){
    let token = localStorage.getItem('authToken');

    let response = await api("/cart/products", 'POST', productBody, token);
    let data = await response.json();

    console.log(data);
    return data;

}

async function createProduct(productBody){
    let token = await getToken();
    
    let response = await api("/products/add", "POST", productBody, token);
    const produs = await response.json();

    console.log(produs);

    return produs;
}


async function editProduct(productBody, rawId){
    let token = await getToken();

    let produsId = Number(rawId);
    console.log(produsId);
    console.log(rawId);

    let response = await api(`/products/edit/${produsId}`, 'PUT', productBody, token);
    const produsEditat = await response.json();

    console.log(produsEditat);
    
    return produsEditat;
}


async function stergeProdus(rawId){
    let token = await getToken();

    let produsId = Number(rawId);
    
    let response = await api(`/products/delete/${produsId}`, 'DELETE', null, token);
    const produsSters = await response.json();

    console.log('produsul a fost sters:', produsSters);

    return produsSters;
}





// function addErrorStock() {
//   console.log(`please input an appropriate value for the stock`);
//   let errorField = document.createElement("p");
//   errorField.classList.add("errorXYZ");
//   errorField.textContent = `STOCK MUST BE A NUMBER or greater than 0`;

//   let stockField = container.querySelector(".stock-section");
//   stockField.appendChild(validateField("stock"));
// }


function testingAddtoCart(event){

    let btn = event.target.closest(".order-product-button");
    
        //get enclosing row
        let row = btn.closest('tr');
        if(!row) return null;

        let creationDate = row.querySelector("#creation-date");
        let product_id = row.querySelector(".prod-id");
        let product_name = row.querySelector(".prod-name");
        let product_price = row.querySelector(".prod-price");

        if (!creationDate || !product_id || !product_name || !product_price) return null;

        const item = {
            date: creationDate.textContent,
            id: product_id.textContent,
            name: product_name.textContent,
            price: product_price.textContent
        }

        console.log(`the item was created on:${item.date}, and the product id is:${item.id}`);
        return item;
        }
    

        function createCartProduct(produs){
            let card = document.createElement("tr");
            card.classList.add("shop-card");

            card.innerHTML = `
                <td class="image">
                    <img src="">
                </td>
                <td class="prod-id">${produs.id}</td>
                <td class="name">${produs.name}</td>
                <td class="prod-price">${produs.price}</td>
                `;

            return card;
        }

        function attachProdsToCard(arr){
            
            let shopCart = document.querySelector(".cart-list");

            shopCart.innerHTML = "";

            let prodList = arr.map((e) => createCartProduct(e));
            prodList.forEach((prod) => {
                shopCart.appendChild(prod);
            })
        }





