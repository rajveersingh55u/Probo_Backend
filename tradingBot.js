const axios = require('axios');

class TradingBot {
    constructor() {
        this.balance =10000;  //starting balance
        //current stock position
        this.position=0;      
        this.tradingHistory = [];
    }

    async fetchStockPrice() {
        const response = await axios.get('https://localhost:3001/api/stock-price');
        
        return parseFloat (response.data.price);
    }

    async trade() {
        const currentPrice = await this.fetchStockPrice();
        console.log(`Current stock Price: ${currentPrice}`);

        if (this.position === 0 && currentPrice < (currentPrice * 0.98)){
            //Condition for buying the sellstock
            this.position += 1;  //for buying oneStock
            this.balance -= currentPrice;
            this.tradingHistory.push({type:'BUY', price:currentPrice});
            console.log(`Bought at $${currentPrice}`);
        } else if (this.position > 0 && currentPrice > (currentPrice * 1.03)){
            //condition for selling stock
            this.position -= 1;
            this.balance += currentPrice;
            this.tradingHistory.push({
                type:'SELL',
                price: currentPrice
            });
            console.log(`Sold at $${currentPrice}`);
        }
        
    }

    getSummary() {
        const totalValue = this.balance + this.position * (this.position > 0 ? this.fetchStockPrice() : 0);
        const profitLoss = totalValue - 10000;
        return{
            balance: this.balance,
            position: this.position,
            profitLoss,
            tradingHistory: this.tradingHistory,
        };
    }
}

const tradingBot = new TradingBot();

setInterval(() => {
    tradingBot.trade();
}, 2000);