import * as Joi from 'joi';

export enum AvailableEnvs {
  Development = 'development',
  Production = 'production',
}

/**
 * Define the environment variables needed to start the API
 */

export const validationSchema = Joi.object({
  ENV: Joi.string()
    .valid(...Object.values(AvailableEnvs))
    .default(AvailableEnvs.Development),
});
