import pg from "pg";

const { Client } = pg;

const POSTGRES_URI = "postgres://ps1:vCG9gNRZNoBKM@10.0.1.84:26257/cliff";

let StreamsClient;

try {
  StreamsClient = new Client({
    connectionString: POSTGRES_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  StreamsClient.connect();
} catch (err) {
  console.log(err);
}

export default StreamsClient;
