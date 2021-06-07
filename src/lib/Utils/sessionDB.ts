import { Tedis } from 'tedis';

import {
	SESSION_DB_PORT,
	SESSION_DB_URL,
	SESSION_DB_PASSWORD,
	SESSION_DB_USERNAME,
	SESSION_DB_TLS
} from '$lib/Env';

const host: string | boolean = SESSION_DB_URL;
const port: number | boolean = Number(SESSION_DB_PORT);
const password: string | boolean = SESSION_DB_PASSWORD;
const username: string | boolean = SESSION_DB_USERNAME;
const tls: string | boolean = Boolean(SESSION_DB_TLS);

let sessionDB: Tedis | undefined;

if (typeof port === 'number' && !isNaN(port) && typeof host === 'string') {
	const options: {
		host: string;
		port: number;
		password: string;
		username: string;
		tls: Record<string, unknown>;
	} = { host, port, password: undefined, username: undefined };

	if (password && typeof password === 'string') options.password = password;
	if (username && typeof username === 'string') options.username = username;
	if (tls) options.tls = {};

	sessionDB = new Tedis(options);

	sessionDB.on('connect', () => console.log('SessionDB connected'));
	sessionDB.on('error', (error) => {
		console.log(error);
	});
	sessionDB.on('close', (had_error) => console.log('SessionDB closed', had_error));
}

export default sessionDB;
