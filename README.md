# Simple Forum API Server

A REST API for a simple forum website.

## Features

- Users
  - User holds email, birthday and username.
- Posts
  - Posts hold title, content, and hashtags.
- Search
  - Posts can be searched using title, content, author username and hashtags.
- Authorization
  - JWT-based authorization for some operations.

## API specs

### Users

#### Create user

```
POST /users
```

##### Request body

```json
{
  "email": "...",
  "birthday": "...",
  "username": "...",
  "password": "..."
}
```

#### Get a user's info

```
GET /users/<user ID>
```

##### Response body

If successful, the response body contains email address, birthday, and username under field `email`, `birthday`, and `username` respectively.

#### Update user info

```
PATCH /users/<user ID>
```

##### Request body

```json
{
  "email": "...",
  "birthday": "...",
  "username": "...",
  "password": "..."
}
```

#### Delete user

```
DELETE /users/<user ID>
```

### Posts

#### Create post

```
POST /posts
```

##### Request body

```json
{
  "title": "...",
  "content": "...",
  "hashtags": ["...", "..."]
}
```

#### List posts

```
GET /posts
```

##### Response body

If successful, the response body contains an array of `PostEntity` instances.

TODO: add pagination

#### Get a post

```
GET /posts/<post ID>
```

##### Response body

If successful, the response body contains an instance of `PostEntity` which corresponds to the given ID.

#### Update post

```
PATCH /posts/<post ID>
```

##### Request body

```json
{
  "title": "...",
  "content": "...",
  "hashtags": ["...", "..."]
}
```

#### Delete post

```
DELETE /posts/<post ID>
```

### Search

#### Send search query

```
POST /search
```

##### Request body

```json
{
  "keyword": "...",
  "hashtags": [...], // A list of hashtags
  "author": "..."
}
```

##### Response body

If successful, the response body contains an array of `PostEntity` instances.

### Comments

#### Create comment for a post

```
POST /comments/<post ID>
```

##### Request body

```json
{
  "contents": "..."
}
```

#### Get comments for a post

```
GET /comments/<post ID>
```

##### Response body

If successful, the response body contains an array of `CommentEntity` instances.

TODO: add pagination

#### Get a single comment

```
GET /comments/<post ID>/<comment ID>
```

##### Response body

If successful, the response body contains an instance of `CommentEntity` which corresponds to the given post ID and comment ID.

#### Delete comment

```
DELETE /comments/<post ID>/<comment ID>
```

### Authentication

#### Get JWT token

```
POST /auth
```

##### Request body

```json
{
  "email": "...",
  "password": "..."
}
```

##### Response body

If successful, the response contains the generated JWT under field `token`.
