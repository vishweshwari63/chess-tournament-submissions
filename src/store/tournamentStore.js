import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// A single active tournament for MVP
const stored = browser ? JSON.parse(localStorage.getItem('chessops_tournament') || 'null') : null;

// Initial schema if null
const initial = {
	id: null,
	name: '',
	status: 'DRAFT', // DRAFT, REGISTRATION, ACTIVE, COMPLETE
	registeredPlayers: [],
	rounds: []
};

export const tournamentStore = writable(stored || initial);

if (browser) {
	tournamentStore.subscribe(val => {
		localStorage.setItem('chessops_tournament', JSON.stringify(val));
	});
}
