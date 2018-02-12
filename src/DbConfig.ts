import { injectable } from 'inversify';
import { IsNotEmpty, IsString } from 'class-validator';
import { Config } from './Config';

@injectable()
export abstract class DbConfig extends Config {
  public type!: 'postgres';

  @IsNotEmpty()
  public host!: string;

  @IsNotEmpty()
  @IsString()
  public database!: string;

  @IsNotEmpty()
  @IsString()
  public username!: string;

  @IsNotEmpty()
  @IsString()
  public password!: string;

  protected getName(): string {
    return 'db';
  }

  protected get defaultConfig(): Object {
    return {
      type: 'postgres',
      logging: 'all',
      migrations: this.getMigrationPaths(),
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }

  protected abstract getMigrationPaths(): string[];

  protected async validate() {
    super.validate();
    super.validateIpOrHostname(this.host, 'host');
  }

}
