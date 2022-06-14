const { REACT_APP_API_URL } = process.env;

export async function getPlaylists() {
    const response = await fetch(`${REACT_APP_API_URL}/audio/playlists`);
    const data = await response.json();

    return { data, response }
};

export async function getInfo(id: number) {
    const response = await fetch(`${REACT_APP_API_URL}/audio/info/playlist/${id}`);
    const data = await response.json();

    return { data, response }
};