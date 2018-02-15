import { ConfigSource } from './ConfigSource';
import * as deepExtend from 'deep-extend';

export class ConfigFileChain implements ConfigSource {
  protected basePath: string;
  protected environment: string;

  constructor(basePath: string, environment: string) {
    this.basePath = basePath;
    this.environment = environment;
  }

  public getConfig(name: string, defaults: object) {
    return deepExtend(
      defaults,
      this.readConfigFile(`${this.basePath}/base/${name}.json`),
      this.readConfigFile(`${this.basePath}/base/${name}.js`),
      this.readConfigFile(`${this.basePath}/${this.environment}/${name}.json`),
      this.readConfigFile(`${this.basePath}/${this.environment}/${name}.js`),
      this.readConfigFile(`${this.basePath}/local/${name}.json`),
      this.readConfigFile(`${this.basePath}/local/${name}.js`),
    );
  }

  protected readConfigFile(configPath: string) {
    try {
      return require(configPath);
    } catch (e) {
      return {};
    }
  }

}
