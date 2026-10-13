
const form = document.getElementById("resultForm");
const resultSection = document.getElementById("resultSection");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();

    const marks = [
        Number(document.getElementById("subject1").value),
        Number(document.getElementById("subject2").value),
        Number(document.getElementById("subject3").value)
    ];

    if (!name || !roll || marks.some(mark =>
        !Number.isFinite(mark) || mark < 0 || mark > 100
    )) {
        alert("Enter valid student details and marks between 0 and 100.");
        return;
    }

    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = total / marks.length;

    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 40) {
        grade = "D";
    } else {
        grade = "F";
    }

    const passed = marks.every(mark => mark >= 35);

    document.getElementById("outName").textContent = name;
    document.getElementById("outRoll").textContent = roll;
    document.getElementById("outTotal").textContent = `${total} / 300`;
    document.getElementById("outPercentage").textContent =
        `${percentage.toFixed(2)}%`;
    document.getElementById("outGrade").textContent = grade;

    const status = document.getElementById("outStatus");
    status.textContent = passed
        ? "PASS — Congratulations!"
        : "FAIL — One or more subjects are below 35 marks.";

    status.classList.toggle("fail", !passed);
    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

form.addEventListener("reset", function () {
    resultSection.hidden = true;
});
