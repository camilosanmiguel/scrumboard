const mongoose = require("mongoose");
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.BD_CONNECTION,{
            useNewUrlParser:true,
            useFindAndModify:false,
            useCreateIndex:true,
            useUnifiedTopology:true
        });
        console.log("Connection with MongoDB: on");
    } catch (error) {
        console.log("Error Connection with MongoDB: ",error);
        throw new Error("Error Connection with MongoDB")
    }
};

module, exports = {dbConnection};