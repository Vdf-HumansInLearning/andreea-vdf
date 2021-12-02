const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../appbackup");
let course = require("../app");
const should = chai.should();

chai.use(chaiHttp);

// describe("Courses", function () {
//   describe("GET ALL", function () {
//     it("should get all first", (done) => {
//       console.log("GET all.");
//       chai
//         .request(server)
//         .get("/")
//         .send({})
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
// });

describe("Get ops", function () {
  it("get course by id", () => {
    chai
      .request(course)
      .get("/course/1")
      .end((err, res) => {
        expect(res.body.name).to.be.equal("mocha");
        expect(res.body.id).to.be.equal("1");
      });
  });
  

  it("get courses", () => {
    chai
      .request(course)
      .get("/courses")
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.name).to.be.equal("api testing");
      });
  });

  it("get courses with query params", ()=> {
      chai
      .request(course)
      .get("/course")
      .query({'name':'Guitar course'})
      .end((err, res)=> {
          expect(res.body.name).to.be.equal("Guitar course");
      })
  })

  describe("Post OPS", () => {
      chai
      .request(course)
      .post('/course')
      .send({id:'2', name:'Christmas post'})
      .set('Accept', 'application/json')
      .end((err, res) => {
          expect(res.body.id).to.be.equal('2');
      })
  });

});
