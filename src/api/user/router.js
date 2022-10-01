import express from 'express';
import { UserController } from './controller';

const router = express.Router();

// http://localhost:3000/api/v1/users?page=1&size=20&sort=username&sort=-id&filter=username|$eq|admin&filter=id|$eq|1

router.get('/', UserController.findAll);

router.post('/', UserController.createOne);

router.patch('/:id', UserController.updateOne);
/**
 *@access /user
 */
export const userRouter = router;
