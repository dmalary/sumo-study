import { gotScraping } from 'got-scraping';
import * as fs from "fs";

import { years, bashoNum } from './constants.js';

const url = (year, bashoNum) => {
  return `https://sumodb.sumogames.de/Banzuke.aspx?b=${year}${bashoNum}#M`
}
// url() test
// console.log(url(2007, 11))

const scrape = (url, name) => {
  (async () => {
    try {
      gotScraping
        .get(url)
        .then( ({ body }) => 
          // console.log(`body`, body)

          fs.writeFileSync(`./data/pages/${name}.txt`, body)
        )
    } catch (err) {
      if (err) console.log(err.res.body)
    }
  })();
}
// scrape test
// scrape('https://sumodb.sumogames.de/Banzuke.aspx?b=200711#M', 'test')

const run = () => {
  years.map(year => 
    // console.log(`year`, year)
    bashoNum.map(basho => 
      // console.log(`basho`, basho)

      scrape(url(year, basho), `${year}-basho_${basho}`)
    )
  )
}
run()