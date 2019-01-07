'use babel';

import { CompositeDisposable } from 'atom';
import got from 'got';
import opn from 'opn';

const IMPORT_REGEXP = /import .+ from ['"](.+)['"]/
const REQUIRE_REGEXP = /require\(['"](.+)['"]\)/

export default {
  subscriptions: null,

  // activate is called when the package is initially loaded by Atom.
  // This function is used to initialize objects such as user interface
  // elements needed by the package, and to subscribe handler
  // functions to package commands
  activate() {
    // Events subscribed to in atom's system
    // can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'npm-inspector:runPlugin': () => this.runPlugin()
    }));
  },

  // deactivate is called when the package is deactivated,
  // for example, when the editor is closed or refreshed by the user.
  deactivate() {
    this.subscriptions.dispose();
  },

  async runPlugin() {
    try {
      const editor = atom.workspace.getActiveTextEditor()
      const cursor = editor.cursors[0]
      const lineUnderCursor = cursor.getCurrentBufferLine()
      const selection = editor.getSelectedText()

      const packageName = (
        lineUnderCursor.match(IMPORT_REGEXP) && lineUnderCursor.match(IMPORT_REGEXP)[1] ||
        lineUnderCursor.match(REQUIRE_REGEXP) && lineUnderCursor.match(REQUIRE_REGEXP)[1] ||
        selection.match(IMPORT_REGEXP) && selection.match(IMPORT_REGEXP)[1] ||
        selection.match(REQUIRE_REGEXP) && selection.match(REQUIRE_REGEXP)[1]
      )
      const url = `https://www.npmjs.com/package/${packageName.toLowerCase()}`

      opn(url)
    } catch (error) {
      atom.notifications.addError('Error 🙄')
    }
  }

};
