const { REACT_APP_API_URL } = process.env;

export async function getOwnersByTrack(id: number) {
    const response = await fetch(`${REACT_APP_API_URL}/owner/track/${id}`);
    const data = await response.json();

    return { data, response };
}