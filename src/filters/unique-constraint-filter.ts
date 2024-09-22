import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import e, { Response } from "express";
import path from "path";

export class UniqueConstraintFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        let message = "error"

        if (exception.message.includes('UNIQUE_USERNAME')) {
            message = 'This username already exists. Please choose another one.';
        } else if (exception.message.includes('UNIQUE_EMAIL')) {
            message = 'This email address is already registered. Please use a different one.';
        }

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            error: "Bad Request",
            message: message,
            path: request.url,
        });
    }
}