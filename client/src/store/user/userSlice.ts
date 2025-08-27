import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '../../types/types'

// Define a type for the slice state
interface UserState {
	user: IUser | null
	isAuth: boolean
}

// Define the initial state using that type
const initialState: UserState = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: (state) => {
			state.isAuth = false
			state.user = null
		},
	},
})
export const { login, logout } = userSlice.actions

export default userSlice.reducer
