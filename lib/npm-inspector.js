'use babel';

import { CompositeDisposable } from 'atom';
import got from 'got';
import opn from 'opn';

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
      const url = 'https://www.npmjs.com/package/react'

      const response = await got(url)

      if (response.statusCode === 200) {
        opn(url)
      } else {
        atom.notifications.addError(`Error while requesting ${url}`)
      }
    } catch (error) {
      atom.notifications.addError('Error 🙄')
    }
  }

};
