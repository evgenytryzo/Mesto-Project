export default class Section {
  constructor ({renderer}, selector) {
    this._renderer = renderer
    this._selector = document.querySelector(selector)
  }
  renderItems(data) {
    data.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._selector.prepend(element);
  }
}
