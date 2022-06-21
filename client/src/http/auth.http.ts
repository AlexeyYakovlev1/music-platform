import Cookies from "js-cookie";

const { REACT_APP_API_URL } = process.env;

export async function checkAuth() {
    const response = await fetch(`${REACT_APP_API_URL}/auth/check`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    });
    const data = await response.json();

    return { data, response };
}