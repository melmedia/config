import { ConfigSource } from './ConfigSource';

export class ConfigFileChain implements ConfigSource {
  protected basePath: string;
  protected environment: string;

  constructor(basePath: string, environment: string) {
    this.basePath = basePath;
    this.environment = environment;
  }

  public getConfig(name: string, defaults: object) {
    return Object.assign(
      defaults,
      this.readConfigFile(`${this.basePath}/base/${name}.json`),
      this.readConfigFile(`${this.basePath}/${this.environment}/${name}.json`),
      this.readConfigFile(`${this.basePath}/local/${name}.json`),
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
