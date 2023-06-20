export default class UserInfo {
  constructor (userNameSelector, userAboutSelector) {
    this._userName = userNameSelector
    this._userAbout = userAboutSelector
  }

  getUserInfo () {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
  }

  setUserInfo (name, about) {
    console.log("12")
    this._userName.textContent = name
    this._userAbout.textContent = about
  }
}
