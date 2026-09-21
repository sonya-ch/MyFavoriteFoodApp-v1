import { ENV } from "./src/config/env.js";

//Convert schema to SQL > 'npx drizzle-kit generate'
export default{
    schema: "./src/db/schema.js",// What schema
    out: "./src/db/migrantions", // where to save
    dialect:"postgresql", //java code convert to SQL
    dbCredentials: {url: ENV.DATABASE_URL}, 
};