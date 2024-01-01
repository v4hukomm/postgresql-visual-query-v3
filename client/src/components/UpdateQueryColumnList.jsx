import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import RemoveColumnButton from './RemoveColumnButton';
import SetInput from './SetInput';

export const UpdateQueryColumnList = ({columns, tables}) => {
    return (
        <div className="mt-2">
           {!!columns.length &&
            <Table style={{width: 'auto'}}>
                <thead>
                    <tr>
                    <th className='border-right'>Column name</th>
                {columns.map((column) => (
                    (column.table_id === tables[0].id &&
                        <th className='border-right'>
                            {column.table_name}.{column.column_name}
                            <RemoveColumnButton
                            column={column}
                            />
                        </th>
                    )
                ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text-right'>SET</td>
                    {columns.map((column) => (
                        (column.table_id === tables[0].id &&
                            <td>
                                <SetInput
                                    column={column}
                                />
                            </td>
                        )
                    ))}
                    </tr>
                </tbody>
            </Table>
            }
        </div>
    );
};

const mapStateToProps = (store) => ({
    columns: store.query.columns,
    tables: store.query.tables,
});


export default connect(mapStateToProps, null)(UpdateQueryColumnList);