const { REACT_APP_API_URL } = process.env;

export async function getFollow(id: number) {
    const response = await fetch(`${REACT_APP_API_URL}/follow/${id}`);
    const data = await response.json();

    return { response, data };
}