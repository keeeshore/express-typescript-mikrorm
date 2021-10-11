"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNamingStrategy = void 0;
class CustomNamingStrategy {
    constructor() {
    }
    classToMigrationName(timestamp) {
        return timestamp;
    }
    classToTableName(entityName) {
        return entityName.toLowerCase();
    }
    getClassName(file, separator) {
        return file;
    }
    joinColumnName(propertyName) {
        return propertyName.toLowerCase();
    }
    joinKeyColumnName(entityName, referencedColumnName, composite) {
        return referencedColumnName.toLowerCase();
    }
    joinTableName(sourceEntity, targetEntity, propertyName) {
        return propertyName;
    }
    propertyToColumnName(propertyName) {
        return propertyName;
    }
    referenceColumnName() {
        return "";
    }
}
exports.CustomNamingStrategy = CustomNamingStrategy;
//# sourceMappingURL=CustomNamingStrategy.js.map