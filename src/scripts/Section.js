export default class Section {
  constructor ({data, renderer}, selector) {
    this._renderer = renderer
    this._data = data
    this._selector = document.querySelector(selector)
  }
  renderItems() {
    this._data.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._selector.prepend(element);
  }
}
