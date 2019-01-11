'use babel';

import { CompositeDisposable } from 'atom';
import got from 'got';
import opn from 'opn';

const IMPORT_REGEXP = /import .+ from ['"](.+)['"]/
const REQUIRE_REGEXP = /require\(['"](.+)['"]\)/
const PACKAGE_JSON_DEPENDENCY_REGEXP = /['"](.+)['"]\:( *)['"](.+)['"]/

function parsePackageName(line) {
  const importRegexpMatch = line.match(IMPORT_REGEXP)
  const requireRegexpMatch = line.match(REQUIRE_REGEXP)
  const packageJsonDependencyRegexpMatch = line.match(PACKAGE_JSON_DEPENDENCY_REGEXP)

  if (importRegexpMatch) {
    return importRegexpMatch[1]
  }

  if (requireRegexpMatch) {
    return requireRegexpMatch[1]
  }

  if (packageJsonDependencyRegexpMatch) {
    return packageJsonDependencyRegexpMatch[1]
  }

  return null
}

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
      const textEditor = atom.workspace.getActiveTextEditor()
      const cursor = textEditor.cursors[0]
      const lineUnderCursor = cursor.getCurrentBufferLine()

      const packageName = parsePackageName(lineUnderCursor)

      if (packageName === null) {
        atom.notifications.addError('Cannot find package name')

        return
      }

      const url = `https://www.npmjs.com/package/${packageName.toLowerCase()}`

      opn(url)
    } catch (error) {
      atom.notifications.addError('Error 🙄')
    }
  }

};
