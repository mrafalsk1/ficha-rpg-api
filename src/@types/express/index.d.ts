export interface RequestUser {
    id: number
    email: string
}

declare global {
    namespace Express {
        interface Request {
            user: RequestUser
        }
    }
}