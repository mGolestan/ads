// @flow
import request from "request";
import cheerio from "cheerio";

type SheypoorItemsType = {
  item: string,
  price: string,
  location: string,
  image: string,
  dataSaveItem: number
};
const scrape = (url: string, resolve: Function) => {
  request(url, (error, response, html) => {
    if (!error) {
      var $ = cheerio.load(html);

      var json = [];

      $(".serp-item").filter(function() {
        var data = $(this);

        const image = data.find($(".item-image img")).attr("src");
        const title = data
          .children()
          .last()
          .children()
          .first()
          .next()
          .text()
          .trim();
        const dataSaveItem = data
          .children()
          .last()
          .children()
          .first()
          .data("save-item");
        const location = data
          .children()
          .last()
          .children()
          .first()
          .next()
          .next()
          .text()
          .trim();
        const price = data
          .children()
          .last()
          .children()
          .first()
          .next()
          .next()
          .next()
          .first()
          .text()
          .trim();

        json.push({
          title,
          image,
          location,
          price,
          dataSaveItem
        });
      });
    }

    resolve(json);
  });
};

export default scrape;
