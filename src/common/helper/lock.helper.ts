import * as fs from 'fs';
import { LOCK } from '@src/common/constant/filename.constant';

export function updateLockFileSync(): void {
  if (!fs.existsSync(LOCK)) {
    fs.writeFileSync(LOCK, JSON.stringify({}, null, 2));
  }
}
