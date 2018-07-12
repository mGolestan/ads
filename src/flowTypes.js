// @flow

/*************************
 ***** SheypoorTypes *****
 *************************/

export type SheypoorItemsType = {
  site: string,
  title: string,
  price: string,
  location: string,
  image: string,
  dataSaveItem: number
};

/************************
 ****** DivarTypes ******
 ************************/

export type DivarAdType = {
  site: string,
  title: string,
  description: string,
  price: number,
  timeStamp: number,
  image: string,
  contact: string,
  token: string
};

export type DivarResponseType = {
  error?: string,
  result: {
    post_list: Array<{
      title: string,
      desc: string,
      v09: number,
      token: string,
      lm: number
    }>
  }
};
