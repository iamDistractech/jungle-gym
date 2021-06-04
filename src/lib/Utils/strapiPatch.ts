import type { Game, Material } from '$lib/games';

export function strapiPatchAll(strapiGames: []): Game[] {
	return strapiGames.map(strapiPatchSingle);
}

export function strapiPatchSingle(params:type): Game {
	(strapiGame: Record<string, string | [] | Record<string, string>>): Game => {
		const game: Game = {
			id: typeof strapiGame.id === 'string' ? strapiGame.id : '',
			slug: typeof strapiGame.slug === 'string' ? strapiGame.slug : '',
			name: typeof strapiGame.name === 'string' ? strapiGame.name : '',
			description: typeof strapiGame.description === 'string' ? strapiGame.description : '',
			category: typeof strapiGame.category.name === 'string' ? strapiGame.category.name : '',
			materials: checkMaterial(strapiGame.materials),
			minimumPlayers:
				typeof strapiGame.minimumPlayers === 'string'
					? Number(strapiGame.minimumPlayers)
					: undefined,
			targetGroup: Array.isArray(strapiGame.targetGroup)
				? strapiGame.targetGroup.map((a: Record<string, string>) => parseInt(a.group))
				: [],
			rules: Array.isArray(strapiGame.rules) ? strapiGame.rules : [],
			variation: Array.isArray(strapiGame.variation) ? strapiGame.variation : []
		};
		return game;
	}
}

function checkMaterial(strapiMaterials: string | [] | Record<string, string>): Material[] {
	if (Array.isArray(strapiMaterials)) {
		strapiMaterials.map(
			(strapiMaterial: {
				amount: number | string | unknown;
				notes: string;
				material: Record<string, string>;
			}): Material => {
				return {
					name: strapiMaterial.material.name,
					amount: Number(strapiMaterial.amount),
					notes: strapiMaterial.notes
				};
			}
		);
	} else return [];
}
