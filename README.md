<p align="center">
  <a href="http://coshop.org/" target="blank"><img src="https://firebasestorage.googleapis.com/v0/b/handoff-cc.appspot.com/o/Ls8r4nQTWBNIDFJ4JccV%2Fbackground.png?alt=media&token=22f79832-8d0b-4fd2-bd5b-57cfc1ccd70a" width="512" alt="Logo" /></a>
</p>

# API Endpoints

## Auth

### `POST /auth/register`

Example request body
```json
{
	"username": "jas777",
	"password": "supercomplicatedpassword123",
    "email": "example@mail.com",
    "emailHidden": true,
    "newsletter": true
}
```
Example response
```json
{
    "id": "6653686549000474624",
    "username": "jas777",
    "created": "2020-04-26T22:32:16.761Z",
    "updated": "2020-04-26T22:32:16.761Z",
    "newsletter": true,
    "verified": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM2ODY1NDkwMDA0NzQ2MjQiLCJ1c2VybmFtZSI6Imphczc3NyIsImlhdCI6MTU4Nzk0MDMzMCwiZXhwIjoxNTg4NTQ1MTMwfQ.zBKlKD5iOHRr7yvE0BkZQowxe0UnxuQi0nmZqyaaUWc",
    "requests": [],
    "questions": []
}
```

### `POST /auth/login`

Example request body
```json
{
	"email": "example@mail.com",
	"password": "supercomplicatedpassword123"
}
```
Example response
```json
{
    "id": "6653686549000474624",
    "username": "jas777",
    "created": "2020-04-26T22:32:16.761Z",
    "updated": "2020-04-26T22:32:16.761Z",
    "newsletter": true,
    "verified": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM2ODY1NDkwMDA0NzQ2MjQiLCJ1c2VybmFtZSI6Imphczc3NyIsImlhdCI6MTU4Nzk0MDMzMCwiZXhwIjoxNTg4NTQ1MTMwfQ.zBKlKD5iOHRr7yvE0BkZQowxe0UnxuQi0nmZqyaaUWc"
}
```

### `GET /auth/@me`

#### Requires token in Authorization header

Example response
```json
{
    "id": "6653686549000474624",
    "username": "jas777",
    "created": "2020-04-26T22:32:16.761Z",
    "updated": "2020-04-26T22:32:16.761Z",
    "newsletter": true,
    "verified": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM2ODY1NDkwMDA0NzQ2MjQiLCJ1c2VybmFtZSI6Imphczc3NyIsImlhdCI6MTU4Nzk0MTIwNywiZXhwIjoxNTg4NTQ2MDA3fQ.vsFsoRDMZCOoxopPt2MJMDS_IUcdMEEgGPFX6dr_h_E"
}
```

## Users

### `GET /users/:id`

No request body required

Example response
```json
{
    "id": "6653686549000474624",
    "username": "jas777",
    "created": "2020-04-26T22:32:16.761Z",
    "updated": "2020-04-26T22:32:16.761Z",
    "newsletter": true,
    "verified": false,
    "requests": [],
    "questions": [],
    "responses": [],
    "products": []
}
```

### `POST /users/verify?code=`

No request body **nor** authentication required

Example response
```json
{
    "id": "6653686549000474624",
    "username": "jas777",
    "created": "2020-04-26T22:32:16.761Z",
    "updated": "2020-04-26T22:32:16.761Z",
    "newsletter": true,
    "verified": false,
    "requests": [],
    "questions": [],
    "responses": [],
    "products": []
}
```

### `POST /users/resend`

Authentication required, no request body required

**24h ratelimit!**

Example response
```json
{
    "id": "6653686549000474624",
    "username": "jas777",
    "created": "2020-04-26T22:32:16.761Z",
    "updated": "2020-04-26T22:32:16.761Z",
    "newsletter": true,
    "verified": false,
    "requests": [],
    "questions": [],
    "responses": [],
    "products": []
}
```

## Shops

### `POST /shops/new`

#### Requires token in Authorization header

Example request body
```json
{
	"name": "Walmart",
	"lat": 34.25325,
	"lon": 12.43294
}
```

Example response
```json
{
    "id": "6653693803443507200",
    "name": "Walmart",
    "lat": "34.25325",
    "lon": "12.43294",
    "created": "2020-04-26T23:01:06.376Z",
    "responses": [],
    "products": []
}
```

### `POST /shops/:id/update`

#### Requires token in Authorization header

Example request body (Can contain any property from `/new`)
```json
{
	"name": "Lidl"
}
```

Example response
```json
{
    "id": "6653693803443507200",
    "name": "Lidl",
    "lat": "34.25325",
    "lon": "12.43294",
    "created": "2020-04-26T23:01:06.376Z",
    "responses": [],
    "products": []
}
```

Note: Shops __do not__ have an `updated` propery

### `GET /shops/:id`

Does not require request body

Example response
```json
{
    "id": "6653693803443507200",
    "name": "Lidl",
    "lat": "34.25325",
    "lon": "12.43294",
    "created": "2020-04-26T23:01:06.376Z",
    "responses": [],
    "products": []
}
```

## Requests

### `POST /requests/new`

Requires token in Authorization header

Example request body *expires is nullable
```json
{
	"lat": "34.25324",
    "lon": "12.43293",
    "range": 500,
    "product": {
    	"name": "My favorite spaghetti",
    	"producer": "My favorite company"
    },
    "expires": "2020-04-26T23:17:05.069Z"
}
```

Example response
```json
{
    "lat": "34.25324",
    "lon": "12.43293",
    "range": 500,
    "expires": "2020-04-26T23:17:05.069Z",
    "product": {
        "id": "6653700529404235777",
        "name": "My favorite spaghetti",
        "producer": "My favorite company",
        "created": "2020-04-26T23:27:50.045Z"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "id": "6653700529404235776",
    "questions": [],
    "created": "2020-04-26T23:27:50.045Z"
}
```

### `POST /requests/:id/update`

Requires token in Authorization header. Must be author of the request

Example request body
```json
{
    "range": 300
}
```

Example response
```json
{
    "id": "6653700529404235776",
    "lat": "34.25324",
    "lon": "12.43293",
    "range": 300,
    "created": "2020-04-26T23:27:50.045Z",
    "expires": "2020-04-27",
    "questions": [],
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "product": {
        "id": "6653700529404235777",
        "name": "My favorite spaghetti",
        "producer": "My favorite company",
        "created": "2020-04-26T23:27:50.045Z"
    }
}
```

### `DELETE /requests/:id`

Requires token in Authorization header. Must be author of the request

Request body not required

Example response
```json
{
    "id": "6653700529404235776",
    "lat": "34.25324",
    "lon": "12.43293",
    "range": 300,
    "created": "2020-04-26T23:27:50.045Z",
    "expires": "2020-04-27",
    "questions": [],
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "product": {
        "id": "6653700529404235777",
        "name": "My favorite spaghetti",
        "producer": "My favorite company",
        "created": "2020-04-26T23:27:50.045Z"
    }
}
```

### `GET /requests/range/:range`

Example request body
```json
{
	"lat": "34.25324",
    "lon": "12.43293"
}
```

Example response
```json
[
    {
        "id": "6653700054994898944",
        "lat": "34.25324",
        "lon": "12.43293",
        "range": 500,
        "created": "2020-04-26T23:25:56.928Z",
        "expires": "2020-04-26"
    },
    {
        "id": "6653700297819934720",
        "lat": "34.25324",
        "lon": "12.43293",
        "range": 500,
        "created": "2020-04-26T23:26:54.818Z",
        "expires": "2020-04-27"
    },
    {
        "id": "6653701785799610368",
        "lat": "34.25324",
        "lon": "12.43293",
        "range": 500,
        "created": "2020-04-26T23:32:49.647Z",
        "expires": "2020-04-27"
    }
]
```

### `GET /requests/:id`

Request body not required

Example response
```json
{
    "id": "6653700529404235776",
    "lat": "34.25324",
    "lon": "12.43293",
    "range": 300,
    "created": "2020-04-26T23:27:50.045Z",
    "expires": "2020-04-27",
    "questions": [],
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "product": {
        "id": "6653700529404235777",
        "name": "My favorite spaghetti",
        "producer": "My favorite company",
        "created": "2020-04-26T23:27:50.045Z"
    }
}
```

## Questions

### `POST /questions/:request_id/new`

Requires token in Authorization header

Example request body
```json
{
	"question": "Is it available in big amounts"
}
```

Example response
```json
{
    "id": "6653925003957358592",
    "question": "Is it available in big amounts",
    "created": "2020-04-27T14:19:48.102Z",
    "request": {
        "id": "6653700054994898944",
        "lat": "34.25324",
        "lon": "12.43293",
        "range": 500,
        "created": "2020-04-26T23:25:56.928Z",
        "expires": "2020-04-26"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "answers": []
}
```

### `POST /questions/:id/update`

Requires token in Authorization header & user to be author of the question

Example request body
```json
{
	"question": "Is it available in big amounts in Walmart"
}
```

Example response
```json
{
    "id": "6653925003957358592",
    "question": "Is it available in big amounts in Walmart",
    "created": "2020-04-27T14:19:48.102Z",
    "request": {
        "id": "6653700054994898944",
        "lat": "34.25324",
        "lon": "12.43293",
        "range": 500,
        "created": "2020-04-26T23:25:56.928Z",
        "expires": "2020-04-26"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "answers": []
}
```

### `GET /questions/:id`

Request body not required

Example response
```json
{
    "id": "6653925003957358592",
    "question": "Is it available in big amounts in Walmart",
    "created": "2020-04-27T14:19:48.102Z",
    "request": {
        "id": "6653700054994898944",
        "lat": "34.25324",
        "lon": "12.43293",
        "range": 500,
        "created": "2020-04-26T23:25:56.928Z",
        "expires": "2020-04-26"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "answers": []
}
```

### `DELETE /questions/:id`

Requires token in Authorization header & user to be author of the question

Request body not required

Example response
```json
{
    "id": "6653925003957358592",
    "question": "Is it available in big amounts in Walmart",
    "created": "2020-04-27T14:19:48.102Z",
    "request": {
        "id": "6653700054994898944",
        "lat": "34.25324",
        "lon": "12.43293",
        "range": 500,
        "created": "2020-04-26T23:25:56.928Z",
        "expires": "2020-04-26"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "answers": []
}
```

## Responses

### `POST /responses/:shop_id/new`

Requires token in Authorization header

Example request body
```json
{
    "content": "It is available in big amounts in Lidl",
	"question_id": "6653925003957358592"
}
```

Example response
```json
{
    "id": "6653927685325574144",
    "content": "It is available in big amounts in Lidl",
    "shop": {
        "id": "6653693803443507200",
        "name": "Lidl",
        "lat": "34.25325",
        "lon": "12.43294",
        "created": "2020-04-26T23:01:06.376Z"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "question": {
        "id": "6653925003957358592",
        "question": "Is it available in big amounts in Walmart",
        "created": "2020-04-27T14:19:48.102Z"
    }
}
```

### `POST /responses/:id/update`

Requires token in Authorization header & user to be author of the response

Example request body
```json
{
    "content": "It's available in big amounts in Lidl"
}
```

Example response
```json
{
    "id": "6653927685325574144",
    "content": "It's available in big amounts in Lidl",
    "shop": {
        "id": "6653693803443507200",
        "name": "Lidl",
        "lat": "34.25325",
        "lon": "12.43294",
        "created": "2020-04-26T23:01:06.376Z"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "question": {
        "id": "6653925003957358592",
        "question": "Is it available in big amounts in Walmart",
        "created": "2020-04-27T14:19:48.102Z"
    }
}
```

### `GET /responses/:id`

Requires token in Authorization header & user to be author of the response

Request body not required

Example response
```json
{
    "id": "6653927685325574144",
    "content": "It's available in big amounts in Lidl",
    "shop": {
        "id": "6653693803443507200",
        "name": "Lidl",
        "lat": "34.25325",
        "lon": "12.43294",
        "created": "2020-04-26T23:01:06.376Z"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "question": {
        "id": "6653925003957358592",
        "question": "Is it available in big amounts in Walmart",
        "created": "2020-04-27T14:19:48.102Z"
    }
}
```

### `DELETE /responses/:id`

Requires token in Authorization header & user to be author of the response

Request body not required

Example response
```json
{
    "id": "6653927685325574144",
    "content": "It's available in big amounts in Lidl",
    "shop": {
        "id": "6653693803443507200",
        "name": "Lidl",
        "lat": "34.25325",
        "lon": "12.43294",
        "created": "2020-04-26T23:01:06.376Z"
    },
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    },
    "question": {
        "id": "6653925003957358592",
        "question": "Is it available in big amounts in Walmart",
        "created": "2020-04-27T14:19:48.102Z"
    }
}
```

## Products

### `POST /products/:shop_id/new`

#### Products are auto-created when creating a request

Requires token in Authorization header

Example request body
```json
{
    "name": "A Cheesecake",
    "producer": "A cheesecake producer"
}
```

Example response
```json
{
    "id": "6653955137154306048",
    "name": "A Cheesecake",
    "producer": "A cheesecake producer",
    "created": "2020-04-27T16:19:32.344Z",
    "shops": [
        {
            "id": "6653693803443507200",
            "name": "Lidl",
            "lat": "34.25325",
            "lon": "12.43294",
            "created": "2020-04-26T23:01:06.376Z"
        }
    ],
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    }
}
```

### `POST /products/:id/update`

Requires token in Authorization header & user to be author of the product

Example request body
```json
{
    "name": "A Brownie"
}
```

Example response
```json
{
    "id": "6653955137154306048",
    "name": "A Brownie",
    "producer": "A cheesecake producer",
    "created": "2020-04-27T16:19:32.344Z",
    "shops": [
        {
            "id": "6653693803443507200",
            "name": "Lidl",
            "lat": "34.25325",
            "lon": "12.43294",
            "created": "2020-04-26T23:01:06.376Z"
        }
    ],
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    }
}
```

### `GET /product/:id`

Requires token in Authorization header & user to be author of the product

Request body not required

Example response
```json
{
    "id": "6653955137154306048",
    "name": "A Brownie",
    "producer": "A cheesecake producer",
    "created": "2020-04-27T16:19:32.344Z",
    "shops": [
        {
            "id": "6653693803443507200",
            "name": "Lidl",
            "lat": "34.25325",
            "lon": "12.43294",
            "created": "2020-04-26T23:01:06.376Z"
        }
    ],
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    }
}
```

### `DELETE /responses/:id`

Requires token in Authorization header & user to be author of the product

Request body not required

Example response
```json
{
    "id": "6653955137154306048",
    "name": "A Brownie",
    "producer": "A cheesecake producer",
    "created": "2020-04-27T16:19:32.344Z",
    "shops": [
        {
            "id": "6653693803443507200",
            "name": "Lidl",
            "lat": "34.25325",
            "lon": "12.43294",
            "created": "2020-04-26T23:01:06.376Z"
        }
    ],
    "author": {
        "id": "6653686549000474624",
        "username": "jas777",
        "created": "2020-04-26T22:32:16.761Z",
        "updated": "2020-04-26T22:32:16.761Z"
    }
}
```
