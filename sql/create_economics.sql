BEGIN;

DROP TABLE IF EXISTS economics;

CREATE TABLE economics(

gis_join_match_code_integrated text,
gis_join_match_code text,
census_year integer,
state_name text ,
state_code integer,
state_code_2 integer,
county_name text,
county_code integer,
county_code2 integer,
census_tract_code text,
place_name text,
less_than_highschool integer,
some_college integer,
finished_college integer,
labor_force integer,
labor_force_armed integer,
labor_force_civilian integer,
civilian_employed integer,
civilian_unemployed integer,
civilian_non_labor integer,
median_income integer,
persons_in_poverty integer
);

\COPY economics FROM 'C:\git\SOLAP\datasets\economics_2000.csv' WITH CSV HEADER;
\COPY economics FROM 'C:\git\SOLAP\datasets\economics_2010.csv' WITH CSV HEADER;

END;