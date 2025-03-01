import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import "./index.css"


const root = createRoot(document.getElementById('root'))
root.render(<App />)








// "test": "jest --watchAll",
//     "start": "node index.js",
//     "dev": "nodemon index.js",
//     "dev-peer": "cross-env GENERATE_PEER_PORT='true' nodemon index.js",
//     "start-redis": "redis-server --daemonize yes",
//     "build-client": "parcel build client/src/index.html --out-dir client/dist"