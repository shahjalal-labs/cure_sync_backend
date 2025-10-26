//
const student1 = {
  name: "John",
  age: 20,
  address: "USA",
};

const student2 = {
  name: "Jane",
  age: 21,
  address: "UK",
};

const student3 = {
  name: "Ismail",
  [student2]: student1.age,
  address: student1.address,
};

console.dir(student3, {
  depth: "infinity",
});
