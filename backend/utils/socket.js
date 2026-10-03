
import { server } from "./starter.js";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import { User } from "../auth/model.js";
import admin from "firebase-admin";


export const onlineUserMap = {};
export const my_username = "";

function run() {

	try {
		// console.log(process.env.FIREBASE_KEY, '\n');
		let key = Buffer.from(process.env.FIREBASE_KEY, "base64").toString("utf8");
		// console.log(key, '\n');
		let key1 = JSON.parse(key);
		// console.log( key1, '\n' )

		admin.initializeApp({
			credential: admin.credential.cert(key1)
		});
	} catch (err) {
		console.dir(err)
	}
}

run();

export { admin }





