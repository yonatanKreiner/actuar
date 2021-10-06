import PropTypes from 'prop-types';
import React, {useMemo} from 'react'; 
import { useTable, useFilters, useSortBy } from 'react-table'

export const ResultsTable = (props) => {
    
    const data = useMemo(() => props.allDepts, [props.allDepts]);

    const columns = useMemo(
        () => [
          {
            Header: 'תאריך',
            accessor: 'deptDate',
          },   
          {
            Header: 'קרן',
            accessor: 'debtSum',
          },
          {
            Header: 'הצדמה',
            accessor: 'indexateSum',
          },
          {
            Header: 'ריבית',
            accessor: 'totalInterest',
          },
          {
            Header: 'סה"כ',
            accessor: 'totalDebt',
          },
        ], []
    );

    const tableInstance = useTable({ columns, data },useFilters,useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance
      

	return (
		<div className='results-table'>
		    <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>{
                                column.isSorted
                                    ? column.isSortedDesc
                                        ? '🔽'
                                        : '🔼'
                                    : ""}
                            </span>
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
		</div>
	);
}

ResultsTable.propTypes = {
    allDepts: PropTypes.array.isRequired
}