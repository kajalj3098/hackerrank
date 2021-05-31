declare namespace GitData {
    export interface IUser {
        id: number,
        login: string,
        avatar_url: string,
        repos_url: string
    }

    export interface IUserRepo {
        description: string,
        name: string,
        stargazers_count: number,
        forks: number,
        updated_at: Date
    }
}