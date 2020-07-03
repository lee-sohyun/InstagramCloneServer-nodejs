## InstagramCloneServer
Node.js를 사용하는 Instagram Clone Coding 프로젝트입니다


### Getting Started
1. Clone this repository
```
git clone https://github.com/lee-sohyun/InstagramCloneServer.git
````
2. Install dependencies
```
npm install
```
3. Run the server (default server url - http://localhost:7001/ )
```
npm start
```
### APIs
#### User Route
login `[POST] /api/user`
```
{
  userId,
  password
}
```
**Description**: Server will return a JWT token as:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJpYXQiOjE1OTM1MDYyODcsImV4cCI6MTU5MzU5MjY4N30.5z9f7UKvJEsHR1dY2bvQv8p9Nydf_zefPWgpSqsDGWM"
}
```
이후에는 서버 호출 시, Authorization에 `Bearer ${token}` 형태로 담아서 전달한다.  
#### Feed Route
getFeedList `[GET] /api/feed`  
getFeedByFeedId `[GET] /api/feed/:feedId`

---
### Relation
[InstagramCloneAndroid](https://github.com/minwookH/InstagramCloneAndroid) by @minwookH
