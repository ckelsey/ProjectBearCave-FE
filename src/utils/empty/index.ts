const Empty = (val: any): boolean => {
    const type = typeof val

    return val === ``
        || type === `undefined`
        || type === undefined
        || type === null
        || (Array.isArray(val) && val.length === 0)
        || (type === `object` && Object.keys(val).length === 0)
}

export default Empty
