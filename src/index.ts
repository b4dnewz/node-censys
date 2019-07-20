import fetch from "node-fetch";

type SearchIndexes = "ipv4"|"websites"|"certificates";

interface IRequestRequiredParameters {
  /**
   * The query to be executed. For example, 80.http.get.headers.server: nginx.
   */
  query: string;
}

interface ISearchParameters extends IRequestRequiredParameters {
  /**
   * The page of the result set to be returned.
   */
  page?: number;

  /**
   * The fields you would like returned in the result set in "dot notation", e.g. location.country_code.
   */
  fields?: string[];

  /**
   * Format of the returned results.
   */
  flatten?: boolean;
}

interface IReportParameters extends IRequestRequiredParameters {
  /**
   * The field you are running a breakdown on in "dot notation", e.g. location.country_code.
   */
  field: string;

  /**
   * The maximum number of values to be returned in the report. Maximum: 500. Default: 50.
   */
  buckets?: number;
}

export default class Censys {

  public readonly endpoint = "https://censys.io/api/v1/";

  private readonly apiID: string;
  private readonly apiSecret: string;
  private readonly authBuffer: string;

  constructor({ apiID, apiSecret }) {
    if (!apiID || !apiSecret) {
      throw new Error("The credentials are required.");
    }
    this.apiID = apiID;
    this.apiSecret = apiSecret;
    this.authBuffer = Buffer.from(this.apiID + ":" + this.apiSecret, "utf8").toString(
      "base64",
    );
  }

  /**
   * The search endpoint allows searches against the IPv4, Alexa Top Million,
   * and Certificates indexes using the same search syntax as the main site.
   * The endpoint returns a paginated result of the most recent information we
   * know for the set of user selected fields.
   */
  public search(index: SearchIndexes, options: ISearchParameters) {
    return this.run({
      action: `search/${index}`,
      method: "POST",
      options,
    });
  }

  /**
   * The view endpoint fetches the structured data we have about a specific host,
   * website, or certificate once you know the host's IP address, website's domain,
   * or certificate's SHA-256 fingerprint.
   */
  public view(index: SearchIndexes, id: string) {
    return this.run({
      action: `view/${index}`,
      id,
    });
  }

  /**
   * The report endpoint allows you to determine the aggregate breakdown of a value for the results a query,
   * similar to the "Build Report" functionality available in the primary search interface.
   */
  public report(index, options: IReportParameters) {
    return this.run({
      action: `report/${index}`,
      method: "POST",
      options,
    });
  }

  /**
   * The data endpoint exposes metadata on raw data that can be downloaded from Censys.
   */
  public data() {
    return this.run({
      action: `data`,
    });
  }

  /**
   * The account endpoint returns information about your Censys account.
   */
  public account() {
    return this.run({
      action: `account`,
    });
  }

  /**
   * Prepare the endpoint address and call the API
   */
  private run({
    method = "GET",
    action,
    id,
    options,
  }: {
    method?: string,
    action: string,
    id?: string|number,
    options?: any,
  }) {
    let address = `${this.endpoint}${action}`;
    if (id) { address += `/${id}`; }
    return fetch(address, {
      body: JSON.stringify(options),
      headers: {
        "Authorization": `Basic ${this.authBuffer}`,
        "Content-Type": "application/json",
      },
      method,
    }).then((res) => res.json());
  }
}
