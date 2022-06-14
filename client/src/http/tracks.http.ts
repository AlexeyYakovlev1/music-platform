const { REACT_APP_API_URL } = process.env;

export async function getOneTrack(id: number) {
    const response = await fetch(`${REACT_APP_API_URL}/audio/track/${id}`);
    const data = await response.json();

    return { data, response };
};

export async function getTracks() {
    const response = await fetch(`${REACT_APP_API_URL}/audio/tracks`);
    const data = await response.json();

    return { data, response };
};