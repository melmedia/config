"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepExtend = require("deep-extend");
class ConfigFileChain {
    constructor(basePath, environment) {
        this.basePath = basePath;
        this.environment = environment;
    }
    getConfig(name, defaults) {
        return deepExtend(defaults, this.readConfigFile(`${this.basePath}/base/${name}.json`), this.readConfigFile(`${this.basePath}/base/${name}.js`), this.readConfigFile(`${this.basePath}/${this.environment}/${name}.json`), this.readConfigFile(`${this.basePath}/${this.environment}/${name}.js`), this.readConfigFile(`${this.basePath}/local/${name}.json`), this.readConfigFile(`${this.basePath}/local/${name}.js`));
    }
    readConfigFile(configPath) {
        try {
            return require(configPath);
        }
        catch (e) {
            return {};
        }
    }
}
exports.ConfigFileChain = ConfigFileChain;
//# sourceMappingURL=ConfigFileChain.js.map