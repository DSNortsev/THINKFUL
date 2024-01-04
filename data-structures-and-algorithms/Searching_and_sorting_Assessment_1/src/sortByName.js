const sort = require("./sort");

/**
 * Sort the array of customers by first and last name
 * @param {array} customers
 */
function sortByName(customers) {
  const compare = (left, right) => {
    let nameComparison;
    if (left.lastName === right.lastName) {
      nameComparison = left.firstName.localeCompare(right.firstName);
    } else {
      nameComparison = left.lastName.localeCompare(right.lastName);
    }
    return nameComparison;
  }
  return sort(compare, customers);
}


module.exports = sortByName;
