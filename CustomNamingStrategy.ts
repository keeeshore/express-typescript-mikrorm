import {NamingStrategy} from "@mikro-orm/core";

export class CustomNamingStrategy implements NamingStrategy {

    constructor() {
    }

    classToMigrationName(timestamp: string): string {
        return timestamp;
    }

    classToTableName(entityName: string): string {
        return entityName.toLowerCase();
    }

    getClassName(file: string, separator?: string): string {
        return file;
    }

    joinColumnName(propertyName: string): string {
        return propertyName.toLowerCase();
    }

    joinKeyColumnName(entityName: string, referencedColumnName?: string, composite?: boolean): string {
        return referencedColumnName.toLowerCase();
    }

    joinTableName(sourceEntity: string, targetEntity: string, propertyName: string): string {
        return propertyName;
    }

    propertyToColumnName(propertyName: string): string {
        return propertyName;
    }

    referenceColumnName(): string {
        return "";
    }
}
