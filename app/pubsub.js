//Implementing Pubnub

const PubNub = require('pubnub')
const credentials = {
  publishKey: 'pub-c-b2fb93f3-2832-4fe5-b6aa-2dbddb648e8d',
  subscribeKey: 'sub-c-33e33841-b48a-41fe-bcb7-470c00bbca55',
  secretKey: 'sec-c-MTdmMzdiYWUtZmMwMi00NGRiLTk3MmUtMzcwMmZmZjkyMTM2'
}

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION:'TRANSACTION'
}

class PubSub {
  constructor ({blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.wallet = wallet

    this.pubnub = new PubNub(credentials);


    this.pubnub.subscribe({ channels: Object.values(CHANNELS) })

    this.pubnub.addListener(this.listener())
  }

  listener () {
    return {
      message: messageObject => {
        const { channel, message } = messageObject

        console.log(`Received message on channel ${channel}: ${message}`)
        const parsedMessage = JSON.parse(message)

         switch (channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(parsedMessage,true, ()=>{
              this.transactionPool.clearBlockchainTransactions({
                chain:parsedMessage
              })
            })
            break
          case CHANNELS.TRANSACTION:
            if (!this.transactionPool.existingTransaction({
              inputAddress: this.wallet.publicKey
            })) {
              this.transactionPool.setTransaction(parsedMessage);
            }
            break;
          default:
            console.log('Received message on unknown channel:', message)
            break
         }
        }
        // if (channel === CHANNELS.BLOCKCHAIN) {
        //   this.blockchain.replaceChain(parsedMessage)
        // }
    }
  }

  // publish ({ channel, message }) {
  //   this.pubnub.unsubscribe(channel, () => {
  //     this.pubnub.publish(channel, message = (message)=>JSON.parse(message), () => {
  //       this.pubnub.subscribe(channel)
  //     })
  //   })
  // }

  publish({channel,message}){
    this.pubnub.publish({channel,message});
  }
  //  publish({ channel, message }) {
  //   this.pubnub.publish({ channel, message },
  //     (status, response) => {
  //       if (status.error) {
  //         console.error(`Publish failed on channel ${channel}:`, status);
  //       } else {
  //         console.log(`Message published to ${channel}:`, response);
  //       }
  //     }
  //   );
  // }


  broadcastChain () {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    })
  }
  broadcastTransaction(transaction){
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    })
  }
}
//  const testPubSub = new PubSub();
//  testPubSub.publish({channel:CHANNELS.TEST,message:"Hi Bro"})

module.exports = PubSub





























// Redis Implementation
// const redis = require('redis')

// const CHANNELS = {
//     TEST:"TEST",
//     BLOCKCHAIN:"BLOCKCHAIN"
// }
// class PubSub {
//     constructor(blockchain){
//         this.blockchain = blockchain;

//         this.publisher = redis.createClient();
//         this.subscriber = redis.createClient();

//         // this.subscriber.subscribe(CHANNELS.TEST);
//         // this.subscriber.subscribe(CHANNELS.BLOCKCHAIN)
//         this.subscribeToChannels()

//         this.subscriber.on("message",
//             (channel, message) => this.handleMessage(channel,message));
//     }

//     handleMessage (channel,message) {
//         console.log(`Received message on channel ${channel}: ${message}`)

//         const parsedMessage = JSON.parse(message);

//         if(channel === CHANNELS.BLOCKCHAIN){
//             this.blockchain.replaceChain(parsedMessage);
//         }

//     }

//     subscribeToChannels() {
//         Object.values(CHANNELS)
//             .forEach(channel => this.subscriber.subscribe(channel))
//     }

//     publish({channel,message}){
//         this.publisher.publish(channel,message)
//     }

//     broadcastChain(){
//         this.publish({
//             channel:CHANNELS.BLOCKCHAIN,
//             message:JSON.stringify(this.blockchain.chain)
//         })
//     }

// }

// // const testPubSub = new PubSub();

// // setTimeout(()=>testPubSub.publisher.publish(CHANNELS.TEST,"Yay !"),1000)

// module.exports = PubSub;









