// Formats raw data into an input/output format. Assumes last column is the output.
function formatData(rawData) {
  const processedData = rawData.map((row) => {
    const values = Object.values(row);

    return {
      input: values.filter((_, i, arr) => i < arr.length - 1),
      output: [values.at(-1)],
    };
  });

  return document.getElementById("normalize").checked
    ? processedData.map((x) => {
        return { input: x["input"].map(normalize), output: x["output"] };
      })
    : processedData;
}

// Normalize data to [0, 1] range
function normalize(value, i) {
  const bounds = {
    0: { min: 100, max: 90000 },
    1: { min: 100, max: 15000 },
    2: { min: 0, max: 3 },
    3: { min: 0, max: 1200 },
  };

  return (value - bounds[i]["min"]) / (bounds[i]["max"] - bounds[i]["min"]);
}
