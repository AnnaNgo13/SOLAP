BEGIN ;

DROP TABLE IF EXISTS census_population;

CREATE TABLE census_population 
(
gis_join_match_code text,
census_year integer,
state_name text ,
state_code integer,
county_name text,
county_code integer,
census_tract_code text,
total numeric,
male numeric,
female numeric,
person_under_5_years numeric,
person_5_to_9_years numeric,
person_10_to_14_years numeric,
person_15_to_17_years numeric,
person_18_and_19_years numeric,
person_20_years numeric,
person_21_years numeric,
person_22_to_24_years numeric,
person_25_to_29_years numeric,
person_30_to_34_years numeric,
person_35_to_39_years numeric,
person_40_to_44_years numeric,
person_45_to_49_years numeric,
person_50_to_54_years numeric,
person_55_to_59_years numeric,
person_60_to_61_years numeric,
person_62_to_64_years numeric,
person_65_to_69_years numeric,
person_70_to_74_years numeric,
person_75_to_79_years numeric,
person_80_to_84_years numeric,
person_85_years_and_over numeric,
white_alone numeric,
black_alone numeric,
american_indian_alone numeric,
asian_alone numeric,
pi_alone numeric,
sor_alone numeric,
two_or_more numeric
);

\COPY census_population FROM 'C:\git\SOLAP\datasets\demographics_1990.csv' WITH CSV HEADER;
\COPY census_population FROM 'C:\git\SOLAP\datasets\demographics_2000.csv' WITH CSV HEADER;
\COPY census_population FROM 'C:\git\SOLAP\datasets\demographics_2010.csv' WITH CSV HEADER;

END;