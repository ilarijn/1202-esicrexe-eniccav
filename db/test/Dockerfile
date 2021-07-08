FROM postgres:latest

ENV POSTGRES_DB=test
ENV POSTGRES_USER=test
ENV POSTGRES_PASSWORD=test

RUN echo 'alias login="psql vaccines -h localhost -p 5432 -U docker -W"' >> ~/.bashrc

COPY initdb_test.sql /docker-entrypoint-initdb.d/ 
COPY *.json .

RUN chmod a+rwx *.json
