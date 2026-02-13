
export default function ProgressMeter({percent, goalLabel}:{percent:number; goalLabel?:string}){
  return (
    <div>
      <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
        <div style={{width: `${percent}%`}} className="h-4 bg-linear-to-r from-yellow-400 to-yellow-300" />
      </div>
      <div className="text-sm mt-2 text-gray-600">{percent}% — {goalLabel}</div>
    </div>
  )
}
