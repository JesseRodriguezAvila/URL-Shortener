import app from './app';
import { API_URL, NODE_ENV, SERVER_PORT } from './env.config';
import { mongodbConnect } from './mongoose';

async function main() {
    console.log(`${NODE_ENV} mode`.toUpperCase());
    try {
        await mongodbConnect();
        app.listen(SERVER_PORT, () => console.log(`🚀 Express server started on: ${API_URL}`));
    } catch (err) {
        console.log(`❌ Error -- Application closed : ${err}`);
        process.exit(1);
    }
}

main();