BEGIN;

DROP TABLE IF EXISTS health_behaviors;

CREATE TABLE health_behaviors(
    year bigint,
    stateabbr text,
    statedesc text,
    cityname text,
    geographiclevel text,
    datasource text,
    category text,
    uniqueid text,
    measure text,
    data_value_unit text,
    datavaluetypeid text,
    data_value_type text,
    data_value double precision,
    low_confidence_limit double precision,
    high_confidence_limit double precision,
    categoryid text,
    measureid text,
    cityfips text,
    tractfips text,
    short_question_text text,
    short_code text
);

\COPY health_behaviors FROM 'E:\git\SOLAP\datasets\health_2014.csv' WITH CSV HEADER;
\COPY health_behaviors FROM 'E:\git\SOLAP\datasets\health_2015.csv' WITH CSV HEADER;
\COPY health_behaviors FROM 'E:\git\SOLAP\datasets\health_2016.csv' WITH CSV HEADER;
\COPY health_behaviors FROM 'E:\git\SOLAP\datasets\health_2017.csv' WITH CSV HEADER;

END;