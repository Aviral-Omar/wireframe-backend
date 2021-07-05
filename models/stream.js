import mongoose from "mongoose";

const { Schema } = mongoose;

const streamSchema = new Schema({
  status: String,
  pinned_users: Array,
  mode: String,
  source_subscription_id: mongoose.Types.ObjectId,
  user: {
    name: String,
    _id: mongoose.Types.ObjectId,
  },
  source: {
    stream_periods: [String],
    query_templates: [
      {
        query_name: String,
        query: String,
        description: String,
        required_field: String,
        column_type: String,
      },
    ],
  },
  organization_id: mongoose.Types.ObjectId,
  stream_schedule: {
    stream_interval: Number,
    stream_time_period: String,
    stream_since_interval: Number,
    stream_since_time_period: String,
  },
  meta: {
    measures: [
      {
        name: String,
        type: String,
        last_timestamp: Date,
        last_vectorized_timestamp: Date,
      },
    ],
    dimensions: [String],
    table_name: String,
    schema_name: String,
    timestamp_column: String,
    query_status: Boolean,
  },
  name: String,
  stream_polling_interval: Number,
  stream_start_date: Date,
  heartbeat: {
    taa_status: String,
    taa_timestamp: Date,
    collector_status: String,
    collector_timestamp: Date,
    predictor_status: String,
    predictor_timestamp: Date,
    is_collector_data_updated: Boolean,
  },
  anchor_time: Date,
  created_at: Date,
  updated_at: Date,
  current_month_monitored_points: Number,
  current_month_stored_points: Number,
  total_points_predicted: Number,
  total_points_stored: Number,
});

export default mongoose.model("Stream", streamSchema);
