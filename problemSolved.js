// task one

// NEED TO REMOVE FALSE VALUE
const person = {
  name: "John Doe",
  age: 25,
  email: "alamin@gmal.com",
  hobbies: ["music", "sports"],
  address: {
    city: "Boston",
    state: null,
  },
};

const filteredObject = Object.fromEntries(
  Object.entries(person)
    .filter(
      ([key, value]) =>
        value !== null && value !== undefined && value !== false && value !== ""
    )
    //apply the recursive
    .map(([key, value]) => [
      key,
      value && typeof value === "object"
        ? Object.fromEntries(
            Object.entries(value).filter(
              ([nestedKey, nestedValue]) =>
                nestedValue !== null &&
                nestedValue !== undefined &&
                nestedValue !== false &&
                nestedValue !== ""
            )
          )
        : value,
    ])
);
/**
 * output:
 * {
  name: 'John Doe',
  age: 25,
  email: 'alamin@gmal.com',
  hobbies: { '0': 'music', '1': 'sports' },
  address: { city: 'Boston' }
}
 */

// console.log(filteredObject);

// task two
const units = [
  { name: "ton", id: 1, baseunit: null },
  { name: "kg", id: 2, baseunit: 1 },
  { name: "gram", id: 3, baseunit: 2 },
  { name: "miligram", id: 4, baseunit: 3 },
];


// way one
const getBaseUnitWithJsMethod = (id) => {
  const index = units.findIndex((unit) => unit.id === id);

  if (index !== -1) {
    return units.slice(index).map((unit) => unit.name);
  }
  return [];
};

/**
 * output: without reverse
 * [ 'kg', 'gram', 'miligram' ]
 */

// const nextName = getBaseUnitWithJsMethod(2)
// console.log(nextName)


// way two
const getBaseUnit = (id) => {
  let result = [];
  let found = false;

  for (let i = units.length - 1; i >= 0; i--) {
    if (units[i].id === id || found) {
      result.push(units[i].name);
      found = true;
    }
  }
  return result;
};

/**
 * output: reverse way
 * [ 'kg', 'ton' ]
 */

// const nextName = getBaseUnit(2)
// console.log(nextName)
