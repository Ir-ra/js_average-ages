'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filteredMen = people
    .filter(p => p.sex === 'm'
      && (century ? Math.ceil(p.died / 100) === century : true));

  const yearsOfLife = filteredMen.map(man => man.died - man.born);

  const sumOfAge = yearsOfLife.reduce((a, b) => a + b);
  const averageAge = ((sumOfAge / yearsOfLife.length) * 100) / 100;

  return averageAge;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const namesMentionedAsMother = people.map(p => p.mother);
  const filteredWomen = people
    .filter(p => p.sex === 'f'
      && (withChildren ? namesMentionedAsMother.includes(p.name) : true));

  const yearsOfLife = filteredWomen.map(woman => woman.died - woman.born);

  const sumOfAge = yearsOfLife.reduce((a, b) => a + b);
  const averageAge = ((sumOfAge / yearsOfLife.length) * 100) / 100;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(p => p.sex === 'f'
    && (people.some(m => m.mother === p.name)));

  const children = people
    .filter(child => mothers.some(mother => child.mother === mother.name));

  const withSon = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifferences = withSon.map(child => {
    const foundMom = mothers.find(mom => mom.name === child.mother);

    return foundMom ? child.born - foundMom.born : null;
  });

  const averageDiff = ageDifferences
    .reduce((sum, char) => sum + char) / ageDifferences.length;

  return averageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
