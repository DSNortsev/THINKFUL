/**
 * return the union of two sets
 */
function union(s1, s2) {
  const combinedSets = new Set([...s1, ...s2]);
  return combinedSets;
}

/**
 * return the intersection of two sets
 */
function intersect(s1, s2) {
  return new Set([...s1].filter(element => s2.has(element)));
}

/**
 * return the difference of two sets
 */
function difference(s1, s2) {
  return new Set([...s1].filter(element => !s2.has(element)));
}

module.exports = { union, intersect, difference };
