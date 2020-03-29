# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. [Covered in the course]
2. [The RestAPI Backend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-restapi), a Node-Express server which can be deployed to a cloud service. [Covered in the course]
3. [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images. [Your assignment]

## Tasks

### Setup Node Environment

1. Install dependencies: `npm install`
2. Run the development server with `npm run dev`
3. Check requests with [Postman collection](./cloud-cdnd-c2-final.postman_collection.json)

### Building deployment package

```
npm run build
```

### Deployment

```
eb create
eb deploy
```

### Check running status
*  [Elastic Beanstalk Link](http://udagram-image-filtering-microservice-dev.eu-central-1.elasticbeanstalk.com)
*  [deployment_screenshot](./deployment_screenshots/deployment_screenshot.png)
