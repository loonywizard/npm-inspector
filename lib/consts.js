const NODE_CORE_MODULES = [
  'assert',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'crypto',
  'dns',
  'dgram',
  'domain',
  'events',
  'fs',
  'http',
  'http2',
  'https',
  'inspector',
  'net',
  'os',
  'path',
  'punycode',
  'querystring',
  'readline',
  'stream',
  'string_decoder',
  'timers',
  'tls',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'zlib',
]

const IMPORT_REGEXP = /from ['"](.+)['"]/
const REQUIRE_REGEXP = /require\(['"](.+)['"]\)/
const PACKAGE_JSON_DEPENDENCY_REGEXP = /['"](.+)['"]\:( *)['"](.+)['"]/

module.exports = {
  NODE_CORE_MODULES,
  IMPORT_REGEXP,
  REQUIRE_REGEXP,
  PACKAGE_JSON_DEPENDENCY_REGEXP,
}
