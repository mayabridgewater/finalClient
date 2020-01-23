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
    return success
}

async function getGameHistory(id) {
    const history = await fetcher.get(`/history/${id}`);
    return history.data
}

async function addWin(data) {
    const success = await fetcher.put('/win', data);
    return success
}

export {
    startNewGame,
    getRange,
    getGuesses,
    uploadeGuesses,
    getGameHistory,
    addWin
}