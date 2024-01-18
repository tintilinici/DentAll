INSERT INTO accommodation (id, accommodation_type, address, availability_start, availability_end, location)
VALUES (gen_random_uuid(), 'ROOM', 'Address 1', '2024-01-01', '2025-12-31', ST_GeomFromText('POINT(40.730610 -73.935242)'));

INSERT INTO accommodation (id, accommodation_type, address, availability_start, availability_end, location)
VALUES (gen_random_uuid(), 'APARTMENT', 'Address 2', '2024-01-01', '2025-11-30', ST_GeomFromText('POINT(34.052235 -18)'));

INSERT INTO accommodation (id, accommodation_type, address, availability_start, availability_end, location)
VALUES (gen_random_uuid(), 'HOUSE', 'Address 3', '2024-01-01', '2025-10-31', ST_GeomFromText('POINT(51.509865 -0.118092)'));

INSERT INTO transport_company (id, name, email, phone_number)
VALUES (gen_random_uuid(), 'Transport Company 1', 'transportcompany1@gmail.com', '+385 91 2345 676');

INSERT INTO transport_company (id, name, email, phone_number)
VALUES (gen_random_uuid(), 'Transport Company 2', 'transportcompany2@gmail.com', '+385 92 3456 789');

INSERT INTO transport_company (id, name, email, phone_number)
VALUES (gen_random_uuid(), 'Transport Company 3', 'transportcompany3@gmail.com', '+385 98 7654 321');
