BEGIN;

ALTER TABLE traffic_stops ADD column stop_year integer;

UPDATE traffic_stops
SET stop_year = left(responseda::text, 4)::integer;

END;