import fetcher from '../api/fetcher';

async function startNewGame(data) {
    const user = await fetcher.post('/startgame', data);
    return user
}

async function getRange(id) {
    const results = await fetcher.get(`/range/${id}`);
    return results.data
}

async function getGuesses(id) {
    const guesses = await fetcher.get(`/guess/${id}`);
    return guesses.data
}

async function  uploadeGuesses(data) {
    const success = await fetcher.put('/guess', data);
}
export {
    startNewGame,
    getRange,
    getGuesses,
    uploadeGuesses
}