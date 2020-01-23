import fetcher from '../api/fetcher';

async function startNewGame(data) {
    const user = await fetcher.post('/startgame', data);
    return user
}

async function getRange(id) {
    const results = await fetcher.get(`/range/${id}`);
    return results.data
}
export {
    startNewGame,
    getRange
}