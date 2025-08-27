export interface IUserData {
	email: string
	password: string
}

export interface IUser {
	id: number
	email: string
	token: string
}
export interface IResponeUser {
	email: string
	id: number
	createdAt: string
	updatedAt: string
	password: string //потом убрать с бэка
}

export interface IResponseUserData {
	token: string
	user: IResponeUser
}

export interface ICategory {
	title: string
	id: number
	createdAt: string
	updatedAt: string
	transactions?: []
}
export interface IResponseTransactionLoader {
	categories: ICategory[]
	transactions: ITransaction[]
	totalIncome: number
	totalExpense: number
}

export interface ITransaction {
	amount: number
	createdAt: string
	updatedAt: string
	title: string
	type: string
	id: number
	category: ICategory
}
