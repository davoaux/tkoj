<div align='center'>
  <h1>TKOJ</h1>
</div>

Simple markdown editor with live preview

I built this essentially to further my knowledge on different technologies

![screenshot](./assets/screenshot0.png)

## Usage

You can run this project using **docker** and **docker compose**.

The next environment variables will be required on the **server** service:

```dosini
MONGODB_URI="Your mongodb server URI"
JWT_SECRET="Your JWT secret key"
```
You can use any method you'd preffer, such as:

- In the `docker-compose.yml` file
- Adding in the `server` directory a `.env` file
- Manually setting the environment variables in your machine

#### Requirements:

- Node.js
- npm
- ruby
- bundle

## Build with

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Sinatra](http://sinatrarb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
