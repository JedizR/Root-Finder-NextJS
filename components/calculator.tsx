"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MathOperations } from "./math-operations"
import { useRootFinder } from "@/lib/use-root-finder"

export default function Calculator() {
  const [expression, setExpression] = useState("")
  const [interval, setInterval] = useState({ start: "", end: "" })
  const [precision, setPrecision] = useState("0.0000001")
  const { calculateRoots, isCalculating, error, clearError } = useRootFinder()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (!expression || !interval.start || !interval.end || !precision) {
      alert("Please fill in all fields")
      return
    }

    const start = Number.parseFloat(interval.start)
    const end = Number.parseFloat(interval.end)
    const epsilon = Number.parseFloat(precision)

    if (isNaN(start) || isNaN(end) || isNaN(epsilon)) {
      alert("Please enter valid numbers")
      return
    }

    if (start >= end) {
      alert("Start value must be less than end value")
      return
    }

    // Format the expression (no changes needed as we're using a custom parser now)
    const formattedExpression = expression.replace(/\s+/g, "")

    console.log("Submitting with values:", { expression: formattedExpression, start, end, epsilon })
    await calculateRoots(formattedExpression, start, end, epsilon)
  }

  return (
    <Card className="md:h-full">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="expression">Function Expression</Label>
            <Textarea
              id="expression"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Enter mathematical expression (e.g., x^2 - 5*x + 4)"
              className="font-mono"
            />
            <MathOperations onInsert={(op) => setExpression(expression + op)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Interval Start</Label>
              <Input
                id="start"
                type="number"
                step="any"
                value={interval.start}
                onChange={(e) => setInterval({ ...interval, start: e.target.value })}
                placeholder="e.g., 0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">Interval End</Label>
              <Input
                id="end"
                type="number"
                step="any"
                value={interval.end}
                onChange={(e) => setInterval({ ...interval, end: e.target.value })}
                placeholder="e.g., 5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="precision">Precision</Label>
            <Select value={precision} onValueChange={setPrecision}>
              <SelectTrigger>
                <SelectValue placeholder="Select precision" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">0.1</SelectItem>
                <SelectItem value="0.01">0.01</SelectItem>
                <SelectItem value="0.001">0.001</SelectItem>
                <SelectItem value="0.0001">1e-4</SelectItem>
                <SelectItem value="0.00001">1e-5</SelectItem>
                <SelectItem value="0.000001">1e-6</SelectItem>
                <SelectItem value="0.0000001">1e-7</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isCalculating}>
            {isCalculating ? "Calculating..." : "Generate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

