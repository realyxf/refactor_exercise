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
