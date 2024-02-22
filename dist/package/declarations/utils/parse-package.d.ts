/**
 * Parse repository package.json file into object, providing wrapped error
 * function which may be called by any consumer to throw a consistently
 * formatted error.
 *
 * @summary Parse repository package.json file into object.
 * @param {string} [pathname=package.json] - Path to repo package.json file.
 * @returns {{packageObject:any, packageError:(error:Error)=>never}} Parsed
 *      packageObject returned by JSON.parse method, and packageError function
 *      which allows any consumer of the json file to throw a consistently
 *      formatted error.
 */
export function parsePackage(pathname?: string | undefined): {
    packageObject: any;
    packageError: (error: Error) => never;
};
