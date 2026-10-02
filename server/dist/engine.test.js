import { describe, it, expect } from 'vitest';
import { fresh, legal, move } from './engine.js';
describe('Ludo engine', () => { it('requires a six to leave base', () => { const g = fresh('T'); g.status = 'playing'; g.dice = 5; expect(legal(g, 'red')).toEqual([]); g.dice = 6; expect(legal(g, 'red')).toEqual([0, 1, 2, 3]); }); it('captures an opponent on non-safe cells', () => { const g = fresh('T'); g.status = 'playing'; g.dice = 1; g.tokens.red[0].progress = 4; g.tokens.yellow[0].progress = 31; move(g, 'red', 0); expect(g.tokens.yellow[0].progress).toBe(-1); }); });
