import { Button } from "@/components/ui/button"

const operations = [
  { label: "sin", value: "sin(" },
  { label: "cos", value: "cos(" },
  { label: "tan", value: "tan(" },
  { label: "√", value: "sqrt(" },
  { label: "^", value: "^" },
  { label: "(", value: "(" },
  { label: ")", value: ")" },
  { label: "*", value: "*" },
  { label: "/", value: "/" },
  { label: "+", value: "+" },
  { label: "-", value: "-" },
]

interface MathOperationsProps {
  onInsert: (op: string) => void
}

export function MathOperations({ onInsert }: MathOperationsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {operations.map((op) => (
        <Button key={op.label} variant="outline" size="sm" onClick={() => onInsert(op.value)} type="button">
          {op.label}
        </Button>
      ))}
    </div>
  )
}

