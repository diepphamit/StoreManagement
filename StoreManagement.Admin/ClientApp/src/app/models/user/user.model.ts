export class User {
  public id: string;
  public username: string;
  public email: string;
  public groupRole: string;

  constructor(id?: string, username?: string, email?: string, groupRole?: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.groupRole = groupRole;
  }
}

export class UserForList {
  public id: string;
  public username: string;
  public email: string;
  public groupRole: string;

  constructor(id?: string, username?: string, email?: string, groupRole?: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.groupRole = groupRole;
  }
}

