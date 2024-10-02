module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  apps: {
    'ios.debug': {
      type: 'ios.app',
      build:
        'xcodebuild -workspace rn_testing_app.xcworkspace -configuration Debug -scheme rn_testing_app -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/MyApp.app',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 11',
      },
    },
  },
  configurations: {
    'ios.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
  },
};
