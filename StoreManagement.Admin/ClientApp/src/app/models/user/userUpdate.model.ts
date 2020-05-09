export class UserUpdate {
    public id: string;
    public userName: string;
    public fullName: string;
    public email: string;
    public phoneNumber: string;
    public address: string;
    public gender: boolean;
    public dateOfBirth: Date;

    constructor(id?: string, username?: string, fullname?: string, email?: string,
        phoneNumber?: string, address?: string, gender?: boolean, dateOfBirth?: Date) {
        this.id = id;
        this.userName = username;
        this.fullName = fullname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
    }
}
