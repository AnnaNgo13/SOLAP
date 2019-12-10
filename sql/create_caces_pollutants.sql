BEGIN;

DROP TABLE IF EXISTS caces_pollutants;

CREATE TABLE caces_pollutants (
fips text,
pollutant text,
year integer,
value double precision,
state_abbr text
);

\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2000.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2001.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2002.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2003.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2004.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2005.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2006.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2007.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2008.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2009.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2010.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2011.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2012.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2013.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2014.csv' WITH CSV HEADER;
\COPY caces_pollutants FROM 'E:\git\SOLAP\datasets\caces_pollutants_2015.csv' WITH CSV HEADER;


END;