# odin-file-uploader

Basically a stripped down version of Google Drive (or any other personal storage service).

Deployed and live at: 

TODO:
- 


## Useful commands/other info

Run `npm i` to install all packages/dev dependencies.<br>
Run `npm outdated` to check if any packages are outdated (can generally ignore yellow packages: current version is the wanted version, but not the latest version).<br>
Run `npm update` to update outdated packages.

Main schema is in `./prisma/schema.prisma`
Connector/adapter (from this local project's prisma to DB) is in `./lib/prisma.js`
Prisma code (to add entries/query the DB) is in `./script.js`

`npx prisma` to view some handy commands + check if installed correctly (optional)

`npx prisma migrate dev --name init` to create (compile?) schema tables
`npx prisma generate` to generate Prisma files (for the schema tables?)

`node script.js` to run script.js, adding a new user to the DB table and printing all users to terminal
`npx prisma studio` opens a browser visual of DB table


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