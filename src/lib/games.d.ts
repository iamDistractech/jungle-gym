export enum Category {
	tik = 'tikspel',
	bal = 'balspel',
	loop = 'loopspel',
	reactie = 'reactiespel',
	unknown = 'onbekend'
}

export enum MaterialName {
	lint = 'lintje',
	fluit = 'fluitje',
	hoepel = 'hoepel',
	pion = 'pion',
	klok = 'stopwatch',
	bal = 'bal',
	unknown = 'onbekend'
}

export interface Material {
	name: MaterialName | string;
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
	category: Category | string;
	materials: Material[];
	minimumPlayers: number;
	targetGroup: number[];
	rules?: string[];
	variation?: GameVariations[];
	offline?: boolean;
}
