const FINISH = 57;
const START = { red: 0, yellow: 26 };
export const SAFE = new Set([0, 8, 13, 21, 26, 34, 39, 47]);
export const fresh = (roomId) => ({ roomId, status: 'waiting', players: [], tokens: { red: [0, 1, 2, 3].map(id => ({ id, progress: -1 })), yellow: [0, 1, 2, 3].map(id => ({ id, progress: -1 })) }, current: 'red', dice: null, turn: 1, winner: null, message: 'Waiting for both players' });
export const pathCell = (color, p) => p < 0 || p > 51 ? null : (START[color] + p) % 52;
export const legal = (g, color) => g.tokens[color].filter(t => t.progress === -1 ? g.dice === 6 : t.progress + (g.dice || 0) <= FINISH).map(t => t.id);
export function move(g, color, id) { if (g.status !== 'playing' || g.current !== color || !g.dice)
    throw Error('That move is not allowed.'); const t = g.tokens[color][id]; if (!legal(g, color).includes(id))
    throw Error('Choose a highlighted token.'); t.progress = t.progress === -1 ? 0 : t.progress + g.dice; let captured = false; const cell = pathCell(color, t.progress); if (cell !== null && !SAFE.has(cell)) {
    const other = color === 'red' ? 'yellow' : 'red';
    for (const o of g.tokens[other])
        if (pathCell(other, o.progress) === cell) {
            o.progress = -1;
            captured = true;
        }
} if (g.tokens[color].every(x => x.progress === FINISH)) {
    g.status = 'over';
    g.winner = color;
    g.message = `${color === 'red' ? 'Red' : 'Yellow'} wins!`;
    return;
} const rolled = g.dice; g.dice = null; g.message = captured ? 'Token captured!' : t.progress === 0 ? 'Token entered the board.' : 'Turn changed.'; if (rolled !== 6)
    next(g);
else
    g.message = 'Roll again — you rolled a 6.'; }
export function next(g) { g.current = g.current === 'red' ? 'yellow' : 'red'; g.turn++; }
