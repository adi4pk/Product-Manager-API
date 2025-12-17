

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

        

    let addProductBtn = document.querySelector('.add-product-button');
    addProductBtn.addEventListener("click", () =>{
        
        const priceNum = Number(priceInpt.value.trim());
        const stockNum = Number(stockInpt.value.trim());
        const weightNum = Number(weightInpt.value.trim());
    
        //add the errors conditions here
        
        // remove error if condition is met - fields are all filled accordingly
        let errrror = document.querySelector('.errorXYZ');
        if(errrror){
            errrror.remove();
        }
           if (categoryInpt.value.trim() === "") {
             let categoryField = container.querySelector(".category-section");
             let categoryError = container.querySelector(".errorXYZ");


             //remove prior error before a error is generated again
             if (categoryError) {
               categoryError.remove();
             }

             console.log("error: category missing");
             categoryError = document.createElement("p");
             categoryError.classList.add("errorXYZ");
             categoryError.textContent = "Please input the category";
             categoryField.appendChild(categoryError);
             return;

           } else if (descInpt.value.trim() === "") {
             console.log("error: description missing");
             return;
           } else if (nameInpt.value.trim() === "") {
             console.log("error, name is missing");
             return;
           } else if (priceInpt.value.trim() === "") {
             console.log("error, missing price");
             return;
           } else if (!Number.isFinite(priceNum) || priceNum < 0.01) {
             console.log("PRICE MUST BE A NUMBER or greater than 0");
             return;
           } else if (
             stockInpt.value.trim() === "") {
             console.log("error,STOCK field is empty");
             return;
           } else if (!Number.isInteger(stockNum) || stockNum < 1) {
             console.log("error, STOCK must be a whole number or greater than zero.");
             return;
           } else if (weightInpt.value.trim() === "") {
             console.log("error, missing weight");
             return;
           } else if (!Number.isFinite(weightNum) || weightNum < 0.01) {
             console.log("error, weight must be a number or a number greater than zero");
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