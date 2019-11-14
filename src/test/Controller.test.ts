import { traineeController } from '../controllers/trainee/Controller';
import userController from '../controllers/user/Controller';

describe('Checking to be defined', () => {
    test('===============>Test', () => {
        expect(traineeController.get).toBeDefined();
        expect(traineeController.create).toBeDefined();
        expect(traineeController.update).toBeDefined();
        expect(traineeController.delete).toBeDefined();
        expect(userController.login).toBeDefined();
        expect(userController.getUser).toBeDefined();

      });
  });