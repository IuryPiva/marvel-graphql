const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    characters(
      offset: Int!

      limit: Int!

      nameStartsWith: String!
    ): CharactersResponse
    getCharacterById(
      id: Int
    ): Character!
  }
  type CharactersResponse {
    results: [Character!]
    offset: Int
    limit: Int
    total: Int
    count: Int
  }

  input CharacterWhereInput {
    id: Int

    name: String

    nameStartsWith: String

    modifiedSince: String

    comics: [ID!]

    series: [ID!]

    events: [ID!]

    stories: [ID!]
  }

  enum CharacterOrderBy {
    name_asc

    name_desc

    modified_asc

    modified_desc
  }

  interface MarvelNode {
    id: ID

    resourceURI: String

    thumbnail: Thumbnail

    modified: String
  }

  type Summary {
    resourceURI: String
    name: String
    role: String!
    type: String!
  }
  type SeriesSummary {
    available: Int
    collectionURI: String
    items: [Summary!]
    returned: Int
  }

  type Character implements MarvelNode {
    id: ID

    name: String

    thumbnail: Thumbnail

    description: String

    modified: String

    resourceURI: String

    urls: [MarvelUrl!]

    comics: [Comic!]

    series: SeriesSummary!

    events: [Summary!]

    stories: [Summary!]
  }

  type Thumbnail {
    path: String

    extension: String
  }

  type MarvelUrl {
    type: String

    url: String
  }

  type ComicImage {
    path: String

    extension: String
  }

  type ComicDate {
    type: String

    date: String
  }

  type ComicPrice {
    type: String

    price: Int
  }

  type TextObject {
    type: String

    language: String

    text: String
  }

  type Comic implements MarvelNode {
    id: ID

    digitalId: Int

    title: String

    issueNumber: Int

    variantDescription: String

    description: String

    modified: String

    isbn: String

    upc: String

    diamondCode: String

    ean: String

    issn: String

    format: String

    textObjects: [TextObject!]

    resourceURI: String

    urls: [MarvelUrl!]

    series: Summary

    variants: [Summary!]

    collections: [Summary!]

    collectedIssues: [Summary!]

    dates: [ComicDate!]

    prices: [ComicPrice!]

    thumbnail: Thumbnail

    images: [ComicImage!]

    characters: [Summary!]

    events: [Summary!]

    stories: [Summary!]

    creators: [Summary!]
  }
`;
