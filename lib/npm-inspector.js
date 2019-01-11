const { CompositeDisposable } = require('atom')
const got = require('got')
const opn = require('opn')
const {
  isNodeCoreModule,
  isPathRelative,
  parsePackageName,
} = require('./utils')

module.exports = {
  subscriptions: null,

  // activate is called when the package is initially loaded by Atom.
  // This function is used to initialize objects such as user interface
  // elements needed by the package, and to subscribe handler
  // functions to package commands
  activate() {
    // Events subscribed to in atom's system
    // can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'npm-inspector:runPlugin': () => this.runPlugin()
    }));
  },

  // deactivate is called when the package is deactivated,
  // for example, when the editor is closed or refreshed by the user.
  deactivate() {
    this.subscriptions.dispose()
  },

  async runPlugin() {
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
