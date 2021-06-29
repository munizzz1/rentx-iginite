import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetPasswordController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordController()

passwordRoutes.post('/forgot', sendForgotPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };