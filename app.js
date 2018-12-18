#!/usr/bin/env node

const program = require('commander');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const server = require('./server');

program
.version('0.0.1')
.option('-p, --p [port]', 'pichi port')
.parse(process.argv);

const inputPort = program.p;

function checkWebRootDirectoryExist() {
  const webPath = path.join(__dirname, 'build');
  try {
    return fs.statSync(webPath).isDirectory();
  }catch (e) {
    if (e.code === 'ENOENT') {
      console.log("WebRoot Directory does not exist.");
    } else {
      console.log(`Error:${e}`);
    }

    return false;
  }
}

if (inputPort) {
  const portReg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  if (portReg.test(inputPort)) {
    if (checkWebRootDirectoryExist()) {
      server.run(inputPort);
    } else {
      console.log('Please wait...');
      exec('react-app-rewired build', (err, stdout, stderr) => {
        if (err) {
          console.log('err');
        } else {
          console.log('Build completed.');
          server.run(inputPort);
        }
      });
    }
  } else {
    console.log('The port number is not formatted correctly');
  }
} else {
  console.log('Please enter pichi port');
}
