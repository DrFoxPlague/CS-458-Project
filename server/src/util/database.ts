import mongoose, { mongo } from "mongoose";

const URI = process.env.DB || "";

export default class CITSDatabase {
    readonly connection: typeof mongoose;

    constructor() {
        this.connection = mongoose;
    }

    connect = () => {
        this.connection.connect(URI)
            .then(() => {
                console.log("Connected to MongoDB! :)");
            })
            .catch((err) => {
                console.error("An error occured while connecting: ", err);
            });
    }

    disconnect = () => {
        this.connection.disconnect()
            .then(() => {
                console.log("Disconnected from MongoDB");
            })
            .catch((err) => {
                console.error("An error occured while disconnecting: ", err);
            });
        }
}