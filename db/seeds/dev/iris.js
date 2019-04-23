const specimens = require('../../../iris_data');

const species = specimens.reduce((acc, specimen) => {
  if (!acc.includes(specimen.species)) {
    acc.push(specimen.species)
  }
  return acc
}, []);

const createSpecies = (knex, name) => {
  return knex('species').insert({ name }, 'id')
  .then(speciesId => {
    let specimenPromises = [];
    const matchingSpecimens = specimens.filter(specimen => specimen.species === name);
    matchingSpecimens.forEach(specimen => {
      const { sepal_width, sepal_length, petal_width, petal_length } = specimen;
      specimenPromises.push(
        createSpecimen(knex, {
          id_species: speciesId[0],
          sepal_width,
          sepal_length, 
          petal_width, 
          petal_length
        })
      )
    })
    return Promise.all(specimenPromises);
  });
}

const createSpecimen = (knex, specimen) => {
  return knex('specimens').insert(specimen)
}

exports.seed = function(knex, Promise) {
  return knex('specimens').del()
    .then(() => knex('species').del())
    .then(() => {
      let speciesPromises = [];
      species.forEach(item => {
        speciesPromises.push(createSpecies(knex, item))
      });
      return Promise.all(speciesPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
