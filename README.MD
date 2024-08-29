Url shortener
##### Tools: Node.js, Express.js, Mongoose (ODM), TypeScript

Install dependecies: `npm install`
Run application: `npm run dev`

*For simplicity, uuid was used to created short paths. TODO: Edit method later*

### Create a short url
Path: http://localhost:3001/
Method: POST
Request Body : JSON
```
{
    "url": "https://www.linkedin.com/school/california-state-university-los-angeles/posts/?feedView=all"
}
```
Response : JSON
```
{
    "success": true,
    "status_code": 201,
    "status_message": "Shortened url",
    "data": {
        "shortUrl": "http://localhost:3001/ef96781e-9282-43d9-b0d4-973d67d36f78"
    }
}
```

### Redirect to original url using short url
Path: http://localhost:3001/ef96781e-9282-43d9-b0d4-973d67d36f78
If short url exist, server will redirect to original url site


#### Jesse Rodriguez-Avila 👋🏽