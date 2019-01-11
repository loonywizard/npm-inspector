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

module.exports = {
  isNodeCoreModule,
  isPathRelative,
  parsePackageName,
}
