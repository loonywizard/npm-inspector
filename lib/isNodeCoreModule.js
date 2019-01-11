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

function isNodeCoreModule(packageName) {
  return NODE_CORE_MODULES.includes(packageName)
}

module.exports = isNodeCoreModule
