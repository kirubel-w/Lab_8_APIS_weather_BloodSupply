// Array of animals
let animals = ['Girraffe', 'Elephant', 'Yak']

// Print each animal with its index
animals.forEach(function (animal, index) {
    console.log(animal, index)
})

// Same thing using an arrow function
animals.forEach((animal, index) => {
    console.log(animal, index)
})

// Print each animal without its index
animals.forEach(animal => console.log(animal))