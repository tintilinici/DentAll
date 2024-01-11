# Frontend

## Usage

Run the following commands to get up and running.
pnpm in the faster alternative of npm. Install it [here](https://pnpm.io/installation).

Navigate into the frontend folder and type these commands.

```sh
pnpm install
pnpm run dev
```

Frontend notes:

- Ako niste radili s reactom, a cak i ako jeste ali prek yta preporucam official docs: https://react.dev/learn. Nigdi necete bolje naucit react nego na ovoj stranici u tih 2-3h. Napravite i tic tac toe koji je nastavak ovog. Također procitajte thinking in react. Ako imate bilo kakvih pitanja i oko toga mozete me pitat sta god. mozemo i skupa proc docs.
- U frontu je koristen tailwindcss. To je library koji olaksava stiliziranje komponenti. Ako niste upoznati s time procitajte ovo: https://tailwindcss.com/docs/utility-first Dakle tailwind ima predefinirane klase ko mr-5 koji ce zapravi se prevet u margin-right: 2.5rem tak da ne morate pisati css.
- Također je koristena ChakraUI https://chakra-ui.com/ koja ima vec neke napravljene komponente. Mi najvise koristimo Table, i Button ali ak vam treba mozete korisiti i ostale
- Zadnja veca tehnologija je ReactQuery (https://tanstack.com/query/latest/docs/react/overview) library koji olaksava rad s get i post requestovima na frontendu. Don't be scared by docs. Docs su ogromni i detaljni, nama treba 5% toga svega. Dok se susretnete s react-qeurym u kodu preporucam procitat na linku gore i ova dva clanka: https://tkdodo.eu/blog/practical-react-query, https://tkdodo.eu/blog/mastering-mutations-in-react-query
