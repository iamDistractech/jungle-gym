import * as cookie from 'cookie'
import sessionDB from './routes/account/_session'

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
		error: 'SessionDB offline',
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