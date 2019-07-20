#!/usr/bin/env node

// tslint:disable:no-console no-var-requires

import * as program from "commander";
import Censys from "./index";
const {version} = require("../package.json");

const log = (data: any) => {
  console.log(JSON.stringify(data, null, 2));
};

const logErr = (data: any) => {
  console.error(JSON.stringify(data, null, 2));
};

const createInstance = (p) => {
  return new Censys({
    apiID: p.apiId || process.env.CENSYS_ID,
    apiSecret: p.apiSecret || process.env.CENSYS_SECRET,
  });
};

let inst: Censys;

program
  .name("censys")
  .version(version)
  .option("--api-id <id>", "The Censys Api ID obtained in your account page.")
  .option(
    "--api-secret <secret>",
    "The Censys Api Secret obtained in your account page.",
  );

program
  .command("search <index> <query>")
  .description(
    "Searches against Censys indexes using the same search syntax as the main site.",
  )
  .option(
    "-p, --page <number>",
    "The Censys Api ID obtained in your account page.",
    parseInt,
  )
  .option("-f, --fields <fields>", "The Censys Api ID obtained in your account page.")
  .option("-N, --no-flatten", "The Censys Api ID obtained in your account page.")
  .action((index, query, options) => {
    inst = createInstance(program);
    inst
      .search(index, {
        fields: options.fields,
        flatten: options.flatten,
        page: options.page,
        query,
      })
      .then((res) => {
        log(res);
      })
      .catch((err) => {
        logErr(err);
      });
  });

program
  .command("view <index> <id>")
  .description(
    "Fetches the structured data about a specific host, website, or certificate by host IP address,",
  )
  .action((index, id) => {
    inst = createInstance(program);
    inst
      .view(index, id)
      .then((res) => {
        log(res);
      })
      .catch((err) => {
        logErr(err);
      });
  });

program
  .command("report <index> <query> <field>")
  .description("Determine the aggregate breakdown of a value for the results a query.")
  .option("-l, --limit [number]", "The maximum number to return", 50)
  .action((index, query, field, options) => {
    inst = createInstance(program);
    inst
      .report(index, {
        buckets: options.limit,
        field,
        query,
      })
      .then((res) => {
        log(res);
      })
      .catch((err) => {
        logErr(err);
      });
  });

program
  .command("data")
  .description("Exposes metadata on raw data that can be downloaded from Censys.")
  .action(() => {
    inst = createInstance(program);
    inst
      .data()
      .then((res) => {
        log(res);
      })
      .catch((err) => {
        logErr(err);
      });
  });

program
  .command("account")
  .description("The account endpoint returns information about your Censys account.")
  .action(() => {
    inst = createInstance(program);
    inst
      .account()
      .then((res) => {
        log(res);
      })
      .catch((err) => {
        logErr(err);
      });
  });

program.parse(process.argv);
