/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-nested-assignment */
/* eslint-disable no-restricted-syntax */
/**
 * klona/json - MIT License
 *
 * https://github.com/lukeed/klona/blob/master/license
 * @param {any} val
 * @returns {any}
 */
export function klona (val) {
    let index, out, tmp

    if (Array.isArray(val)) {
        out = Array((index = val.length))
        while (index--) out[index] = (tmp = val[index]) && typeof tmp === 'object' ? klona(tmp) : tmp
        return out
    }

    if (Object.prototype.toString.call(val) === '[object Object]') {
        out = {} // null
        for (index in val) {
            if (index === '__proto__') {
                Object.defineProperty(out, index, {
                    value: klona(val[index]),
                    configurable: true,
                    enumerable: true,
                    writable: true
                })
            } else {
                out[index] = (tmp = val[index]) && typeof tmp === 'object' ? klona(tmp) : tmp
            }
        }
        return out
    }

    return val
}
