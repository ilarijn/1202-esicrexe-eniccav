CREATE TABLE "orders" (
    "id" varchar PRIMARY KEY,
    "healthCareDistrict" varchar,
    "orderNumber" int,
    "responsiblePerson" varchar,
    "injections" int NOT NULL,
    "arrived" timestamp with time zone NOT NULL,
    "vaccine" varchar NOT NULL
);
CREATE TABLE "vaccinations" (
    "vaccination-id" varchar PRIMARY KEY,
    "sourceBottle" varchar NOT NULL,
    "gender" varchar,
    "vaccinationDate" timestamp with time zone NOT NULL
);
ALTER TABLE "vaccinations"
ADD FOREIGN KEY ("sourceBottle") REFERENCES "orders" ("id");
CREATE UNIQUE INDEX ON "orders" ("id");
CREATE INDEX ON "orders" ("arrived");
CREATE INDEX ON "orders" ("vaccine");
CREATE UNIQUE INDEX ON "vaccinations" ("vaccination-id");
CREATE INDEX ON "vaccinations" ("sourceBottle");
CREATE INDEX ON "vaccinations" ("vaccinationDate");
INSERT INTO orders
SELECT *
FROM json_to_recordset(pg_read_file('/resources/Antiqua.json')::json) AS x(
        "id" varchar,
        "healthCareDistrict" varchar,
        "orderNumber" int,
        "responsiblePerson" varchar,
        "injections" int,
        "arrived" timestamp with time zone,
        "vaccine" varchar
    );
INSERT INTO orders
SELECT *
FROM json_to_recordset(
        pg_read_file('/resources/SolarBuddhica.json')::json
    ) AS x(
        "id" varchar,
        "healthCareDistrict" varchar,
        "orderNumber" int,
        "responsiblePerson" varchar,
        "injections" int,
        "arrived" timestamp with time zone,
        "vaccine" varchar
    );
INSERT INTO orders
SELECT *
FROM json_to_recordset(pg_read_file('/resources/Zerpfy.json')::json) AS x(
        "id" varchar,
        "healthCareDistrict" varchar,
        "orderNumber" int,
        "responsiblePerson" varchar,
        "injections" int,
        "arrived" timestamp with time zone,
        "vaccine" varchar
    );
INSERT INTO vaccinations
SELECT *
FROM json_to_recordset(
        pg_read_file('/resources/vaccinations.json')::json
    ) AS x(
        "vaccination-id" varchar,
        "sourceBottle" varchar,
        "gender" varchar,
        "vaccinationDate" timestamp with time zone
    );