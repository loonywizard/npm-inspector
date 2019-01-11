class NpmInspectorView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('npm-inspector')

    // Create message element
    this.message = document.createElement('div')
    this.message.textContent = 'The NpmInspector package is Alive! It\'s ALIVE!'
    this.message.classList.add('message')
    this.element.appendChild(this.message)
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove()
  }

  getElement() {
    return this.element
  }

  setMessageText(text) {
    this.message.textContent = `${text} (copied to clipboard)`

    atom.clipboard.write(text)
  }
}

module.exports = NpmInspectorView
