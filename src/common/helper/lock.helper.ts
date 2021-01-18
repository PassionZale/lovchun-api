import * as fs from 'fs';
import { LOCK } from '@src/common/constant/filename.constant';
import { IUser } from '../interface/user.interface';

export function initLockFile(): void {
  if (!fs.existsSync(LOCK)) {
    fs.writeFileSync(LOCK, JSON.stringify({}, null, 2));
  }
}

export async function getLockFileData(): Promise<IUser> {
  const data = await fs.promises.readFile(LOCK, 'utf-8');
  const user = JSON.parse(data) as IUser;

  return user;
}

export async function setLockFileData(data: IUser): Promise<void> {
  await fs.promises.writeFile(LOCK, JSON.stringify(data, null, 2));
}
