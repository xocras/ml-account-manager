function trainModel() {
  const randomExamples = document.getElementById("training-examples").value;

  //   const trainingData = generateTrainingData(randomExamples);
  const trainingData = [
    {
      input: [0, 1],
      output: [1],
    },
    {
      input: [0, 1],
      output: [1],
    },
    {
      input: [0, 1],
      output: [1],
    },
    {
      input: [1, 1],
      output: [1],
    },
    {
      input: [1, 1],
      output: [1],
    },
    {
      input: [1, 0],
      output: [0],
    },
    {
      input: [1, 0],
      output: [0],
    },
    {
      input: [1, 0],
      output: [0],
    },
    {
      input: [0, 0],
      output: [0],
    },
    {
      input: [1, 0],
      output: [0],
    },

    {
      input: [1, 0],
      output: [0],
    },

    {
      input: [1, 0],
      output: [0],
    },

    {
      input: [1, 0],
      output: [0],
    },
  ];

  net.train(trainingData, {
    log: true,
    logPeriod: 10,
    iterations: 20000,
    errorThresh: 0.005,
  });

  console.log("Model training complete!");
}
