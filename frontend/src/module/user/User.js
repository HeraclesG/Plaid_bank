
export class User {

  constructor(
    id,
    contactId,
    email,
    authToken,
    username,
    permission
  ) {
    this.id = id,
      this.contactId = contactId,
      this.email = email,
      this.authToken = authToken,
      this.username = username,
      this.permission = permission
  }

  static fromJson(loginResponse, email) {
    return new User(
      loginResponse.userId,
      loginResponse.contactId,
      email,
      loginResponse.authToken,
      loginResponse.username,
      loginResponse.permission
    )
  }
}
