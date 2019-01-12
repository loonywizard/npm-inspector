const { CompositeDisposable } = require('atom')
const opn = require('opn')
const {
  isNodeCoreModule,
  isPathRelative,
  parsePackageName,
  getUrl,
} = require('./utils')

module.exports = {
  subscriptions: null,

  // activate is called when the package is initially loaded by Atom.
  // This function is used to initialize objects such as user interface
  // elements needed by the package, and to subscribe handler
  // functions to package commands
  activate(state) {
    // Events subscribed to in atom's system
    // can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'npm-inspector:openUrl': () => this.openUrl()
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'npm-inspector:copyUrlToClipboard': () => this.copyUrlToClipboard()
    }))
  },

  // deactivate is called when the package is deactivated,
  // for example, when the editor is closed or refreshed by the user.
  deactivate() {
    this.subscriptions.dispose()
  },

  copyUrlToClipboard() {
    const url = getUrl()

    if (url) {
      atom.clipboard.write(url)
      atom.notifications.addSuccess(`Url ${url} was copied to clipboard!`)
    }
  },

  openUrl() {
    try {
      const url = getUrl()

       if (url) {
         open(url)
       }
    } catch (error) {
      atom.notifications.addError('Error')
    }
  }
};
