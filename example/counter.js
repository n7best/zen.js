import zen from '../lib'

// base/one dimension
var value = zen('value', 0)

//console.log('1-suppose be value', value)

// base/one dimension object
var counter = zen( 'counter', { value: 'value' } )

//console.log('2-supposer be counter', counter)

counter.resonant(function(){
    console.log('5-should yield 1: ',counter.value)
})


//console.log('3-suppoert to be counter with resonants', counter)
//console.log('3.2-suppoert to be counter god', counter.__god())

console.log('4-suppose to have value', counter.value)
counter.value = counter.value + 1;
