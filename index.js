// const bodyParser = require('body-parser')
// const express = require('express');
// const request = require('request');
// const Blockchain = require('./blockchain')
// const PubSub = require('./pubsub');



// const app = express();
// const blockchain = new Blockchain();
// //const pubsub = new PubSub({blockchain}); 

// //const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

// setTimeout(() => pubsub.broadcastChain(), 1000);

// app.use(bodyParser.json())

// app.get('/api/blocks', (req,res)=>{
//     res.json(blockchain.chain);
// })

// app.post('/api/mine',(req,res)=>{
//     const {data} = req.body;
//     blockchain.addBlock({data});
//     pubsub.broadcastChain();
//     res.redirect('/api/blocks');
// })

// const PORT = 3000

// //let PEER_PORT;

// // if(process.env.GENERATE_PEER_PORT === 'true'){
// //     PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() *1000);
// // }

// //const PORT = PEER_PORT || DEFAULT_PORT;

// app.listen(PORT,()=>{
//     console.log(`Server is running on port localhost:${PORT}`);  
// })

























const bodyParser = require('body-parser')
const express = require('express')
const Blockchain = require('./blockchain')
const PubSub = require('./pubsub')

const app = express()
const blockchain = new Blockchain()
const pubsub = new PubSub({blockchain})

setTimeout(()=> pubsub.broadcastChain(), 1000)

app.use(bodyParser.json())

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain)
})

app.post('/api/mine', (req, res) => {
  const { data } = req.body

  blockchain.addBlock({ data })
//  pubsub.broadcastChain()

  res.redirect('/api/blocks')
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

// Broadcasting after a short delay to ensure proper connection
setTimeout(() => pubsub.broadcastChain(), 1000)
