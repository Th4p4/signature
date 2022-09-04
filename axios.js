import axios from "axios";

export async function axiosRequest(url, body) {
	return await axios({
		url: url,
		method: "POST",
		data: body,
		headers: {"Content-Type": "application/json"}
	});
}
