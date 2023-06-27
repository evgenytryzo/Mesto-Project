export default class Section {
  constructor ({ data, renderer }, selector) {
    this._renderer = renderer
    this._data = data
    this._container = document.querySelector(selector)
  }

  renderItems () {
    this._data.forEach((item) => this._renderer(item))
  }

  addItem (element) {
    this._container.prepend(element)
  }
}
