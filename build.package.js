/**
 * @project MyFocus
 * @name build.package
 * @author Pawan Pawar
 * @date 6/10/18 - 9:13 AM
 * @description
 *
 */

const installer = require('electron-installer-debian')

const options = {
  src: 'release-builds/MyFocus-linux-x64/',
  dest: 'release/installers/',
  arch: 'amd64'
}

console.log('Creating package (this may take a while)')

installer(options)
  .then(() => console.log(`Successfully created package at ${options.dest}`))
  .catch(err => {
    console.error(err, err.stack)
    process.exit(1)
  });
