import { ConfigSource } from './ConfigSource';
import { Config } from './Config';

export interface Newable<T> {
  new(...args: any[]): T;
}

export class ConfigFactory {
  protected configSource: ConfigSource;

  constructor(configSource: ConfigSource) {
    this.configSource = configSource;
  }

  public async create<T extends Config>(configConstructor: Newable<T>): Promise<T> {
    const config = new configConstructor;
    Object.assign(
      config,
      this.configSource.getConfig(config.getName(), config.getDefaults()),
    );
    await config.validate();
    return config;
  }

}
