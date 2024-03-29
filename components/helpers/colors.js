/**
 * Don't modify this file!
 * Colors generated by themes!
 */

/* eslint-disable */

export const colors = {
    'light': '#ddd',
    'stable': '#f5f5f7',
    'positive': '#6610f2',
    'calm': '#0d6efd',
    'balanced': '#84B135',
    'energized': '#ffc107',
    'assertive': '#BE2C50',
    'royal': '#6f42c1',
    'dark': '#000000',
}

export const isPresetColor = (color) => {
    if (!color) {
        return false
    }
    return colors[color] ? colors[color] : color
}

/* eslint-enable */
