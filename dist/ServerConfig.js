"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const os = require("os");
const inversify_1 = require("inversify");
const Config_1 = require("./Config");
const class_validator_1 = require("class-validator");
let ServerConfig = class ServerConfig extends Config_1.Config {
    validate() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("validate").call(this);
            _super("validateIpOrHostname").call(this, this.host, 'host');
        });
    }
    getName() {
        return 'server';
    }
};
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ServerConfig.prototype, "host", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Min(1024),
    class_validator_1.Max(65536),
    __metadata("design:type", Number)
], ServerConfig.prototype, "port", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(2),
    class_validator_1.Max(os.cpus().length),
    __metadata("design:type", Number)
], ServerConfig.prototype, "workers", void 0);
ServerConfig = __decorate([
    inversify_1.injectable()
], ServerConfig);
exports.ServerConfig = ServerConfig;
//# sourceMappingURL=ServerConfig.js.map