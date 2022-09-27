/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const api_interfaces_1 = __webpack_require__("./libs/api-interfaces/src/index.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('hello'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof api_interfaces_1.Message !== "undefined" && api_interfaces_1.Message) === "function" ? _a : Object)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _b : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const app_controller_1 = __webpack_require__("./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const core_1 = __webpack_require__("./libs/api/core/src/index.ts");
const config_1 = __webpack_require__("@nestjs/config");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    entities: [
                        core_1.Rider,
                        core_1.Country,
                        core_1.About,
                        core_1.Story,
                        core_1.Result,
                        core_1.AgeCategory,
                        core_1.Race,
                        core_1.User,
                    ],
                    synchronize: true,
                    logging: true,
                }),
            }),
            // TypeOrmModule.forRoot({
            //   type: 'postgres',
            //   host: 'abul.db.elephantsql.com',
            //   port: 5432,
            //   username: 'encsnhea',
            //   password: 'DjjOGRRegOkNJsH6fql1sOxOQqlveYpw',
            //   database: 'encsnhea',
            //   entities: [Rider, Country, About, Story, Result, AgeCategory, Race, User],
            //   synchronize: true,
            //   logging: false,
            // }),
            core_1.RidersModule,
            core_1.CountryModule,
            core_1.AboutModule,
            core_1.StoriesModule,
            core_1.RacesModule,
            core_1.AgeCategoryModule,
            core_1.ResultModule,
            core_1.UserModule,
            core_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to api!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/api/src/environments/environment.prod.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: true,
};


/***/ }),

/***/ "./libs/api-interfaces/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/about.interfaces.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/age-category.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/api.interfaces.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/country.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/dialog.interfaces.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/event.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/race.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/result.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/rider.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/story.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/token-payload.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/request-with-user.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api-interfaces/src/lib/user-exposed.interface.ts"), exports);


/***/ }),

/***/ "./libs/api-interfaces/src/lib/about.interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/age-category.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/api.interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/country.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/dialog.interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/event.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/race.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/request-with-user.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/result.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/rider.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/story.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/token-payload.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api-interfaces/src/lib/user-exposed.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/api/core/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/riders/riders.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/riders/entities/rider.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/country/country.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/about/about.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/about/entities/about.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/stories/stories.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/stories/entities/story.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/age-category/age-category.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/age-category/entities/age-category.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/races/races.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/races/entities/race.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/result/result.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/result/entities/result.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/user/user.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/user/entities/user.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/core/src/lib/auth/auth.module.ts"), exports);


/***/ }),

/***/ "./libs/api/core/src/lib/about/about.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AboutController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const about_service_1 = __webpack_require__("./libs/api/core/src/lib/about/about.service.ts");
const create_about_dto_1 = __webpack_require__("./libs/api/core/src/lib/about/dto/create-about.dto.ts");
const update_about_dto_1 = __webpack_require__("./libs/api/core/src/lib/about/dto/update-about.dto.ts");
let AboutController = class AboutController {
    constructor(aboutService) {
        this.aboutService = aboutService;
    }
    create(createAboutDto) {
        return this.aboutService.create(createAboutDto);
    }
    find() {
        return this.aboutService.find();
    }
    count() {
        return this.aboutService.count();
    }
    update(updateAboutDto) {
        return this.aboutService.update(updateAboutDto);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_about_dto_1.CreateAboutDto !== "undefined" && create_about_dto_1.CreateAboutDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AboutController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AboutController.prototype, "find", null);
tslib_1.__decorate([
    (0, common_1.Get)('count'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AboutController.prototype, "count", null);
tslib_1.__decorate([
    (0, common_1.Patch)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof update_about_dto_1.UpdateAboutDto !== "undefined" && update_about_dto_1.UpdateAboutDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AboutController.prototype, "update", null);
AboutController = tslib_1.__decorate([
    (0, common_1.Controller)('abouttext'),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof about_service_1.AboutService !== "undefined" && about_service_1.AboutService) === "function" ? _c : Object])
], AboutController);
exports.AboutController = AboutController;


/***/ }),

/***/ "./libs/api/core/src/lib/about/about.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AboutModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const about_service_1 = __webpack_require__("./libs/api/core/src/lib/about/about.service.ts");
const about_controller_1 = __webpack_require__("./libs/api/core/src/lib/about/about.controller.ts");
const about_entity_1 = __webpack_require__("./libs/api/core/src/lib/about/entities/about.entity.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
let AboutModule = class AboutModule {
};
AboutModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([about_entity_1.About])],
        controllers: [about_controller_1.AboutController],
        providers: [about_service_1.AboutService],
    })
], AboutModule);
exports.AboutModule = AboutModule;


/***/ }),

/***/ "./libs/api/core/src/lib/about/about.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AboutService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const about_entity_1 = __webpack_require__("./libs/api/core/src/lib/about/entities/about.entity.ts");
let AboutService = class AboutService {
    constructor(aboutRepository) {
        this.aboutRepository = aboutRepository;
    }
    create(createAboutDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((yield this.count()) !== 0) {
                return new common_1.BadRequestException('About text already exists');
            }
            const aboutText = this.aboutRepository.create(createAboutDto);
            return yield this.aboutRepository.save(aboutText);
        });
    }
    count() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.aboutRepository.count();
        });
    }
    find() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.aboutRepository.find();
        });
    }
    update(updateAboutDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const count = yield this.count();
            if (count === 0) {
                return new common_1.BadRequestException("About text cant be updated. Text doesn't exists yet");
            }
            const abouts = yield this.find();
            return yield this.aboutRepository.update(abouts[0].id, updateAboutDto);
        });
    }
};
AboutService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(about_entity_1.About)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AboutService);
exports.AboutService = AboutService;


/***/ }),

/***/ "./libs/api/core/src/lib/about/dto/create-about.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAboutDto = void 0;
class CreateAboutDto {
}
exports.CreateAboutDto = CreateAboutDto;


/***/ }),

/***/ "./libs/api/core/src/lib/about/dto/update-about.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAboutDto = void 0;
const mapped_types_1 = __webpack_require__("@nestjs/mapped-types");
const create_about_dto_1 = __webpack_require__("./libs/api/core/src/lib/about/dto/create-about.dto.ts");
class UpdateAboutDto extends (0, mapped_types_1.PartialType)(create_about_dto_1.CreateAboutDto) {
}
exports.UpdateAboutDto = UpdateAboutDto;


/***/ }),

/***/ "./libs/api/core/src/lib/about/entities/about.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.About = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let About = class About {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], About.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], About.prototype, "text", void 0);
About = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], About);
exports.About = About;


/***/ }),

/***/ "./libs/api/core/src/lib/age-category/age-category.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgeCategoryController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const age_category_service_1 = __webpack_require__("./libs/api/core/src/lib/age-category/age-category.service.ts");
const create_age_category_dto_1 = __webpack_require__("./libs/api/core/src/lib/age-category/dto/create-age-category.dto.ts");
const update_age_category_dto_1 = __webpack_require__("./libs/api/core/src/lib/age-category/dto/update-age-category.dto.ts");
let AgeCategoryController = class AgeCategoryController {
    constructor(ageCategoryService) {
        this.ageCategoryService = ageCategoryService;
    }
    create(createAgeCategoryDto) {
        return this.ageCategoryService.create(createAgeCategoryDto);
    }
    findAll() {
        return this.ageCategoryService.findAll();
    }
    findOne(id) {
        return this.ageCategoryService.findOne(+id);
    }
    update(id, updateAgeCategoryDto) {
        return this.ageCategoryService.update(+id, updateAgeCategoryDto);
    }
    remove(id) {
        return this.ageCategoryService.remove(+id);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_age_category_dto_1.CreateAgeCategoryDto !== "undefined" && create_age_category_dto_1.CreateAgeCategoryDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AgeCategoryController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AgeCategoryController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AgeCategoryController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof update_age_category_dto_1.UpdateAgeCategoryDto !== "undefined" && update_age_category_dto_1.UpdateAgeCategoryDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AgeCategoryController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AgeCategoryController.prototype, "remove", null);
AgeCategoryController = tslib_1.__decorate([
    (0, common_1.Controller)('age-category'),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof age_category_service_1.AgeCategoryService !== "undefined" && age_category_service_1.AgeCategoryService) === "function" ? _c : Object])
], AgeCategoryController);
exports.AgeCategoryController = AgeCategoryController;


/***/ }),

/***/ "./libs/api/core/src/lib/age-category/age-category.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgeCategoryModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const age_category_service_1 = __webpack_require__("./libs/api/core/src/lib/age-category/age-category.service.ts");
const age_category_controller_1 = __webpack_require__("./libs/api/core/src/lib/age-category/age-category.controller.ts");
const age_category_entity_1 = __webpack_require__("./libs/api/core/src/lib/age-category/entities/age-category.entity.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
let AgeCategoryModule = class AgeCategoryModule {
};
AgeCategoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([age_category_entity_1.AgeCategory])],
        controllers: [age_category_controller_1.AgeCategoryController],
        providers: [age_category_service_1.AgeCategoryService],
    })
], AgeCategoryModule);
exports.AgeCategoryModule = AgeCategoryModule;


/***/ }),

/***/ "./libs/api/core/src/lib/age-category/age-category.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgeCategoryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const age_category_entity_1 = __webpack_require__("./libs/api/core/src/lib/age-category/entities/age-category.entity.ts");
let AgeCategoryService = class AgeCategoryService {
    constructor(ageCategoryRepository) {
        this.ageCategoryRepository = ageCategoryRepository;
    }
    create(createAgeCategoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ageCategory = this.ageCategoryRepository.create(createAgeCategoryDto);
            yield this.ageCategoryRepository.save(ageCategory);
            return ageCategory;
        });
    }
    findAll() {
        return this.ageCategoryRepository.find();
    }
    findOne(id) {
        return this.ageCategoryRepository.findOne({ where: { id } });
    }
    update(id, updateAgeCategoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ageCategory = yield this.ageCategoryRepository.findOneBy({ id });
            if (!ageCategory) {
                return;
            }
            return yield this.ageCategoryRepository.update(id, updateAgeCategoryDto);
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ageCategoryRepository.delete(id);
        });
    }
};
AgeCategoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(age_category_entity_1.AgeCategory)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AgeCategoryService);
exports.AgeCategoryService = AgeCategoryService;


/***/ }),

/***/ "./libs/api/core/src/lib/age-category/dto/create-age-category.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAgeCategoryDto = void 0;
class CreateAgeCategoryDto {
}
exports.CreateAgeCategoryDto = CreateAgeCategoryDto;


/***/ }),

/***/ "./libs/api/core/src/lib/age-category/dto/update-age-category.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAgeCategoryDto = void 0;
const mapped_types_1 = __webpack_require__("@nestjs/mapped-types");
const create_age_category_dto_1 = __webpack_require__("./libs/api/core/src/lib/age-category/dto/create-age-category.dto.ts");
class UpdateAgeCategoryDto extends (0, mapped_types_1.PartialType)(create_age_category_dto_1.CreateAgeCategoryDto) {
}
exports.UpdateAgeCategoryDto = UpdateAgeCategoryDto;


/***/ }),

/***/ "./libs/api/core/src/lib/age-category/entities/age-category.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgeCategory = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const result_entity_1 = __webpack_require__("./libs/api/core/src/lib/result/entities/result.entity.ts");
let AgeCategory = class AgeCategory {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], AgeCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AgeCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => result_entity_1.Result, (result) => result.ageCategory),
    tslib_1.__metadata("design:type", Array)
], AgeCategory.prototype, "results", void 0);
AgeCategory = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], AgeCategory);
exports.AgeCategory = AgeCategory;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const api_interfaces_1 = __webpack_require__("./libs/api-interfaces/src/index.ts");
const user_entity_1 = __webpack_require__("./libs/api/core/src/lib/user/entities/user.entity.ts");
const user_service_1 = __webpack_require__("./libs/api/core/src/lib/user/user.service.ts");
const auth_service_1 = __webpack_require__("./libs/api/core/src/lib/auth/auth.service.ts");
const register_dto_1 = __webpack_require__("./libs/api/core/src/lib/auth/dto/register.dto.ts");
const jwt_auth_guard_1 = __webpack_require__("./libs/api/core/src/lib/auth/guards/jwt-auth.guard.ts");
const jwt_refresh_guard_1 = __webpack_require__("./libs/api/core/src/lib/auth/guards/jwt-refresh.guard.ts");
const local_auth_guard_1 = __webpack_require__("./libs/api/core/src/lib/auth/guards/local-auth.guard.ts");
/**
 * AuthController is responsible for handling incoming authentication requests
 * and returning responses to the client. Only exposed properties will be send.
 * See [Expose properties]{@link https://docs.nestjs.com/techniques/serialization#expose-properties}
 */
let AuthController = class AuthController {
    /**
     * Inject authService and userService providers.
     * @param authService
     * @param userService
     */
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    /**
     * Returns the user
     * @description only there for testing. Will be replaced in the future.
     * @param {RequestWithUser} req
     * @returns {UserInterface}
     */
    getUserInformation(req) {
        const user = req.user;
        return user;
    }
    /**
     * Register route
     * @param {RegisterDto} registrationData
     * @returns {Promise<UserInterface>}
     */
    register(registrationData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.register(registrationData);
        });
    }
    /**
     * Login route.
     *
     * Set cookie containing access and refresh tokens and save the refresh
     * token in the db.
     *
     * Return Http Code 200. Default Http Code on Post is 201.
     * @param {RequestWithUser} req
     * @returns {Promise<UserInterface>}
     */
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
            const { cookie: refreshTokenCookie, token: refreshToken } = this.authService.getCookieWithJwtRefreshToken(user.id);
            yield this.userService.setCurrentRefreshToken(refreshToken, user.id);
            req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
            return user;
        });
    }
    /**
     * Logout route.
     *
     * Remove the refresh token in the database and remove tokens from cookie.
     * @param {RequestWithUser} req
     */
    logout(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.userService.removeRefreshToken(req.user.id);
            req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
        });
    }
    /**
     * Refresh route.
     *
     * Set new access token in Cookie if refresh token is valid.
     * @param {RequestWithUser} req
     * @returns {UserInterface}
     */
    refresh(req) {
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(req.user.id);
        req.res.setHeader('Set-Cookie', accessTokenCookie);
        return req.user;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof api_interfaces_1.RequestWithUser !== "undefined" && api_interfaces_1.RequestWithUser) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], AuthController.prototype, "getUserInformation", null);
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof api_interfaces_1.RequestWithUser !== "undefined" && api_interfaces_1.RequestWithUser) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof api_interfaces_1.RequestWithUser !== "undefined" && api_interfaces_1.RequestWithUser) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
tslib_1.__decorate([
    (0, common_1.Get)('refresh'),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.default),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof api_interfaces_1.RequestWithUser !== "undefined" && api_interfaces_1.RequestWithUser) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Object)
], AuthController.prototype, "refresh", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    (0, common_1.SerializeOptions)({
        strategy: 'excludeAll',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _j : Object, typeof (_k = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _k : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./libs/api/core/src/lib/auth/auth.service.ts");
const auth_controller_1 = __webpack_require__("./libs/api/core/src/lib/auth/auth.controller.ts");
const user_module_1 = __webpack_require__("./libs/api/core/src/lib/user/user.module.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const config_1 = __webpack_require__("@nestjs/config");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const jwt_refresh_token_strategy_1 = __webpack_require__("./libs/api/core/src/lib/auth/strategies/jwt-refresh-token.strategy.ts");
const jwt_strategy_1 = __webpack_require__("./libs/api/core/src/lib/auth/strategies/jwt.strategy.ts");
const local_strategy_1 = __webpack_require__("./libs/api/core/src/lib/auth/strategies/local.strategy.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, passport_1.PassportModule, config_1.ConfigModule, jwt_1.JwtModule.register({})],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, jwt_refresh_token_strategy_1.JwtRefreshTokenStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const user_service_1 = __webpack_require__("./libs/api/core/src/lib/user/user.service.ts");
const bcrypt = __webpack_require__("bcrypt");
/**
 * AuthService is responsible for registering and authenticating users, creating
 * cookies and verifying passwords.
 */
let AuthService = class AuthService {
    /**
     * Inject needed providers.
     * @param {UserService} usersService
     * @param {JwtService} jwtService
     * @param {ConfigService} configService
     */
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    /**
     * Register a user.
     * - Hashed password is stored in the database.
     * - Email must not exists in the database.
     * @param {RegisterDto} registrationData defines needed properties.
     * @returns {Promise<UserInterface>}
     */
    register(registrationData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt.hash(registrationData.password, 10);
            try {
                const createdUser = yield this.usersService.create(Object.assign(Object.assign({}, registrationData), { password: hashedPassword }));
                return createdUser;
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.code) === '23505') {
                    // Postgres error code for unique key violation.
                    throw new common_1.HttpException('A user with this email already exists. Use a different email.', common_1.HttpStatus.BAD_REQUEST);
                }
                throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    /**
     * Validate credentials and returns authenticated user.
     * @param {string} email user email address.
     * @param {string} plainPassword plain user password.
     * @throws {HttpException} Error should not be too explicit to prevent attackers from creating list of registered emails.
     * @returns {Promise<UserInterface>} the authenticated user.
     */
    getAuthenticatedUser(email, plainPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.getByEmail(email);
            if (!user) {
                throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
            }
            yield this.verifyPassword(plainPassword, user.password);
            return user;
        });
    }
    /**
     * Verify given passwords.
     * @param {string} plainPassword plain password.
     * @param {string} hashedPassword hashed password.
     * @throws {HttpException} Password must match.
     */
    verifyPassword(plainPassword, hashedPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isPasswordMatching = yield bcrypt.compare(plainPassword, hashedPassword);
            if (!isPasswordMatching) {
                throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    /**
     * Creates Cookie with jwt access token.
     * ToDo: Fidel with Domain, HttpOnly and Path properties.
     * @param {number} userId
     * @returns {string} cookie with access token.
     */
    getCookieWithJwtAccessToken(userId) {
        const payload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
        });
        const maxAge = this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
        const cookie = `Authentication=${token}; Path=/; Max-Age=${maxAge}`;
        return cookie;
    }
    /**
     * Creates Cookie with jwt refresh token.
     * ToDo: Fidel with Domain, HttpOnly and Path properties.
     * @param {number} userId
     * @returns {string} cookie with refresh token.
     */
    getCookieWithJwtRefreshToken(userId) {
        const payload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
        });
        const maxAge = this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
        const cookie = `Refresh=${token}; Path=/; Max-Age=${maxAge}`;
        return {
            cookie,
            token,
        };
    }
    /**
     * Creates Cookie with empty jwt access and refresh token. This cookie should
     * overwrite the old cookie.
     *
     * ! To overwrite the old cookie the domain and path properties must be the
     * ! same ass the original cookie.
     * @returns {string} cookie with empty access and refresh token.
     */
    getCookiesForLogout() {
        return [
            'Authentication=; Path=/; Max-Age=0',
            'Refresh=; Path=/; Max-Age=0',
        ];
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/dto/register.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
/**
 * RegisterDto defines which properties are needed to register a new user.
 */
class RegisterDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
exports.RegisterDto = RegisterDto;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/guards/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
/**
 * JwtAuthGuard checks if access token is valid by using the jwt strategy.
 */
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/guards/jwt-refresh.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
/**
 * JwtRefreshGuard checks if refresh token is valid by using the
 * jwt-refresh-token strategy.
 */
let JwtRefreshGuard = class JwtRefreshGuard extends (0, passport_1.AuthGuard)('jwt-refresh-token') {
};
JwtRefreshGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtRefreshGuard);
exports["default"] = JwtRefreshGuard;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/guards/local-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
/**
 * LocalAuthGuard checks if credentials are correct by using the local strategy.
 */
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/strategies/jwt-refresh-token.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshTokenStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const user_service_1 = __webpack_require__("./libs/api/core/src/lib/user/user.service.ts");
const auth_service_1 = __webpack_require__("./libs/api/core/src/lib/auth/auth.service.ts");
/**
 * JwtRefreshTokenStrategy is used to verify if the request has an valid refresh token.
 * PassportStrategy first verifies the JWT's signature. The validate() method is
 * only called if the token is valid (not expired and signed with our secret).
 */
let JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    /**
     * The constructor extracts the refresh token from the cookie and injects the
     * needed providers.
     * @param {ConfigService} configService
     * @param {UserService} userService
     * @param {AuthService} authService
     */
    constructor(userService, authService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
                },
            ]),
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        });
        this.userService = userService;
        this.authService = authService;
    }
    /**
     * Verify if the refresh token belongs to the user.
     *
     * Because of option passReqToCallback inside the constructor we have access
     * on the request.
     * @param req
     * @param payload
     * @returns
     */
    validate(req, payload) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
            const user = yield this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
            if (!user) {
                req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
            }
            return user;
        });
    }
};
JwtRefreshTokenStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], JwtRefreshTokenStrategy);
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/strategies/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const user_service_1 = __webpack_require__("./libs/api/core/src/lib/user/user.service.ts");
/**
 * JwtStrategy is used to verify if the request has an valid access token.
 * PassportStrategy first verifies the JWT's signature. The validate() method is
 * only called if the token is valid (not expired and signed with our secret).
 */
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    /**
     * The constructor extracts the access token from the cookie and injects the
     * needed providers.
     * @param {ConfigService} configService
     * @param {UserService} userService
     */
    constructor(configService, userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    const access_token = (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Authentication;
                    return access_token;
                },
            ]),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
            ignoreExpiration: false,
            /**
             * Enables the request as a parameter in  validate(). If true validate()
             * should look like this: validate(request: Request, payload: TokenPayload)
             */
            passReqToCallback: false,
        });
        this.userService = userService;
    }
    /**
     * We simply return the authenticated user. Because only we can sign the
     * access token, we have the guarantee that the information in payload are
     * correct and have not been modified. This is true as long as the secret has
     * not been leaked.
     *
     * It's also worth pointing out that this approach leaves us room ('hooks' as
     * it were) to inject other business logic into the process. For example, we
     * could do a database lookup in our validate() method to extract more
     * information about the user, resulting in a more enriched user object being
     * available in our Request. This is also the place we may decide to do
     * further token validation, such as looking up the userId in a list of
     * revoked tokens, enabling us to perform token revocation. The model we've
     * implemented here in our sample code is a fast, "stateless JWT" model, where
     * each API call is immediately authorized based on the presence of a valid
     * JWT, and a small bit of information about the requester (its userId and
     * username) is available in our Request pipeline.
     *
     * ToDo: Uncomment `isActive` when user can activate account following
     * link in registration email
     *
     * @param {TokenPayload} payload
     * @returns Promise<User>
     */
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getById(payload.userId);
            // if (!user.isActive) {
            //   throw new UnauthorizedException('User is not active');
            // }
            return user;
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./libs/api/core/src/lib/auth/strategies/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./libs/api/core/src/lib/auth/auth.service.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_local_1 = __webpack_require__("passport-local");
/**
 * LocalStrategy is used to log user in. It validates the credentials and
 * returns the authenticated user.
 */
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    /**
     * Define the username field in the constructor.
     * @param authService
     */
    constructor(authService) {
        super({
            usernameField: 'email',
        });
        this.authService = authService;
    }
    /**
     * Validate the credentials.
     * @param {string} username
     * @param {string} password
     * @returns  Promise<User>
     */
    validate(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.getAuthenticatedUser(username, password);
            // if (!user.isActive) {
            //   throw new UnauthorizedException('User is not active');
            // }
            return user;
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./libs/api/core/src/lib/country/country.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CountryController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const create_country_dto_1 = __webpack_require__("./libs/api/core/src/lib/country/dto/create-country.dto.ts");
const update_country_dto_1 = __webpack_require__("./libs/api/core/src/lib/country/dto/update-country.dto.ts");
let CountryController = class CountryController {
    constructor(countryService) {
        this.countryService = countryService;
    }
    create(createCountryDto) {
        return this.countryService.create(createCountryDto);
    }
    findAll() {
        return this.countryService.findAll();
    }
    findOneByIso(iso) {
        return this.countryService.findOneByIso(iso);
    }
    findOne(id) {
        return this.countryService.findOne(+id);
    }
    update(id, updateCountryDto) {
        return this.countryService.update(+id, updateCountryDto);
    }
    remove(id) {
        return this.countryService.remove(+id);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_country_dto_1.CreateCountryDto !== "undefined" && create_country_dto_1.CreateCountryDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], CountryController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CountryController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':iso'),
    tslib_1.__param(0, (0, common_1.Param)('iso')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], CountryController.prototype, "findOneByIso", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], CountryController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof update_country_dto_1.UpdateCountryDto !== "undefined" && update_country_dto_1.UpdateCountryDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], CountryController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], CountryController.prototype, "remove", null);
CountryController = tslib_1.__decorate([
    (0, common_1.Controller)('country'),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof country_service_1.CountryService !== "undefined" && country_service_1.CountryService) === "function" ? _c : Object])
], CountryController);
exports.CountryController = CountryController;


/***/ }),

/***/ "./libs/api/core/src/lib/country/country.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CountryModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const country_controller_1 = __webpack_require__("./libs/api/core/src/lib/country/country.controller.ts");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
let CountryModule = class CountryModule {
};
CountryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([country_entity_1.Country])],
        controllers: [country_controller_1.CountryController],
        providers: [country_service_1.CountryService],
    })
], CountryModule);
exports.CountryModule = CountryModule;


/***/ }),

/***/ "./libs/api/core/src/lib/country/country.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CountryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
let CountryService = class CountryService {
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }
    create(createCountryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const country = this.countryRepository.create(createCountryDto);
            yield this.countryRepository.save(country);
            return country;
        });
    }
    findAll() {
        return this.countryRepository.find();
    }
    findOneByIso(iso) {
        return this.countryRepository.find({ where: { iso } });
    }
    findOne(id) {
        return this.countryRepository.findOneBy({ id });
    }
    update(id, updateCountryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const country = yield this.countryRepository.findOneBy({ id });
            if (!country) {
                return;
            }
            return yield this.countryRepository.update(id, updateCountryDto);
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.countryRepository.delete(id);
        });
    }
};
CountryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CountryService);
exports.CountryService = CountryService;


/***/ }),

/***/ "./libs/api/core/src/lib/country/dto/create-country.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCountryDto = void 0;
class CreateCountryDto {
}
exports.CreateCountryDto = CreateCountryDto;


/***/ }),

/***/ "./libs/api/core/src/lib/country/dto/update-country.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCountryDto = void 0;
const mapped_types_1 = __webpack_require__("@nestjs/mapped-types");
const create_country_dto_1 = __webpack_require__("./libs/api/core/src/lib/country/dto/create-country.dto.ts");
class UpdateCountryDto extends (0, mapped_types_1.PartialType)(create_country_dto_1.CreateCountryDto) {
}
exports.UpdateCountryDto = UpdateCountryDto;


/***/ }),

/***/ "./libs/api/core/src/lib/country/entities/country.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Country = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const rider_entity_1 = __webpack_require__("./libs/api/core/src/lib/riders/entities/rider.entity.ts");
const story_entity_1 = __webpack_require__("./libs/api/core/src/lib/stories/entities/story.entity.ts");
let Country = class Country {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Country.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "iso", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_entity_1.Rider, (rider) => rider.country),
    tslib_1.__metadata("design:type", Array)
], Country.prototype, "riders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => story_entity_1.Story, (story) => story.country),
    tslib_1.__metadata("design:type", Array)
], Country.prototype, "stories", void 0);
Country = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Country);
exports.Country = Country;


/***/ }),

/***/ "./libs/api/core/src/lib/races/dto/create-race.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRaceDto = void 0;
class CreateRaceDto {
}
exports.CreateRaceDto = CreateRaceDto;


/***/ }),

/***/ "./libs/api/core/src/lib/races/dto/delete-result.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteResultDto = void 0;
class DeleteResultDto {
}
exports.DeleteResultDto = DeleteResultDto;


/***/ }),

/***/ "./libs/api/core/src/lib/races/dto/update-race.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRaceDto = void 0;
const mapped_types_1 = __webpack_require__("@nestjs/mapped-types");
const create_race_dto_1 = __webpack_require__("./libs/api/core/src/lib/races/dto/create-race.dto.ts");
class UpdateRaceDto extends (0, mapped_types_1.PartialType)(create_race_dto_1.CreateRaceDto) {
}
exports.UpdateRaceDto = UpdateRaceDto;


/***/ }),

/***/ "./libs/api/core/src/lib/races/entities/race.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Race = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
const result_entity_1 = __webpack_require__("./libs/api/core/src/lib/result/entities/result.entity.ts");
let Race = class Race {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Race.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => result_entity_1.Result, (result) => result.race),
    tslib_1.__metadata("design:type", Array)
], Race.prototype, "results", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Race.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Race.prototype, "place", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (country) => country.stories),
    tslib_1.__metadata("design:type", typeof (_a = typeof country_entity_1.Country !== "undefined" && country_entity_1.Country) === "function" ? _a : Object)
], Race.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Race.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Race.prototype, "text", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Race.prototype, "imgNames", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Race.prototype, "podium", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Race.prototype, "show", void 0);
Race = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Race);
exports.Race = Race;


/***/ }),

/***/ "./libs/api/core/src/lib/races/races.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RacesController = exports.storage = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const races_service_1 = __webpack_require__("./libs/api/core/src/lib/races/races.service.ts");
const create_race_dto_1 = __webpack_require__("./libs/api/core/src/lib/races/dto/create-race.dto.ts");
const update_race_dto_1 = __webpack_require__("./libs/api/core/src/lib/races/dto/update-race.dto.ts");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const express_1 = __webpack_require__("express");
const multer_1 = __webpack_require__("multer");
const uuid_1 = __webpack_require__("uuid");
const path = __webpack_require__("path");
const path_1 = __webpack_require__("path");
const create_result_dto_1 = __webpack_require__("./libs/api/core/src/lib/result/dto/create-result.dto.ts");
const delete_result_dto_1 = __webpack_require__("./libs/api/core/src/lib/races/dto/delete-result.dto.ts");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './upload/races',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
let RacesController = class RacesController {
    constructor(racesService) {
        this.racesService = racesService;
    }
    create(createRaceDto) {
        return this.racesService.create(createRaceDto);
    }
    findAll() {
        return this.racesService.findAllChecked();
    }
    findAllShow() {
        return this.racesService.findAll();
    }
    getMap() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.racesService.getMap();
        });
    }
    getYears() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.racesService.getYears();
        });
    }
    getCalendar() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.racesService.getCalendar();
        });
    }
    findOne(id) {
        return this.racesService.findOne(+id);
    }
    update(id, updateRaceDto) {
        return this.racesService.update(+id, updateRaceDto);
    }
    remove(id) {
        return this.racesService.remove(+id);
    }
    uploadProfilePicture(id, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.racesService.addPicture(+id, file.filename);
            return { imagePath: file.filename };
        });
    }
    findProfileImage(fileName, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return res.sendFile((0, path_1.join)(process.cwd(), 'upload/races/' + fileName));
        });
    }
    addResult(id, createResultDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.racesService.addResult(+id, createResultDto);
        });
    }
    deleteResult(id, deleteResultDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.racesService.deleteResult(+id, deleteResultDto.resultId);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_race_dto_1.CreateRaceDto !== "undefined" && create_race_dto_1.CreateRaceDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RacesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RacesController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('all'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RacesController.prototype, "findAllShow", null);
tslib_1.__decorate([
    (0, common_1.Get)('map'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RacesController.prototype, "getMap", null);
tslib_1.__decorate([
    (0, common_1.Get)('years'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RacesController.prototype, "getYears", null);
tslib_1.__decorate([
    (0, common_1.Get)('calendar'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RacesController.prototype, "getCalendar", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RacesController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof update_race_dto_1.UpdateRaceDto !== "undefined" && update_race_dto_1.UpdateRaceDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RacesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RacesController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof express_1.Express !== "undefined" && (_c = express_1.Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RacesController.prototype, "uploadProfilePicture", null);
tslib_1.__decorate([
    (0, common_1.Get)('image/:fileName'),
    tslib_1.__param(0, (0, common_1.Param)('fileName')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RacesController.prototype, "findProfileImage", null);
tslib_1.__decorate([
    (0, common_1.Patch)('add-result/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof create_result_dto_1.CreateResultDto !== "undefined" && create_result_dto_1.CreateResultDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RacesController.prototype, "addResult", null);
tslib_1.__decorate([
    (0, common_1.Patch)('delete-result/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_g = typeof delete_result_dto_1.DeleteResultDto !== "undefined" && delete_result_dto_1.DeleteResultDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RacesController.prototype, "deleteResult", null);
RacesController = tslib_1.__decorate([
    (0, common_1.Controller)('myrace'),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof races_service_1.RacesService !== "undefined" && races_service_1.RacesService) === "function" ? _h : Object])
], RacesController);
exports.RacesController = RacesController;


/***/ }),

/***/ "./libs/api/core/src/lib/races/races.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RacesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const races_service_1 = __webpack_require__("./libs/api/core/src/lib/races/races.service.ts");
const races_controller_1 = __webpack_require__("./libs/api/core/src/lib/races/races.controller.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const race_entity_1 = __webpack_require__("./libs/api/core/src/lib/races/entities/race.entity.ts");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const result_entity_1 = __webpack_require__("./libs/api/core/src/lib/result/entities/result.entity.ts");
const age_category_entity_1 = __webpack_require__("./libs/api/core/src/lib/age-category/entities/age-category.entity.ts");
const riders_service_1 = __webpack_require__("./libs/api/core/src/lib/riders/riders.service.ts");
const rider_entity_1 = __webpack_require__("./libs/api/core/src/lib/riders/entities/rider.entity.ts");
const result_service_1 = __webpack_require__("./libs/api/core/src/lib/result/result.service.ts");
const age_category_service_1 = __webpack_require__("./libs/api/core/src/lib/age-category/age-category.service.ts");
let RacesModule = class RacesModule {
};
RacesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([race_entity_1.Race, country_entity_1.Country, result_entity_1.Result, age_category_entity_1.AgeCategory, rider_entity_1.Rider]),
        ],
        controllers: [races_controller_1.RacesController],
        providers: [
            races_service_1.RacesService,
            country_service_1.CountryService,
            riders_service_1.RidersService,
            result_service_1.ResultService,
            age_category_service_1.AgeCategoryService,
        ],
    })
], RacesModule);
exports.RacesModule = RacesModule;


/***/ }),

/***/ "./libs/api/core/src/lib/races/races.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RacesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const result_service_1 = __webpack_require__("./libs/api/core/src/lib/result/result.service.ts");
const race_entity_1 = __webpack_require__("./libs/api/core/src/lib/races/entities/race.entity.ts");
const fs = __webpack_require__("fs");
let RacesService = class RacesService {
    constructor(raceRepository, countryService, resultService) {
        this.raceRepository = raceRepository;
        this.countryService = countryService;
        this.resultService = resultService;
    }
    create(createRaceDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const race = this.raceRepository.create(createRaceDto);
            if (!race.imgNames) {
                race.imgNames = [];
            }
            const country = yield this.countryService.findOne(createRaceDto.countryId);
            if (!country) {
                return new common_1.NotFoundException(`Country with id ${createRaceDto.countryId} was not found.}`);
            }
            race.country = country;
            race.podium = false;
            const results = [];
            if (createRaceDto.results) {
                for (let i = 0; i < createRaceDto.results.length; i++) {
                    const resultDto = createRaceDto.results[i];
                    try {
                        const result = yield this.resultService.create(resultDto);
                        if (result.acResult < 4 || result.result < 4) {
                            race.podium = true;
                        }
                        results.push(result);
                    }
                    catch (err) {
                        throw new common_1.BadRequestException(err);
                    }
                }
            }
            race.results = results;
            return yield this.raceRepository.save(race);
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.raceRepository.find({
                relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
            });
        });
    }
    findAllChecked() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.raceRepository.find({
                where: { show: true },
                relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
            });
        });
    }
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const race = yield this.raceRepository.findOne({
                where: { id },
                relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
            });
            if (!race) {
                throw new common_1.NotFoundException('Race was not found');
            }
            return race;
        });
    }
    update(id, updateRaceDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const race = yield this.raceRepository.findOneBy({ id });
            if (!race) {
                return;
            }
            if (updateRaceDto.countryId) {
                const countryEntity = yield this.countryService.findOne(updateRaceDto.countryId);
                if (!countryEntity) {
                    throw new common_1.BadRequestException('Country nof found');
                }
                race.country = countryEntity;
            }
            // Remove deleted images
            if (updateRaceDto.imgNames) {
                const diff = race.imgNames.filter((item) => {
                    if (updateRaceDto.imgNames) {
                        return updateRaceDto.imgNames.indexOf(item) < 0;
                    }
                });
                this.deletePictures(diff);
            }
            const newRace = Object.assign(Object.assign({}, race), updateRaceDto);
            yield this.raceRepository.update(id, newRace);
            return newRace;
        });
    }
    remove(id) {
        return this.raceRepository.delete(id);
    }
    getMap() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const races = yield this.findAllChecked();
            const map = {};
            for (const race of races) {
                const year = new Date(race.date).getFullYear();
                if (!map[year]) {
                    map[year] = [];
                }
                map[year].push(race);
            }
            return map;
        });
    }
    getMapAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const races = yield this.findAll();
            const map = {};
            for (const race of races) {
                const year = new Date(race.date).getFullYear();
                if (!map[year]) {
                    map[year] = [];
                }
                map[year].push(race);
            }
            return map;
        });
    }
    getYears() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const map = yield this.getMap();
            return Object.keys(map);
        });
    }
    addPicture(id, filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const story = yield this.raceRepository.findOneBy({ id });
            if (!story) {
                return;
            }
            // Adding new image to array
            let images = story.imgNames;
            if (!images) {
                images = [];
            }
            images.push(filename);
            return yield this.raceRepository.update(id, { imgNames: images });
        });
    }
    deletePictures(filenames) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            filenames.forEach((filename) => {
                this.deletePicture(filename);
            });
        });
    }
    deletePicture(filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const path = './upload/races';
            fs.unlink(`${path}/${filename}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }
    addResult(raceId, createResultDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!raceId || !createResultDto) {
                return;
            }
            try {
                const race = yield this.raceRepository.findOne({
                    where: { id: raceId },
                    relations: ['results', 'results.rider', 'results.ageCategory'],
                });
                if (!race) {
                    return new common_1.NotFoundException('Race was not found');
                }
                const results = race.results;
                const result = yield this.resultService.create(createResultDto);
                if (!result) {
                    return new common_1.NotFoundException('Could not create result entity');
                }
                results.push(result);
                let podium = race.podium;
                if (result.acResult < 4 || result.result < 4) {
                    podium = true;
                }
                return yield this.raceRepository.update(raceId, {
                    podium: podium,
                    // results: results,
                });
            }
            catch (err) {
                console.error(err);
                throw new common_1.BadRequestException(err);
            }
        });
    }
    deleteResult(id, resultId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id || !resultId) {
                return;
            }
            try {
                yield this.resultService.remove(resultId);
                // Check if  podium is still true
                const race = yield this.raceRepository.findOne({
                    where: { id },
                    relations: ['results'],
                });
                if (!race) {
                    return new common_1.NotFoundException('Race was not found');
                }
                let podium = false;
                for (let i = 0; i < race.results.length; i++) {
                    const result = race.results[i];
                    if (result.acResult < 4 || result.result < 4) {
                        podium = true;
                    }
                }
                return yield this.raceRepository.update(id, { podium: podium });
            }
            catch (err) {
                console.error(err);
                throw new common_1.BadRequestException('Something went wrong');
            }
        });
    }
    getCalendar() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const records = {};
            const map = yield this.getMapAll();
            const years = Object.keys(map);
            for (let i = 0; i < years.length; i++) {
                const year = years[i];
                const races = map[year];
                const monthDateRecord = {};
                for (let j = 0; j < races.length; j++) {
                    const race = races[j];
                    if (!race) {
                        continue;
                    }
                    const date = new Date(race.date);
                    const day = date.getDate();
                    const month = date.getMonth();
                    if (!monthDateRecord[month]) {
                        monthDateRecord[month] = {};
                    }
                    if (!monthDateRecord[month][day]) {
                        monthDateRecord[month][day] = [];
                    }
                    let link = 'races/-1';
                    if (race.show) {
                        link = `races/${race.id}`;
                    }
                    monthDateRecord[month][day].push([race.title, link]);
                }
                records[year] = monthDateRecord;
            }
            return records;
        });
    }
};
RacesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(race_entity_1.Race)),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => result_service_1.ResultService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof country_service_1.CountryService !== "undefined" && country_service_1.CountryService) === "function" ? _b : Object, typeof (_c = typeof result_service_1.ResultService !== "undefined" && result_service_1.ResultService) === "function" ? _c : Object])
], RacesService);
exports.RacesService = RacesService;


/***/ }),

/***/ "./libs/api/core/src/lib/result/dto/create-result.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateResultDto = void 0;
class CreateResultDto {
}
exports.CreateResultDto = CreateResultDto;


/***/ }),

/***/ "./libs/api/core/src/lib/result/dto/update-result.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateResultDto = void 0;
const mapped_types_1 = __webpack_require__("@nestjs/mapped-types");
const create_result_dto_1 = __webpack_require__("./libs/api/core/src/lib/result/dto/create-result.dto.ts");
class UpdateResultDto extends (0, mapped_types_1.PartialType)(create_result_dto_1.CreateResultDto) {
}
exports.UpdateResultDto = UpdateResultDto;


/***/ }),

/***/ "./libs/api/core/src/lib/result/entities/result.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const rider_entity_1 = __webpack_require__("./libs/api/core/src/lib/riders/entities/rider.entity.ts");
const age_category_entity_1 = __webpack_require__("./libs/api/core/src/lib/age-category/entities/age-category.entity.ts");
const race_entity_1 = __webpack_require__("./libs/api/core/src/lib/races/entities/race.entity.ts");
let Result = class Result {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Result.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.Rider, (rider) => rider.results),
    tslib_1.__metadata("design:type", typeof (_a = typeof rider_entity_1.Rider !== "undefined" && rider_entity_1.Rider) === "function" ? _a : Object)
], Result.prototype, "rider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Result.prototype, "result", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => age_category_entity_1.AgeCategory, (ageCategory) => ageCategory.results),
    tslib_1.__metadata("design:type", typeof (_b = typeof age_category_entity_1.AgeCategory !== "undefined" && age_category_entity_1.AgeCategory) === "function" ? _b : Object)
], Result.prototype, "ageCategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Result.prototype, "acResult", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => race_entity_1.Race, (race) => race.results, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof race_entity_1.Race !== "undefined" && race_entity_1.Race) === "function" ? _c : Object)
], Result.prototype, "race", void 0);
Result = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Result);
exports.Result = Result;


/***/ }),

/***/ "./libs/api/core/src/lib/result/result.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const result_service_1 = __webpack_require__("./libs/api/core/src/lib/result/result.service.ts");
const create_result_dto_1 = __webpack_require__("./libs/api/core/src/lib/result/dto/create-result.dto.ts");
const update_result_dto_1 = __webpack_require__("./libs/api/core/src/lib/result/dto/update-result.dto.ts");
let ResultController = class ResultController {
    constructor(resultService) {
        this.resultService = resultService;
    }
    create(createResultDto) {
        return this.resultService.create(createResultDto);
    }
    findAll() {
        return this.resultService.findAll();
    }
    findOne(id) {
        return this.resultService.findOne(+id);
    }
    update(id, updateResultDto) {
        return this.resultService.update(+id, updateResultDto);
    }
    remove(id) {
        return this.resultService.remove(+id);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_result_dto_1.CreateResultDto !== "undefined" && create_result_dto_1.CreateResultDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ResultController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ResultController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ResultController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof update_result_dto_1.UpdateResultDto !== "undefined" && update_result_dto_1.UpdateResultDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ResultController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ResultController.prototype, "remove", null);
ResultController = tslib_1.__decorate([
    (0, common_1.Controller)('result'),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof result_service_1.ResultService !== "undefined" && result_service_1.ResultService) === "function" ? _c : Object])
], ResultController);
exports.ResultController = ResultController;


/***/ }),

/***/ "./libs/api/core/src/lib/result/result.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const result_service_1 = __webpack_require__("./libs/api/core/src/lib/result/result.service.ts");
const result_controller_1 = __webpack_require__("./libs/api/core/src/lib/result/result.controller.ts");
const riders_service_1 = __webpack_require__("./libs/api/core/src/lib/riders/riders.service.ts");
const result_entity_1 = __webpack_require__("./libs/api/core/src/lib/result/entities/result.entity.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const rider_entity_1 = __webpack_require__("./libs/api/core/src/lib/riders/entities/rider.entity.ts");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const age_category_service_1 = __webpack_require__("./libs/api/core/src/lib/age-category/age-category.service.ts");
const race_entity_1 = __webpack_require__("./libs/api/core/src/lib/races/entities/race.entity.ts");
const age_category_entity_1 = __webpack_require__("./libs/api/core/src/lib/age-category/entities/age-category.entity.ts");
const races_service_1 = __webpack_require__("./libs/api/core/src/lib/races/races.service.ts");
let ResultModule = class ResultModule {
};
ResultModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([result_entity_1.Result, rider_entity_1.Rider, country_entity_1.Country, race_entity_1.Race, age_category_entity_1.AgeCategory]),
        ],
        controllers: [result_controller_1.ResultController],
        providers: [
            result_service_1.ResultService,
            riders_service_1.RidersService,
            country_service_1.CountryService,
            age_category_service_1.AgeCategoryService,
            races_service_1.RacesService,
        ],
    })
], ResultModule);
exports.ResultModule = ResultModule;


/***/ }),

/***/ "./libs/api/core/src/lib/result/result.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const age_category_service_1 = __webpack_require__("./libs/api/core/src/lib/age-category/age-category.service.ts");
const races_service_1 = __webpack_require__("./libs/api/core/src/lib/races/races.service.ts");
const riders_service_1 = __webpack_require__("./libs/api/core/src/lib/riders/riders.service.ts");
const result_entity_1 = __webpack_require__("./libs/api/core/src/lib/result/entities/result.entity.ts");
let ResultService = class ResultService {
    constructor(resultRepository, riderService, ageCategoryService, raceService) {
        this.resultRepository = resultRepository;
        this.riderService = riderService;
        this.ageCategoryService = ageCategoryService;
        this.raceService = raceService;
    }
    create(createResultDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const race = yield this.raceService.findOne(createResultDto.raceId);
            if (!race) {
                throw new common_1.BadRequestException('Race does not exists');
            }
            const rider = yield this.riderService.findOne(createResultDto.riderId);
            if (!rider) {
                throw new common_1.BadRequestException('Rider does not exists');
            }
            const ageCategory = yield this.ageCategoryService.findOne(createResultDto.ageCategoryId);
            if (!ageCategory) {
                throw new common_1.BadRequestException('Age category does not exists');
            }
            const result = this.resultRepository.create(createResultDto);
            result.rider = rider;
            result.race = race;
            result.ageCategory = ageCategory;
            return yield this.resultRepository.save(result);
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.resultRepository.find({
                relations: ['rider', 'ageCategory', 'race'],
            });
        });
    }
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.resultRepository.findOne({
                where: { id },
                relations: ['rider', 'ageCategory', 'race'],
            });
        });
    }
    findAllIds(ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const results = [];
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const result = yield this.findOne(id);
                if (!result) {
                    continue;
                }
                results.push(result);
            }
            return results;
        });
    }
    update(id, updateResultDto) {
        return `This action updates a #${id} result`;
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.resultRepository.delete(id);
        });
    }
};
ResultService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(result_entity_1.Result)),
    tslib_1.__param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => races_service_1.RacesService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof riders_service_1.RidersService !== "undefined" && riders_service_1.RidersService) === "function" ? _b : Object, typeof (_c = typeof age_category_service_1.AgeCategoryService !== "undefined" && age_category_service_1.AgeCategoryService) === "function" ? _c : Object, typeof (_d = typeof races_service_1.RacesService !== "undefined" && races_service_1.RacesService) === "function" ? _d : Object])
], ResultService);
exports.ResultService = ResultService;


/***/ }),

/***/ "./libs/api/core/src/lib/riders/dto/create-rider.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRiderDto = void 0;
class CreateRiderDto {
}
exports.CreateRiderDto = CreateRiderDto;


/***/ }),

/***/ "./libs/api/core/src/lib/riders/dto/update-rider.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRiderDto = void 0;
const mapped_types_1 = __webpack_require__("@nestjs/mapped-types");
const create_rider_dto_1 = __webpack_require__("./libs/api/core/src/lib/riders/dto/create-rider.dto.ts");
class UpdateRiderDto extends (0, mapped_types_1.PartialType)(create_rider_dto_1.CreateRiderDto) {
}
exports.UpdateRiderDto = UpdateRiderDto;


/***/ }),

/***/ "./libs/api/core/src/lib/riders/entities/rider.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rider = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
const result_entity_1 = __webpack_require__("./libs/api/core/src/lib/result/entities/result.entity.ts");
let Rider = class Rider {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Rider.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Rider.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Rider.prototype, "surname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (country) => country.riders),
    tslib_1.__metadata("design:type", typeof (_a = typeof country_entity_1.Country !== "undefined" && country_entity_1.Country) === "function" ? _a : Object)
], Rider.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: 'profile.jpg',
    }),
    tslib_1.__metadata("design:type", String)
], Rider.prototype, "imgName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => result_entity_1.Result, (result) => result.rider),
    tslib_1.__metadata("design:type", Array)
], Rider.prototype, "results", void 0);
Rider = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Rider);
exports.Rider = Rider;


/***/ }),

/***/ "./libs/api/core/src/lib/riders/riders.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RidersController = exports.storage = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const riders_service_1 = __webpack_require__("./libs/api/core/src/lib/riders/riders.service.ts");
const create_rider_dto_1 = __webpack_require__("./libs/api/core/src/lib/riders/dto/create-rider.dto.ts");
const update_rider_dto_1 = __webpack_require__("./libs/api/core/src/lib/riders/dto/update-rider.dto.ts");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const express_1 = __webpack_require__("express");
const multer_1 = __webpack_require__("multer");
const uuid_1 = __webpack_require__("uuid");
const path = __webpack_require__("path");
const path_1 = __webpack_require__("path");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './upload/riders',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
let RidersController = class RidersController {
    constructor(ridersService) {
        this.ridersService = ridersService;
    }
    create(createRiderDto) {
        return this.ridersService.create(createRiderDto);
    }
    findAll() {
        return this.ridersService.findAll();
    }
    findOne(id) {
        return this.ridersService.findOne(+id);
    }
    update(id, updateRiderDto) {
        return this.ridersService.update(+id, updateRiderDto);
    }
    uploadProfilePicture(id, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.ridersService.updateProfilePicture(+id, file.filename);
            return { imagePath: file.filename };
        });
    }
    deleteProfilePicture(id) {
        return this.ridersService.deleteProfilePicture(+id);
    }
    findProfileImage(fileName, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const fileName = await this.ridersService.getProfilePictureName(+id);
            return res.sendFile((0, path_1.join)(process.cwd(), 'upload/riders/' + fileName));
        });
    }
    remove(id) {
        return this.ridersService.remove(+id);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_rider_dto_1.CreateRiderDto !== "undefined" && create_rider_dto_1.CreateRiderDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RidersController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RidersController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RidersController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof update_rider_dto_1.UpdateRiderDto !== "undefined" && update_rider_dto_1.UpdateRiderDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RidersController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof express_1.Express !== "undefined" && (_c = express_1.Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RidersController.prototype, "uploadProfilePicture", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RidersController.prototype, "deleteProfilePicture", null);
tslib_1.__decorate([
    (0, common_1.Get)('image/:fileName'),
    tslib_1.__param(0, (0, common_1.Param)('fileName')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RidersController.prototype, "findProfileImage", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RidersController.prototype, "remove", null);
RidersController = tslib_1.__decorate([
    (0, common_1.Controller)('riders'),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof riders_service_1.RidersService !== "undefined" && riders_service_1.RidersService) === "function" ? _f : Object])
], RidersController);
exports.RidersController = RidersController;


/***/ }),

/***/ "./libs/api/core/src/lib/riders/riders.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RidersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const riders_service_1 = __webpack_require__("./libs/api/core/src/lib/riders/riders.service.ts");
const riders_controller_1 = __webpack_require__("./libs/api/core/src/lib/riders/riders.controller.ts");
const rider_entity_1 = __webpack_require__("./libs/api/core/src/lib/riders/entities/rider.entity.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
let RidersModule = class RidersModule {
};
RidersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rider_entity_1.Rider, country_entity_1.Country])],
        controllers: [riders_controller_1.RidersController],
        providers: [riders_service_1.RidersService, country_service_1.CountryService],
    })
], RidersModule);
exports.RidersModule = RidersModule;


/***/ }),

/***/ "./libs/api/core/src/lib/riders/riders.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RidersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const rider_entity_1 = __webpack_require__("./libs/api/core/src/lib/riders/entities/rider.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
const typeorm_2 = __webpack_require__("@nestjs/typeorm");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const fs = __webpack_require__("fs");
let RidersService = class RidersService {
    constructor(ridersRepository, countryService) {
        this.ridersRepository = ridersRepository;
        this.countryService = countryService;
    }
    create(createRiderDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rider = this.ridersRepository.create(createRiderDto);
            yield this.ridersRepository.save(rider);
            return rider;
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const riders = yield this.ridersRepository.find({ relations: ['country'] });
            riders.sort((a, b) => {
                return a.id - b.id;
            });
            return riders;
        });
    }
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new common_1.InternalServerErrorException('ID is undefined');
            }
            const rider = yield this.ridersRepository.find({
                where: { id: id },
                relations: ['country'],
            });
            if (rider.length === 0) {
                return;
            }
            return rider[0];
        });
    }
    update(id, updateRiderDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rider = yield this.ridersRepository.findOneBy({ id });
            if (!rider) {
                return;
            }
            const country = updateRiderDto.country;
            if (country) {
                const countryEntity = yield this.countryService.findOne(country.id);
                if (!countryEntity) {
                    return;
                }
                rider.country = countryEntity;
            }
            const newRider = Object.assign(Object.assign({}, rider), updateRiderDto);
            return yield this.ridersRepository.update(id, newRider);
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rider = yield this.ridersRepository.findOneBy({ id });
            if (!rider) {
                return;
            }
            // delete old picture from disk
            this.deleteProfileImage(rider);
            return yield this.ridersRepository.delete(id);
        });
    }
    updateProfilePicture(id, filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rider = yield this.ridersRepository.findOneBy({ id });
            if (!rider) {
                return;
            }
            // delete old picture from disk
            this.deleteProfileImage(rider);
            // updating new filename
            return yield this.ridersRepository.update(id, { imgName: filename });
        });
    }
    deleteProfilePicture(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rider = yield this.ridersRepository.findOneBy({ id });
            if (!rider) {
                return;
            }
            return yield this.ridersRepository.update(id, {
                imgName: 'profile.jpg',
            });
        });
    }
    getProfilePictureName(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rider = yield this.ridersRepository.findOneBy({ id });
            if (!rider) {
                return;
            }
            return rider.imgName;
        });
    }
    deleteProfileImage(rider) {
        // Do not delete default image
        if (rider.imgName === 'profile.jpg') {
            return;
        }
        const path = './upload/riders';
        fs.unlink(`${path}/${rider.imgName}`, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
};
RidersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(rider_entity_1.Rider)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof country_service_1.CountryService !== "undefined" && country_service_1.CountryService) === "function" ? _b : Object])
], RidersService);
exports.RidersService = RidersService;


/***/ }),

/***/ "./libs/api/core/src/lib/stories/dto/create-story.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStoryDto = void 0;
class CreateStoryDto {
}
exports.CreateStoryDto = CreateStoryDto;


/***/ }),

/***/ "./libs/api/core/src/lib/stories/dto/update-story.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStoryDto = void 0;
const mapped_types_1 = __webpack_require__("@nestjs/mapped-types");
const create_story_dto_1 = __webpack_require__("./libs/api/core/src/lib/stories/dto/create-story.dto.ts");
class UpdateStoryDto extends (0, mapped_types_1.PartialType)(create_story_dto_1.CreateStoryDto) {
}
exports.UpdateStoryDto = UpdateStoryDto;


/***/ }),

/***/ "./libs/api/core/src/lib/stories/entities/story.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Story = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
let Story = class Story {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Story.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Story.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Story.prototype, "place", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (country) => country.stories),
    tslib_1.__metadata("design:type", typeof (_a = typeof country_entity_1.Country !== "undefined" && country_entity_1.Country) === "function" ? _a : Object)
], Story.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Story.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Story.prototype, "text", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Story.prototype, "imgNames", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Story.prototype, "podium", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Story.prototype, "show", void 0);
Story = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Story);
exports.Story = Story;


/***/ }),

/***/ "./libs/api/core/src/lib/stories/stories.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoriesController = exports.storage = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const stories_service_1 = __webpack_require__("./libs/api/core/src/lib/stories/stories.service.ts");
const create_story_dto_1 = __webpack_require__("./libs/api/core/src/lib/stories/dto/create-story.dto.ts");
const update_story_dto_1 = __webpack_require__("./libs/api/core/src/lib/stories/dto/update-story.dto.ts");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const express_1 = __webpack_require__("express");
const multer_1 = __webpack_require__("multer");
const uuid_1 = __webpack_require__("uuid");
const path = __webpack_require__("path");
const path_1 = __webpack_require__("path");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './upload/stories',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
let StoriesController = class StoriesController {
    constructor(storiesService) {
        this.storiesService = storiesService;
    }
    create(createStoryDto) {
        return this.storiesService.create(createStoryDto);
    }
    findAll() {
        return this.storiesService.findAllChecked();
    }
    findAllShow() {
        return this.storiesService.findAll();
    }
    getMap() {
        return this.storiesService.getMap();
    }
    getYears() {
        return this.storiesService.getYears();
    }
    getCalendar() {
        return this.storiesService.getCalendar();
    }
    findOne(id) {
        return this.storiesService.findOne(+id);
    }
    update(id, updateStoryDto) {
        return this.storiesService.update(+id, updateStoryDto);
    }
    remove(id) {
        return this.storiesService.remove(+id);
    }
    uploadProfilePicture(id, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.storiesService.addPicture(+id, file.filename);
            return { imagePath: file.filename };
        });
    }
    findProfileImage(fileName, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return res.sendFile((0, path_1.join)(process.cwd(), 'upload/stories/' + fileName));
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_story_dto_1.CreateStoryDto !== "undefined" && create_story_dto_1.CreateStoryDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('all'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "findAllShow", null);
tslib_1.__decorate([
    (0, common_1.Get)('map'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "getMap", null);
tslib_1.__decorate([
    (0, common_1.Get)('years'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "getYears", null);
tslib_1.__decorate([
    (0, common_1.Get)('calendar'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "getCalendar", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof update_story_dto_1.UpdateStoryDto !== "undefined" && update_story_dto_1.UpdateStoryDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], StoriesController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof express_1.Express !== "undefined" && (_c = express_1.Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoriesController.prototype, "uploadProfilePicture", null);
tslib_1.__decorate([
    (0, common_1.Get)('image/:fileName'),
    tslib_1.__param(0, (0, common_1.Param)('fileName')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoriesController.prototype, "findProfileImage", null);
StoriesController = tslib_1.__decorate([
    (0, common_1.Controller)('story'),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof stories_service_1.StoriesService !== "undefined" && stories_service_1.StoriesService) === "function" ? _f : Object])
], StoriesController);
exports.StoriesController = StoriesController;


/***/ }),

/***/ "./libs/api/core/src/lib/stories/stories.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoriesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const stories_service_1 = __webpack_require__("./libs/api/core/src/lib/stories/stories.service.ts");
const stories_controller_1 = __webpack_require__("./libs/api/core/src/lib/stories/stories.controller.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const story_entity_1 = __webpack_require__("./libs/api/core/src/lib/stories/entities/story.entity.ts");
const country_entity_1 = __webpack_require__("./libs/api/core/src/lib/country/entities/country.entity.ts");
let StoriesModule = class StoriesModule {
};
StoriesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([story_entity_1.Story, country_entity_1.Country])],
        controllers: [stories_controller_1.StoriesController],
        providers: [stories_service_1.StoriesService, country_service_1.CountryService],
    })
], StoriesModule);
exports.StoriesModule = StoriesModule;


/***/ }),

/***/ "./libs/api/core/src/lib/stories/stories.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoriesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const country_service_1 = __webpack_require__("./libs/api/core/src/lib/country/country.service.ts");
const story_entity_1 = __webpack_require__("./libs/api/core/src/lib/stories/entities/story.entity.ts");
const fs = __webpack_require__("fs");
let StoriesService = class StoriesService {
    constructor(storiesRepository, countryService) {
        this.storiesRepository = storiesRepository;
        this.countryService = countryService;
    }
    create(createStoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const story = this.storiesRepository.create(createStoryDto);
            if (!story.imgNames) {
                story.imgNames = [];
            }
            return yield this.storiesRepository.save(story);
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.storiesRepository.find({ relations: ['country'] });
        });
    }
    findAllChecked() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.storiesRepository.find({
                where: { show: true },
                relations: ['country'],
            });
        });
    }
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const story = yield this.storiesRepository.findOne({
                where: { id },
                relations: ['country'],
            });
            if (!story) {
                return new common_1.NotFoundException();
            }
            return story;
        });
    }
    update(id, updateStoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const story = yield this.storiesRepository.findOneBy({ id });
            if (!story) {
                return;
            }
            const country = updateStoryDto.country;
            if (country) {
                const countryEntity = yield this.countryService.findOne(country.id);
                if (!countryEntity) {
                    return;
                }
                story.country = countryEntity;
            }
            // Remove deleted images
            if (updateStoryDto.imgNames) {
                const diff = story.imgNames.filter((item) => {
                    if (updateStoryDto.imgNames) {
                        return updateStoryDto.imgNames.indexOf(item) < 0;
                    }
                });
                this.deletePictures(diff);
            }
            const newStory = Object.assign(Object.assign({}, story), updateStoryDto);
            yield this.storiesRepository.update(id, newStory);
            return newStory;
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const story = yield this.storiesRepository.findOneBy({ id });
            if (!story) {
                return;
            }
            this.deletePictures(story.imgNames);
            return yield this.storiesRepository.delete({ id });
        });
    }
    addPicture(id, filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const story = yield this.storiesRepository.findOneBy({ id });
            if (!story) {
                return;
            }
            // Adding new image to array
            let images = story.imgNames;
            if (!images) {
                images = [];
            }
            images.push(filename);
            return yield this.storiesRepository.update(id, { imgNames: images });
        });
    }
    deletePictures(filenames) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            filenames.forEach((filename) => {
                this.deletePicture(filename);
            });
        });
    }
    deletePicture(filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const path = './upload/stories';
            fs.unlink(`${path}/${filename}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }
    getMap() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const stories = yield this.findAllChecked();
            const map = {};
            for (const story of stories) {
                const year = new Date(story.date).getFullYear();
                if (!map[year]) {
                    map[year] = [];
                }
                map[year].push(story);
            }
            return map;
        });
    }
    getMapAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const stories = yield this.findAll();
            const map = {};
            for (const story of stories) {
                const year = new Date(story.date).getFullYear();
                if (!map[year]) {
                    map[year] = [];
                }
                map[year].push(story);
            }
            return map;
        });
    }
    getYears() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const map = yield this.getMap();
            return Object.keys(map);
        });
    }
    getCalendar() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const records = {};
            const map = yield this.getMapAll();
            const years = Object.keys(map);
            for (let i = 0; i < years.length; i++) {
                const year = years[i];
                const stories = map[year];
                const monthDateRecord = {};
                for (let j = 0; j < stories.length; j++) {
                    const story = stories[j];
                    if (!story) {
                        continue;
                    }
                    const date = new Date(story.date);
                    const day = date.getDate();
                    const month = date.getMonth();
                    if (!monthDateRecord[month]) {
                        monthDateRecord[month] = {};
                    }
                    if (!monthDateRecord[month][day]) {
                        monthDateRecord[month][day] = [];
                    }
                    let link = 'stories/-1';
                    if (story.show) {
                        link = `stories/${story.id}`;
                    }
                    monthDateRecord[month][day].push([story.title, link]);
                }
                records[year] = monthDateRecord;
            }
            return records;
        });
    }
};
StoriesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(story_entity_1.Story)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof country_service_1.CountryService !== "undefined" && country_service_1.CountryService) === "function" ? _b : Object])
], StoriesService);
exports.StoriesService = StoriesService;


/***/ }),

/***/ "./libs/api/core/src/lib/user/entities/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const class_transformer_1 = __webpack_require__("class-transformer");
/**
 * User class representing a user entity.
 */
let User = class User {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "currentHashedRefreshToken", void 0);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['email'])
], User);
exports.User = User;


/***/ }),

/***/ "./libs/api/core/src/lib/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const api_interfaces_1 = __webpack_require__("./libs/api-interfaces/src/index.ts");
const jwt_auth_guard_1 = __webpack_require__("./libs/api/core/src/lib/auth/guards/jwt-auth.guard.ts");
const user_service_1 = __webpack_require__("./libs/api/core/src/lib/user/user.service.ts");
/**
 * UsersController is responsible for handling incoming user requests
 * and returning responses to the client. Only exposed properties will be send.
 * See [Expose properties]{@link https://docs.nestjs.com/techniques/serialization#expose-properties}
 */
let UserController = class UserController {
    /**
     * Inject needed provider.
     * @param {UsersService} usersService
     */
    constructor(usersService) {
        this.usersService = usersService;
    }
    /**
     * Return the user belonging to the given jwt.
     * @param {RequestWithUser} req
     * @returns {UserInterface}
     */
    getProfile(req) {
        return this.usersService.getById(req.user.id);
    }
    /**
     * Return the user belonging to the given id.
     * @param {number} id
     * @returns {UserInterface}
     */
    getProfileById(id) {
        return this.usersService.getById(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof api_interfaces_1.RequestWithUser !== "undefined" && api_interfaces_1.RequestWithUser) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "getProfile", null);
tslib_1.__decorate([
    (0, common_1.Get)('profile/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "getProfileById", null);
UserController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.SerializeOptions)({
        strategy: 'excludeAll',
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _d : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./libs/api/core/src/lib/user/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const user_entity_1 = __webpack_require__("./libs/api/core/src/lib/user/entities/user.entity.ts");
const user_controller_1 = __webpack_require__("./libs/api/core/src/lib/user/user.controller.ts");
const user_service_1 = __webpack_require__("./libs/api/core/src/lib/user/user.service.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./libs/api/core/src/lib/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const user_entity_1 = __webpack_require__("./libs/api/core/src/lib/user/entities/user.entity.ts");
const bcrypt = __webpack_require__("bcrypt");
/**
 * UsersService is responsible for interacting with the user database.
 */
let UserService = class UserService {
    /**
     * Inject needed provider.
     * @param {Repository<UserInterface>} usersRepository
     */
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    /**
     * Find user with the given email.
     * @param {string} email
     * @returns {Promise<UserInterface>}
     */
    getByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ where: { email } });
            return user;
        });
    }
    /**
     * Find user with the given id.
     * @param {number} id
     * @returns {Promise<UserInterface>}
     */
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.findOne({ where: { id } });
        });
    }
    /**
     * Create a user with the given properties.
     * @param {CreateUserDto} userData
     * @returns {Promise<UserInterface>}
     */
    create(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = this.usersRepository.create(userData);
            yield this.usersRepository.save(newUser);
            return newUser;
        });
    }
    /**
     * Save the given refresh token in the database
     * @param {string} refreshToken
     * @param {number} userId
     */
    setCurrentRefreshToken(refreshToken, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentHashedRefreshToken = yield bcrypt.hash(refreshToken, 10);
            yield this.usersRepository.update({ id: userId }, {
                currentHashedRefreshToken,
            });
        });
    }
    /**
     * Remove the given user's refresh token.
     * @param {number} userId
     * @returns {Promise<UpdateResult>}
     */
    removeRefreshToken(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.usersRepository.update({ id: userId }, {
                currentHashedRefreshToken: null,
            });
        });
    }
    /**
     * Verify whether the saved refresh token of the user with the given id
     * matches the given refresh token.
     * @param {string} refreshToken
     * @param {number} userId
     * @returns {Promise<User>}
     */
    getUserIfRefreshTokenMatches(refreshToken, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.getById(userId);
            if (!user) {
                throw new common_1.HttpException(`User with id ${userId} does not exists`, common_1.HttpStatus.BAD_REQUEST);
            }
            const isRefreshTokenMatching = yield bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
            if (isRefreshTokenMatching) {
                return user;
            }
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mapped-types":
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "multer":
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const core_1 = __webpack_require__("@nestjs/core");
const cookieParser = __webpack_require__("cookie-parser");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
const environment_prod_1 = __webpack_require__("./apps/api/src/environments/environment.prod.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        if (environment_prod_1.environment.production) {
            app.enableCors();
        }
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
        app.use(cookieParser());
        const globalPrefix = 'tfb';
        app.setGlobalPrefix(globalPrefix);
        const configService = app.get(config_1.ConfigService);
        const port = configService.get('PORT') || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map