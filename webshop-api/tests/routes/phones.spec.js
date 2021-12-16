const chai = require('chai');  
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style

const phones = require('../../routes/phones');

describe("Phones.js unit tests", function() {
    it("correctly gets the phones by brand - false case", function(){
        var item = {
            "name":"Galaxy A12",
            "brand":"Samsung",
            "operating_system":"Android",
            "price":899,
            "discount":0,
            "quantity":2000,
            "availability_date":"2020-11-24",
            "rating":4,
            "image":"toppng.com-samsung-phone-833x870.png"
         };
        var brand = ["Apple"];
        expect(phones.getProductsByBrand(item,brand)).to.equal(false);
    });
    it("correctly gets the phones by brand - true case", function(){
        var item = {
            "name":"Galaxy A12",
            "brand":"Samsung",
            "operating_system":"Android",
            "price":899,
            "discount":0,
            "quantity":2000,
            "availability_date":"2020-11-24",
            "rating":4,
            "image":"toppng.com-samsung-phone-833x870.png"
         };
        var brand = ["Apple","Samsung"];
        expect(phones.getProductsByBrand(item,brand)).to.equal(true);
    });
    it("correctly gets the phones by os - true case", function(){
        var item = {
            "name":"Galaxy A12",
            "brand":"Samsung",
            "operating_system":"Android",
            "price":899,
            "discount":0,
            "quantity":2000,
            "availability_date":"2020-11-24",
            "rating":4,
            "image":"toppng.com-samsung-phone-833x870.png"
         };
        var os = ["Android"];
        expect(phones.getProductsByOS(item,os)).to.equal(true);
    });
    it("correctly gets the phones by os - false case", function(){
        var item = {
            "name":"Galaxy A12",
            "brand":"Samsung",
            "operating_system":"Android",
            "price":899,
            "discount":0,
            "quantity":2000,
            "availability_date":"2020-11-24",
            "rating":4,
            "image":"toppng.com-samsung-phone-833x870.png"
         };
        var os = ["iOS"];
        expect(phones.getProductsByOS(item,os)).to.equal(false);
    });
    it("correctly search the phones by brand", function(){
        var item = {
            "name":"Galaxy A12",
            "brand":"Samsung",
            "operating_system":"Android",
            "price":899,
            "discount":0,
            "quantity":2000,
            "availability_date":"2020-11-24",
            "rating":4,
            "image":"toppng.com-samsung-phone-833x870.png"
         };
        var searchValue = "sam";
        expect(phones.searchProducts(item,searchValue)).to.equal(true);
    });
})