import { injectable } from 'inversify';
import { validate, Validator } from 'class-validator';
import { ConfigSource } from './ConfigSource';

@injectable()
export abstract class Config {

  constructor(configSource: ConfigSource) {
    Object.assign(this, configSource.getConfig(this.getName(), this.defaultConfig));
    this.validate();
  }

  protected abstract getName(): string;

  protected get defaultConfig(): Object {
    return {};
  }

  protected async validate() {
    const errors = await validate(this);
    if (errors.length) {
      throw new Error(
        `Validation failed for config ${this.getName()}, errors: ${JSON.stringify(errors)}`,
      );
    }
  }

  protected validateIpOrHostname(value: string, propertyName: string) {
    const validator = new Validator;
    if (!(validator.isIP(value) || validator.isFQDN(value))) {
      throw new Error(`Config ${this.getName()}: ${propertyName} must be IP or hostname`);
    }
  }

}
