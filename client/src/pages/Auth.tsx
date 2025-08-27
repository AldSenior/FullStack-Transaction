import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setTokenToLocaleStorage } from '../helpers/localstorage.helper'
import { AuthService } from '../service/auth.service'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
export const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const distpatch = useAppDispatch()
	const navigate = useNavigate()

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({
				email,
				password,
			})
			if (data) {
				setTokenToLocaleStorage('token', data.token)
				distpatch(login(data))
				toast.success('You Logged In')
				navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({
				email,
				password,
			})
			if (data) {
				toast.success('Account has been created.')
				setIsLogin((prev) => !prev)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<div className="mt-40 flex flex-col justify-center  items-center bg-slate-900 text-white">
			<h1 className="text-center  text-xl mb-10 ">
				{isLogin ? 'Login' : 'Register'}
			</h1>
			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className="flex w-1/3 flex-col mx-auto gap-5"
			>
				<input
					type="text"
					className="input"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="input"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="btn btn-green mx-auto">Submit</button>
			</form>

			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin((prev) => !prev)}
						className="text-slate-300 hover:text-white"
					>
						You don't have account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin((prev) => !prev)}
						className="text-slate-300 hover:text-white"
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	)
}
