
import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as objectAssign from 'object-assign';

/**
 * List includes only official statuscodes
 * Last updated: 2017-04-09
 * @see https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 */
const STATUSCODE_MAP = {
    // 1XX Informational responses
    "100": "Continue",
    "101": "Switching Protocols",
    "102": "Processing",

    // 2XX Success
    "200": "OK",
    "201": "Created",
    "202": "Accepted",
    "203": "Non-Authoritative Information",
    "204": "No Content",
    "205": "Reset Content",
    "206": "Partial Content",
    "207": "Multi-Status",
    "208": "Already Reported",
    "226": "IM Used",

    // 3XX Redirection
    "300": "Multiple Choices",
    "301": "Moved Permanently",
    "302": "Found",
    "303": "See Other",
    "304": "Not Modified",
    "305": "Use Proxy",
    "306": "Switch Proxy",
    "307": "Temporary Redirect",
    "308": "Permanent Redirect",

    // 4XX Client errors
    "400": "Bad Request",
    "401": "Unauthorized",
    "402": "Payment Required",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "407": "Proxy Authentication Required",
    "408": "Request Timeout",
    "409": "Conflict",
    "410": "Gone",
    "411": "Length Required",
    "412": "Precondition Failed",
    "413": "Request Entity Too Large",
    "414": "Request-URI Too Long",
    "415": "Unsupported Media Type",
    "416": "Request Range Not Satisfiable",
    "417": "Expectation Failed",
    "418": "I'm a teapot", // :D
    "421": "Misdirected Request",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "424": "Failed Dependency",
    "426": "Upgrade Required",
    "428": "Precondition Required",
    "431": "Request Header Fields Too Large",
    "451": "Unavailable For Legal Reasons",

    // 5XX Server error
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
    "505": "HTTP Version Not Supported",
    "506": "Variant Also Negotiates",
    "507": "Insufficient Storage",
    "508": "Loop Detected",
    "510": "Not Extended",
    "511": "Network Authentication Required"
}

/**
 * Responses the user with passed status code.
 * Status code and message are added as properties to response object.
 * @param statusCode            HTTP statuscode
 * @param customProps      Properties to be added to response object
 */
const sendStatusJson: SendStatusJsonFunction = function (statusCode: number, customProps: object = {}) {
    let statusText = STATUSCODE_MAP['' + statusCode] || '';
    this.status(statusCode);
    this.json(
        objectAssign({}, { status: statusCode, statusText }, customProps)
    );
    return this;
}

export type SendStatusJsonFunction = (statusCode: number, customProps?: object) => Response;

/**
 * Adds sendStatusJson -method to Express's response -object
 * @param req     Express request
 * @param res     Express response
 * @param next    Express next -function
 */
export const sendStatusJsonMiddleware = (): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        (res as any).sendStatusJson = sendStatusJson;
        next();
    }
}