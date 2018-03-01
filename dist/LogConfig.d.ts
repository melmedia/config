import { Config } from './Config';
export declare class LogCategoryConfig {
    type: 'file' | 'console';
    filename: string;
    level: string;
}
export declare class LogConfig extends Config {
    main: LogCategoryConfig;
    access: LogCategoryConfig;
    getName(): string;
    validate(): Promise<void>;
    protected validateCategory(categoryConfig: LogCategoryConfig, category: string): void;
}
