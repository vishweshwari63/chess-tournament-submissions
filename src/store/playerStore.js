import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const initialPlayers = [
	{ id: '1', name: 'Magnus Carlsen', elo: 2830, wins: 0, losses: 0, points: 0, avatarUrl: '' },
	{ id: '2', name: 'Hikaru Nakamura', elo: 2789, wins: 0, losses: 0, points: 0, avatarUrl: '' },
	{ id: '3', name: 'Fabiano Caruana', elo: 2804, wins: 0, losses: 0, points: 0, avatarUrl: '' },
	{ id: '4', name: 'Ding Liren', elo: 2780, wins: 0, losses: 0, points: 0, avatarUrl: '' }
];

const stored = browser ? JSON.parse(localStorage.getItem('chessops_players') || 'null') : null;
export const playerStore = writable(stored || initialPlayers);

if (browser) {
	playerStore.subscribe(val => {
		localStorage.setItem('chessops_players', JSON.stringify(val));
	});
}

/**
 * Derived algorithmic store that automatically outputs ranked players.
 * Calculation priority: 
 * 1. Total Tournament Points (3 per win, 1 per tie/bye)
 * 2. Total Match Wins
 * 3. Fallback: Base Initial Elo rating
 */
export const rankedPlayers = derived(playerStore, $players => {
	return [...$players].sort((a, b) => {
		// Primary sorting by tournament points
		if (b.points !== a.points) return b.points - a.points;
		// Tie breaker fallback to win-rate
		if (b.wins !== a.wins) return b.wins - a.wins;
		// Ultimate fallback to seeded elo
		return b.elo - a.elo;
	});
});
