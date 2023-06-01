const request = require('supertest');
const app = require('./index'); 


describe("Test /reviews path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/reviews");
        expect(response.statusCode).toBe(200);
    });

    test("It should create a review with POST", async () => {
        const response = await request(app).post("/addReview").send({
            item_id: 1,
            name: 'Test Name',
            message: 'Test message'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Test Name');
    });
});

describe("Test /items path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/items");
        expect(response.statusCode).toBe(200);
    });

    test("It should create an item with POST", async () => {
        const response = await request(app).post("/additem").send({
            id: 1,
            name: 'Test Item',
            price: '100',
            img: 'test.jpg',
            desc: 'test description',
            quantity: 1,
            type: 'test'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Test Item');
    });
});

