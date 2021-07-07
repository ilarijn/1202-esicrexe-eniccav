FROM postgres:latest

ENV POSTGRES_DB=vaccines
ENV POSTGRES_USER=docker
ENV POSTGRES_PASSWORD=docker

RUN echo 'alias login="psql vaccines -h localhost -p 5432 -U docker -W"' >> ~/.bashrc

COPY initdb.sql /docker-entrypoint-initdb.d/ 
COPY ./resources/* /resources/
COPY parseToJson.sh /resources/

WORKDIR /resources
RUN ./parseToJson.sh
RUN chmod a+rwx *.json
