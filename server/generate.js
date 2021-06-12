var faker = require('faker');

var database = { ritten: []};

for (var i = 1; i<= 10; i++) {
  database.ritten.push({
    id: i,
    title: faker.lorem.word(),
    start: faker.date.recent(),
    end: faker.date.recent(),
  });
}

console.log(JSON.stringify(database));
