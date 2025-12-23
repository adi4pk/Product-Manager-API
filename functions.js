

function createHome(){


    let container=document.querySelector(".container");


    container.innerHTML=`
    
    
        <h1>
        PRODUCTS
    </h1>
    <p>
        <button class="create-product-button">add a new Product</button>
        <button class="edit-product-button">update a Product</button>
    </p>

    <table>
        <thead>
            <tr>
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



    </table>`

    let addNewProductBtn = document.querySelector('.create-product-button');
    addNewProductBtn.addEventListener("click", () => {
        renderAddProduct();
    })

    let editProdBtn = document.querySelector('.edit-product-button');
    editProdBtn.addEventListener("click", () =>{
        renderEditProduct();
    })

    attachProducts();       //async function



 }


 function createCard(produs){

    let card = document.createElement('tr');
    card.classList.add('card');
    card.innerHTML =
                `<td>${produs.id}</td>
                <td>${produs.category}</td>
                <td>${produs.createDate}</td>
                <td>${produs.description}</td>
                <td>${produs.name}</td>
                <td>${produs.price}</td>
                <td>${produs.stock}</td>
                <td>${produs.weight}</td>`;

    return card;
}

async function attachProducts(){     

    let tableContainer=document.querySelector(".table-body")
    let arr = await getProducts();

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
            <input class="category" type="text" id="category">
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

    let categoryInpt = container.querySelector('.category');
        let descInpt = container.querySelector('.description');
        let nameInpt = container.querySelector('.prodName');
        let priceInpt = container.querySelector('.price');
        let stockInpt = container.querySelector('.stock');
        let weightInpt = container.querySelector('.weight');

        

    // function validateField(field) {
    //   console.log(`error: ${field} is missing`);
    //   let errorField = document.createElement("p");
    //   errorField.classList.add("errorXYZ");
    //   errorField.textContent = `Please input the ${field}`;

    //   return errorField;
    // }

    function validateDescription(description){
        let descRegex = /^(?=.*[A-Za-z]).{1,100}$/;
        let match = descRegex.test(description);        //true or false

        return match;       // --> returns a bool
    }


    function addErrorDesc(){
        let errorField = document.createElement("p");
        errorField.classList.add("errorXYZ");

        if(descInpt.value.trim() == ""){
            errorField.textContent = "must not be empty - DESCRIPTION field";
        }

        let descriptionField = container.querySelector(".description-section");
        errorField.textContent = "NO Special characters allowed - DESCRIPTION must contain at least one letter"
        descriptionField.appendChild(errorField);
    }


    function validateName(name){
        let nameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9 _-]{1,25}$/;
        let match = nameRegex.test(name);       // true or false

        return match;   // --> returns a bool
    }

    function addErrorName(){
        let errorField = document.createElement("p");
        errorField.classList.add("errorXYZ");
        
        if(nameInpt.value.trim() ==""){
            errorField.textContent = "must not be empty - NAME field";
        }

        let nameField = container.querySelector(".prodName-section");
        errorField.textContent = "NO Special characters allowed - Name must contain at least one letter"
        nameField.appendChild(errorField);
    
    }

    function validatePrice(price){
        let priceRegex = /^(?:0?\.(?:0[1-9]|[1-9]\d?)|[1-9]\d*(?:\.\d{1,2})?)$/;
        let match = priceRegex.test(price);

        return match;       // --> returns a bool
    }

    function addErrorPrice(){
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

            let priceField = container.querySelector(".price-section");
            errorField.textContent = "must be a WHOLE NUMBER";
            priceField.appendChild(errorField);
    }

    function validateStock(stock) {

    let stockRegex = /^[1-9]\d*$/;
    let match = stockRegex.test(stock);         //returns true or false

    return match;
    }

    function addErrorStock() {
    console.log(`please input an appropriate value for the stock`);
    let errorField = document.createElement("p");
    errorField.classList.add("errorXYZ");

    if (stockInpt.value.trim() == "") {
        errorField.textContent = "STOCK field cannot be empty";
    } else {
        errorField.textContent = "STOCK MUST BE A WHOLE NUMBER or greater than 0";
    }

    let stockField = container.querySelector(".stock-section");
    stockField.appendChild(errorField);
    }

    function validateWeight(weight) {

      let weightRegex = /^(?:0?\.(?:0[1-9]|[1-9]\d?)|[1-9]\d*(?:\.\d{1,2})?)$/;
      let match = weightRegex.test(weight); // returns true or false

      return match;
    }


    function addErrorWeight(){
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

        let weightField = container.querySelector(".weight-section");
        weightField.appendChild(errorField);
    }


    let addProductBtn = document.querySelector('.add-product-button');
    addProductBtn.addEventListener("click", () =>{

        // const priceRegex = /^(?:0?\.(?:0[1-9]|[1-9]\d?)|[1-9]\d*(?:\.\d{1,2})?)$/;
        // const stockRegex = /^[1-9]\d*$/;
        // const weightRegex = /^(?:0\.(?:0?[1-9]|[1-9]0?)|[1-9]\d*(?:\.\d{1,2})?)$/;
    
        //add the errors conditions here
        // remove error if condition is met - fields are all filled accordingly
        let errrror = document.querySelector('.errorXYZ');
        if(errrror){
            errrror.remove();   //remove prior error before an error is generated again
        }
           if (categoryInpt.value.trim() === "") {
             let categoryField = container.querySelector(".category-section");

             
            

             console.log("error: category missing");
             categoryError = document.createElement("p");
             categoryError.classList.add("errorXYZ");
             categoryError.textContent = "Please input the category";
             categoryField.appendChild(categoryError);
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



        //    } else if (!priceInpt.value.match(priceRegex) || priceInpt < 0) {
        //      let priceField = container.querySelector(".price-section");
        //      priceField.appendChild(validateValue("price"));

        //      return;
        //    } else if (!validateStock(stockInpt.value)) {
        //      console.log("error,STOCK field is empty");
        //      return;
           } else if (!validateStock(stockInpt.value)) {
            addErrorStock() 
            
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
          category: categoryInpt.value.trim(),
          description: descInpt.value.trim(),
          name: nameInpt.value.trim(),
          price: priceNum,
          stock: stockNum,
          weight: weightNum
        };
            
        createProduct(produsNou);    //no need for await() before clearing the input fields - the func grabs the values from the time-point when the user presses the button
            categoryInpt.value =""
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
            <input class="category" type="text" id="category">
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

    let categoryInpt = container.querySelector('.category');
    let descInpt = container.querySelector('.description');
    let nameInpt = container.querySelector('.prodName');
    let priceInpt = container.querySelector('.price');
    let stockInpt = container.querySelector('.stock');
    let weightInpt = container.querySelector('.weight');

    let productId = container.querySelector('.product-id');

    let updateProdBtn = document.querySelector('.update-product-button')
    updateProdBtn.addEventListener("click", () =>{

        let produsToEdit = {       //PRODUCT BODY must be inside eventListener
          category: categoryInpt.value.trim(),
          description: descInpt.value.trim(),
          name: nameInpt.value.trim(),
          price: priceNum,
          stock: stockNum,
          weight: weightNum
        };
    })

    let cancelEditProductBtn = document.querySelector(".cancel-update-product");
    cancelEditProductBtn.addEventListener("click", () => {
        createHome();
    });
}