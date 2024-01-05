import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import _ from 'lodash';
import RemoveColumnButton from './RemoveColumnButton';
import SetInput from './SetInput';

export const UpdateQueryColumnList = ({ columns, tables }) => {
    const filteredColumns = _.uniqBy(columns, 'column_name');

    return (
        <div className="mt-2">
           {!!columns.length &&
            <Table style={{width: 'auto'}}>
                <thead>
                    <tr>
                    <th className='border-right'>Column name</th>
                {filteredColumns.map((column) => (
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
                    {filteredColumns.map((column) => (
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

UpdateQueryColumnList.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})),
    tables: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = (store) => ({
    columns: store.query.columns,
    tables: store.query.tables,
});


export default connect(mapStateToProps, null)(UpdateQueryColumnList);