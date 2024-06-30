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
        setMessage("Loaded data!");
      },
    });
  });
