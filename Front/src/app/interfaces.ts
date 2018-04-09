export interface IRegister {
    gender: string;
    lastName: string;
    firstName: string;
    birthday: Date;
    email: string;
    password: string;
    created: Date;
}

export interface ILogin {
    email: string;
    password: string;
}
