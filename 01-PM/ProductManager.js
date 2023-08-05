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
        ? console.log("Product found:", product) 
        : console.log("Product not found");
    }

};