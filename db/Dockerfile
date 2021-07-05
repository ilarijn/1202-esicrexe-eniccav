FROM postgres:latest

ENV POSTGRES_DB=vaccines
ENV POSTGRES_USER=docker
ENV POSTGRES_PASSWORD=docker

COPY initdb.sql /docker-entrypoint-initdb.d/ 
COPY ./resources/* /resources/
COPY parseToJson.sh /resources/

WORKDIR /resources
RUN ./parseToJson.sh
RUN chmod a+rwx *.json
