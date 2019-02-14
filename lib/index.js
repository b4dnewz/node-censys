'use strict';

import fetch from 'node-fetch';

export default class Censys {
  constructor({ apiID, apiSecret }) {
    if (!apiID || !apiSecret) {
      throw new Error('The credentials are required.');
    }
    this.endpoint = 'https://censys.io/api/v1/';
    this.apiID = apiID;
    this.apiSecret = apiSecret;
    this.authBuffer = Buffer.from(this.apiID + ':' + this.apiSecret, 'utf8').toString(
      'base64'
    );
  }

  /**
   * Prepare the endpoint address and call the API
   */
  run({ method = 'GET', action, id, options, callback = () => {} }) {
    let address = `${this.endpoint}${action}`;
    if (id) address += `/${id}`;
    return fetch(address, {
      method,
      body: JSON.stringify(options),
      headers: {
        Authorization: `Basic ${this.authBuffer}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(callback)
      .then(res => {
        callback(null, res);
        return res;
      });
  }

  /**
   * The search endpoint allows searches against the IPv4, Alexa Top Million,
   * and Certificates indexes using the same search syntax as the main site.
   * The endpoint returns a paginated result of the most recent information we
   * know for the set of user selected fields.
   */
  search(index = 'ipv4', query, options = {}, callback) {
    return this.run({
      method: 'POST',
      action: `search/${index}`,
      options: Object.assign(options, { query }),
      callback
    });
  }

  /**
   * The view endpoint fetches the structured data we have about a specific host,
   * website, or certificate once you know the host's IP address, website's domain,
   * or certificate's SHA-256 fingerprint.
   */
  view(index = 'ipv4', id, callback) {
    return this.run({
      action: `view/${index}`,
      id,
      callback
    });
  }

  /**
   * The report endpoint allows you to determine the aggregate breakdown of a value for the results a query,
   * similar to the "Build Report" functionality available in the primary search interface.
   */
  report(index = 'ipv4', options = {}, callback) {
    return this.run({
      method: 'POST',
      action: `report/${index}`,
      options,
      callback
    });
  }

  /**
   * The data endpoint exposes metadata on raw data that can be downloaded from Censys.
   */
  data(callback) {
    return this.run({
      action: `data`,
      callback
    });
  }

  /**
   * The account endpoint returns information about your Censys account.
   */
  account(callback) {
    return this.run({
      action: `account`,
      callback
    });
  }
}
