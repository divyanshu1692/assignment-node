// index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");

const typeDefs = require('./graphql/schema/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');
const authMiddleware = require('./middleware/auth.js');
const { upload, handleExcelUpload } = require('./controller/excelUploadController.js');

dotenv.config();

const startServer = async () => {
    const corsOptions = {
        origin: 'http://localhost:3000',
        methods: ['POST'],
    };
    const app = express();

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    app.use(authMiddleware);
    app.use(cors());
    app.post('/api/upload', upload.single('file'), handleExcelUpload);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ user: req.user }), // Pass user from auth middleware to context
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 8000 }, () => {
        console.log(`Server ready at http://localhost:8000${server.graphqlPath}`);
    });
};

startServer();