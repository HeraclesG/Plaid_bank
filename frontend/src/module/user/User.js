
export class User {

  constructor(
    id,
    contactId,
    email,
    authToken,
    username,
    midvalue,
    midprice,
    permission
  ) {
    this.id = id,
      this.contactId = contactId,
      this.email = email,
      this.authToken = authToken,
      this.midvalue = midvalue,
      this.midprice = midprice,
      this.username = username,
      this.permission = permission
  }

  static fromJson(loginResponse, email) {
    return new User(
      loginResponse.id,
      loginResponse.contactId,
      email,
      loginResponse.authToken,
      loginResponse.username,
      loginResponse.midvalue,
      loginResponse.midprice,
      loginResponse.permission
    )
  }
}
