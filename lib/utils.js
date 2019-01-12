const {
  NODE_CORE_MODULES,
  IMPORT_REGEXP,
  REQUIRE_REGEXP,
  PACKAGE_JSON_DEPENDENCY_REGEXP,
} = require('./consts')

function isNodeCoreModule(packageName) {
  return NODE_CORE_MODULES.includes(packageName)
}

function isPathRelative(packageName) {
  return packageName[0] === '.'
}

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

function getUrl() {
  const textEditor = atom.workspace.getActiveTextEditor()
  const cursor = textEditor.cursors[0]
  const lineUnderCursor = cursor.getCurrentBufferLine()

  const packageName = parsePackageName(lineUnderCursor)

  if (packageName === null) {
    atom.notifications.addError('Cannot find package name')

    return null
  }

  if (isPathRelative(packageName)) {
    atom.notifications.addError('Found relative path instead of package')

    return null
  }

  const url = isNodeCoreModule(packageName) ?
    `https://nodejs.org/api/${packageName}.html` :
    `https://www.npmjs.com/package/${packageName}`

  return url
}

module.exports = {
  isNodeCoreModule,
  isPathRelative,
  parsePackageName,
  getUrl,
}
