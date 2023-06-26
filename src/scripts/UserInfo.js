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

  setUserInfo (info) {
    console.log(info.name)
    this._userName.textContent = info.name
    this._userAbout.textContent = info.about
  }
}
