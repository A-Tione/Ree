const { execSync } = require("child_process");

function runCommand(command: string) {
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Failed to execute command: ${command}`, error);
    process.exit(1);
  }
}

function release(versionType: 'patch' | 'minor' | 'major') {
  runCommand(`npm version ${versionType}`);
  runCommand('git push');
}

const args = process.argv.slice(2);
console.log(1);

release(args[0] as 'patch' | 'minor' | 'major' || 'patch');