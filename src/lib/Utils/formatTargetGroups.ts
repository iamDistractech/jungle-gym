import type { Game } from '$lib/games';

export function formatTargetGroups(targetGroup: Game['targetGroup']): string {
	const sortedTargetGroup = sortTargetGroups(targetGroup);

	const minGroup = sortedTargetGroup[0];
	const maxGroup = sortedTargetGroup.slice(-1)[0];
	return minGroup === 1 && maxGroup === 8 ? 'Alle groepen' : `Groep ${minGroup} - ${maxGroup}`;
}

function sortTargetGroups(targetGroup: Game['targetGroup']) {
	return targetGroup.sort(function (a, b) {
		return a - b;
	});
}
