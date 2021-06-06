import type { Request, RequestHandler } from "@sveltejs/kit";
import { user } from "./_mockAccounts";
import { Tedis} from 'tedis'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import * as cookie from 'cookie'
import { SESSION_DB_PORT, SESSION_DB_URL } from "$lib/Env";

const host: string | boolean = SESSION_DB_URL
const port: number | boolean = Number(SESSION_DB_PORT)


let sessionDB: Tedis | undefined
let db_error;


if(typeof port === 'number' && !isNaN(port) && typeof host === 'string' ) {
	sessionDB = new Tedis({host, port})

	sessionDB.on('connect', () => console.log('SessionDB connected'))
	sessionDB.on('error', (error) => {
		console.log(error)
		db_error = error
	})
	sessionDB.on('close', (had_error) => console.log('SessionDB closed', had_error))
}


export const post: RequestHandler = async (request: Request) => {
	const { body } = request

	
	if(!sessionDB) return {
		status: 500,
		body: { message: 'Database Error', db_error}
	}

	if(body.username !== user.username || body.password !== user.password) return {
		status: 401,
		body: { message: 'Incorrect email or password'}
	}

	const cookieId = uuidv4()

	await sessionDB.set(cookieId, JSON.stringify(user))

	const headers = { 
		'Set-Cookie': cookie.serialize('session_id', cookieId, {
			httpOnly: true,
			maxAge:  60 * 60 * 24,
			sameSite: true,
			path: '/'
		})
	}

	return {
		status: 200,
		headers,
		body: { message: 'success'}
	}
}