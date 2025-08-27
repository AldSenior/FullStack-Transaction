import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { getTokenFromLocaleStorage } from './helpers/localstorage.helper'
import { router } from './router/router'
import { AuthService } from './service/auth.service'
import { login, logout } from './store/user/userSlice'

export default function App() {
	const distpatch = useDispatch()
	const checkAuth = async () => {
		const token = getTokenFromLocaleStorage()
		try {
			if (token) {
				const data = await AuthService.getProfile()
				if (data) {
					distpatch(login(data))
				} else {
					distpatch(logout())
				}
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		checkAuth()
	}, [])
	return <RouterProvider router={router} />
}
