import pg from "pg";

const { Pool } = pg;

const POSTGRES_URI = "postgres://ps:vCG9gNRZNoBKM@54.167.165.137:5432/cliff";

let MetricsPool;

try {
  MetricsPool = new Pool({
    connectionString: POSTGRES_URI,
    ssl: false,
  });
} catch (err) {
  console.log(err);
}

export default MetricsPool;
