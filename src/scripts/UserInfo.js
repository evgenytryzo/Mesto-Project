export default class UserInfo {
  constructor (userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userName = userNameSelector
    this._userAbout = userAboutSelector
    this._userAvatar = userAvatarSelector
  }

  getUserInfo () {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent

    }
  }

  setUserInfo ({ name, about, avatar }) {
    this._userName.textContent = name
    this._userAbout.textContent = about
    this._userAvatar.src = avatar
  }
}
