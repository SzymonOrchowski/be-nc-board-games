
# House of Games API

This is a an API for backend service dedicated to PSQL database.
It responds for specific requests and provides information to the front end architecture.

Created and tested using Node.js v16.9.1 and PostgreSQL 13.4.






## 🔗 Links

https://board-games-information-place.herokuapp.com/api

https://github.com/SzymonOrchowski/be-nc-games


## Instructions to setup the project

To check functionality of that API you can use the first link from aboves.

To check the code feel free to clone that repository from my github. Just fork it first, and clone it to your computer using: 

```http
git clone URL_TO_YOUR_FORKED_GITHUB_REPOSITORY
```

After successful cloning, you have to install all dependencies by:

```http
npm install
```

You also need to setup data base by running script setup-dbs:

```http
npm run setup-dbs
```

The last thing you will need to run tests is to create two files with environment variables (be careful and not add any semicolons at the end of each of the files!):


```http
1st FILE NAME: .env.test
1st FILE BODY: PGDATABASE=nc_games_test

2nd FILE NAME: .env.dev
2nd FILE BODY: PGDATABASE=nc_games

```

Finally you can run the test suite:

```http
npm test app
```
## API Reference

#### Get all available endpoints information

```http
  GET /api/
```

#### Get all game categories

```http
  GET /api/categories
```

#### Get all game reviews

```http
  GET /api/reviews
```

|  Queries  |   Type   | Description                                                                             |
| :-------- | :------- | :-------------------------------------------------------------------------------------- |
| `sort_by` | `string` | Name of the column to sort by. If anything passed it is sorted by the date of creation. |
| `order`   | `string` | Accepts strings 'asc' or 'desc'. Default set to desc.                                   |
| `category`| `string` | Game category name to filter results by.                                                |

#### Get review by specified review_id

```http
  GET /api/reviews/:review_id
```

|  Parameter | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `review_id`| `number` | **Required**. Id of review to fetch |

#### Update votes of review by specified review_id

```http
  PATCH /api/reviews/:review_id
```

|  Parameter | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `review_id`| `number` | **Required**. Id of review to fetch |

|    Input data    |   Type   | Description                                                                      |
| :--------------- | :------- | :------------------------------------------------------------------------------- |
| { inc_votes : 1 }| `object` | **Required**. object with key inc_votes and value of positive or negative number |

#### Get all comments for specified review

```http
  GET /api/reviews/:review_id/comments
```

|  Parameter | Type     | Description                                     |
| :--------- | :------- | :---------------------------------------------- |
| `review_id`| `number` | **Required**. Id of review to fetch comments of |

#### Post comment for specified review

```http
  POST /api/reviews/:review_id/comments
```

|  Parameter | Type     | Description                                  |
| :--------- | :------- | :------------------------------------------- |
| `review_id`| `number` | **Required**. Id of review to add comment to |

|              Input data             |   Type   | Description                                                      |
| :---------------------------------- | :------- | :----------------------------------------------------------------|
| { username : string, body : string }| `object` | **Required**. object with key:value pairs for  username and body |

#### Delete comment by comment_id

```http
  DELETE /api/comments/:comment_id
```

|  Parameter  |   Type   | Description                           |
| :---------- | :------- | :------------------------------------ |
| `comment_id`| `number` | **Required**. Id of comment to delete |


