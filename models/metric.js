import mongoose from "mongoose";

const { Schema } = mongoose;

const metricSchema = new Schema({
  _id: String,
  _index: String,
  _type: String,
  _score: Number,
  _source: {
    measure: String,
    updated_at: String,
    stream_id: String,
    metric_unique_key: String,
    created_at: String,
    priority: Number,
    dimensions: [{ name: String, value: String }],
    frequency: Number,
    status: String,
  },
});
export default mongoose.model("Metric", metricSchema);
