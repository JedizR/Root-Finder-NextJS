import Calculator from "@/components/calculator"
import ResultPanel from "@/components/result-panel"

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Root Finding Calculator</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Calculator />
        </div>
        <div className="lg:col-span-2">
          <ResultPanel />
        </div>
      </div>
    </main>
  )
}

