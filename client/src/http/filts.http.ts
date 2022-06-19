const { REACT_APP_API_URL } = process.env;

export async function getAllFilts() {
    const response = await fetch(`${REACT_APP_API_URL}/filts`);
    const data = await response.json();

    return { response, data };
}