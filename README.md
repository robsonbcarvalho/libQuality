# LibQuality Test

Author: Robson Bezerra Carvalho
[Linkedin](https://www.linkedin.com/in/robson-carvalho-77959238/)

Requirements:

* Node.js 10+
* MongoDB or Docker-Compose

## Running the application locally

### Install dependencies

```bash
npm install
```

### MongoDB configuration

If runing the application locally, please configure the MongoDB's host and port in the **.env** file located in the project's root folder, so the environment variables will be loaded by the application.

### Running the application

```bash
npm start
```

```bash
MONGODB_HOST=mongo
MONGODB_PORT=27017
```

## Running the application in Docker

### Build images

```bash
docker-compose build
```

### Running the application (docker-compose)

```bash
docker-compose up
```

## Unit test

### Running the unit tests

```bash
npm test
```

### Code Coverage Report

After run the unit tests, the coverage report will be showed in the console and remain stored in the coverage root folder. For your convenience the coverage report could be viewed in your web browser too, using the following address:

{path_to_source_folder}/lib-quality/coverage/index.html

## Swagger

The swagger is generated automatically for the issues statistics endpoint when the application is running and will be available in the following endpoint:

```bash
http://localhost:3000/api-docs
```

This page is a Swagger UI that shows API documentation and allows you to perform the operation to retrieve the data.

## Collect Issues

To collect lib's issues from Github, use the following endpoint:

``` shell
GET /collect_issues?repository_owner={repository_name}&repository_name={repository_name}
```

Sample request to collect Facebook/React issues (https://github.com/facebook/react):

``` shell
curl -X GET http://localhost:3000/collect_issues?repository_owner=facebook&repository_name=react
```

* If you are running the application in Docker, please change the localhost by the docker address.

Success Respose:

``` json
{
    "lib": "react",
    "openIssues": 456
}
```

## View Issues Statistics

To view issues statistics previous collected from Github, use the following endpoit:

### View isseus statistics of all libs

``` shell
GET /api/v1/issues
```

Sample request to retrieve the statistics:

``` shell
curl -X GET http://localhost:3000/api/v1/issues
```

* If you are running the application in Docker, please change the localhost by the docker address.

Success Response:

``` json
[
    {
        "lib": "react",
        "issues": 456,
        "avgAge": 619,
        "stdAge": 536,
        "ageUnit": "d"
    },
    {
        "lib": "vue",
        "issues": 331,
        "avgAge": 584,
        "stdAge": 318,
        "ageUnit": "d"
    },
    {
        "lib": "axios",
        "issues": 195,
        "avgAge": 415,
        "stdAge": 376,
        "ageUnit": "d"
    }
]
```

### View isseus statistics of a specific lib

``` shell
GET /api/v1/issues?lib={libName}
```

Sample request to retrieve the statistics of one lib:

``` shell
curl -X GET http://localhost:3000/api/v1/issues?lib=react
```

* If you are running the application in Docker, please change the localhost by the docker address.

Success Response:

``` json
[
    {
        "lib": "react",
        "issues": 456,
        "avgAge": 619,
        "stdAge": 536,
        "ageUnit": "d"
    }
]
```
