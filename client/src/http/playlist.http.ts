const { REACT_APP_API_URL } = process.env;

console.log(REACT_APP_API_URL);

export const getPlaylist = async (id: number) => {
    const res = await fetch(`http://localhost:5000/audio/playlist/${id}`);
    const data = await res.json();

    return { res, data };
};