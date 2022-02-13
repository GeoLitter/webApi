import { check } from 'express-validator';

export const profileValidaton = async () => {
  return [check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty() ]
}