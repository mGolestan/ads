// @flow
import request from "request";
import cheerio from "cheerio";
import type { SheypoorItemsType } from "../../../flowTypes";

const scrape = (url: string, resolve: *) => {
  const json: Array<SheypoorItemsType> = [];

  request(url, (error: Error, response: Response, html: *) => {
    if (!error) {
      const $ = cheerio.load(html);

      $(".serp-item").filter(function() {
        const data = $(this); // eslint-disable-line

        const image = data.find($(".item-image img")).attr("src");
        const title = data
          .children()
          .last()
          .children()
          .first()
          .next()
          .text()
          .trim();
        const postUrl = data
          .children()
          .last()
          .children()
          .first()
          .next()
          .children()
          .first()
          .attr("href");
        const token = data
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
          site: "Sheypoor",
          title,
          image,
          location,
          price,
          token,
          url: postUrl,
          contact: `https://www.sheypoor.com/api/web/listings/${token}/number`
        });
      });
    }

    resolve(json);
  });
};

export default scrape;
