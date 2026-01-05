

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


    container.innerHTML=`
    
    
    <h1>PRODUCTS</h1>
    <p>
        <button class="create-product-button">add a new Product</button>
        <button class="edit-product-button">update a Product</button>
        <button class="delete-product-button">DELETE a Product</button>
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


    
    <div class="cart-tab">
        <h1>Shopping Cart</h1>

        <table class="cart-list">
            <thead class="thead-row">
                <tr>
                    <th>image</th>
                    <th>NAME</th>
                    <th>price</th>
                    <th>quantity</th>
                </tr>
            </thead>
        
            <tbody class="cart-tbody">
                <tr class="shop-card">
                        <td class="image">image
                            <img src="">
                        </td>
                        <td class="name">NAME</td>
                        <td class="totalPrice">$2000</td>
                        <td class="quantity">quantity</td>
                </tr>  

                <tr class="shop-card">
                        <td class="image">iamge
                            <img src="">
                        </td>
                        <td class="name">NAME</td>
                        <td class="totalPrice">$2000</td>
                        <td class="quantity">quantity</td>
                </tr>

             </tbody>
        </table>
        
        <div class="buttons">
        <button class="close">CLOSE</button>
        <button class="send-order">place order</button>
        </div>

        </div>`

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
    
    attachProducts();       //async function

    // let orderBtn = container.querySelector('.order-product-button'); --- WHY?????
    // orderBtn.addEventListener("click", () => {
    //     // let obj = ev.target;
    //     console.log("test")

    // })

    const produseCart = [];

    container.addEventListener("click", (ev) => {
       
        let btn = ev.target.closest(".order-product-button");
        if(!btn) return;
        
        const item = testingAddtoCart(ev);      //returns the object
        produseCart.push(item);
        attachProdsToCard(produseCart);
        
        console.log(produseCart);


    });
    



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
                <td>${produs.stock}</td>
                <td>${produs.weight}</td>
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
            return;
           }

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
    <h1>Update Product</h1>
    <section>
        <p class="id-section">
            <label for="product-id">Product ID</label>
            <input class="product-id" type="text" id="product-id">
        </p>

        <p>
            <button class="delete-product-button" value="delete a Product">DELETE product</button>
        </p>
        <p>
            <button class="cancel-update-product">Cancel</button>
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