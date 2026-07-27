document.addEventListener('DOMContentLoaded', () => {
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  const historyList = document.getElementById('historyList');

  let current = '0';
  let previous = '';
  let operator = null;
  let shouldReset = false;
  let history = [];

  function updateDisplay() {
    resultEl.textContent = current;
    if (operator && previous) {
      const opSymbol = { '/': '\u00F7', '*': '\u00D7', '-': '\u2212', '+': '+' }[operator] || operator;
      expressionEl.textContent = previous + ' ' + opSymbol;
    } else {
      expressionEl.textContent = '';
    }
  }

  function inputNumber(num) {
    if (shouldReset) {
      current = num;
      shouldReset = false;
    } else {
      current = current === '0' ? num : current + num;
    }
    if (current.length > 15) current = current.slice(0, 15);
    updateDisplay();
  }

  function inputDecimal() {
    if (shouldReset) {
      current = '0.';
      shouldReset = false;
      updateDisplay();
      return;
    }
    if (!current.includes('.')) {
      current += '.';
    }
    updateDisplay();
  }

  function handleOperator(op) {
    const val = parseFloat(current);
    if (operator && !shouldReset) {
      calculate();
    }
    previous = current;
    operator = op;
    shouldReset = true;
    updateDisplay();
  }

  function calculate() {
    if (!operator || previous === '') return;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result;

    switch (operator) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/': result = curr === 0 ? 'Error' : prev / curr; break;
      default: return;
    }

    const exprStr = previous + ' ' + { '/': '\u00F7', '*': '\u00D7', '-': '\u2212', '+': '+' }[operator] + ' ' + current;

    if (result === 'Error') {
      current = 'Error';
    } else {
      result = parseFloat(result.toPrecision(12));
      current = String(result);
    }

    addToHistory(exprStr, current);
    expressionEl.textContent = exprStr + ' =';
    previous = '';
    operator = null;
    shouldReset = true;
    resultEl.textContent = current;
  }

  function clear() {
    current = '0';
    previous = '';
    operator = null;
    shouldReset = false;
    updateDisplay();
  }

  function toggleSign() {
    if (current === '0' || current === 'Error') return;
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
    updateDisplay();
  }

  function percent() {
    if (current === 'Error') return;
    current = String(parseFloat(current) / 100);
    updateDisplay();
  }

  function addToHistory(expr, result) {
    history.unshift({ expr, result });
    if (history.length > 10) history.pop();
    renderHistory();
  }

  function renderHistory() {
    historyList.innerHTML = history.map(h =>
      '<div class="history-item"><span class="expr">' + h.expr + '</span><span class="res">' + h.result + '</span></div>'
    ).join('');
  }

  document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const value = btn.getAttribute('data-value');

      switch (action) {
        case 'number': inputNumber(value); break;
        case 'decimal': inputDecimal(); break;
        case 'operator': handleOperator(value); break;
        case 'equals': calculate(); break;
        case 'clear': clear(); break;
        case 'sign': toggleSign(); break;
        case 'percent': percent(); break;
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') inputNumber(e.key);
    else if (e.key === '.') inputDecimal();
    else if (e.key === '+') handleOperator('+');
    else if (e.key === '-') handleOperator('-');
    else if (e.key === '*') handleOperator('*');
    else if (e.key === '/') { e.preventDefault(); handleOperator('/'); }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') clear();
    else if (e.key === '%') percent();
    else if (e.key === 'Backspace') {
      current = current.length > 1 ? current.slice(0, -1) : '0';
      updateDisplay();
    }
  });

  updateDisplay();
});
