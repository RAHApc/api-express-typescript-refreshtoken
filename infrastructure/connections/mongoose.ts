import * as mongoose from "mongoose";

mongoose.connect(`mongodb://localhost:27017/api-refreshtoken`);

mongoose.connection.on("open", () => {
    console.log(`mongo connection is open ...`);
});

mongoose.connection.on("error", (err) => {
    console.log(`failed to connect`, err.message);
});