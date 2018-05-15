export interface ILicence {
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

export interface IRegister {
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: number;
    birthday: string;
    licences: Array<ILicence>;
    address: IAddress;
    isAdmin: boolean;
}

export interface ILogin {
    email: string;
    password: string;
}
