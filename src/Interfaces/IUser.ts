interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    city: string;
    birth: string;
    biography: string;
    postalCode: string;
    avatar: string;
    id?: number;
    password?: string|null;
};

export default IUser;