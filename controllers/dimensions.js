import jwt from "jsonwebtoken";
import StreamsPool from "../util/streams_pool.js";

export const autoComplete = async (req, res) => {
  try {
    let token = req.get("Authorization").split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    return res.status(401).end();
  }
  const { name, text, limit, id } = req.body;
  const query = `SELECT DISTINCT ${name} FROM public.stream_table_${id} WHERE UPPER(${name}) LIKE UPPER('%${text}%') LIMIT ${limit}`;
  try {
    const result = await StreamsPool.query(query);
    res.status(200).json(result.rows.map((ob) => ob[name]));
  } catch (e) {
    console.log(e);
    res.status(502).end();
  }
};
