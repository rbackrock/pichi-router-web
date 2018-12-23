#!/usr/bin/env node

const program = require('commander');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

program
.version('0.0.1')
.option('-p, --p [port]', 'pichi port')
.parse(process.argv);

const inputPort = program.p ? program.p : process.argv[2];

if (inputPort) {
  const portReg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  if (portReg.test(inputPort)) {
    const proxyConfigPath = path.join(__dirname, 'proxy-config.json');
    const proxyConfigWriteStream = fs.createWriteStream(proxyConfigPath);
    const config = {
      port: inputPort
    };

    proxyConfigWriteStream.end(JSON.stringify(config));

    proxyConfigWriteStream.on('error', (error) => {
      console.log(`sorry error: ${error}`);
    });

    proxyConfigWriteStream.on('finish', () => {
      exec('react-app-rewired start', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
        }
      });
    });
  } else {
    console.log('The port number is not formatted correctly');
  }
} else {
  console.log('Please enter pichi port');
}
