"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Config_1 = require("./Config");
const class_validator_1 = require("class-validator");
let ServicesConfig = class ServicesConfig extends Config_1.Config {
    validate() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("validate").call(this);
            const validator = new class_validator_1.Validator;
            for (const service in this) {
                if ('function' === typeof service) {
                    continue;
                }
                if (!validator.isURL(this[service])) {
                    throw new Error(`Config ${this.getName()}: ${service} value must be URL`);
                }
            }
        });
    }
    getName() {
        return 'services';
    }
};
ServicesConfig = __decorate([
    inversify_1.injectable()
], ServicesConfig);
exports.ServicesConfig = ServicesConfig;
//# sourceMappingURL=ServicesConfig.js.map