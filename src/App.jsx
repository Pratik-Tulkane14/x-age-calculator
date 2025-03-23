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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (day < 1 || day > 31) {
      window.alert("Invalid date please enter valid date");
    }
    if (month < 1 || month > 12) {
      window.alert("Invalid  month please enter valid month");
    }
    if (year > new Date().getFullYear) {
      window.alert("Date of year can't be in future please enter another date");
    }
     const lastDayOfMonth = new Date(year, month, 0).getDate();
     if (day > lastDayOfMonth) {
       window.alert(
         `Invalid date. ${month}/${year} has only ${lastDayOfMonth} days.`
       );
       return;
     }
    const dob = new Date(`${year}-${month}-${day}`);
    console.log(dob, "yes");
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
    if(ageMonths<0){
      ageYears--;
      ageMonths+=12;
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
      <main>
        <form onSubmit={(e) => handleSubmit(e)} className="input-dates-section">
          <div className="field">
            <label>DAY</label>
            <input
              required
              type="text"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="field">
            <label>MONTH</label>
            <input
              required
              type="text"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="field">
            <label>YEAR</label>
            <input
              required
              type="text"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* <button type="submit">submit</button> */}
          </div>
        </form>
        <div className="divider-section">
          <div className="divider"></div>
          <div className="arrow">
            <IoIosArrowRoundDown className="arrow-icon" />
          </div>
        </div>
        <div className="output-section">
          <p>
            <span>{outputYear}</span>years
          </p>
          <p>
            <span>{outputMonth}</span>months
          </p>
          <p>
            <span>{outputDay}</span>days
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
