## 1202-esicrexe-eniccav

A Node server, responsive React client and PostgreSQL database for presenting information about vaccine orders and vaccinations.

Pick a date and time from the calendar and click on `Get report` to display data for the selection.

## Running the app

The app is running on Heroku at http://vaccine-exercise-ilarijn.herokuapp.com/

### Running locally

Clone the repo and run `docker-compose up` at the root directory. There are separate containers for the database, server and client. When all containers are up, navigate to `http://localhost:3000`

### Running the tests

#### E2E

There are a few e2e smoke tests using Cypress. To run the tests, first start the containers from the root directory:

```
docker-compose up
```

After that:

```
cd client
npm install
npm run cypress:open
```

Cypress should open a browser where clicking on `Run integration spec` runs the tests.

#### Backend unit tests

There are unit tests for some of the more complex queries that are run against simple test data, in which case the correct results can be calculated manually. I'm not sure the test data and tests are extensive enough to prove that the queries are 100% correct, but they should at least point in the right direction and having these tests helped me debug a couple of queries.

To run the tests, first build and run the test database container:

```
docker build -t testdb ./db/test/
docker run -p 5430:5432 testdb
```

Then:

```
cd server
npm install
npm run test
```

### Known issues

- Building the client container image sometimes fails during `npm install` with `npm ERR! cb() never called!` when the network connection is slow. The solution in this case is to run `docker-compose up` again.

- The amount returned by the query for vaccines expired before use on the date "2021-04-12T11:10:06.473587Z" is 12572 instead of 13620 with the provided data. Issue or feature? :sweat_smile:
