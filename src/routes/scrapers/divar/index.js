// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import { debug } from "winston";
import fetch from "node-fetch";
import type { Response } from "node-fetch";
import { Place } from "../../../utils/places";
import { InternalServerError } from "../../../utils/errors";
import type { DivarAdType, DivarResponseType } from "../../../flowTypes";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) => {
    const searchQuery = req.query.q;

    let cityDetails;
    if (req.query.city) {
      cityDetails = Place.findByCitySlug(req.query.city);
    } else {
      cityDetails = Place.findByCitySlug("tehran");
    }

    if (!cityDetails) {
      return res.sendStatus(204); // eslint-disable-line no-magic-numbers
    }

    // below variable is using for divar pagination,
    // it gets the last post date and put it in the request.
    // if 0 is assigned it means that we are fetching the first page.
    const lastPostDate = req.query.lastPostDate ? req.query.lastPostDate : 0;

    const body = {
      jsonrpc: "2.0",
      method: "getPostList",
      params: [
        [[cityDetails.level, 0, [cityDetails.id]], ["query", 1, [searchQuery]]],
        Number(lastPostDate)
      ]
    };

    fetch("https://search.divar.ir/json/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then((response: Response) => response.json())
      .catch((e: Error) => {
        debug("Error encountered in Divar request", e);
        throw new InternalServerError("errorConnecting");
      })
      .then((json: DivarResponseType) => {
        if (json.error) {
          throw new InternalServerError("Divar responsed with an error");
        }

        const priceIndexName = "v09";
        const titleIndexName = "title";
        const descIndexName = "desc";
        const tokenIndexName = "token";
        const timeStampIndexName = "lm";
        const eachCrawlItems = 23;

        const customizedJson: Array<DivarAdType> = [];

        // eslint-disable-next-line flowtype/require-parameter-type
        json.result.post_list.map(post => {
          customizedJson.push({
            site: "Divar",
            title: post[titleIndexName],
            description: post[descIndexName],
            price: post[priceIndexName],
            token: post[tokenIndexName],
            timeStamp: post[timeStampIndexName],
            image: `https://s100.divarcdn.com/static/thumbnails/${
              post[timeStampIndexName]
            }/${post[tokenIndexName]}.jpg`,
            contact: `https://api.divar.ir/v1/posts/${
              post[tokenIndexName]
            }/contact`,
            url: `https://divar.ir/v/${post[tokenIndexName]}`
          });
        });
        res.send({
          version: 1.1,
          specifics: {
            divar: {
              lastPostDate: json.result.last_post_date,
              noMoreResults:
                json.result.post_list.length < eachCrawlItems ? true : false
            }
          },
          results: customizedJson
        });
      });
    return 0;
  })
);

export default route;
