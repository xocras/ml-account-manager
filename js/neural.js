function trainModel() {
  net.train(trainingData, {
    log: true,
    logPeriod: 1000,
    iterations: 4000000,
    errorThresh: 0.025,
  });

  document.getElementById("prediction-text").innerText =
    "Model Training Complete!";
}

function makePrediction() {
  const format = (num, decimals) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const values = document.getElementById("make-prediction").value.split(",");

  try {
    const output = net.run(values.map(normalize));

    document.getElementById(
      "prediction-text"
    ).innerText = `This accounts has a ${format(
      output * 100,
      2
    )}% chance of being workable.`;
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "network not runnable":
        document.getElementById("prediction-text").innerText =
          "AI model needs to be trained first.";
        break;
      case "input length 1 must match options.inputSize of 4":
        document.getElementById("prediction-text").innerText =
          "You must enter 4 values separated by commas.";
        break;

      default:
        break;
    }
  }
}
