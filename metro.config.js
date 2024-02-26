// const { getDefaultConfig } = require('@expo/metro-config');

const { getDefaultConfig } = require('expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push('cjs');

// module.exports = defaultConfig;


/** @type {import('expo/metro-config').MetroConfig} */ 
const config = getDefaultConfig(__dirname, {
    // [Web-only]: Enables CSS support in Metro.
    isCSSEnabled: true
  });
  
  // Expo 49 issue: default metro config needs to include "mjs"
  // https://github.com/expo/expo/issues/23180
  config.resolver.sourceExts.push("mjs");
  
  module.exports = config;