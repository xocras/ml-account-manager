# AI Account Manager

Leverages machine learning to process data and estimate the viability of accounts typically handled by account managers. By analyzing various account features, the tool predicts whether an account is workable or not, aiding employees in prioritizing their efforts and resources efficiently.

## Instructions
1. Choose a CSV file. Headers must be located at the top. Output column must be the last one, and its values must be represented in binary.
2. Click the 'TRAIN MODEL' button and wait for the data to be processed. Progress can be seen through the console.
3. Enter the parameters that will be used for the prediction inside the text input below. Must be a string of 4 comma separated values.
4. Likelihood of an account being workable will be displayed below the text input.

## Constraints
Currently, the tool only takes 4 parameters:
1. Original Balance (Min: $100, Max: $90,000)
2. Current Balance (Min: $100, Max: $150,000)
3. Legal Status (Min: 0, Max: 3)
4. Days Past Due (Min: 0, Max: 1,200)
