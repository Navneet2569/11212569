import axios from "axios";
import { NumberData } from "../model/numberModel";
import numberUtils from "../utils/numberUtils";
import dotenv from "dotenv";

dotenv.config();

const windowSize = 10;
let numbersWindow: number[] = [];

const apiUrls: { [key: string]: string } = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/rand",
};

const authToken = process.env.AUTH_TOKEN;

const getNumbers = async (type: string): Promise<NumberData> => {
  const prevState = [...numbersWindow];

  // Logging to debug service call
  console.log(`Fetching numbers for type: ${type}`);

  try {
    const response = await axios.get(apiUrls[type], {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      timeout: 500,
    });

    // Log the raw response data
    console.log("Raw response data:", response.data);

    // Ensure the response data is valid JSON
    if (!response.data || !response.data.numbers) {
      throw new Error("Invalid response data");
    }

    const newNumbers = response.data.numbers;
    const uniqueNumbers = numberUtils.removeDuplicates(newNumbers);

    numbersWindow = numberUtils.updateWindow(
      numbersWindow,
      uniqueNumbers,
      windowSize
    );

    const avg = numberUtils.calculateAverage(numbersWindow);

    return {
      windowPrevState: prevState,
      windowCurrState: numbersWindow,
      numbers: uniqueNumbers,
      avg: parseFloat(avg.toFixed(2)),
    };
  } catch (error) {
    console.error("Error fetching numbers or processing data:", error);
    throw new Error("Error fetching numbers or processing data");
  }
};

export default { getNumbers };
