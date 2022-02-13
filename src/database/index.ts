const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, MONGO_URI } = process.env;

export const dbConnection = {
  url: `${MONGO_URI}`,
  // url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
  // options: {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false,
  // },
};
