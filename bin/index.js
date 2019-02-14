#!/usr/bin/env node

/* eslint-disable no-console */

const { version } = require('../package.json');
const program = require('commander');
const Censys = require('../build/censys');

let censys;

program
  .name('censys')
  .version(version)
  .option('--api-id <id>', 'The Censys Api ID obtained in your account page.')
  .option(
    '--api-secret <secret>',
    'The Censys Api Secret obtained in your account page.'
  );

// Search endpoint
program
  .command('search <index> <query>')
  .description(
    'Searches against Censys indexes using the same search syntax as the main site.'
  )
  .option(
    '-p, --page <number>',
    'The Censys Api ID obtained in your account page.',
    parseInt
  )
  .option('-f, --fields <fields>', 'The Censys Api ID obtained in your account page.')
  .option('-N, --no-flatten', 'The Censys Api ID obtained in your account page.')
  .action((index, query, options) => {
    censys = new Censys({
      apiID: process.env.CENSYS_ID || program.apiId,
      apiSecret: process.env.CENSYS_SECRET || program.apiSecret
    });
    censys
      .search(index, query, {
        flatten: options.flatten,
        page: options.page,
        fields: options.fields
      })
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  });

// View endpoint
program
  .command('view <index> <id>')
  .description(
    'Fetches the structured data about a specific host, website, or certificate by host IP address,'
  )
  .action((index, id) => {
    censys = new Censys({
      apiID: process.env.CENSYS_ID || program.apiId,
      apiSecret: process.env.CENSYS_SECRET || program.apiSecret
    });
    censys
      .view(index, id)
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  });

// Report endpoint
program
  .command('report <index> <query> <field>')
  .description('Determine the aggregate breakdown of a value for the results a query.')
  .option('-l, --limit [number]', 'The maximum number to return', 50)
  .action((index, query, field, options) => {
    censys = new Censys({
      apiID: process.env.CENSYS_ID || program.apiId,
      apiSecret: process.env.CENSYS_SECRET || program.apiSecret
    });
    censys
      .report(index, {
        query,
        field,
        buckets: options.limit
      })
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  });

// Data endpoint
program
  .command('data')
  .description('Exposes metadata on raw data that can be downloaded from Censys.')
  .action(() => {
    censys = new Censys({
      apiID: process.env.CENSYS_ID || program.apiId,
      apiSecret: process.env.CENSYS_SECRET || program.apiSecret
    });
    censys
      .data()
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  });

// Data endpoint
program
  .command('account')
  .description('The account endpoint returns information about your Censys account.')
  .action(() => {
    censys = new Censys({
      apiID: process.env.CENSYS_ID || program.apiId,
      apiSecret: process.env.CENSYS_SECRET || program.apiSecret
    });
    censys
      .account()
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
      });
  });

program.parse(process.argv);
