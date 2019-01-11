class NpmInspectorView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('npm-inspector')

    // Create message element
    const message = document.createElement('div')
    message.textContent = 'The NpmInspector package is Alive! It\'s ALIVE!'
    message.classList.add('message')
    this.element.appendChild(message)
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove()
  }

  getElement() {
    return this.element
  }

}

module.exports = NpmInspectorView
