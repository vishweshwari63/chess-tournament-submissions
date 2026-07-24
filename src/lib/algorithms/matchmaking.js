export function shuffleArray(array) {
	let currentIndex = array.length, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// Swap
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export function generatePairings(playerIds) {
	const shuffled = shuffleArray([...playerIds]);
	const pairings = [];
	
	for (let i = 0; i < shuffled.length; i += 2) {
		if (i + 1 < shuffled.length) {
			pairings.push({ 
				id: Math.random().toString(36).substr(2, 9),
				player1Id: shuffled[i], 
				player2Id: shuffled[i+1], 
				winnerId: null 
			});
		} else {
			// Odd remaining player gets a Bye
			pairings.push({ 
				id: Math.random().toString(36).substr(2, 9),
				player1Id: shuffled[i], 
				player2Id: null, 
				winnerId: shuffled[i] 
			});
		}
	}
	
	return pairings;
}
