#!/usr/bin/env ts-node-script

import { Logger } from '@nestjs/common';
import { prompt } from 'enquirer';
import * as moment from 'moment-timezone';
import * as rimraf from 'rimraf';
import * as fs from 'fs';
import { LOCK } from '@src/common/constant/filename.constant';
import { TIME_FORMAT } from '@src/common/constant/format.constant';
import { encrypt } from '@src/common/helper/bcryptjs.helper';

const logger = new Logger('ADMIN LOCKER');

type ResetAnswer = { admin_reset: boolean };

type AdminAnswers = { admin_username: string; admin_password: string };

(async () => {
  const resetAnswer: ResetAnswer = await prompt({
    type: 'confirm',
    name: 'admin_reset',
    initial: true,
    message: '确定创建管理员吗？',
  });

  const { admin_reset } = resetAnswer;

  if (admin_reset === true) {
    const adminAnswers: AdminAnswers = await prompt([
      {
        required: true,
        type: 'input',
        name: 'admin_username',
        message: '请设置用户名:',
        validate(value): boolean | string {
          if (!value.trim()) {
            return '用户名不能为空';
          }
          return true;
        },
      },
      {
        required: true,
        type: 'password',
        name: 'admin_password',
        message: '请设置密码:',
        validate(value): boolean | string {
          if (!value.trim()) {
            return '密码不能为空';

          }
          return true;
        },
      },
    ]);

    const { admin_username, admin_password } = adminAnswers;

    logger.log(`Removing ${LOCK} file`);
    rimraf.sync(LOCK);

    logger.log(`Creating ${LOCK} file`);

    const locked_at = moment().format(TIME_FORMAT);

    const admin = {
      username: admin_username,
      hashed_password: encrypt(admin_password),
      locked_at,
      login_at: null,
    };

    fs.writeFileSync(LOCK, JSON.stringify(admin, null, 2));

    logger.log(
      `Administrator ${admin_username} has been successful locked at ${locked_at}`,
    );
  }
})();
