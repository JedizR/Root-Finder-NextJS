import { Button } from "@/components/ui/button"

const numbers = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
]

const operations = [
  { label: "x", value: "x" },
  { label: "x^2", value: "x^2" },
  { label: "x^3", value: "x^3" },
  { label: "x^n", value: "x^" },
  { label: "sin", value: "sin(" },
  { label: "cos", value: "cos(" },
  { label: "tan", value: "tan(" },
  { label: "√", value: "sqrt(" },
  { label: "^", value: "^" },
  { label: "(", value: "(" },
  { label: ")", value: ")" },
  { label: ".", value: "." },
  { label: "*", value: "*" },
  { label: "/", value: "/" },
  { label: "+", value: "+" },
  { label: "-", value: "-" },
  { label: "π", value: "π" },
  { label: "e", value: "e" },
]

interface MathOperationsProps {
  onInsert: (op: string) => void
}

export function MathOperations({ onInsert }: MathOperationsProps) {
  return (
    <>
    <div className="grid lg:grid-cols-5 md:grid-cols-10 sm:grid-cols-10 grid-cols-5 gap-1">
      {numbers.map((op) => (
        <Button className="bg-primary text-secondary font-bold" key={op.label} variant="outline" size="sm" onClick={() => onInsert(op.value)} type="button">
          {op.label}
        </Button>
      ))}
    </div>
    <div className="grid lg:grid-cols-6 md:grid-cols-8 sm:grid-cols-6 grid-cols-4 gap-1">
      {operations.map((op) => (
        <Button key={op.label} variant="outline" size="sm" onClick={() => onInsert(op.value)} type="button">
          {op.label}
        </Button>
      ))}
    </div>
    </>
  )
}

