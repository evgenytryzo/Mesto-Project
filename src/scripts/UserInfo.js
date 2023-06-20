export default class UserInfo {
  constructor (userNameSelector, userAboutSelector) {
    this._userName = document.querySelector(userNameSelector)
    this._userAbout = document.querySelector(userAboutSelector)
  }

}
