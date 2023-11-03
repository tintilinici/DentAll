INSERT INTO accommodation (id, accommodation_type, address, availability_start, availability_end, location)
VALUES (UUID(), 'ROOM', 'Address 1', '2023-01-01', '2023-12-31', ST_GeomFromText('POINT(40.730610 -73.935242)'));

INSERT INTO accommodation (id, accommodation_type, address, availability_start, availability_end, location)
VALUES (UUID(), 'APARTMENT', 'Address 2', '2023-02-01', '2023-11-30', ST_GeomFromText('POINT(34.052235 -18)'));

INSERT INTO accommodation (id, accommodation_type, address, availability_start, availability_end, location)
VALUES (UUID(), 'HOUSE', 'Address 3', '2023-03-01', '2023-10-31', ST_GeomFromText('POINT(51.509865 -0.118092)'));
