#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require('lowdown-charlifrank');

/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */


// number of males.

var numMales = _.reduce(customers, function(accumulator, customer, index){
  // if (customers[index].gender === 'male'){
  //   return accumulator + 1;
  // }
  
  /**
   * Harvey: you dont need to do customers[index]. that is exactly what customer (2nd parameter to reduce's callback) is. 
   * Remember to use that in all your higher-order functions (map, each, filter, reduce, etc) instead.
   * 
   * customer.gender === 'male' ? ...
   */
  
  return customers[index].gender === 'male' ?  accumulator + 1 : accumulator;
}, 0)
console.log(numMales)

// number of females

var numFemales = _.reduce(customers, function(accumulator, customer, index){
  // if (customers[index].gender === 'female'){
  //   return accumulator + 1;
  // }
  return customers[index].gender === 'female' ? accumulator + 1   : accumulator;
}, 0)
console.log(numFemales)

// oldest customer, youngest customer

var oldestCustomer = _.reduce(customers, function(accumulator, customer, index){
  if (customer.age  > accumulator.age) {
    /**
     * Harvey: you should not explicitly reassign the accumulator i.e. return accumulator = customer
     * you just return the value that you want the accumulator to be: return customer.
     * 
     * commit this to memory. super importante
     *
     */
    return accumulator = customer;
  }
  return accumulator;
})
console.log(oldestCustomer);


var youngestCustomer = _.reduce(customers, function(accumulator, customer, index){
  /**
   * Harvey: why does it matter if accumulator.age < 100 ?
   *
   */
  if (customer.age  < accumulator.age && accumulator.age < 100) {
    return accumulator = customer;
  }
  return accumulator;
})
console.log(youngestCustomer);




// average balance



function averageBalance(collection){
  /**
   * Harvey: don't reassign arguments. i.e. collection = collection.map(...)
   * you can change all these processes together
   *
   */
   var coll = collection;
  // console.log(coll)
  coll = coll.map(function(val, position, collection){
    /**
     * Harvey: no more collection[position]... -> use val 
     *
     */
    // return collection[position].balance.slice(1).replace(',', '');
    return val.balance.slice(1).replace(',', '');
  });
  console.log(coll)
  coll = coll.map(function(val, position, collection){
    return parseFloat(val);
  });

  coll = coll.reduce(function(previousSum, currentSum){
  return previousSum + currentSum / collection.length;
    }, 0);
  coll = coll.toFixed(2); // i used toFixed to have only 2 numbers after the decimal point instead of 3  
  return coll.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
console.log(averageBalance(customers));





// how many customer's names begin with some letter

var customersWithFirstLetter = function(customers, character){
  return _.reduce(customers, function(accumulator, customer){
          // if(customer.name.charAt(0).toLowerCase() === character.toLowerCase()){
          //   return accumulator + 1;
          // }
          // return accumulator;
          
        return customer.name.charAt(0).toLowerCase() === character.toLowerCase() ? accumulator + 1 : accumulator;
        }, 0)
}
console.log(customersWithFirstLetter(customers, 's'));








// how many customer's friend's names begin with some letter

var customersFriendsWithFirstLetter = function(customers, character){
  return _.reduce(customers, function(count, customer, index){
    _.each(customer.friends, function(friend, index, friends){
      // console.log(friends.name);
      //console.log(friend.name.charAt(0))
      if(friend.name.charAt(0).toLowerCase() === character.toLowerCase()){
        //console.log(customer)
      count = count + 1;
      }
    })
    return count;
  }, 0);

}
console.log(customersFriendsWithFirstLetter(customers, 'j'))  
  

// how many customers are friends

// join all friends array, count instances of customer //
// loops thru call customers, if customer in friends array, add 
var howManyCustomersAreFriendsWith = function(customers, targetCustomer){
  targetCustomer = targetCustomer.toLowerCase();
  return _.reduce(customers, function(summary, customer) {
    if(_.some(customer.friends, function(friend) { 
      return friend.name.toLowerCase() === targetCustomer; 
    })) {
      summary.push(customer.name); 
    }
    return summary;
  }, [])
}
console.log(howManyCustomersAreFriendsWith(customers, 'Doyle Erickson'));

const allInCommon = _.reduce(customers, function(summary, customer) {
  summary = summary.concat(howManyCustomersAreFriendsWith(customers, customer.name));
  return summary;
}, []);

console.log(allInCommon);


// users have tags associated with them: find the top 3 most common tags
  // loop through and find all tags i can probably use each like i used reduce for this like i accesed all of the friends in the customers array and save tha
var allAsscoiatedTags = function(customers){

  var allTagsArray = _.reduce(customers, function(allTags, customer){
      _.map(customer.tags, function(tagName, index){
      allTags.push(tagName);
    })
     return allTags;
  }, [])
  // return allTagsArray; 
  
  
  var tagNameObject = _.reduce(allTagsArray, function(tagged, tagName){
    if(tagName in tagged){
      ++tagged[tagName];
    } else {
      tagged[tagName] = 1;
    }
    
  return tagged; 
  }, {});
// console.log(tagNameObject);

var tagNameAndNumberArray = _.map(tagNameObject, function(tag, index){
  return tag + index;
})
// console.log(tagNameAndNumberArray);

var sortedTagArray = tagNameAndNumberArray.sort(function(a, b){
  if(a[0] > b[0]){
    return 1;
  }
})
// console.log(sortedTagArray);
sortedTagArray.reverse();

sortedTagArray = _.map(sortedTagArray, function(tag, index){
  return tag.slice(1);
})
// console.log(sortedTagArray);
return _.first(sortedTagArray, 3);

// return _.first(sortedTagArray, 3);
// var topTagNum = _.reduce(tagNameObject, function(tagValue, tagName, index){
//   if (tagName > tagValue){
//   tagValue = tagName;
//     // console.log(tagName)
//   }
//   return tagValue;
// }, 0)
// // console.log(topTagNum);

// var topTagsArray =  _.map(tagNameObject, function(tag, index){
//       // console.log(index)
//       if(/* _.typeOf(tag) !== undefined &&*/ tag === topTagNum){
//         return index;
//       }
//   })
// // console.log(topTagsArray);
 
// var topTags = _.reduce(topTagsArray, function(currentTag, allTags) {
//     if(_.typeOf(allTags) !== 'undefined'){
//       currentTag.push(allTags); 
//     }
//     return currentTag;
// }, [])
// // console.log(topTags);

// return _.first(topTags, 3);
  

}
console.log(allAsscoiatedTags(customers))


// create a summary of genders, the output should be:
// {
//   male: 3,
//   female: 2,
//   transgender: 1,
// }

var genderSummary = function(customers){
 return  _.reduce(customers, function(genderSummary, customer){
    var gender = customer.gender;
  
    // what did I say about a better way to test? //
    if(gender in genderSummary){
      ++genderSummary[gender]
    } else {
      genderSummary[gender] = 1;
    }
    
   return genderSummary; 
   }, {});
  
  
}
console.log(genderSummary(customers))
