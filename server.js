import { app } from "./app.js";
import { connectDb } from "./data/database.js";

connectDb();


app.listen(process.env.PORT,()=>{
    console.log(`Server is Working on port: ${process.env.PORT} `);
})