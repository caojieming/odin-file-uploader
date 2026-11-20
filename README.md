# odin-file-uploader

Basically a stripped down version of Google Drive (or any other personal storage service).

Deployed and live at: 

TODO:
- convert everything to ESM (currently a gross mix of ESM for prisma files and CommonJS everywhere else that bothers me)
  - I'm confused: it previously ran just fine despite having mixed ESM and CommonJS, but now it throws an error.
  - Whatever, just convert it


## Useful commands/other info

Run `npm i` to install all packages/dev dependencies.<br>
Run `npm outdated` to check if any packages are outdated (can generally ignore yellow packages: current version is the wanted version, but not the latest version).<br>
Run `npm update` to update outdated packages.<br>

Main schema is in `./prisma/schema.prisma`<br>
Connector/adapter (from this local project's prisma to DB) is in `./lib/prisma.js`<br>
Prisma code (to add entries/query the DB) is in `./script.js`<br>

Note: if you want to see the tables synced over to the PostGreSQL DB, you need to prefix the table name with `public.` and use quotes around the table name. For example: `select * from public."Post";`


installed packages:<br>
`npm install prisma@prev --save-dev`<br>
`npm install @prisma/client@7 @prisma/adapter-pg pg dotenv`<br>

`npx prisma` to view some handy commands + check if installed correctly (optional)<br>

`npx prisma migrate dev --name init` to migrate/sync schema tables over to DB (`--name init` just names the migration "init", and is not needed after the first migration)<br>
`npx prisma generate` to generate Prisma schema tables<br>

`node script.js` to run script.js, adding a new user to the DB table and printing all users to terminal<br>
`npx prisma studio` opens a browser visual of DB table<br>


## Extra (personal) notes on deploying servers
1. create new project in Render, and a new DB in Neon
2. populate DB in Neon using Connect -> Node.js -> .env -> plug the link into SERVER_DB_URL in your own .env
- add ""&sslmode=verify-full"" to the end of the link (otherwise the connection will fail)
- make sure populateProdDb.js SQL is correct
- run `npm run popprod`, then check Neon DB tables (terminal execution will keep running for some reason even if the DB has finished populating, just ctr + c out of it)
3. deploy git repo to Render
- build command: `npm install`
- start command: `npm run app server` and add SERVER_DB_URL to Render environmental variables, or `npm run app '{SERVER_DB_URL}'`
- you will need to add a credit card if you removed it before, you can remove it after setting up the project to ensure you don't get charged

## npm scripts included:
`npm run app`<br>
The equivalent of `node --watch app.js`.<br>
Opens an Express server for viewing changes in real time without needing to build.<br>
Default server link: http://localhost:8080/

## Packages included
- express
- ejs
- express-validator
- pg
- express-session
- passport
- passport-local
- bcryptjs
- prisma
  - npm install prisma@prev --save-dev
  - npm install @prisma/client@7 @prisma/adapter-pg pg dotenv
- @quixo3/prisma-session-store