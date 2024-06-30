function toggleVisibility() {
  const view = document.querySelector(".view");
  const loader = document.querySelector(".loader");

  view.style.display = view.style.display ? "" : "none";
  loader.style.display = loader.style.display ? "" : "none";
}

// Calculate number of days since enrollment to the current date
function daysSinceEnrollment(enrollmentDate) {
  const days = new Date() - new Date(enrollmentDate);

  if (days < 0) {
    return 0;
  }

  return Math.floor(days / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

// Generate a random date between two dates
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Normalize data to [0, 1] range
function normalize(value, min, max) {
  return (value - min) / (max - min);
}

// Generate random training data
function generateTrainingData(numSamples) {
  const data = [];
  for (let i = 0; i < numSamples; i++) {
    const enrollmentDate = randomDate(
      new Date("2012-01-01"),
      new Date("2024-06-01")
    );

    // Random balance should be between $100 and $90,000
    const originalBalance = Math.random() * (90000 - 100) + 100;

    // Random balance should be between $100 and $150,000
    const currentBalance = Math.random() * (150000 - 100) + 100;

    // Random days past due should be between 0 to 1,200 days
    const daysPastDue = Math.floor(Math.random() * 1201);

    // Randomly select between Tier 1, Tier 2, or Tier 3
    const legalStatus = Math.random() < 0.33 ? 1 : Math.random() < 0.5 ? 2 : 3;

    // Anything below 180 days is non-workable, and anything above has a 2/3 chance of being workable
    const workable = daysPastDue >= 180 ? (Math.random() < 0.67 ? 1 : 0) : 0;

    data.push({
      input: [
        normalize(
          daysSinceEnrollment(enrollmentDate),
          0,
          daysSinceEnrollment("2024-06-01")
        ),
        normalize(originalBalance, 100, 90000),
        normalize(currentBalance, 100, 150000),
        normalize(daysPastDue, 0, 1200),
        normalize(legalStatus, 1, 3),
      ],
      output: [workable],
    });
  }

  return data;
}
