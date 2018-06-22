export interface ILicense {
    licenseNbr: number;
    clubName: string;
    clubId: number;
    fedId: number;
    endDate: string;
    status: number;
}

export interface IAddress {
    number: number;
    street: string;
    postalCode: string;
    city: string;
}

export interface IUser {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: IAddress;
}

export interface IRegister {
    password: string;
    gender: number;
    birthdate: string;
    licenses: Array<ILicense>;
    isAdmin: boolean;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IGrip {
    grip_id: number;
    grip_data: number;
    grip_on: boolean;
}

export interface IPath {
    path_id: number;
    path_free: boolean;
    path_difficulty: string;
    grips: Array<IGrip>;
}

export interface IRoom {
    title: string;
    latitude: number;
    longitude: number;
}

export interface IStat {
    path_id: number;
    path_difficulty: string;
    average_time: number;
    best_time: number;
    best_firstName: string;
    best_lastName: string;
}
