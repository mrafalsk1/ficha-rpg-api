export function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace)
}

export function evaluateExpression(expression: string): number {
    const tokens = expression.match(/\d+|[-+*/()]/g) || '';
  
    function applyOperator(operators: string[], values: number[], operator: string): void {
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== '(' &&
        hasPrecedence(operators[operators.length - 1], operator)
      ) {
        const right = values.pop() as number;
        const left = values.pop() as number;
        const op = operators.pop() as string;
        values.push(applyOperation(op, left, right));
      }
      operators.push(operator);
    }
  
    function hasPrecedence(op1: string, op2: string): boolean {
      const precedence: { [key: string]: number } = { '+': 1, '-': 1, '*': 2, '/': 2 };
      return precedence[op1] >= precedence[op2];
    }
  
    function applyOperation(operator: string, left: number, right: number): number {
      if (operator === '+') {
        return left + right;
      } else if (operator === '-') {
        return left - right;
      } else if (operator === '*') {
        return left * right;
      } else if (operator === '/') {
        return Math.floor(left / right);
      }
      return 0;
    }
  
    const operatorStack: string[] = [];
    const valueStack: number[] = [];
  
    for (let i = 0; i < (tokens?.length || 0); i++) {
      const token = tokens[i];
  
      if (/\d+/.test(token)) {
        valueStack.push(parseInt(token, 10));
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          const operator = operatorStack.pop() as string;
          const right = valueStack.pop() as number;
          const left = valueStack.pop() as number;
          valueStack.push(applyOperation(operator, left, right));
        }
        operatorStack.pop();
      } else if (token.match(/[-+*/]/)) {
        applyOperator(operatorStack, valueStack, token);
      }
    }
  
    while (operatorStack.length > 0) {
      const operator = operatorStack.pop() as string;
      const right = valueStack.pop() as number;
      const left = valueStack.pop() as number;
      valueStack.push(applyOperation(operator, left, right));
    }
  
    return valueStack[0];
  }
  
