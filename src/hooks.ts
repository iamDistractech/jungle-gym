import { SESSION_DB_PORT, SESSION_DB_URL } from "$lib/Env";
import { Tedis} from 'tedis'
import * as cookie from 'cookie'
import type { GetSession, Handle } from "@sveltejs/kit";

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

export const handle: Handle = async ({request, render}) => {
	const cookies = cookie.parse(request.headers.cookie || '')

	if(!cookies.session_id) request.locals.authenticated = false
	else {
		request.locals.authenticated = true
		request.locals.session_id = cookies.session_id
	}
	const response = await render(request)

	return response

}

export const getSession: GetSession = async (request) => {
	if(!sessionDB) return {
		user: null,
		error: db_error,
		authenticated: false
	}

	if(request.locals.authenticated && request.locals.session_id) {
		const sessionString = String(await sessionDB.get(request.locals.session_id))
		const user = JSON.parse(sessionString)
		
		return {
			user,
			authenticated: true
		}
	} else return {
		authenticated: false
	}
}