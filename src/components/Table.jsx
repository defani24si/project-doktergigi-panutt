export default function Table({ headers, children, striped = false }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-[#fde8e8] text-[#e53935]">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-5 py-3 font-semibold text-xs uppercase tracking-wider whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={`divide-y divide-gray-100 ${striped ? "[&>tr:nth-child(even)]:bg-gray-50" : ""}`}>
          {children}
        </tbody>
      </table>
    </div>
  );
}
