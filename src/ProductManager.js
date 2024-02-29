/*const fs = require('fs').promises;

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async loadProductsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveProductsToFile(products) {
        const data = JSON.stringify(products, null, 2);
        await fs.writeFile(this.path, data);
    }

    async getProducts() {
        const products = await this.loadProductsFromFile();
        return products;
    }

    async addProduct(productData) {
        const products = await this.loadProductsFromFile();
        const newProduct = new Product(...productData);
        newProduct.id = this.generateUniqueId(products);
        products.push(newProduct);
        await this.saveProductsToFile(products);
        return newProduct.id;
    }

    async getProductById(productId) {
        const products = await this.loadProductsFromFile();
        const product = products.find((product) => product.id === productId);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }

    async updateProduct(productId, updatedFields) {
        let products = await this.loadProductsFromFile();
        const index = products.findIndex((product) => product.id === productId);
        if (index === -1) {
            throw new Error("Producto no encontrado.");
        }
        
        products[index] = { ...products[index], ...updatedFields };
        await this.saveProductsToFile(products);
    }

    async deleteProduct(productId) {
        let products = await this.loadProductsFromFile();
        const index = products.findIndex((product) => product.id === productId);
        if (index === -1) {
            throw new Error("Producto no encontrado.");
        }
        products.splice(index, 1);
        await this.saveProductsToFile(products);
    }

    generateUniqueId(products) {
        let id;
        do {
            id = Math.random().toString(36).substring(2, 9);
        } while (products.some((product) => product.id === id));
        return id;
    }
}

// Generacion de productos para products.json
async function runTests() {
    const manager = new ProductManager("products.json");

    let products = await manager.getProducts();

    for (let i = 1; i <= 3; i++) {
        const id = await manager.addProduct([
            `Producto ${i}`,
            `Descripción ${i}`,
            100 * i,
            `thumbnail_${i}.jpg`,
            `code_${i}`,
            10 * i
        ]);
    }

    products = await manager.getProducts();

    for (let i = 0; i < 3; i++) {
        const productId = products[i].id;
        await manager.deleteProduct(productId);
        
    }

    products = await manager.getProducts();
}

runTests();


module.exports = ProductManager;
*/


const fs = require('fs').promises;

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async loadProductsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveProductsToFile(products) {
        const data = JSON.stringify(products, null, 2);
        await fs.writeFile(this.path, data);
    }

    async getProducts(limit) {
        const products = await this.loadProductsFromFile();
        if (limit) {
            return products.slice(0, limit);
        } else {
            return products;
        }
    }

    async addProduct(productData) {
        const products = await this.loadProductsFromFile();
        const newProduct = new Product(...productData);
        newProduct.id = this.generateUniqueId(products);
        products.push(newProduct);
        await this.saveProductsToFile(products);
        return newProduct.id;
    }

    async getProductById(productId) {
        const products = await this.loadProductsFromFile();
        const product = products.find((product) => product.id === productId);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }

    async updateProduct(productId, updatedFields) {
        let products = await this.loadProductsFromFile();
        const index = products.findIndex((product) => product.id === productId);
        if (index === -1) {
            throw new Error("Producto no encontrado.");
        }
        
        products[index] = { ...products[index], ...updatedFields };
        await this.saveProductsToFile(products);
    }

    async deleteProduct(productId) {
        let products = await this.loadProductsFromFile();
        const index = products.findIndex((product) => product.id === productId);
        if (index === -1) {
            throw new Error("Producto no encontrado.");
        }
        products.splice(index, 1);
        await this.saveProductsToFile(products);
    }

    generateUniqueId(products) {
        let id;
        do {
            id = Math.random().toString(36).substring(2, 9);
        } while (products.some((product) => product.id === id));
        return id;
    }
}

// Generacion de productos para products.json
async function runTests() {
    const manager = new ProductManager("products.json");

    let products = await manager.getProducts();

    for (let i = 1; i <= 3; i++) {
        const id = await manager.addProduct([
            `Producto ${i}`,
            `Descripción ${i}`,
            100 * i,
            `thumbnail_${i}.jpg`,
            `code_${i}`,
            10 * i
        ]);
    }

    products = await manager.getProducts();

    for (let i = 0; i < 3; i++) {
        const productId = products[i].id;
        await manager.deleteProduct(productId);
        
    }

    products = await manager.getProducts();
}

runTests();


module.exports = ProductManager;
