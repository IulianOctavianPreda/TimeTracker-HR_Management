/**
 * API Documentation
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UserBase } from './user-base';
import { ProjectBase } from './project-base';


export interface Task { 
    id: string;
    name: string;
    user: UserBase;
    project: ProjectBase;
    date: string;
    duration: number;
}
