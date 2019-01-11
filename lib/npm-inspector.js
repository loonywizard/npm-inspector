const { CompositeDisposable } = require('atom')
const got = require('got')
const opn = require('opn')
const {
  isNodeCoreModule,
  isPathRelative,
  parsePackageName,
} = require('./utils')
const NpmInspectorView = require('./NpmInspectorView')

module.exports = {
  npmInspectorView: null,
  modalPanel: null,
  subscriptions: null,

  // activate is called when the package is initially loaded by Atom.
  // This function is used to initialize objects such as user interface
  // elements needed by the package, and to subscribe handler
  // functions to package commands
  activate() {
    this.npmInspectorView = new NpmInspectorView(state.npmInspectorViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.npmInspectorView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system
    // can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'npm-inspector:openUrl': () => this.openUrl()
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'npm-inspector:showUrl': () => this.showUrl()
    }))
  },

  // deactivate is called when the package is deactivated,
  // for example, when the editor is closed or refreshed by the user.
  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.npmInspectorView.destroy()
  },

  showUrl() {
    this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
  }

  async openUrl() {
    try {
      const textEditor = atom.workspace.getActiveTextEditor()
      const cursor = textEditor.cursors[0]
      const lineUnderCursor = cursor.getCurrentBufferLine()

      const packageName = parsePackageName(lineUnderCursor)

      if (packageName === null) {
        atom.notifications.addError('Cannot find package name')

        return
      }

      if (isPathRelative(packageName)) {
        atom.notifications.addError('Found relative path instead of package')

        return
      }

      const url = isNodeCoreModule(packageName) ?
        `https://nodejs.org/api/${packageName}.html` :
        `https://www.npmjs.com/package/${packageName}`

       open(url)
    } catch (error) {
      atom.notifications.addError('Error')
    }
  }

};
