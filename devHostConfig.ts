/** 4.0 版本 */

/**
 * 无特殊说明都是https://
 *
 * php项目域名
 * dev${number}.rrzuji.com 开发服
 * admin${number}.rrzuji.net 测试服
 * admin.rrzu.com 正式服
*/

import type { EnvType } from '@/services/types/data';

const envCommon = 'dev';
// php项目
export const defaultTarget = '4';
export const defaultEnv: EnvType = envCommon;

// mobile项目
export const mobileTarget = '1';
export const mobileEnv: EnvType = envCommon;

// golang项目
export const golangTarget = '1';
export const golangEnv: EnvType = envCommon;



