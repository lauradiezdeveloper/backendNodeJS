export default class Product {
    constructor (title, description, price, thumbnail, code, stock) {
        this.title = title,
        this.description= description,
        this.price= price,
        this.thumbnail= thumbnail,
        this.code= code,
        this.stock= stock,
        this.id = Product.increaseId()
    };

    // id autoincremental añadido por la clase Product
    static increaseId() {
        if(this.idIncrement) {
            this.idIncrement++
        }else{
            this.idIncrement = 1
        }
        return this.idIncrement
    };
};