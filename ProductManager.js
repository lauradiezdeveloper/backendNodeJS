class ProductManager {
    constructor() {
        this.products = []
    };

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.products.length + 1
        };

            if(title && description && price && thumbnail && code && stock != undefined){
                this.products.push(product)
            }else{
                console.log("You need to complete all filds to push the product")
            };
    };
    
    getProducts() {
        return console.log(this.products);
    };

    getProductbyId(id) {
        const product = this.products.find(p => p.id === id);
        product 
        ? console.log("El producto encontrado es:", product) 
        : console.log("Producto no encontrado");
    }

};



// Test

const product = new ProductManager();
product.addProduct(
    "Product test 1",
    "Test description",
    200,
    "No image",
    "12345",
    25
);
product.addProduct(
    "Product test 1",
    "Test description",
    200,
    "Sin imagen",
    "12346",
    25
);
product.addProduct(
    "Product test 1",
    "Test description",
    200,
    "No image",
    "12347",
    25
);

product.getProducts();
product.getProducts();
product.getProductbyId(1);
