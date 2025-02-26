import Cookies from "js-cookie";

export const saveInHistory = (values) => (dispatch) => {
  console.log("Invoice to save in localStorage:", values);

  try {
    // Retrieve existing invoicesHistory from localStorage
    const existingHistory = localStorage.getItem("invoicesHistory");

    // If there's existing history, parse it as an array; otherwise, initialize an empty array
    const invoicesHistory = existingHistory ? JSON.parse(existingHistory) : [];

    // Push the new invoice to the existing history array
    invoicesHistory.push(values);

    // Save the updated invoicesHistory array back to localStorage
    localStorage.setItem("invoicesHistory", JSON.stringify(invoicesHistory));
    console.log("Invoice saved in localStorage:", values);
  } catch (error) {
    console.error("Error saving invoice in localStorage:", error);
  }
};

export const saveAndPrint = (values, buttonName) => (dispatch) => {
  console.log("Invoice for print:", values);

  try {
  } catch (error) {
    console.error("Error saving invoice in database:", error);
  }
};
