const form = document.querySelector("form");
const errorMsg = document.querySelectorAll(".error");
const age = document.querySelectorAll(".age");
const label = document.querySelectorAll("label");
const input = document.querySelectorAll("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  errorMsg.forEach((error) => (error.style.opacity = 0));
  input.forEach((inp) => (inp.style.borderColor = "initial"));
  label.forEach((lbl) => (lbl.style.color = "initial"));

  let hasEmptyField = false;

  input.forEach((inp) => {
    if (inp.value === "") {
      errorMsg.forEach((error) => {
        error.style.opacity = 1;
        error.textContent = "This field is required";
      });

      inp.style.borderColor = "hsl(0, 100%, 67%)";
      label.forEach((lbl) => (lbl.style.color = "hsl(0, 100%, 67%)"));

      hasEmptyField = true;
    }
  });

  if (!hasEmptyField) {
    const day = input[0].value;
    const month = input[1].value;
    const year = input[2].value;

    const today = new Date();
    const maxYear = today.getFullYear();

    if (isNaN(day) || day < 1 || day > 31) {
      errorMsg[0].style.opacity = 1;
      input.forEach((inp) => (inp.style.borderColor = "hsl(0, 100%, 67%)"));
      label.forEach((lbl) => (lbl.style.color = "hsl(0, 100%, 67%)"));
      errorMsg[0].textContent = "Must be a valid date";
    }

    // validating month
    else if (isNaN(month) || month < 1 || month > 12) {
      errorMsg[1].style.opacity = 1;
      input.forEach((inp) => (inp.style.borderColor = "hsl(0, 100%, 67%)"));
      label.forEach((lbl) => (lbl.style.color = "hsl(0, 100%, 67%)"));
      errorMsg[1].textContent = "Must be a valid month";
    }

    // validating year
    else if (isNaN(year) || year < 1000 || year > maxYear) {
      errorMsg[2].style.opacity = 1;
      input.forEach((inp) => (inp.style.borderColor = "hsl(0, 100%, 67%)"));
      label.forEach((lbl) => (lbl.style.color = "hsl(0, 100%, 67%)"));
      errorMsg[2].textContent = "Must be a valid Year";
    } else if (
      !isNaN(day) &&
      !isNaN(month) &&
      !isNaN(year) &&
      year >= 1000 &&
      year <= maxYear
    ) {
      const birthDate = new Date(year, month - 1, day);
      const ageInMilliseconds = today - birthDate;
      const ageInYears = Math.floor(
        ageInMilliseconds / 31536000000 //365 * 24 * 60 * 60 * 1000
      );
      const ageInMonths = today.getMonth() - birthDate.getMonth();
      const ageInDays = today.getDate() - birthDate.getDate();

      age[0].textContent = ageInYears;
      age[1].textContent = ageInMonths;
      age[2].textContent = ageInDays;
    }
  }
});
