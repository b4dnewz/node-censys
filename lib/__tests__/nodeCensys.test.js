import Censys from '../';
import nock from 'nock';

const endpoint = nock('https://censys.io/api/v1/');

let censys;
let censysOptions = {
  apiID: 'test',
  apiSecret: 'password'
};

describe('Censys', () => {
  it('exports a function', () => {
    expect(typeof Censys).toBe('function');
  });

  it('throw an error if no options', () => {
    expect(() => new Censys()).toThrow();
  });

  beforeAll(() => {
    censys = new Censys(censysOptions);
  });

  it('set the client properties', () => {
    expect(censys).toHaveProperty('apiID');
    expect(censys).toHaveProperty('apiSecret');
  });

  it('has the censys endpoint property', () => {
    expect(censys).toHaveProperty('endpoint');
  });

  it('run the view method', done => {
    endpoint.get('/view/ipv4/8.8.8.8').reply(200, {});
    censys.view('ipv4', '8.8.8.8').then(res => {
      expect(res).toBeDefined();
      expect(res).not.toBeNull();
      done();
    });
  });

  it('run the report method', done => {
    endpoint.post('/report/ipv4').reply(200, {});
    censys
      .report('ipv4', {
        query: 'Dell',
        field: 'location.country'
      })
      .then(res => {
        expect(res).toBeDefined();
        expect(res).not.toBeNull();
        done();
      });
  });

  it('run the data method', done => {
    endpoint.get('/data').reply(200, {});
    censys.data().then(res => {
      expect(res).toBeDefined();
      expect(res).not.toBeNull();
      done();
    });
  });
});
