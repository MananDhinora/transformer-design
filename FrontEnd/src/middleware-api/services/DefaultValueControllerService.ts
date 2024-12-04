/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DefaultValuesDTO } from '../models/DefaultValuesDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultValueControllerService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static setValue(
        requestBody: DefaultValuesDTO,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/default/setValue',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param valueType
     * @param authorization
     * @returns any OK
     * @throws ApiError
     */
    public static getValue(
        valueType: string,
        authorization: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/default/getValue/{valueType}',
            path: {
                'valueType': valueType,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
