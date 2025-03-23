import { useState } from "react";
import "./App.css";
import { IoIosArrowRoundDown } from "react-icons/io";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [outputDay, setOutputDay] = useState("--");
  const [outputMonth, setOutputMonth] = useState("--");
  const [outputYear, setOutputYear] = useState("--");
  const [errors, setErrors] = useState({
    day: "",
    month: "",
    year: "",
  });

  const validateInputs = () => {
    const newErrors = { day: "", month: "", year: "" };
    let isValid = true;

    if (!day) {
      newErrors.day = "This field is required";
      isValid = false;
    } else if (day < 1 || day > 31) {
      newErrors.day = "Must be a valid day";
      isValid = false;
    }

    if (!month) {
      newErrors.month = "This field is required";
      isValid = false;
    } else if (month < 1 || month > 12) {
      newErrors.month = "Must be a valid month";
      isValid = false;
    }

    if (!year) {
      newErrors.year = "This field is required";
      isValid = false;
    } else if (year > new Date().getFullYear()) {
      newErrors.year = "Must be in past";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day > lastDayOfMonth) {
      setErrors((prev) => ({
        ...prev,
        day: "Must be a valid date",
      }));
      return;
    }

    const dob = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let ageYears = today.getFullYear() - dob.getFullYear();
    let ageMonths = today.getMonth() - dob.getMonth();
    let ageDays = today.getDate() - dob.getDate();

    if (ageDays < 0) {
      ageMonths--;
      const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonthDate.getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setOutputDay(ageDays);
    setOutputMonth(ageMonths);
    setOutputYear(ageYears);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <main className="content">
        <form onSubmit={handleSubmit} className="input-dates-section input">
          <div className="field">
            <label>DAY</label>
            <input
              id="dayIn"
              required
              type="text"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={validateInputs}
            />
            {errors.day && <span className="error">{errors.day}</span>}
          </div>
          <div className="field">
            <label>MONTH</label>
            <input
              id="monthIn"
              required
              type="text"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={validateInputs}
            />
            {errors.month && <span className="error">{errors.month}</span>}
          </div>
          <div className="field">
            <label>YEAR</label>
            <input
              id="yearIn"
              required
              type="text"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={validateInputs}
            />
            {errors.year && <span className="error">{errors.year}</span>}
          </div>
          <div className="divider-section">
            <div className="divider"></div>
            <div className="arrow">
              <button id="calculateBtn" type="submit">
                <IoIosArrowRoundDown className="arrow-icon" />
              </button>
            </div>
          </div>
        </form>
        <div className="output-section">
          <p>
            <span id="yearOut">{outputYear}</span> years
          </p>
          <p>
            <span id="monthOut">{outputMonth}</span> months
          </p>
          <p>
            <span id="dayOut">{outputDay}</span> days
          </p>
        </div>
      </main>
      <footer>
        <p>
          Challenge by{" "}
          <a className="links" href="https://www.crio.do/" target="_blank">
            CrioDo.
          </a>{" "}
          Coded by{" "}
          <a
            className="links"
            href="https://github.com/Pratik-Tulkane14"
            target="_blank"
          >
            Pratik.
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
