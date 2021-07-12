FROM postgres:latest

ENV POSTGRES_DB=testdb
ENV POSTGRES_USER=test
ENV POSTGRES_PASSWORD=test

COPY initdb_test.sql /docker-entrypoint-initdb.d/ 
COPY *.json .

RUN chmod a+rwx *.json
