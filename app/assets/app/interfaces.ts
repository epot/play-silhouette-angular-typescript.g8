// copied from server-side, should be in a new shared module and imported by both
export interface IGoogleProfile {
    kind: 'plus#personOpenIdConnect';
    gender: string;
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    profile: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
    hd: string;
    error?: Error;
}


export interface ILoginData {
    email: string;
    password: string;
}

export interface ITokenUser {
    firstName: string;
    lastName: string;
    email: string;
    fullName?: string;
    displayName?: string;
    picture?: string;
}


export interface IDBUser extends ITokenUser {
    google?: string;
    hash?: string;
}
