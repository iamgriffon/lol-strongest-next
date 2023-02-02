# Strongest @https://lol-strongest-next-iamgriffon.vercel.app/

This [Next.js](https://nextjs.org/) project has been bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**STRONGEST** is a fullstack web-app that consists of a voting game where two random champions will appear and the user has to vote which one is the strongest among them.

### Technologies used:

- **Next.js** (Front-end framework)
- **TypeScript**  (Programming Language)
- **Tailwind**  (Design System)
- **tRPC** (Procedure caller for consuming APIs)
- **Prisma** (ORM for Databases)
- **Zod** (for Data Validation)
- **Riot Games' Data Dragon** (API used as a source of data for populating our database with champions)

### Deployment structure:

- **Vercel** for our web app
- **Amazon AWS (RDS)** for the database
- Database used: **POSTGRESQL**

## How to set the dev environment into my machine?

1. First, clone this project (and leave a STAR! =) ) and install the dependencies:

```bash
npm install
# or
yarn
```

2. Then you should create a .env file containing the following

    -  ```DATABASE_URL``` for your main PostgreSQL database
    - ```SHADOW_DATABASE_URL``` for your shadow PostgreSQL database - *Mandatory for Prisma*.
  

3.  Once these are created and linked, run the following command to create the tables in your Database:
    - ```npx prisma migrate dev```
  
4. Then, you run a script file that will serve as a "seed" - it will populate the database with our beloved League of Legends Champions by fetching Riot's Data Dragon API.
    - The script file is located in ```./scripts/fill-db.ts```
    - Execute the script by running the command ```npm run ts-node ./scripts/fill-db.ts```
    - The script will DELETE all data and then will REFILL the database with the new info. it will also delete the votes by default, so feel free to edit the file to fit your needs
    - **THE LEADERBOARD AND THE VOTES (IN PROD) WILL RESET EVERY TIME A CHAMPION IS RELEASED OR REWORKED!**

5. Now you're good to go! run ```npm run dev``` and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

6. Last but not least, some consideration regarding the project: 

    - ```src/server/router/index.ts``` contains our tRPC routes with our API queries and procedures.
    - ```src/server/utils/inferAsyncReturn``` contains a very useful method to infer AsyncReturn types from functions.
    - The "Results" page @```src/pages/results.tsx``` uses ISR (Incremental Static Regeneration), being revalidated each 4 hours.
    - This project is a work-in-progress, so constant updates will happen, always check the README.md for updated guides and changelogs.
    - Please if you want to contribute to the project or send some feedback, feel free to contact me or raise an issue,  my contact Infos are avaiable on my profile's README.md!


#### Inspired on Theo @t3.gg, made with love.
