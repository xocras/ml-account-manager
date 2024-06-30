// Store data
let trainingData;

// Assign functions
document.getElementById("train-data").addEventListener("click", trainModel);
document
  .getElementById("submit-prediction")
  .addEventListener("click", makePrediction);

document
  .getElementById("training-examples")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results) {
        trainingData = formatData(results.data);
        console.log("Loaded data!", trainingData);
      },
    });
  });

// Create a new instance of a neural network
const net = new brain.NeuralNetwork({
  hiddenLayers: [4],
});

// Make a prediction
// const newAccount = [daysSinceEnrollment("2016-01-15"), 2500, 3200, 45, 2];
// const output = net.run(newAccount);
// console.log(`Prediction for new account: ${output}`);
