export enum category {
	tik = 'tikspel',
	bal = 'balspel',
	loop = 'loopspel',
	reactie = 'reactiespel'
}

export enum materialName {
	lint = 'lintje',
	fluit = 'fluitje',
	hoepel = 'hoepel',
	pion = 'pion',
	klok = 'stopwatch',
	bal = 'bal'
}

export interface material {
	name: materialName;
	amount?: number | string;
	notes?: string;
}

export interface GameVariations {
	description: string;
	actions: string[];
}

export interface Game {
	id: string;
	slug: string;
	name: string;
	description: string;
	category: category;
	materials: material[];
	minimumPlayers: number;
	targetGroup: number[];
	rules?: string[];
	variation?: GameVariations[];
	offline?: boolean;
}
