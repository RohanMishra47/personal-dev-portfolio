const DataTable = ({ headers, rows }) => (
  <div className="overflow-x-auto my-6">
    <table className="w-full text-base border-collapse">
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="text-left font-mono text-xs text-graphite font-medium border-b border-hairline pb-3 pr-6"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                className={`border-b border-hairline py-3 pr-6 ${
                  j > 0 ? "font-mono" : ""
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
