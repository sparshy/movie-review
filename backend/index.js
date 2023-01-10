import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";

//creating async functions to connect to mongodb cluster
async function main () {

    dotenv.config(); //loads env variables

    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI)
    //creating instance of mongo client 

    const port = process.env.PORT || 8000;
    //retrieve port from env variables

    try {
        await client.connect();
        //Connect to mongodb cluster
        //await keyword => block further execution until operation completed
        //start web server next if no errors

        app.listen(port, ()=> {
            console.log(`server is running on port ${port}`);
        })
        //listen will start a server, first argument is specified port
        //arrow function is call back function when server starts


    } catch (e){
        console.log(e);
        process.exit(1);
    }

    //wrapping calls to database in try/catch statements to handle unexpected errors

    
}

main().catch(console.error);