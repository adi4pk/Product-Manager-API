

function createLoginPage(){
    let container = document.querySelector(".container");

    container.innerHTML=`
    
    <section class="login-section">
        <h1>Online SHOP</h1>

        <div class="login-div">
        <label for="username">Username</label>
        <input class="loginInpt" id="loginInpt" name="username" type="text">
        </div>

        <div class="pass-div">
        <label for="pass">Password</label>
        <input class="passInpt" name="pass" type="password">
        </div>
        
        <button class="login-button">Login</button>
    </section>

    <section class="all-credentials-section">
    <div class="username-div">
        <h2>Accepted usernames are:</h2>
        <ul class="user-list">
            
        </ul>
    </div>

    <div class="password-div">
        <h2>Password for all users:</h2>
        <p>test123456</p>
    </section>`

    // populateUsers(getUsers());   -- no need to populate user list

    let loginBtn = document.querySelector(".login-button");
    loginBtn.addEventListener("click", async () => {

        let usernameInpt = document.querySelector(".loginInpt");
        let passwordInpt = document.querySelector(".passInpt");


                //func userLogin(username, pass)
        let myToken = await userLogin(usernameInpt.value, passwordInpt.value);
        localStorage.setItem('authToken', myToken);

        createHome();
    })
}


function createHome(){


    let container=document.querySelector(".container");
    // let cart = document.querySelector(".cart-tab");

    container.innerHTML=`
    
    
    <h1>PRODUCTS</h1>
    <p>
        <button class="create-product-button">add a new Product</button>
        <button class="edit-product-button">update a Product</button>
        <button class="delete-product-button">DELETE a Product</button>
        <button class="shopping-cart-button">see my CART</button>
        <button class="see-orders-button">view Order history</button>
    </p>

    <table>
        <thead>
            <tr class>
                <th>Prod ID</th>
                <th>Category</th>
                <th>Date</th>
                <th>description</th>
                <th>name</th>
                <th>price</th>
                <th>stock</th>
                <th>weight</th>
            </tr>
        </thead>
        
        <tbody class="table-body">

        </tbody>

    </table>


        <aside class="cart-tab hide">
            <header class="shopcart-header">
                <h1>Shopping Cart</h1>
                <div class="cart-row-header">
                    <div class="cart-header-id">ID</div>
                    <div class="cart-header-name">NAME</div>
                    <div class="cart-header-quantity">quantity</div>
                </div>
            </header>
        
            <div class="cart-body">
                

                <div class="shop-card">

                </div>
            </div>

            <footer class="button-section">
                <button class="close">CLOSE</button>
                <button class="send-order">place order</button>
            </footer>
        </aside>`

    let addNewProductBtn = document.querySelector('.create-product-button');
    addNewProductBtn.addEventListener("click", () => {
        renderAddProduct();
    })

    let editProdBtn = document.querySelector('.edit-product-button');
    editProdBtn.addEventListener("click", () =>{
        renderEditProduct();
    })

    let deletProdBtn = document.querySelector('.delete-product-button');
    deletProdBtn.addEventListener("click", () =>{
        renderDeleteProduct();
    })

    let seeCartBtn = document.querySelector(".shopping-cart-button");
    seeCartBtn.addEventListener("click", () =>{
        let cart = document.querySelector(".cart-tab")
        cart.classList.toggle("showCart");

        attachCartProducts(cartState); // runs and refreshes the cart whenever cart is clicked
        
    })

    let viewOrdersBtn = document.querySelector(".see-orders-button");
    viewOrdersBtn.addEventListener("click", () =>{
        renderSeeUserOrders();
    })

    let closeCartBtn = document.querySelector(".close");
    closeCartBtn.addEventListener("click", () =>{
        let cart = document.querySelector(".cart-tab")
        cart.classList.toggle("showCart");
    })
    
    attachProducts();       //async function -- 
    


    // let orderBtn = container.querySelector('.order-product-button'); --- WHY?????
    // orderBtn.addEventListener("click", () => {
    //     // let obj = ev.target;
    //     console.log("test")

    let sendOrderBtn = document.querySelector(".send-order");

    sendOrderBtn.addEventListener("click", async () =>{

    let body ={ orderDate: "2026-01-07",
                productList: cartState.map(({id, quantity}) => ({
                    productId: +id,
                    quantity: quantity
                })
            )}

    let cart = document.querySelector(".cart-body");
    let error = document.querySelector(".error-cart-empty");
    if (error) {
        error.remove();
    }

    if(cartState.length < 1){
        console.log("CART IS EMPTY");
        
        let errorCartEmpty = document.createElement("h2");
        cart.appendChild(errorCartEmpty);
        
        errorCartEmpty.classList.add("error-cart-empty");
        errorCartEmpty.classList.add("pop");
        errorCartEmpty.textContent="Your cart is empty";


        return;
    }

    
    // await sendOrder(body);
    console.log(`The quantity of the item will be sent: ${body.productList.quantity}`);

    let cartBody = document.querySelector(".cart-body");
    cartBody.innerHTML="";

    console.log("ORDER placed successfully")
    cartState = [];     //empty the cartState in the DOM after order is sent.

 })


    container.addEventListener("click", async (ev) => {     //add item to CART btn
       
        let btn = ev.target.closest(".order-product-button");
        if(!btn) return;
        
        let item = btn.closest('tr');

        let product_id = item.querySelector(".prod-id");        //e.g. id: 3
        let product_name = item.querySelector(".prod-name");
        let product_price = item.querySelector(".prod-price");
        let product_quantity = item.querySelector(".prod-quantity");

        console.log(product_id.textContent, product_name.textContent, product_quantity.textContent);

        let cartI={

            id:product_id.textContent,      //id: 3
            name:product_name.textContent,
            quantity:1
        }
      
        addProductToCart(cartI);        //push the object to the data.js array of objects
        addItemToCart(cartI.id, cartI.quantity)

        // let cartBody = document.querySelector(".cart-tbody");
        // cartBody.innerHTML="";

        attachCartProducts(cartState);
    });

    
    let cartBody = document.querySelector(".cart-body");
    cartBody.addEventListener("click", (ev) =>{

        let quantityUpBtn = ev.target.closest(".plus");
        if(!quantityUpBtn) return;

        let item = quantityUpBtn.closest('.shop-card');

        let product_id = item.querySelector(".prod-id");
        let product_name = item.querySelector(".name");
        let product_quantity = item.querySelector(".prod-qty");

        console.log(typeof(product_quantity))
        

        let cartI={

            id:product_id.textContent,      //id: 3
            name:product_name.textContent,
            // quantity: Number(product_quantity.textContent)
            quantity: +product_quantity.textContent +1

        }

        console.log(typeof(cartI.name))
        console.log(cartI.quantity)
        increaseItemQuantityCart(cartI);

        product_quantity.textContent = cartI.quantity;

        // console.log(typeof(cartI.quantity))

        // product_quantity.textContent = 123
        // product_quantity.textContent = 

        // addItemToCart(cartI.id, cartI.quantity)
        
    })

    cartBody.addEventListener("click", (ev) =>{

        let quantityDownBtn = ev.target.closest(".minus");
        if(!quantityDownBtn) return;

        let item = quantityDownBtn.closest('.shop-card');
        
        let product_id = item.querySelector(".prod-id");
        let product_name = item.querySelector(".name");
        let product_quantity = item.querySelector('.prod-qty')

        console.log(item);

        let cartI = {
            id: product_id.textContent,
            name: product_name.textContent,
            quantity: +product_quantity.textContent
        }

        

        // if(Number(product_quantity.textContent) >1){
        //     cartI.quantity = +product_quantity -1
        //     decreaseItemQuantityCart(cartI);
        // } else 
            if(Number(product_quantity.textContent) == 1){
            deleteItemFromCart(cartI);
            item.remove();
        }   else{
            cartI.quantity = +product_quantity.textContent -1
            decreaseItemQuantityCart(cartI)
        }

        

        // if(Number(product_quantity.textContent) > 1){
        //     let cartI = {
        //     id: product_id.textContent,
        //     name: product_name.textContent,
        //     quantity: +product_quantity.textContent -1
        // }

        // decreaseItemQuantityCart(cartI);

        // product_quantity.textContent = cartI.quantity;

        // } else if(Number(product_quantity.textContent) == 1){
        //     let cartI = {
        //     id: product_id.textContent,
        //     name: product_name.textContent,
        //     quantity: +product_quantity.textContent
        //     // quantity: 0
        // }
        //     console.log("ITEM DELETED")
            
        //     deleteItemFromCart(cartI);
        //     item.remove();
        // }
        
    })
    
 }
 
 


 // functions for the SHOPPING CART --- NOT used

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
    
function attachProdsToCard(arr){
            
            let shopCart = document.querySelector(".cart-body");

            shopCart.innerHTML = "";

            let prodList = arr.map((e) => createCartProduct(e));
            prodList.forEach((prod) => {
                shopCart.appendChild(prod);
            })
        }






// function createUserCard(user){

//     let card = document.createElement("li");
//     card.classList.add("li-user");

//     card.textContent=user.email;

//     return card;
// }

// async function populateUsers(){

//     let arr = await getUsers();

//     let userList = document.querySelector(".user-list");
//     arr.map(user => createUserCard(user)).forEach(user => {
//         userList.append(user);
//     });
// }

 function createCategory(categorie){

    let categ = document.createElement("option");
    categ.classList.add("category-option");

    categ.textContent = categorie.name;

    return categ;
 }

 function populateCategories(arr){

    let categoryList = document.querySelector(".category-menu");
    arr.map(element => createCategory(element))
    .forEach(e => {
        categoryList.append(e)
 });           //create the cards in memory, then append them to the DOM container

 }

 function createCard(produs){

    let card = document.createElement('tr');
    card.classList.add('card');
    card.innerHTML =
                `<td class="prod-id">${produs.id}</td>
                <td class="prod-cat">${produs.category}</td>
                <td id="creation-date">${produs.createDate}</td>
                <td>${produs.description}</td>
                <td class="prod-name">${produs.name}</td>
                <td class="prod-price">${produs.price}</td>
                <td class="prod-quantity">${produs.stock}</td>
                <td class=""prod-weight">${produs.weight}</td>
                <button class="order-product-button">add to cart</button>`;

    return card;
}

async function attachProducts(){     

    let tableContainer=document.querySelector(".table-body")
    let arr = await getAllProducts();

    tableContainer.innerHTML = "";
    const produse = arr.map((e) => createCard(e));
    produse.forEach((produs) => {

        tableContainer.appendChild(produs);
        
    })
    console.log('OK, it worked');
}





function renderAddProduct(){
    let container=document.querySelector('.container');

    

    container.innerHTML = "";
    container.innerHTML=`
    <h1>New PRODUCT</h1>
    <section>
        
        <p class="category-section">
            <label for="category">category</label>
            <!--<input class="category" type="text" id="category"> -->

            <select class="category-menu">
                <option value=""> Please select a category </option>
            </select>
        </p>
        <p class="description-section">
            <label for="description">description</label>
            <input class="description" type="text" id="description">
        </p>
        <p class="prodName-section">
            <label for="prodName">name</label>
            <input class="prodName" type="text" id="prodName">
        </p>
        <p class="price-section">
            <label for="price">price</label>
            <input class="price" type="text" id="price">
        </p>

        <p class="stock-section">
            <label for="stock">stock</label>
            <input class="stock" type="text" id="stock">
        </p>

        <p class="weight-section">
            <label for="weight">weight</label>
            <input class="weight" type="text" id="weight">
        </p>

        <p>
            <button class="add-product-button" value="add a Product">Add a product</button>
        </p>
        <p>
            <button class="cancel-new-product">Cancel</button>
        </p>
    </section>
    `

    loadCategs();
        //KEEP DEFINED FIELDS INSIDE THE RENDER FUNCTION

        let categSelect = container.querySelector('.category-menu');       // changed the query selector - no more categ field input
        let descInpt = container.querySelector('.description');     
        let nameInpt = container.querySelector('.prodName');
        let priceInpt = container.querySelector('.price');
        let stockInpt = container.querySelector('.stock');
        let weightInpt = container.querySelector('.weight');

    let addProductBtn = document.querySelector('.add-product-button');
    addProductBtn.addEventListener("click", () =>{
    
        //add the errors conditions here
        // remove error if condition is met - fields are all filled accordingly
        let errrror = document.querySelector('.errorXYZ');
        if(errrror){
            errrror.remove();   //remove prior error before an error is generated again
        }
           if (categSelect.value == "") {
             addErrorCategory();
             return;

           } else 
            if (!validateDescription(descInpt.value)) {
            addErrorDesc();
            return;

           } else if (!validateName(nameInpt.value)) {
            addErrorName();
            return;


           } else if (validatePrice(priceInpt.value) === false) {
            console.log(validatePrice(priceInpt.value))
             addErrorPrice();
             return;


           } else if (!validateStock(stockInpt.value)) {
            addErrorStock();
            return;
           
           } else if (!validateWeight(weightInpt.value)) {
             console.log("error, weight must be a number");
             addErrorWeight();
             return;

           } else{
            console.log("it's gonna WORK");
            return;
           }

        let produsNou = {       //PRODUCT BODY must be inside eventListener
          category: categSelect.value.trim(),
          description: descInpt.value.trim(),
          name: nameInpt.value.trim(),
          price: priceNum,
          stock: stockNum,
          weight: weightNum
        };
            
        createProduct(produsNou);    //no need for await() before clearing the input fields - the func grabs the values from the time-point when the user presses the button
            categSelect.value =""
            descInpt.value ="";
            nameInpt.value ="";
            priceInpt.value ="";
            stockInpt.value ="";
            weightInpt.value ="";

        
           
        });

        let cancelNewProductBtn = document.querySelector(".cancel-new-product");
        cancelNewProductBtn.addEventListener("click", () => {
              createHome();
           });

    
}

function renderEditProduct(){
    let container=document.querySelector('.container');

    loadCategs();

    container.innerHTML= "";
    container.innerHTML= `
    <h1>Update Product</h1>
    <section>
        <p class="id-section">
            <label for="product-id">Product ID</label>
            <input class="product-id" type="text" id="product-id">
        </p>

        <p class="category-section">
            <label for="category">category</label>
            <!--<input class="category" type="text" id="category"> -->

            <select class="category-menu">
                <option value=""> Please select a category </option>
            </select>
        </p>
        <p class="description-section">
            <label for="description">description</label>
            <input class="description" type="text" id="description">
        </p>
        <p class="prodName-section">
            <label for="prodName">name</label>
            <input class="prodName" type="text" id="prodName">
        </p>
        <p class="price-section">
            <label for="price">price</label>
            <input class="price" type="text" id="price">
        </p>

        <p class="stock-section">
            <label for="stock">stock</label>
            <input class="stock" type="text" id="stock">
        </p>

        <p class="weight-section">
            <label for="weight">weight</label>
            <input class="weight" type="text" id="weight">
        </p>

        <p>
            <button class="update-product-button" value="add a Product">update product</button>
        </p>
        <p>
            <button class="cancel-update-product">Cancel</button>
        </p>
    </section>
    `

    let categSelect = container.querySelector('.category-menu');       // changed the query selector - no more categ field input
    let descInpt = container.querySelector('.description');
    let nameInpt = container.querySelector('.prodName');
    let priceInpt = container.querySelector('.price');
    let stockInpt = container.querySelector('.stock');
    let weightInpt = container.querySelector('.weight');

    let productId = container.querySelector('.product-id');


    let updateProdBtn = document.querySelector('.update-product-button')
    updateProdBtn.addEventListener("click", () =>{

    
        //add the errors conditions here
        // remove error if condition is met - fields are all filled accordingly
        let errrror = document.querySelector('.errorXYZ');
        if(errrror){
            errrror.remove();   //remove prior error before an error is generated again
        }
        
        if (categSelect.value == "") {
             addErrorCategory();
             return;
        } else if (!validateDescription(descInpt.value)) {
            addErrorDesc();
            return;

           } else if (!validateName(nameInpt.value)) {
            addErrorName();
            return;


           } else if (validatePrice(priceInpt.value) === false) {
            console.log(validatePrice(priceInpt.value))
             addErrorPrice();
             return;


           } else if (!validateStock(stockInpt.value)) {
            addErrorStock();
            return;
           
           } else if (!validateWeight(weightInpt.value)) {
             console.log("error, weight must be a number");
             addErrorWeight();
             return;

           } else{
            console.log("it's gonna WORK");
            let produsToEdit = {       //PRODUCT BODY must be inside eventListener
          category: categSelect.value.trim(),
          description: descInpt.value.trim(),
          name: nameInpt.value.trim(),
          price: priceInpt.value,
          stock: stockInpt.value,
          weight: weightInpt.value
        };

        editProduct(produsToEdit, productId.value);
            categSelect.value =""
            descInpt.value ="";
            nameInpt.value ="";
            priceInpt.value ="";
            stockInpt.value ="";
            weightInpt.value ="";
           }

        
    })

    let cancelEditProductBtn = document.querySelector(".cancel-update-product");
    cancelEditProductBtn.addEventListener("click", () => {
        createHome();
    });
}

function renderDeleteProduct(){
    let container=document.querySelector('.container');

     container.innerHTML= "";
    container.innerHTML= `
    <h1>Delete Product</h1>
    <section>
        <p class="id-section">
            <label for="product-id">Product ID</label>
            <input class="product-id" type="text" id="product-id">
        </p>

        <p>
            <button class="delete-product-button" value="delete a Product">DELETE product</button>
        </p>
        <p>
            <button class="cancel-delete-product">Cancel</button>
        </p>
    </section>
    `

    let productId = container.querySelector('.product-id');

    let stergeProdusBtn = document.querySelector('.delete-product-button')
    stergeProdusBtn.addEventListener("click", () =>{

        // let produsDeSters = {       //PRODUCT BODY must be inside eventListener | NO BODY for DELETE function, only prod ID
        // };

        stergeProdus(productId.value);
})

    let cancelEditProductBtn = document.querySelector(".cancel-delete-product");
    cancelEditProductBtn.addEventListener("click", () => {
        createHome();
    });

}

function renderSeeUserOrders(){
    let container = document.querySelector(".container");

    container.innerHTML = "";
    container.innerHTML = `
    <h1>ORDER History</h1>
    <button class="cancel-see-orders">Home</button>

    <table>
        <thead>
            <tr class>
                <th>Order ID</th>
                <th>Date</th>
                <th>orderEmail</th>
                <th>shipping address</th>
                <th>amount</th>
            </tr>
        </thead>
        
        <tbody class="table-body">

        </tbody>

        <tfoot class="table-footer">
            <tr>
                <th>TOTALS</th>
                <th></th>
                
            </tr>
            <tr>
                <th>Orders</th>
                <th>money spent</th>
                
            </tr>
            <tr>
                
                <td class="total-orders-number"></td>
                <td class="money-spent-amount"></td>
            </tr>
        </tfoot>
    </table>
    `

    attachOrders();

    let cancelOrderHistoryBtn = document.querySelector(".cancel-see-orders");
        cancelOrderHistoryBtn.addEventListener("click", () => {
              createHome();
           });
}



function addErrorCategory(){
    let categSelect = document.querySelector(".category-option");       // including this variable in the func is NOT Mandatory

    let errorField = document.createElement("p");
    errorField.classList.add("errorXYZ");

    
        errorField.textContent = "Category must be selected";
    

    let categoryField = document.querySelector(".category-section");
    categoryField.appendChild(errorField);
}

 function validateDescription(description){
        let descRegex = /^(?=.*[A-Za-z]).{1,100}$/;
        let match = descRegex.test(description);        //true or false

        return match;       // --> returns a bool
    }

function addErrorDesc(){

        let descInpt = document.querySelector('.description');                  // new line added to the outside func

        let errorField = document.createElement("p");
        errorField.classList.add("errorXYZ");

        

        if(descInpt.value.trim() == ""){
            errorField.textContent = "must not be empty - DESCRIPTION field";
        }

        let descriptionField = document.querySelector(".description-section");          // new line added to the outside func
        errorField.textContent = "NO Special characters allowed - DESCRIPTION must contain at least one letter"
        descriptionField.appendChild(errorField);
    }

function validateName(name){
        let nameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9 _-]{1,25}$/;
        let match = nameRegex.test(name);       // true or false

        return match;   // --> returns a bool
    }

function addErrorName(){

        let nameInpt = document.querySelector('.prodName');                  // new line added to the outside func

        let errorField = document.createElement("p");
        errorField.classList.add("errorXYZ");
        
        if(nameInpt.value.trim() ==""){
            errorField.textContent = "must not be empty - NAME field";
        }

        let nameField = document.querySelector(".prodName-section");
        errorField.textContent = "NO Special characters allowed - Name must contain at least one letter"
        nameField.appendChild(errorField);
    
    }

function validatePrice(price){
        let priceRegex = /^(?:0?\.(?:0[1-9]|[1-9]\d?)|[1-9]\d*(?:\.\d{1,2})?)$/;
        let match = priceRegex.test(price);

        return match;       // --> returns a bool
    }

function addErrorPrice(){
        let priceInpt = document.querySelector(".price");

        let errorField = document.createElement("p");
        errorField.classList.add("errorXYZ");
        

        if (priceInpt.value.trim() == "") {
            errorField.textContent = "must not be empty - PRICE field";
            console.log("price field is empty")
        } 
        else if (priceInpt.value < 0 ){     //no need to convert to Number() -- the system can tell whether the value is greater or lower than an INTEGER.
            errorField.textContent = `must be greater than 0`;
            console.log("price is lower than 0");
        }

        let priceField = document.querySelector(".price-section");
        errorField.textContent = "must be a WHOLE NUMBER";
        priceField.appendChild(errorField);
    }

function validateStock(stock) {

    let stockRegex = /^[1-9]\d*$/;
    let match = stockRegex.test(stock);         //returns true or false

    return match;
    }

function addErrorStock() {

    let stockInpt = document.querySelector(".stock")

    console.log(`please input an appropriate value for the stock`);
    let errorField = document.createElement("p");
    errorField.classList.add("errorXYZ");

    if (stockInpt.value.trim() == "") {
        errorField.textContent = "STOCK field cannot be empty";
    } else {
        errorField.textContent = "STOCK MUST BE A WHOLE NUMBER or greater than 0";
    }

    let stockField = document.querySelector(".stock-section");
    stockField.appendChild(errorField);
    }

function validateWeight(weight) {

      let weightRegex = /^(?:0?\.(?:0[1-9]|[1-9]\d?)|[1-9]\d*(?:\.\d{1,2})?)$/;
      let match = weightRegex.test(weight); // returns true or false

      return match;
    }

function addErrorWeight(){

        let weightInpt = document.querySelector(".weight");

        console.log(`please input an appropriate value for the WEIGHT`);
        let errorField = document.createElement("p");
        errorField.classList.add("errorXYZ");

        if (weightInpt.value.trim() == "") {
            errorField.textContent = "WEIGHT field cannot be empty";
        } else if (weightInpt.value < 0){
            errorField.textContent = `WEIGHT must be greater than 0`;
        } else {
            errorField.textContent = `WEIGHT MUST BE A NUMBER or greater than 0`;
        }

        let weightField = document.querySelector(".weight-section");
        weightField.appendChild(errorField);
    }



    //LOAD CART

function createCartProduct(product){

    let card = document.createElement('div');
    card.classList.add("shop-card");

    card.innerHTML=`
                
                <div class="prod-id cell">${product.id}</div>
                <div class="name cell">${product.name}</div>
                
                    <div class="qty-group cell">
                    <button class="plus">+</button>
                    <span class="prod-qty">${product.quantity}</span>
                    <button class="minus">-</button>
                    </div>
                
                `;

    return card;
}

function attachCartProducts(arr){       //runs on the array of objects -- cartState[]


    let cartBody = document.querySelector(".cart-body");
    cartBody.innerHTML="";

    let produseCart = arr.map((e) => createCartProduct(e));
    produseCart.forEach((e) =>{
        cartBody.appendChild(e);
    }) 
}

function addProductToCart(cartItem){     //only add item to cart, NO quantity increase/decrease

   
    let flag=false;
    for(let i=0;i<cartState.length;i++){
        if(cartState[i].id==cartItem.id){
        // cartState[i].quantity+=cartItem.quantity;
        flag=true;
        }
    }
    if(!flag){
        cartState.push(cartItem);
    }

}

function increaseItemQuantityCart(cartItem){
    //button pressed

    let flag=false;
    for(let i=0; i<cartState.length; i++){
        if(cartState[i].id==cartItem.id){
            // cartState[i].quantity+=cartItem.quantity;
            cartState[i].quantity = cartState[i].quantity + 1;
            flag=true;
        }
    }

    console.log(cartItem.quantity)
    return cartItem.quantity;
}

function decreaseItemQuantityCart(cartItem){

    let flag=false;
    for(let i=0; i<cartState.length; i++){
        if(cartState[i].id==cartItem.id){
            cartState[i].quantity = cartState[i].quantity -1;
            flag = true;
        }
    }

    console.log(cartItem.quantity);
    return cartItem.quantity;
}

function deleteItemFromCart(cartItem){

    let flag=false;
    for(let i=0; i<cartState.length; i++){
        if(cartState[i].id==cartItem.id){
            
            cartState.splice(cartItem[i], 1)
            flag=true;
        }
    }

    console.log(cartState);
}


//// ORDER HISTORY ///

function createOrderedCard(item){

    let card = document.createElement('tr');
    card.classList.add('card');

    card.innerHTML = `
    <td class="prod-id">${item.id}</td>
    <td class="prod-order-date">${item.orderDate}</td>
    <td class="prod-order-email">${item.orderEmail}</td>
    <td class="prod-shipping-address">${item.shippingAddress}</td>
    <td class="prod-amount">${item.amount}</td>
    `

    return card

}

async function attachOrders(){

    let tableContainer = document.querySelector(".table-body");
    let arr = await getUserOrders();

    tableContainer.innerHTML="";
    const orderedProducts = arr.map((e) => createOrderedCard(e))
    orderedProducts.forEach((produs) => {
        tableContainer.appendChild(produs);
        
    })


    //attach the Total Orders number
    let totalOrders = document.querySelector(".total-orders-number")
    totalOrders.textContent=`${orderedProducts.length}`
    console.log(orderedProducts.length);

    //calculate money amount on TOTAL orders
    calculateOrdersTotalAmount();



    console.log(arr);
}

async function calculateOrdersTotalAmount(){

    let arr = await getUserOrders();
    let moneyAmount = document.querySelector(".money-spent-amount");

    let total = 0;
    console.log(arr);

    // console.log(amountOrders);

    for(let i=0;i<arr.length;i++){

        
        total+=arr[i].amount;
    }
    console.log(total);
    moneyAmount.textContent = total;
    // let comenzi = arr.map((order) => createOrderAmountCard(order)).forEach(total = total + order);
    // console.log(comenzi);
    // console.log(total);

}


function createOrderAmountCard(order){

    let card = document.createElement('p');
    card.classList.add('order-amount');

    card.textContent = order.amount;
    
    console.log(card.textContent);
    return card.textContent;
}