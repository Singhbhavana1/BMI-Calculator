function showTab(tabName) {
    var contents = document.querySelectorAll('.tab-content');
    contents.forEach(function (content) {
        content.style.display = 'none';
    });

    var selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    var buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });

    var activeButton = Array.from(buttons).find(button => button.textContent.toLowerCase() === tabName);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showTab('metric');
});

document.getElementById('metric-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var weight = parseFloat(document.getElementById('metric-weight').value);
    var height = parseFloat(document.getElementById('metric-height').value);
    var bmi = weight / (height * height);
    displayBMI(bmi, 'metric');
});

document.getElementById('standard-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var weight = parseFloat(document.getElementById('standard-weight').value);
    var height = parseFloat(document.getElementById('standard-height').value);
    var bmi = (weight / (height * height)) * 703; 
    displayBMI(bmi, 'standard');
});

function displayBMI(bmi, type) {
    var resultDiv = document.querySelector(`#${type} .showData`);
    if (isNaN(bmi) || !isFinite(bmi)) {
        resultDiv.innerHTML = `<p>Please enter valid weight and height values.</p>`;
    } else {
        var category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 25) {
            category = 'Normal weight';
        } else if (bmi < 30) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }
        resultDiv.innerHTML = `<p>Your BMI is: <strong>${bmi.toFixed(2)}</strong> (${category})</p>`;
    }
}
