# Mini Twitter API Guide

## Table of Contents
[/users](https://github.com/Elaktrato/Mini-Twitter-Backend#users)
- [GET all users](https://github.com/Elaktrato/Mini-Twitter-Backend#get-all-users)
- [GET one user by id](https://github.com/Elaktrato/Mini-Twitter-Backend#get-one-user-by-id)
- [GET all messages belonging to one user](https://github.com/Elaktrato/Mini-Twitter-Backend#get-all-messages-belonging-to-one-user)
- [POST one user](https://github.com/Elaktrato/Mini-Twitter-Backend#post-one-user)

[/messages](https://github.com/Elaktrato/Mini-Twitter-Backend#messages)
- [GET all messages](https://github.com/Elaktrato/Mini-Twitter-Backend#get-all-messages)
- [GET one message by id](https://github.com/Elaktrato/Mini-Twitter-Backend#get-one-message-by-id)
- [POST one message](https://github.com/Elaktrato/Mini-Twitter-Backend#post-one-message)
- [DELETE one message by id](https://github.com/Elaktrato/Mini-Twitter-Backend#delete-one-message-by-id)
- [Pagination of messages](https://github.com/Elaktrato/Mini-Twitter-Backend#pagination-of-messages)

[/me - GET Random User](https://github.com/Elaktrato/Mini-Twitter-Backend#me)

## /users
### GET all users
| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/users/  | `GET`  |

Returns all users in the database as an array of objects.

### GET one user by id

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
### GET all messages belonging to one user

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
### POST one user

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


## /messages
### GET all messages
| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages/  | `GET`  |

Returns all messages in the database as an array of objects.

### GET one message by id

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
### POST one message

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
### DELETE one message by id

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages/${id}  | `DELETE`  |

Deletes message whose `message_id` matches the `${id}` provided in the URL. Returns `true`

## /me
| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/me/  | `GET`  |

Returns a random user from the database.


### Pagination of messages

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages?page=1&rows=5  | `GET`  |

This will return an array of messages with a pagination.
Using ?page in your query you can adjust from which page you are querying your messages.

So if your query is going to be:
| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages?page=1  | `GET`  |

You will get the first 10 results of the page number 1.
Which should look like this:
```
[
  {
    "username": "Elon Musk",
    "user_id": 3,
    "message_id": 2,
    "message": "Trick served together birds ought Dory vest pages. There is only one Lord of the Ring.",
    "date": "2021-11-06T08:14:06.599Z",
    "image_url": "http://placekitten.com/200/200"
  },
  {
    "username": "Jane Doe",
    "user_id": 2,
    "message_id": 3,
    "message": "Trick served together birds ought Dory vest pages. There is only one Lord of the Ring.",
    "date": "2021-11-06T08:14:06.599Z",
    "image_url": "http://placekitten.com/200/200"
  },
  {
    "username": "Elon Musk",
    "user_id": 3,
    "message_id": 4,
    "message": "Bla bla bla to be fair",
    "date": "2021-11-06T09:43:26.228Z",
    "image_url": "https://placedog.net/200"
  },
  {
    "username": "John Doe",
    "user_id": 1,
    "message_id": 5,
    "message": "And a new test message added",
    "date": "2021-11-06T09:44:45.735Z",
    "image_url": "https://placedog.net/200"
  },
  {
    "username": "John Doe",
    "user_id": 1,
    "message_id": 6,
    "message": "Another test from Radu",
    "date": "2021-11-06T11:47:53.790Z",
    "image_url": "https://placedog.net/200"
  },
  {
    "username": null,
    "user_id": null,
    "message_id": 7,
    "message": "Another test from Radu",
    "date": "2021-11-06T12:04:13.717Z",
    "image_url": "https://placedog.net/200"
  },
  {
    "username": "John Doe",
    "user_id": 4,
    "message_id": 8,
    "message": "Another test from Radu",
    "date": "2021-11-06T12:07:14.812Z",
    "image_url": "https://placedog.net/200"
  },
  {
    "username": null,
    "user_id": null,
    "message_id": 10,
    "message": "Some test message by Erik",
    "date": "2021-11-06T13:26:40.329Z",
    "image_url": "http://placekitten.com/200/200"
  },
  {
    "username": null,
    "user_id": null,
    "message_id": 11,
    "message": "another test message by Erik",
    "date": "2021-11-06T13:26:44.659Z",
    "image_url": "http://placekitten.com/200/200"
  },
  {
    "username": "Robert Whittaker",
    "user_id": 5,
    "message_id": 12,
    "message": "another test message by Erik",
    "date": "2021-11-06T13:26:56.932Z",
    "image_url": "http://placekitten.com/200/200"
  }
]
```

Using ?page=1&rows you can adjust how many messages you want to get per page.
This requires ?page to be used. Having just ?rows will be ignored and instead return you all messages.

For example, getting 5 messages per page would have a query like this:

| URL  | Method  |
| ------------ | ------------ |
| https://elak-mini-twitter.herokuapp.com/messages?page=1&rows=5  | `GET`  |

and would return you:
```
[
  {
    "username": "Elon Musk",
    "user_id": 3,
    "message_id": 2,
    "message": "Trick served together birds ought Dory vest pages. There is only one Lord of the Ring.",
    "date": "2021-11-06T08:14:06.599Z",
    "image_url": "http://placekitten.com/200/200"
  },
  {
    "username": "Jane Doe",
    "user_id": 2,
    "message_id": 3,
    "message": "Trick served together birds ought Dory vest pages. There is only one Lord of the Ring.",
    "date": "2021-11-06T08:14:06.599Z",
    "image_url": "http://placekitten.com/200/200"
  },
  {
    "username": "Elon Musk",
    "user_id": 3,
    "message_id": 4,
    "message": "Bla bla bla to be fair",
    "date": "2021-11-06T09:43:26.228Z",
    "image_url": "https://placedog.net/200"
  },
  {
    "username": "John Doe",
    "user_id": 1,
    "message_id": 5,
    "message": "And a new test message added",
    "date": "2021-11-06T09:44:45.735Z",
    "image_url": "https://placedog.net/200"
  },
  {
    "username": "John Doe",
    "user_id": 1,
    "message_id": 6,
    "message": "Another test from Radu",
    "date": "2021-11-06T11:47:53.790Z",
    "image_url": "https://placedog.net/200"
  }
]
```
