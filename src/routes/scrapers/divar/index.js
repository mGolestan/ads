// @flow
import { Router as router } from "express";
import { wrap } from "async-middleware";
import { Place } from "../../../utils/city";
import fetch from "node-fetch";

import "../../../utils/city/data";

const route = router();

route.get(
  "/",
  wrap((req: express$Request, res: express$Response) => {
    const searchQuery = req.query.q;
    const DivarDefaultSearchCity = "tehran";

    let cityDetails;
    if (req.query.city) {
      cityDetails = Place.findByCitySlug(req.query.city);
    } else {
      cityDetails = Place.findByCitySlug("tehran");
    }

    if (!cityDetails) {
      return res.sendStatus(204);
    }

    const body = {
      jsonrpc: "2.0",
      method: "getPostList",
      params: [
        [[cityDetails.level, 0, [cityDetails.id]], ["query", 0, [searchQuery]]],
        0
      ]
    };

    fetch("https://search.divar.ir/json/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => {
        const priceIndexName = "v09";
        const titleIndexName = "title";
        const descIndexName = "desc";
        const tokenIndexName = "token";
        const timeStampIndexName = "lm";

        let customizedJson = [];

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
            }/contact`
          });
        });
        res.send(customizedJson);
      });
  })
);

export default route;
