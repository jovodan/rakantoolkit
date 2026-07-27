document.addEventListener('DOMContentLoaded', () => {
  const calcBtn = document.getElementById('calcBtn');
  const resultSection = document.getElementById('resultSection');
  const dailyResult = document.getElementById('dailyResult');
  const bmrResult = document.getElementById('bmrResult');
  const lossResult = document.getElementById('lossResult');
  const gainResult = document.getElementById('gainResult');
  const bmrDisplay = document.getElementById('bmrDisplay');

  function calculateBMR() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.querySelector('input[name="activity"]:checked').value);

    if (!age || !weight || !height || age < 10 || weight < 20 || height < 100) {
      return null;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const daily = bmr * activity;
    const loss = daily - 500;
    const gain = daily + 500;

    return { bmr, daily, loss, gain };
  }

  function displayResults(results) {
    dailyResult.textContent = Math.round(results.daily).toLocaleString();
    bmrResult.textContent = Math.round(results.bmr).toLocaleString();
    lossResult.textContent = Math.round(results.loss).toLocaleString();
    gainResult.textContent = Math.round(results.gain).toLocaleString();
    bmrDisplay.textContent = Math.round(results.daily).toLocaleString() + ' kcal';
    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', () => {
    const results = calculateBMR();
    if (results) {
      displayResults(results);
    }
  });

  ['age', 'weight', 'height'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      const results = calculateBMR();
      if (results) {
        displayResults(results);
      }
    });
  });

  document.querySelectorAll('input[name="gender"], input[name="activity"]').forEach(input => {
    input.addEventListener('change', () => {
      const results = calculateBMR();
      if (results) {
        displayResults(results);
      }
    });
  });
});
