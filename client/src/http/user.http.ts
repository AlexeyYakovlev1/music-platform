const { REACT_APP_API_URL } = process.env;

export async function getUser(id: number) {
    const response = await fetch(`${REACT_APP_API_URL}/user/${id}`);
    const data = await response.json();

    return { response, data };
}