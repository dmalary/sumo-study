import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
  async requestHandler({ request, response, body, contentType, $ }) {
      const data = [];

      // Do some data extraction from the page with Cheerio.
      $('#mw-content-text > div.mw-content-ltr.mw-parser-output > table > tbody > tr').each((index, el) => {
          data.push({ 
            name: $(el).find('td:nth-child(2)').text().trim(),
            championshipsWon: $(el).find('td:nth-child(4)').text().trim(),
            stable: $(el).find('td:nth-child(5)').text().trim(),
            promoted: $(el).find('td:nth-child(7)').text().trim(),
            retired: $(el).find('td:nth-child(8)').text().trim(),
          });
      });

      // Save the data to dataset.
      await Dataset.pushData({
          url: request.url,
          // html: body,
          data,
      })
  },
});

await crawler.run(['https://en.wikipedia.org/wiki/List_of_yokozuna']);
console.log('========== CRAWL COMPLETE ==========')