import fetch from "node-fetch";
export default class Censys {
    constructor({ apiID, apiSecret }) {
        this.endpoint = "https://censys.io/api/v1/";
        if (!apiID || !apiSecret) {
            throw new Error("The credentials are required.");
        }
        this.apiID = apiID;
        this.apiSecret = apiSecret;
        this.authBuffer = Buffer.from(this.apiID + ":" + this.apiSecret, "utf8").toString("base64");
    }
    /**
     * The search endpoint allows searches against the IPv4, Alexa Top Million,
     * and Certificates indexes using the same search syntax as the main site.
     * The endpoint returns a paginated result of the most recent information we
     * know for the set of user selected fields.
     */
    search(index, options) {
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
    view(index, id) {
        return this.run({
            action: `view/${index}`,
            id,
        });
    }
    /**
     * The report endpoint allows you to determine the aggregate breakdown of a value for the results a query,
     * similar to the "Build Report" functionality available in the primary search interface.
     */
    report(index, options) {
        return this.run({
            action: `report/${index}`,
            method: "POST",
            options,
        });
    }
    /**
     * The data endpoint exposes metadata on raw data that can be downloaded from Censys.
     */
    data() {
        return this.run({
            action: `data`,
        });
    }
    /**
     * The account endpoint returns information about your Censys account.
     */
    account() {
        return this.run({
            action: `account`,
        });
    }
    /**
     * Prepare the endpoint address and call the API
     */
    run({ method = "GET", action, id, options, }) {
        let address = `${this.endpoint}${action}`;
        if (id) {
            address += `/${id}`;
        }
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
