const test = require('ava');
const {statement} = require('../src/statement');

test('Sample test', t => {
  t.true(true);
  t.is(1, 1);
  t.deepEqual({a: 1}, {a: 1});
});


//test('Sample test', t => {
//  //given
//  const invoice = {};
//  const plays = [];
//
//  const result = statement(invoice, plays);
//
//  t.is(result, '');
//});


const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'hamlet',
      'audience': 55,
    },
    {
      'playID': 'as-like',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};

test('Case1 BigCo has one performance hamlet and the audience is 0', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 0,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $400.00 (0 seats)\n`
        + `Amount owed is $400.00\n`
        + `You earned 0 credits \n`;
    //then
    t.is(result, expectResult);
});

test('Case2 BigCo has one performance hamlet and the audience is 29', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 29,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $400.00 (29 seats)\n`
        + `Amount owed is $400.00\n`
        + `You earned 0 credits \n`;
    //then
    t.is(result, expectResult);
});

test('Case3 BigCo has one performance hamlet and the audience is 31', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $410.00 (31 seats)\n`
        + `Amount owed is $410.00\n`
        + `You earned 1 credits \n`;
    //then
    t.is(result, expectResult);
});

test('Case4 BigCo has three performance and the audience more than 30', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55,
            },
            {
                'playID': 'as-like',
                'audience': 35,
            },
            {
                'playID': 'othello',
                'audience': 40,
            },
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $650.00 (55 seats)\n`
        + ` As You Like It: $580.00 (35 seats)\n`
        + ` Othello: $500.00 (40 seats)\n`
        + `Amount owed is $1,730.00\n`
        + `You earned 47 credits \n`;
    //then
    t.is(result, expectResult);
});

test('Case5 BigCo has three performance and the audience less than 30', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 22,
            },
            {
                'playID': 'as-like',
                'audience': 22,
            },
            {
                'playID': 'othello',
                'audience': 22,
            },
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $400.00 (22 seats)\n`
        + ` As You Like It: $476.00 (22 seats)\n`
        + ` Othello: $400.00 (22 seats)\n`
        + `Amount owed is $1,276.00\n`
        + `You earned 4 credits \n`;
    //then
    t.is(result, expectResult);
});

test('Case6 BigCo2 has one performance As You like and the audience is 30', t => {
    //given
    const invoice = {
        'customer': 'BigCo2',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 30,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo2\n'
        + ` As You Like It: $540.00 (30 seats)\n`
        + `Amount owed is $540.00\n`
        + `You earned 6 credits \n`;
    //then
    t.is(result, expectResult);
});

test('Case7 BigCo2 has one performance As You like and the audience is 20', t => {
    //given
    const invoice = {
        'customer': 'BigCo2',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo2\n'
        + ` As You Like It: $360.00 (20 seats)\n`
        + `Amount owed is $360.00\n`
        + `You earned 4 credits \n`;
    //then
    t.is(result, expectResult);
});
