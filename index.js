import * as secp from "noble-secp256k1";
import {axiosRequest} from "./axios.js";
const privateKey =
	"6bc0e540f06583ec8f098cde485d724db4b50101d3f8674e9b6f0e597ef858fb";
console.log("prv", privateKey);
const publicKey =
	"02b77f26a96346757dd57cc3f591f3722144233111259c69c43c02b653b4af8bb4";
const msg = {
	version: 21823489,
	nonce: 1,
	toAddr: "0x6429073dd92B8E5b14878D08AA9d51e29BbD58fa",
	amount: "1000000000000",
	pubKey: publicKey,
	gasPrice: "2000000000",
	gasLimit: "50",
	code: "",
	data: "",
	priority: false
};
(async () => {
	console.log("start");
	try {
		const message = JSON.stringify(msg);

		const rpub = secp.schnorr.getPublicKey(privateKey);
		const rsignature = await secp.schnorr.sign(message, privateKey);
		const risSigned = await secp.schnorr.verify(rsignature, message, rpub);
		console.log(risSigned, "schnorr", rsignature);
		if (risSigned) {
			const body = {
				id: "1",
				jsonrpc: "2.0",
				method: "CreateTransaction",
				params: [
					{
						...msg,
						signature: rsignature
					}
				]
			};
			const data = await axiosRequest("https://dev-api.zilliqa.com", body);
			console.log(data);
		}
	} catch (error) {
		console.log(error);
	}
	// You pass either a hex string, or Uint8Array
})();
