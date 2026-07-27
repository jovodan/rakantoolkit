document.addEventListener('DOMContentLoaded', () => {
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  const historyList = document.getElementById('historyList');

  let current = '0';
  let previous = '';
  let operator = null;
  let shouldReset = false;
  let history = [];
  let angleMode = 'deg';

  function updateDisplay() {
    resultEl.textContent = current;
    if (operator && previous) {
      const opSymbol = { '/': '\u00F7', '*': '\u00D7', '-': '\u2212', '+': '+', 'pow': '^', 'mod': 'mod' }[operator] || operator;
      expressionEl.textContent = previous + ' ' + opSymbol;
    } else {
      expressionEl.textContent = '';
    }
  }

  function toRad(deg) { return deg * (Math.PI / 180); }
  function toDeg(rad) { return rad * (180 / Math.PI); }

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
    if (!current.includes('.')) current += '.';
    updateDisplay();
  }

  function handleOperator(op) {
    if (operator && !shouldReset) calculate();
    previous = current;
    operator = op;
    shouldReset = true;
    updateDisplay();
  }

  function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

  function applyUnary(fn, label) {
    const val = parseFloat(current);
    let result;
    switch (fn) {
      case 'sin': result = Math.sin(angleMode === 'deg' ? toRad(val) : val); break;
      case 'cos': result = Math.cos(angleMode === 'deg' ? toRad(val) : val); break;
      case 'tan': result = Math.tan(angleMode === 'deg' ? toRad(val) : val); break;
      case 'asin':
        result = angleMode === 'deg' ? toDeg(Math.asin(val)) : Math.asin(val);
        break;
      case 'acos':
        result = angleMode === 'deg' ? toDeg(Math.acos(val)) : Math.acos(val);
        break;
      case 'atan':
        result = angleMode === 'deg' ? toDeg(Math.atan(val)) : Math.atan(val);
        break;
      case 'ln': result = Math.log(val); break;
      case 'log': result = Math.log10(val); break;
      case 'sqrt': result = Math.sqrt(val); break;
      case 'cbrt': result = Math.cbrt(val); break;
      case 'square': result = val * val; break;
      case 'cube': result = val * val * val; break;
      case 'factorial': result = factorial(Math.floor(val)); break;
      case 'abs': result = Math.abs(val); break;
      case 'inv': result = val === 0 ? 'Error' : 1 / val; break;
      case 'exp': result = Math.exp(val); break;
      case 'tenpow': result = Math.pow(10, val); break;
      case 'rand': result = Math.random(); break;
      default: return;
    }

    expressionEl.textContent = label + '(' + current + ')';
    if (result === 'Error' || isNaN(result) || !isFinite(result)) {
      current = 'Error';
    } else {
      current = String(parseFloat(parseFloat(result).toPrecision(12)));
    }
    shouldReset = true;
    resultEl.textContent = current;
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
      case 'pow': result = Math.pow(prev, curr); break;
      case 'mod': result = curr === 0 ? 'Error' : prev % curr; break;
      default: return;
    }

    const opSymbol = { '/': '\u00F7', '*': '\u00D7', '-': '\u2212', '+': '+', 'pow': '^', 'mod': 'mod' }[operator];
    const exprStr = previous + ' ' + opSymbol + ' ' + current;

    if (result === 'Error' || isNaN(result) || !isFinite(result)) {
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

  function backspace() {
    if (shouldReset || current === 'Error') return;
    current = current.length > 1 ? current.slice(0, -1) : '0';
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
      const fn = btn.getAttribute('data-fn');

      switch (action) {
        case 'number': inputNumber(value); break;
        case 'decimal': inputDecimal(); break;
        case 'operator': handleOperator(value); break;
        case 'equals': calculate(); break;
        case 'clear': clear(); break;
        case 'backspace': backspace(); break;
        case 'sign': toggleSign(); break;
        case 'percent': percent(); break;
        case 'fn':
          if (fn === 'mod') handleOperator('mod');
          else applyUnary(fn, fn);
          break;
        case 'const':
          if (value === 'pi') { current = String(Math.PI); shouldReset = true; updateDisplay(); }
          else if (value === 'e') { current = String(Math.E); shouldReset = true; updateDisplay(); }
          break;
        case 'paren':
          if (shouldReset) { current = value; shouldReset = false; }
          else { current = current === '0' ? value : current + value; }
          updateDisplay();
          break;
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
    else if (e.key === 'Backspace') backspace();
  });

  updateDisplay();
});
