const { RESTDataSource } = require('apollo-datasource-rest');
const crypto = require('crypto');

const publicKey = process.env.MARVEL_PUBLIC_KEY
const privateKey = process.env.MARVEL_PRIVATE_KEY

class MarvelAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://gateway.marvel.com:443/v1/public/';
  }

  async getCharacters(limit, offset, nameStartsWith) {
    let queryString = `apikey=${publicKey}`;

    queryString += "&limit=" + (limit ? limit : 20);
    queryString += offset ? `&offset=${offset}` : "";
    queryString += nameStartsWith ? `&nameStartsWith=${nameStartsWith}` : "";
  
    const ts = Date.now();
    queryString += `&ts=${ts}`;
  
    const hash = crypto.createHash('md5').update(ts+privateKey+publicKey).digest("hex");
    queryString += `&hash=${hash}`;

    const response = await this.get(`characters?${queryString}`);
    
    return response.data;
  }

  async getCharacterById(id) {
    let queryString = `apikey=${publicKey}`;
  
    const ts = Date.now();
    queryString += `&ts=${ts}`;
  
    const hash = crypto.createHash('md5').update(ts+privateKey+publicKey).digest("hex");
    queryString += `&hash=${hash}`;

    const response = await this.get(`characters/${id}?${queryString}`);
    console.log(response.data)
    return response.data.results[0];
  }
}

module.exports = {
  MarvelAPI
}
