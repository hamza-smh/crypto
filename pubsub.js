const redis = require('redis')

const CHANNELS = {
    TEST:"TEST",
    BLOCKCHAIN:"BLOCKCHAIN"
}
class PubSub {
    constructor(blockchain){
        this.blockchain = blockchain;

        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();        

        // this.subscriber.subscribe(CHANNELS.TEST);
        // this.subscriber.subscribe(CHANNELS.BLOCKCHAIN)
        this.subscribeToChannels()

        this.subscriber.on("message", 
            (channel, message) => this.handleMessage(channel,message));
    }

    handleMessage (channel,message) {
        console.log(`Received message on channel ${channel}: ${message}`)
    }
    
    subscribeToChannels() {
        Object.values(CHANNELS)
            .forEach(channel => this.subscriber.subscribe(channel))
    }

    publish({channel,message}){
        this.publisher.publish(channel,message)
    }

    broadcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)
        })
    }

    
}

// const testPubSub = new PubSub();

// setTimeout(()=>testPubSub.publisher.publish(CHANNELS.TEST,"Yay !"),1000)

module.exports = PubSub; 