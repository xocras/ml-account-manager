// Assign functions
document.getElementById("train-data").addEventListener("click", trainModel);

// Create a new instance of a neural network
const net = new brain.NeuralNetwork({
  hiddenLayers: [10, 10],
});

// Make a prediction
// const newAccount = [daysSinceEnrollment("2016-01-15"), 2500, 3200, 45, 2];
// const output = net.run(newAccount);
// console.log(`Prediction for new account: ${output}`);
