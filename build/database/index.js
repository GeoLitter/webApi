"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;
exports.dbConnection = {
    url: "mongodb+srv://lmanzanero:HelloWorld1!@cluster0.n5mj9.mongodb.net/blog?retryWrites=true&w=majority",
    // url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
};
//# sourceMappingURL=index.js.map