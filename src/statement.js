function priceFormat(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount/100);
}

function calculateAmount(performances) {
    let thisAmount = 0;
    switch (performances.play.type) {
        case 'tragedy':
            thisAmount = 40000;
            if (performances.audience > 30) {
                thisAmount += 1000 * (performances.audience - 30);
            }
            break;
        case 'comedy':
            thisAmount = 30000;
            if (performances.audience > 20) {
                thisAmount += 10000 + 500 * (performances.audience - 20);
            }
            thisAmount += 300 * performances.audience;
            break;
        default:
            throw new Error(`unknown type: ${performances.play.type}`);
    }
    return thisAmount;
}

function calculateCredits(invoice, plays) {
    let volumeCredits = 0;
    for(let perf of invoice.performances){
        volumeCredits += Math.max(perf.audience - 30, 0);
        if ('comedy' === plays[perf.playID].type) volumeCredits += Math.floor(perf.audience / 5);
    }
    return volumeCredits;
}

function calculateTotalAmount(result){
    return result.performances.reduce((total, curPerformance) => total + curPerformance.amount, 0);
}

function createStatementData(invoice, plays){
    const  result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(function (curPerformance){
        const result = Object.assign({},curPerformance);
        result.play = plays[result.playID];
        result.amount = calculateAmount(result);
        return result;
    });
    result.totalAmount = calculateTotalAmount(result);
    result.volumeCredits = calculateCredits(invoice, plays);
    return result;
}


function printStatementText(invoice, plays) {
    let result = `Statement for ${createStatementData(invoice, plays).customer}\n`;
    for (let perf of createStatementData(invoice, plays).performances) {
        result += ` ${perf.play.name}: ${priceFormat(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${priceFormat(createStatementData(invoice, plays).totalAmount)}\n`;
    result += `You earned ${createStatementData(invoice, plays).volumeCredits} credits \n`;
    return result;
}

function statement(invoice, plays) {
    return printStatementText(invoice, plays);
}

module.exports = {
    statement,
};
