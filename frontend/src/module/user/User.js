
export class User {

  constructor(
    id,
    contactId,
    email,
    authToken,
    username,
    midvalue,
    midprice,
    cash_num,
    permission
  ) {
    this.id = id,
      this.contactId = contactId,
      this.email = email,
      this.authToken = authToken,
      this.midvalue = midvalue,
      this.midprice = midprice,
      this.username = username,
      this.cash_num = cash_num,
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
      loginResponse.cash_num,
      loginResponse.permission
    )
  }
}
