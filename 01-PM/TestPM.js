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
    "No image",
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
