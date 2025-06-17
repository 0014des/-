const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');

let currentInput = '';

function updateDisplay(value) {
  display.textContent = value;
  display.style.animation = 'none';
  display.offsetHeight; // reflow
  display.style.animation = 'slideInFromRight 0.4s ease forwards';
}

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const num = button.getAttribute('data-num');
    const op = button.getAttribute('data-op');

    if (num !== null) {
      // 小数点の重複防止
      if (num === '.' && currentInput.endsWith('.')) return;
      // 数字・小数点の入力追加
      currentInput += num;
      updateDisplay(currentInput);
    } else if (op !== null) {
      // 演算子が連続しないようにチェック
      if (currentInput === '') return;
      const lastChar = currentInput.slice(-1);
      if (isOperator(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op; // 最後の演算子を置き換え
      } else {
        currentInput += op;
      }
      updateDisplay(currentInput);
    }
  });
});

clearBtn.addEventListener('click', () => {
  currentInput = '';
  updateDisplay('0');
});

equalsBtn.addEventListener('click', () => {
  if (currentInput === '') return;
  try {
    // evalで計算（単純な計算式のみ対応）
    const result = eval(currentInput);
    currentInput = result.toString();
    updateDisplay(currentInput);
  } catch (e) {
    updateDisplay('Error');
    currentInput = '';
  }
});

