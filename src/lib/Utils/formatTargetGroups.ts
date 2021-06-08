import type { Game } from '$lib/games';

/**
 * Formats the targetgroup into a dutch human readable format
 * @param targetGroup an array with all the target groups
 * @returns A readable text in Dutch
 */
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
