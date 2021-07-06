import pg from "pg";

const { Pool } = pg;

const POSTGRES_URI = "postgres://ps1:vCG9gNRZNoBKM@10.0.1.84:26257/cliff";

let StreamsPool;

try {
  StreamsPool = new Pool({
    connectionString: POSTGRES_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} catch (err) {
  console.log(err);
}

export default StreamsPool;
