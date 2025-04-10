import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export const TableMain = ({ data, columns = [], tableClass, filters }) => {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    //
    debugTable: true,
    filters,
  });
  return (
    <div className="">
      <div className="w-full overflow-x-auto block rounded-[0.25rem] bg-white">
        {/* Render table if table has data  */}
        <table
          className={"w-full h-fit rounded-[0.25rem]  " + " " + tableClass}
        >
          <thead className="text-xs  w-full">
            {/* Mapping through the table headers */}
            {table?.getHeaderGroups()?.map((headerGroup, i) => (
              <tr key={i}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={`font-normal  whitespace-nowrap bg-opacity-70 text-black py-5 px-5 text-left capitalize text-sm`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* Mapping throught the table body */}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center px-5 font-normal text-sm text-[#B8A9C3]"
                >
                  <div className="flex items-center justify-center mx-auto">
                    <img
                      src="/nodata.png"
                      alt="no data picture"
                      width={450}
                      height={450}
                    />
                  </div>
                </td>
              </tr>
            )}
            {table?.getRowModel()?.rows?.map((row, index) => (
              <tr
                key={index}
                className={`border-t-[1.2px] border-slate-300 text-[14px] font-normal cursor-pointer   whitespace-nowrap hover:bg-gray-200/60 hover:border-[1.5px] hover:border-slate-300 ${
                  (index + 1) % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                }`}
              >
                {row?.getVisibleCells()?.map((cell, key) => (
                  <td
                    key={key}
                    className="py-3 px-5 relative group hover:opacity-100 font-semibold"
                    style={{
                      width: cell.column.columnDef.fixedWidth
                        ? `${cell.column.columnDef.fixedWidth}px`
                        : "auto",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination only when table has content*/}
    </div>
  );
};
