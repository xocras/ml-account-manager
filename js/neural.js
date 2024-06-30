// Create a new instance of a neural network
const network = new brain.NeuralNetwork({
  hiddenLayers: [4],
});

// Store training data
let trainingData;

function trainModel() {
  if (!trainingData) return;

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
  const values = getInputs();

  if (!values) return;

  try {
    let output;
    output = network.run(values.map(normalize));
    output *= 100;
    output = output.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setMessage(`This account has a ${output}% chance of being workable.`);
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "network not runnable":
        setMessage("AI model needs to be trained first.");
        break;
      default:
        console.log("Error:", error);
        break;
    }
  }
}
