const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, DATA_URI } = process.env;

export const dbConnection = {
  url: `${DATA_URI}`,
  // url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
