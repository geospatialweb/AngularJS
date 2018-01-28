CREATE TABLE region
(
"id" integer not null primary key,
"lng" numeric(9,6) not null,
"lat" numeric(9,6) not null
);

CREATE SEQUENCE region_id_seq;
ALTER TABLE region
ALTER COLUMN id
SET DEFAULT NEXTVAL('region_id_seq');

INSERT into region (lng, lat) values (-76.205278,44.297778);
INSERT into region (lng, lat) values (-75.903611,44.380833);
INSERT into region (lng, lat) values (-75.825278,44.430833);
INSERT into region (lng, lat) values (-75.809444,44.478611);
INSERT into region (lng, lat) values (-75.653333,44.599167);
INSERT into region (lng, lat) values (-75.676389,44.614722);
INSERT into region (lng, lat) values (-75.851389,44.648056);
INSERT into region (lng, lat) values (-76.086944,44.633611);
INSERT into region (lng, lat) values (-76.203889,44.660278);
INSERT into region (lng, lat) values (-76.331667,44.668611);
INSERT into region (lng, lat) values (-76.545278,44.773056);
INSERT into region (lng, lat) values (-76.674444,44.716944);
INSERT into region (lng, lat) values (-76.706389,44.504444);
INSERT into region (lng, lat) values (-76.880278,44.492222);
INSERT into region (lng, lat) values (-76.760556,44.326389);
INSERT into region (lng, lat) values (-76.425556,44.347778);
INSERT into region (lng, lat) values (-76.213611,44.483333);
INSERT into region (lng, lat) values (-76.205278,44.297778);
