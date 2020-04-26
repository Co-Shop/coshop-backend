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
	"email": "example@mail.com"
}
```
Example response
```json
{
    "id": "6653686549000474624",
    "username": "jas777",
    "created": "2020-04-26T22:32:16.761Z",
    "updated": "2020-04-26T22:32:16.761Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM2ODY1NDkwMDA0NzQ2MjQiLCJ1c2VybmFtZSI6Imphczc3NyIsImlhdCI6MTU4Nzk0MDMzMCwiZXhwIjoxNTg4NTQ1MTMwfQ.zBKlKD5iOHRr7yvE0BkZQowxe0UnxuQi0nmZqyaaUWc",
    "requests": [],
    "questions": []
}
```

### `POST /auth/login`

Example request body
```json
{
	"username": "jas777",
	"password": "supercomplicatedpassword123",
	"email": "example@mail.com"
}
```
Example response
```json
{
    "id": "6653686549000474624",
    "username": "jas777",
    "created": "2020-04-26T22:32:16.761Z",
    "updated": "2020-04-26T22:32:16.761Z",
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