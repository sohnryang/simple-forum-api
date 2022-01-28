# Simple Forum API Server

A REST API for a simple forum website.

## Features

- Users
  
  - User holds email, birthday and username.

- Posts
  
  - Posts hold title, content, and hashtags.

- Search
  
  - Posts can be searched using title, content, author username and hashtags.

- Authentication
  
  - JWT-based authentication for some operations.

## API specs

### Users

#### Create user

```
POST /users
```

##### Request body

Instance of `UserEntity`. However, the field `id` will be ignored.

##### Response body

If successful, the response body contains a newly created instance of `UserEntity`.

#### Get a user's info

```
GET /users/<user ID>
```

##### Response body

If successful, the response body contains an instance of `UserEntity` which corresponds to the given ID.

#### Update user info

```
PUT /users/<user ID>
```

##### Request body

```json
{
  "token": "{JWT token}",
  "patch": {...} // An instance of UserEntity
}
```

`patch` contains an instance of `UserEntity`. The user info will be updated according to the provided instance.

#### Delete user

```
DELETE /users/<user ID>
```

##### Request body

```json
{
  "token": "{JWT token}"
}
```

### Posts

#### Create post

```
POST /posts
```

##### Request body

```json
{
  "token": "{JWT token}",
  "post": {...} // An instance of PostEntity
}
```

`post` contains an instance of `PostEntity`. However, the field `id` will be ignored.

##### Response body

If successful, the response body contains a newly created instance of `PostEntity`.

#### List posts

```
GET /posts
```

##### Response body

TBA with pagination

#### Get a post

```
GET /posts/<post ID>
```

##### Response body

If successful, the response body contains an instance of `PostEntity` which corresponds to the given ID.

#### Update post

```
PUT /posts/<post ID>
```

##### Request body

```json
{
  "token": "{JWT token}",
  "patch": {...} // An instance of PostEntity
}
```

`patch` contains an instance of `PostEntity`. The title and content of the post will be updated according to the provided instance.

#### Delete post

```
DELETE /posts/<post ID>
```

##### Request body

```json
{
  "token": "{JWT token}"
}
```

### Search

#### Send search query

```
POST /search
```

##### Request body

```json
{
  "keyword": "keyword for search",
  "hashtags": [...] // A list of hashtags
}
```

### Comments

TBA
