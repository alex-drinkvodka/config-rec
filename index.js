var ini = require('ini'),
    fs = require('fs'),
    merge = require('merge'), original, cloned;

var configFile = process.cwd() + '/config/env.ini';
var localConfig = ini.parse(fs.readFileSync(configFile, 'utf-8'));
var baseConfig = ini.parse(fs.readFileSync(process.cwd() + '/config/main.ini', 'utf-8'));

var config = merge.recursive(baseConfig, localConfig);

/**
 * Config helper module
 */
var configHelper = {

    /**
     * Get param from config
     * You should pass a string where nested elements are comma-separated:
     * getParam('global.auth.userMinLength');
     * 
     * @param {string} key Parameter key
     * @returns {mixed} Parameter value or false if not found
     */
    getParam : function(key) {
        var args = key.split('.');
        var obj = config;
        
        for (var i = 0; i < args.length; i++) {
          if (!obj || !obj.hasOwnProperty(args[i])) {
            return false;
          }
          obj = obj[args[i]];
        }
        
        return obj;
    },
    
    /**
     * Wrapper function to parseInt param
     * 
     * @param {string} key Parameter key
     * @returns {mixed} Parameter value or false if not found
     */
    getIntParam : function(key) {
        var result = this.getParam(key);
        if (result === false) {
            return result;
        } else {
            return parseInt(result);
        }
    },
    
    /**
     * Wrapper function for requesting key by given section
     * 
     * @param {string} section Section name
     * @param {string} key Parameter key
     * @returns {mixed} Parameter value or false if not found
     */
    getSectionParam : function(section, key) {
        return this.getParam(section + '.' + key);
    }
    
};

module.exports = configHelper;