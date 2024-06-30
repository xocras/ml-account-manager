// Create a new instance of a neural network
const network = new brain.NeuralNetwork({
  hiddenLayers: [4],
});

// Store training data
let trainingData;

// Store prediction output
let networkOutput;

function trainModel() {
  if (!trainingData) {
    setMessage("Load data to train the model first.");
    return;
  }

  showLoading(true);

  const trainingCode = `
  importScripts("https://cdn.jsdelivr.net/npm/brain.js");
  onmessage = function (e) {
    const { trainingData, options } = e.data;

    const network = new brain.NeuralNetwork();
    network.train(trainingData, options);
    const trainedNetworkJSON = network.toJSON();
    postMessage({ status: "success", trainedNetwork: trainedNetworkJSON });
  };`;

  const blob = new Blob([trainingCode], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(blob);

  const worker = new Worker(workerUrl);

  worker.postMessage({
    trainingData: trainingData,
    options: {
      log: true,
      logPeriod: 1000,
      iterations: 4000000,
      errorThresh: 0.025,
    },
  });

  worker.onmessage = function (e) {
    if (e.data.status === "success") {
      network.fromJSON(e.data.trainedNetwork);

      showLoading(false);
      setMessage("Training Successful!");
    }
  };

  worker.onerror = function (err) {
    showLoading(false);
    setMessage("Training Failed!");
  };
}

function makePrediction() {
  if (!network.sizes.length) {
    setMessage("Model needs to be trained first.");
    return;
  }

  const values = document.getElementById("make-prediction").value.split(",");

  if (values.length !== 4) {
    setMessage("You must enter 4 commas separated values.");
    return;
  }

  networkOutput = network.run(values.map(normalize)) * 100;
  networkOutput = networkOutput.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  setMessage(`This account has a ${networkOutput}% chance of being workable.`);
}
