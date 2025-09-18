/** 4.0 版本 */

/**
 * 无特殊说明都是https://
 *
 * php项目域名
 * dev${number}.XXX.com 开发服
 * admin${number}.XXX.net 测试服
 * admin.XXX.com 正式服
*/

import type { EnvType } from '@/services/types/data';

const envCommon = 'dev';
// php项目
export const defaultTarget = '4';
export const defaultEnv: EnvType = envCommon;


// golang项目
export const golangTarget = '1';
export const golangEnv: EnvType = envCommon;



