# node-event-bus
node-event-bus

## Demo

```javascript
import { subscribe, emit, unsubscribe } from './node-event-bus'

// the listener will be called by async
const identify = subscribe('login', (username, password) => {
    // TODO:
}, true)

// call listener
emit('login')

unsubscribe(identify)
```