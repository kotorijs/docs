import fs from 'fs';
import http from 'http';
import needle from 'needle';
import YAML from 'yaml';

export interface obj {
    [key: string]: any
}

export const _const: obj = (function () {
    let _ROOT_PATH = __dirname + '\\..';
    if (!fs.existsSync(`${_ROOT_PATH}\\config.yml`)) {
        _ROOT_PATH += '\\..';
    }

    return {
        _ROOT_PATH,
        _PLUGIN_PATH: `${_ROOT_PATH}\\plugins`,
        _CONFIG_PATH: `${_ROOT_PATH}\\config`,
        _DATA_PATH: `${_ROOT_PATH}\\data`,
        _LOGS_PATH: `${_ROOT_PATH}\\logs`,
    }
})();

export function loadConfig(filename: string, type: 'json' | 'yaml' | 'xml' | 'ini' = 'json') {
    const data: string = fs.readFileSync(filename).toString()
    try {
        if (type === 'yaml') return YAML.parse(data);
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
}

export function saveConfig(filename: string, data: obj, type: 'json' | 'yaml' | 'xml' | 'ini' = 'json') {
    let content: string = '';
    try {
        if (type === 'json') content = JSON.stringify(data);
        if (type === 'yaml') content = YAML.stringify(data);
        return fs.writeFileSync(filename, content);
    } catch (err) {
        console.error(err);
    }
}

export function stringProcess(str: string | number, key: string | number | Array<string | number>, mode: 0 | 1 | 2 = 0): boolean {
    if (typeof str === 'number') str = str.toString();
    if (typeof key === 'string' || typeof key === 'number') {
        key = key.toString()
        if (mode === 2) {
            return str === key
        } else if (mode === 1) {
            return str.includes(key)
        } else {
            return str.startsWith(key)
        }
    } else if (Array.isArray(key)) {
        for (let i = 0; i < key.length; i++) {
            let element = key[i]
            if (typeof element === 'string' || typeof element === 'number') {
                element = element.toString()
            }
            if (mode === 2) {
                if (str === element) {
                    return true
                }
            } else if (mode === 1 && str.includes(element)) {
                return true;
            } else if (mode === 0 && str.startsWith(element)) {
                return true;
            }
        }
    }
    return false
};

export function arrayProcess(arr: (string | number)[], key: string | number | Array<string | number>, mode: 0 | 1 | 2 = 0): boolean {
    for (let a = 0; a < arr.length; a++) {
        if (stringProcess(arr[a], key, mode)) return true;
    }
    return false;
};

export function stringSplit(str: string, key: string): string {
    const index = str.indexOf(key)
    if (index !== -1) {
        return str.slice(index + key.length)
    } else {
        return str
    }
};

export function formatTime(time?: Date | null, format: Number = 0): string {
    if (!time) time = new Date();
    let result: string = '';
    if (format === 0) {
        result += `${time.getFullYear().toString().substring(2)}/`;
        result += `${time.getMonth() + 1}/${time.getDate()} `;
        result += `${time.getHours()}:${time.getMinutes()}:${time.getMinutes()}`
    } else if (format === 1) {
        result += `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    }
    return result;
}

export class _console {
    private static colorList: obj = {
        'default': '\x1B[0m', // 亮色
        'bright': '\x1B[1m', // 亮色
        'grey': '\x1B[2m', // 灰色
        'italic': '\x1B[3m', // 斜体
        'underline': '\x1B[4m', // 下划线
        'reverse': '\x1B[7m', // 反向
        'hidden': '\x1B[8m', // 隐藏
        'black': '\x1B[30m', // 黑色
        'red': '\x1B[31m', // 红色
        'green': '\x1B[32m', // 绿色
        'yellow': '\x1B[33m', // 黄色
        'blue': '\x1B[34m', // 蓝色
        'magenta': '\x1B[35m', // 品红
        'cyan': '\x1B[36m', // 青色
        'white': '\x1B[37m', // 白色
        'blackBG': '\x1B[40m', // 背景色为黑色
        'redBG': '\x1B[41m', // 背景色为红色
        'greenBG': '\x1B[42m', // 背景色为绿色
        'yellowBG': '\x1B[43m', // 背景色为黄色
        'blueBG': '\x1B[44m', // 背景色为蓝色
        'magentaBG': '\x1B[45m', // 背景色为品红
        'cyanBG': '\x1B[46m', // 背景色为青色
        'whiteBG': '\x1B[47m' // 背景色为白色
    };
    public static prefixColor: string = 'blue';
    public static logsFilePath: string = _const._LOGS_PATH;

    public static originalLog = (__console: Function, type: string, typeColor: string, textColor: string, ...args: obj[]) => {
        let message: string = '';
        args[0].forEach((Element: any) => {
            if (typeof Element === 'object') Element = JSON.stringify(Element);
            message += Element + ' '
            // }
            message.slice(0, -1)
        })
        // __console(args)

        const time = formatTime();
        let result: string = `${this.colorList[this.prefixColor]}${time}${this.colorList.default} `
        result += `[${this.colorList[typeColor]}${type}${this.colorList.default}] `
        result += `${this.colorList[textColor] || ''}${message}${this.colorList.default}`;
        __console(result);

        // 写入日志
        let logFile: string = `${this.logsFilePath}\\${formatTime(null, 1)}.log`;
        if (!fs.existsSync(logFile)) {
            fs.writeFileSync(logFile, '')
        }
        let content: string = `${time} ${type} ${message}`;
        fs.appendFileSync(logFile, content + '\n')
    };

    public static log = (__console: Function, ...args: any) => {
        this.originalLog(__console, 'LOG', 'cyan', '', args)
    };
    public static info = (__console: Function, ...args: any) => {
        this.originalLog(__console, 'INFO', 'green', '', args)
    };
    /* public static info = (__console: Function, ...args: any) => {
        _console.log(__console, ...args)
    }; */
    public static warn = (__console: Function, ...args: any) => {
        this.originalLog(__console, 'WARM', 'yellow', 'yellow', args)
    };
    public static error = (__console: Function, ...args: any) => {
        this.originalLog(__console, 'ERROR', 'red', 'red', args)
    };
}

export class request {
    public static send = (type: 'get' | 'post', url: string, params?: obj) => {
        let paramsStr: string = '?';
        for (let key in params) {
            paramsStr += `${key}=${params[key]}&`;
        }
        paramsStr.substring(0, -1);
        const options = {
            method: {get:'GET',post:"POST"}[type],
            url,
            params
        }
        return new Promise((resolve, reject) => {
            let req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        });

    };

    public static get = (url: string, params?: obj) => request.send('get', url, params);
    public static post = (url: string, params?: obj) => request.send('post', url, params);
}

export function getPackageInfo() {
    return loadConfig(`${_const._ROOT_PATH}\\package.json`);
}

(function () {
    console.info('Kotori Bot is loading...')
    console.info(`
██╗  ██╗ ██████╗ ████████╗ ██████╗ ██████╗ ██╗
██║ ██╔╝██╔═══██╗╚══██╔══╝██╔═══██╗██╔══██╗██║
█████╔╝ ██║   ██║   ██║   ██║   ██║██████╔╝██║
██╔═██╗ ██║   ██║   ██║   ██║   ██║██╔══██╗██║
██║  ██╗╚██████╔╝   ██║   ╚██████╔╝██║  ██║██║
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝
`)
    const info: obj = getPackageInfo();
    _console.info(console.info, `Kotori Bot Version: ${info.version} License: ${info.license}`);
    _console.info(console.info, `Kotori Bot By Hotaru`);
    _console.info(console.info, `Copyright © 2023 Hotaru All rights reserved.`);
})();


export default {
    _const,
    loadConfig,
    stringProcess,
    arrayProcess,
    stringSplit,
    _console,
    request
}