# Mini Twitter API Guide

## API Routes

### /users
#### GET all users
| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/users/  | `GET`  |

Returns all users in the database as an array of objects.

#### GET one user by id

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/users/${id}  | `GET`  |

Returns user whose `user_id` matches the `${id}` provided in the URL.

**Example:**
`https://elak-mini-twitter.herokuapp.com/users/2` would return you:
```
{
  "user_id": 2,
  "username": "Jane Doe",
  "email": "jane@doe.com",
  "profile_picture": "http://placekitten.com/200/200"
}
```
#### GET all messages belonging to one user

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/users/${id}/messages  | `GET`  |

Returns all messages for a user whose `user_id` matches the `${id}` provided in the URL.

**Example:**
`https://elak-mini-twitter.herokuapp.com/users/2/messages` would return you an array, with every element being a message object:
```
[
  {
    "username": "Jane Doe",
    "user_id": 2,
    "message_id": 3,
    "message": "Trick served together birds ought Dory vest pages. There is only one Lord of the Ring.",
    "date": "2021-11-06T08:14:06.599Z",
    "image_url": "http://placekitten.com/200/200"
  }
]
```
#### POST one user

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/users/  | `POST`  |

Adds a new user to the database. Requires `username`, `email`, `password`. `profile_picture` can be left empty, and will provide `https://placedog.net/200` by default.
**Example:**
`POST`-ing this data:

```
{
	"username": "Lance Vance",
	"email": "lance@vance.com",
	"password": "qwerty",
	"profile_picture": ""
 }
```

 will return you an HTTP status code of `200` and the following data:

```
{
  "user_id": 13, //id is generated automatically
  "username": "Lance Vance",
  "email": "lance@vance.com",
  "profile_picture": "https://placedog.net/200"
}
```


### /messages
#### GET all messages
| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages/  | `GET`  |

Returns all messages in the database as an array of objects.

#### GET one message by id

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages/${id}  | `GET`  |

Returns message whose `message_id` matches the `${id}` provided in the URL.

**Example:**
`https://elak-mini-twitter.herokuapp.com/messages/2` would return you:
```
{
  "username": "Elon Musk",
  "message": "Trick served together birds ought Dory vest pages. There is only one Lord of the Ring.",
  "date": "2021-11-06T08:14:06.599Z",
  "image_url": "http://placekitten.com/200/200",
  "message_id": 2
}
```
#### POST one message

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages/  | `POST`  |

Adds a new message to the database. Requires `message`, `user_id`. `image_url` can be left empty, and will provide `https://placedog.net/200` by default. `user_id`for a message should match an actual user's `user_id`
**Example:**
`POST`-ing this data:

```
{
	"message": "Here's an example message being submitted",
	"image_url": "",
	"user_id": 4
}
```

 will return you an HTTP status code of `200` and the following data:

```
{
  "username": "John Doe", //username corresponding to the user_id
  "message": "Here's an example message being submitted",
  "date": "2021-11-06T12:07:39.507Z", //date is generated automatically
  "image_url": "https://placedog.net/200",
  "message_id": 9 //message_id is generated automatically
}
```
#### DELETE one message by id

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages/${id}  | `DELETE`  |

Deletes message whose `message_id` matches the `${id}` provided in the URL. Returns `true`
### /me
| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/me/  | `GET`  |

Returns a random user from the database.
