document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch data from the API
  function fetchDataFromApi() {
    fetch("https://lotto.api.rayriffy.com/latest")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Check the winning number
        checkWinningNumber(data);

        // Display the data on the HTML page
        displayData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Function to display the data on the HTML page
  function displayData(data) {
    const dateContainer = document.getElementById("date-text");
    const prize1Number = document.getElementById("prize1-number");
    const prize2Number = document.getElementById("prize2-number");
    const prize3Number = document.getElementById("prize3-number");
    const prize4Number = document.getElementById("prize4-number");

    // Check if the API response contains the required fields
    if (!data.response || !data.response.date || !data.response.prizes) {
      dateContainer.textContent = "Error: Data format is incorrect.";
      return;
    }

    // Format the date in a more readable way
    const dateParts = data.response.date.split(" ");
    const formattedDate = `${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`;

    // Display the date and prizes information
    dateContainer.textContent = `งวดประจำวันที่ ${formattedDate}`;

    // Display prizes information
    const prizes = data.response.prizes;
    prize1Number.textContent = prizes[0].number.join(", ");
    prize2Number.textContent =
      data.response.runningNumbers[0].number.join(", ");
    prize3Number.textContent =
      data.response.runningNumbers[1].number.join(", ");
    prize4Number.textContent =
      data.response.runningNumbers[2].number.join(", ");
  }

  // Function to check if the input number is a winning number
  function checkWinningNumber(data) {
    // add event lisnter to the button id check-button
    document.getElementById("check-button").addEventListener("click", () => {
      const inputNumber = document.getElementById("input-number").value;
      const prizeNumbers = [
        ...data.response.prizes.map((prize) => prize.number).flat(),
        ...data.response.runningNumbers
          .map((runningNumber) => runningNumber.number)
          .flat(),
      ];

      if (inputNumber === "") {
        return Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "กรุณากรอกเลขที่ต้องการตรวจสอบ",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ตกลง",
        });
      }

      let isWinningNumber = false;

      for (let i = 0; i < prizeNumbers.length; i++) {
        if (inputNumber === prizeNumbers[i]) {
          isWinningNumber = true;
          break;
        }
      }
      if (isWinningNumber) {
        Swal.fire({
          iconHtml:
            '<lottie-player src="https://lottie.host/cb1c67b4-00bd-48fd-b63f-5c59d432718b/8SrFUu6xvC.json" speed="1" style="width: 300px; height: 300px; direction="1" mode="normal" loop autoplay></lottie-player>',
          customClass: {
            icon: "border-none",
          },
          title: "ยินดีด้วยคุณถูกรางวัล!",
          text: `เลข ${inputNumber} ของคุณถูกรางวัล`,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ตกลง",
        });
      } else {
        Swal.fire({
          iconHtml:
            '<lottie-player src="https://lottie.host/d5df2619-56d7-4bee-b17f-22effa289d64/QS8gJMVEKI.json" speed="1" style="width: 125px; height: 125px" direction="1" mode="normal" loop autoplay></lottie-player>',
          customClass: {
            icon: "border-none",
          },
          title: "เสียใจด้วยคุณไม่ถูกรางวัล!",
          text: `เลข ${inputNumber} ของคุณไม่ถูกรางวัล`,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ตกลง",
        });
      }
    });
  }

  // Call the function to fetch data from the API and display it
  fetchDataFromApi();
});
