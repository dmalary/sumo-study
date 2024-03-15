import fs from 'fs';
import cheerio from 'cheerio';

import { years, bashoNum } from './constants.js';

let data = [];

const writeFile = (name, datum) => {
  fs.writeFileSync(`./data/json/${name}.json`, JSON.stringify(datum));
  console.log(`writeFile complete for: ${name}`);
}

const parseData = () => {
  // years.map( year => 
  //   bashoNum.map(basho => build(year, basho))
  // );
  build(2008, 11)
  console.log(`data.length`, data.length);
  writeFile('sumo-2000_2023', data);
}

const build = (year, basho) => {
  // console.log(`year + bahso`, year, basho)

  const content = fs.readFileSync(`./data/pages/${year}-basho_${basho}.txt`)

  const $ = cheerio.load(content);

  // const queryEl = $('div:nth-child(1) > div > table > tbody > tr > td.layoutright > table:nth-child(6) > tbody > tr');
  const queryEl = $('.layoutright > table:nth-child(6) > tbody > tr:nth-child(1)');

  // console.log(`typeof queryEl`, typeof queryEl);
  // console.log(`queryEl`, queryEl);
  console.log('rank', $(queryEl).find('td:nth-child(3)').text())

  // queryEl.each((i, el) => {
  //   const ranks = {};

  //   // year & basho
  //   ranks.year = year;
  //   ranks.basho = basho;
  //   // rank
  //   ranks.rank = $(el).find('td:nth-child(3)')
  //   // console.log('rank', $(el).find('td:nth-child(3)'))
  //   // name 1
  //   // console.log(`shikona`, $(el).find('td:nth-child(2)'))
  //   // // record 1
  //   // console.log(`record`, $(el).find('td:nth-child(1)'))
  //   //  // rank
  //   //  console.log('rank', $(el).find('td.short_rank').text())
  //   // // name 2
  //   // console.log(`shikona`, $(el).find('td:nth-child(4)'))
  //   // // record 2
  //   // console.log(`record`, $(el).find('td:nth-child(5)'))

  //   data.push(ranks)
  // })
}
parseData()