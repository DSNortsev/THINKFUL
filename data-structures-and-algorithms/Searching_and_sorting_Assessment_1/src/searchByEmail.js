/**
 * Return the index of the customer with given email, otherwise -1.
 * @param {string} email The email address to search for
 * @param {*} customers The array to search
 */
function searchByEmail(email, customers) {
  for (let index = 0; index < customers.length; index++) {
      if ( customers[index].email === email) {
          // Found the customer
          return index;
      }
  }
  return -1;
}

module.exports = searchByEmail;
