# docker setup

Za pokretanje docker containera:

U terminalu se pozicionirajte u _**backend**_ folder:

        .../DentAll/backend

I napišite komandu

        docker-compose up

Dopustite da se izvrti do kraja (samo prvi put traje dugo)

Tom komandom pokrenuli ste MySql server (bazu) u docker containeru, 
i sada u njoj želimo napraviti tablice.
Ta bi to postigli, samo pokrenite Spring app i tablice će 
se automatski kreirati kao i neki testni podaci za accommodation tablicu 
u njima. Ako se želite spojiti terminalom na Mysql server 
(kako bi mogli pisati sql naredbe), upišite komandu:

WINDOWS:

        docker exec -it backend_db_1 mysql -u root -p

MAC:

        docker exec -it backend-db-1 mysql -u root -p

Te kada vas prompta sa password, upišite: **root**

Time ste spojeni na server, ali ne i na našu bazu. 
Da bi se spojili na bazu, još moramo napisati: 

        connect dentall;

Te tada možemo nad svojom bazom pozivati sql komande npr:

        show tables;

# swagger ui

Za swagger ui u browseru upišite:

        http://localhost:8080/swagger-ui.html


