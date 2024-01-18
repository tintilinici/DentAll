# DentAll backend setup

## Postavljanje Dockera

### Preduvjeti
- Docker instaliran na vašem sustavu

### Pokretanje Containera
Za pokretanje Docker containera:

1. U terminalu se pozicionirajte u `backend`:

    ```bash
    cd putanja/do/DentAll/backend
    ```

2. Pokrenite Docker Compose naredbu:

    ```bash
    docker-compose up
    ```

   Dopustite procesu da se završi. Prvo postavljanje može potrajati.


Tom komandom pokrenuli ste PostgreSQL bazu podataka u docker containeru, 
i sada u njoj želimo napraviti tablice.
Ta bi to postigli, samo pokrenite Spring app i tablice će 
se automatski kreirati. Ako se želite spojiti terminalom na PostgreSQL server 
(kako bi mogli pisati sql naredbe), upišite komandu:

WINDOWS:

        docker exec -it backend_db_1 psql -U postgres -d dentall

MAC:

        docker exec -it backend-db-1 psql -U postgres -d dentall


Time ste spojeni na server i bazu `dentall`. 

Sada možete provjeriti ispravnost baze i njenih tablica, na primjer:

```bash
    \dt
```
