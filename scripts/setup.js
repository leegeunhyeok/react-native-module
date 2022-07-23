/**
 * Setup script
 */
const fs = require('fs');
const path = require('path');

const DEFAULT_PROJECT_NAME = 'RNModule';

const ANDROID_PROJECT = {
  basePath: './android',
  beforeRun: [
    (moduleName) => {
      const path = `android/src/main/java/com/${moduleName.toLowerCase()}`;
      if (!fs.existsSync(path)) fs.mkdirSync(path);
    },
  ],
  afterRun: [
    (_moduleName) => {
      fs.rmSync(`android/src/main/java/com/rnmodule`, { recursive: true, force: true });
    },
  ],
  files: [
    'src/main/java/com/rnmodule/RNModuleModule.java',
    'src/main/java/com/rnmodule/RNModulePackage.java',
    'src/main/AndroidManifest.xml',
  ],
};

const IOS_PROJECT_FILES = {
  basePath: './ios',
  beforeRun: [
    (moduleName) => {
      const path_1 = `ios/${moduleName}.xcodeproj`
      const path_2 = `ios/${moduleName}.xcworkspace`
      if (!fs.existsSync(path_1)) fs.mkdirSync(path_1);
      if (!fs.existsSync(path_2)) fs.mkdirSync(path_2);
    },
  ],
  afterRun: [
    (_moduleName) => {
      fs.rmSync('ios/rnmodule.xcodeproj', { recursive: true, force: true });
      fs.rmSync('ios/rnmodule.xcworkspace', { recursive: true, force: true });
    },
  ],
  files: [
    'RNModule.h',
    'RNModule.m',
    'RNModule.podspec',
    'RNModule.swift',
    'RNModule.xcodeproj/project.pbxproj',
    'RNModule.xcworkspace/contents.xcworkspacedata',
  ],
};

function replace(value, searchValue, replaceValue) {
  return value
    .replaceAll(searchValue, replaceValue)
    .replaceAll(
      searchValue.toLowerCase(),
      replaceValue.toLowerCase()
    );
}

function updateFiles (project, moduleName) {
  const basePath = project.basePath;
  const files = project.files;

  files.forEach((file) => {
    const filePath = path.join(basePath, file);
    if (fs.statSync(filePath).isFile()) {
      const data = fs.readFileSync(filePath, 'utf-8');
      fs.writeFileSync(
        filePath,
        replace(data, DEFAULT_PROJECT_NAME, moduleName),
        'utf-8'
      );
    }
    fs.renameSync(filePath, replace(filePath, DEFAULT_PROJECT_NAME, moduleName));
  });
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('enter module name: ', (moduleName) => {
  readline.close();
  [ANDROID_PROJECT, IOS_PROJECT_FILES].forEach((project) => {
    moduleName = moduleName.trim();
    (project.beforeRun ?? []).forEach((runner) => runner(moduleName));
    updateFiles(project, moduleName);
    (project.afterRun ?? []).forEach((runner) => runner(moduleName));
  });
});
 