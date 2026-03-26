const getWrapper = (language, userCode, functionName) => {
  const lang = language.toLowerCase();

  // PYTHON TEMPLATE (Ise upar rakha hai taaki pehle check ho)
  if (lang === "python" || lang === "py" || lang.includes("python")) {
    return `
import sys, json
try:
    input_str = sys.stdin.read().strip()
    if not input_str:
        sys.exit(0)
    data = json.loads(input_str)
    args = list(data.values())

    # User's Code
    ${userCode.replace(/\n/g, "\n    ")}

    # Dynamic Call
    if '${functionName}' in locals():
        result = locals()['${functionName}'](*args)
        print(json.dumps(result))
    else:
        print("Error: Function ${functionName} not found", file=sys.stderr)
        sys.exit(1)
except Exception as e:
    print(str(e), file=sys.stderr)
    sys.exit(1)
`;
  }

  // JAVASCRIPT TEMPLATE
  return `
const fs = require('fs');
try {
    const rawInput = fs.readFileSync(0, 'utf-8').trim();
    if (!rawInput) process.exit(0);
    const inputData = JSON.parse(rawInput);
    const args = Object.values(inputData);

    ${userCode}

    const fn = eval('${functionName}');
    const result = fn(...args);
    process.stdout.write(JSON.stringify(result));
} catch (err) {
    process.stderr.write(err.message);
    process.exit(1);
}
`;
};

export default getWrapper;
