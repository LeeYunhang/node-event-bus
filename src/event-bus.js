

const eventList = new Map()

/**
 * subscribe
 * 
 * @param {String}   event type
 * @param {Function} listener function
 * @param {Boolean}  async default:false
 * 
 * @return {Symbol}  listener identify
 */
export function subscribe(type, listener, async = false) {
    let tmp = eventList.get(type)
    if (!tmp) {
        eventList.set(type, [])
        tmp = eventList.get(type)
    }

    const symbol = Symbol(type)
    tmp.push({ listener, async, symbol })

    return symbol
}

/**
 * unsubscribe
 * 
 * @param {Symbol} listener identify
 * 
 * @return {Boolean} return true if unsubscribe successfully
 */
export function unsubscribe(identify) {
    let type = identify.toString()
    const begin = type.indexOf('(')
    const end   = type.indexOf(')')

    type = type.slice(begin + 1, end)
    const value = eventList.get(type)

    if (!value) { return false }

    const tmp = value.filter((v, i, a) => {
        return v.symbol !== identify 
    })
    eventList.set(type, tmp)
    return true
}

/**
 * get listener number
 * 
 * @param {String} type
 * 
 * @return {Number} the number of listener
 */
export function getListenerNumber(type) {
    return eventList.get(type).length
}

/**
 * emit
 * 
 * @param {String} event type
 * @param {...Object} paramters
 */
export function emit(type, ...args) {
    const tmp = eventList.get(type)
    
    tmp.forEach(v => {
        if (v.async) {
            setTimeout(() => v.listener(...args), 0)
            return
        }
        v.listener(...args)
    })
}