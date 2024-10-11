import express from "express";
import { config } from "dotenv";

config();
const app = express();

app.listen(env.PORT, () => {
    console.log(`Server is listening on port ${env.PORT}`);
});
