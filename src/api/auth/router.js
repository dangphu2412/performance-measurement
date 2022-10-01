import express from 'express';
import { AuthController } from './controller';
import { AuthValidator } from './validator';

const router = express.Router();

router.post('/', AuthValidator.loginValidate(), AuthController.login);

/**
 *@access /auth
 */
export const authRouter = router;
