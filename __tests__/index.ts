import * as nock from "nock";
import Censys from "../src";

const endpoint = nock("https://censys.io/api/v1/");

let censys: Censys;
const censysOptions = {
  apiID: "test",
  apiSecret: "password",
};

describe("Censys Client", () => {
  beforeAll(() => {
    censys = new Censys(censysOptions);
  });

  it("throw an error if no auth options", () => {
    // @ts-ignore
    expect(() => new Censys({})).toThrow();
  });

  it("set the client properties", () => {
    expect(censys).toHaveProperty("apiID");
    expect(censys).toHaveProperty("apiSecret");
  });

  it("expose censys endpoint string", () => {
    expect(censys).toHaveProperty("endpoint");
    expect(typeof censys.endpoint).toEqual("string");
  });

  it("run the search method", (done) => {
    endpoint.post("/search/ipv4").reply(200, {});
    censys
      .search("ipv4", {
        query: "8.8.8.8",
      })
      .then((res) => {
        expect(res).toBeDefined();
        expect(res).not.toBeNull();
        done();
      });
  });

  it("run the view method", (done) => {
    endpoint.get("/view/ipv4/8.8.8.8").reply(200, {});
    censys.view("ipv4", "8.8.8.8").then((res) => {
      expect(res).toBeDefined();
      expect(res).not.toBeNull();
      done();
    });
  });

  it("run the report method", (done) => {
    endpoint.post("/report/ipv4").reply(200, {});
    censys.report("ipv4", {
      field: "location.country_code",
      query: "80.http.get.headers.server: nginx",
    }).then((res) => {
      expect(res).toBeDefined();
      expect(res).not.toBeNull();
      done();
    });
  });

  it("run the data method", (done) => {
    endpoint.get("/data").reply(200, {});
    censys.data().then((res) => {
      expect(res).toBeDefined();
      expect(res).not.toBeNull();
      done();
    });
  });

  it("run the account method", (done) => {
    endpoint.get("/account").reply(200, {});
    censys.account().then((res) => {
      expect(res).toBeDefined();
      expect(res).not.toBeNull();
      done();
    });
  });
});
