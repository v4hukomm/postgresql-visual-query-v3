import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, CustomInput, Form, Label } from 'reactstrap';
import InsertQueryColumn from './InsertQueryColumn';
import { addRows, removeRows, switchFromQuery, updateFromQuery, switchReturning } from '../actions/queryActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const InsertQueryColumnList = ({columns, addRows, removeRows, queries, switchFromQuery, fromQuery, updateFromQuery, switchReturning, returning}) => {

    const [dropDownOpen, setDropDownOpen] = useState(false);

    const handleAddRow = () => {
        addRows();
    };

    const handleRemoveRow = () => {
        removeRows();
    };

    const handleDropDown = () => {
        setDropDownOpen(current => !current);
    };

    const handleSave = (e) => {
        let subQuery;

        if (e.currentTarget.name === 'subqueryDefault') {
            subQuery = {
                subqueryId: 0,
                subquerySql: '',
            };
        } else if (e.currentTarget.name === 'subqueryId') {
            const subqueryId = +e.target.value;
            const subquerySql = queries.find(query => query.id === subqueryId).sql;
            subQuery = {
                subqueryId,
                subquerySql,
            };
        };

        updateFromQuery(subQuery);
    };

    return (
        <div className="mt-2">
            <Label>Add row</Label>
            <Button
            className="mb-1 ml-2"
            outline
            color="info"
            size="sm"
            onClick={handleAddRow}
            >
            <FontAwesomeIcon icon="plus" />
            </Button>
            <Label className="ml-2">Remove row</Label>
            <Button
            className="mb-1 ml-2"
            outline
            color="info"
            size="sm"
            onClick={handleRemoveRow}
            >
            <FontAwesomeIcon icon="times" />
            </Button>
            <CustomInput inline
             className="mr-2 ml-2"
             type="switch"
             id="returning"
             checked={returning}
             onChange={switchReturning}
             label="Returning all">
            </CustomInput>
            <CustomInput inline
             className="mr-2 ml-2"
             type="switch"
             id="fromQuery"
             label="Insert from query"
             checked={fromQuery}
             onChange={switchFromQuery}>
            </CustomInput>
                {fromQuery && <ButtonDropdown
                    isOpen={dropDownOpen}
                    toggle={handleDropDown}
                >
                    <DropdownToggle
                    className="btn-sm btn-light btn-outline-secondary"
                    style={{ borderColor: '#d3d8de' }}
                    caret
                    >
                    QueryName
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem
                        key="query-link-SQ"
                        name="subqueryDefault"
                        value=""
                        onClick={handleSave}
                    >
                        LinkQuery
                    </DropdownItem>
                    {queries.map((query, index) => (
                        <DropdownItem
                        key={`query-${query.id}-column`}
                        id={`subquerySql-${index}`}
                        name="subqueryId"
                        value={query.id}
                        onClick={handleSave}
                        >
                        {query.queryName}
                        </DropdownItem>
                    ))}
                    </DropdownMenu>
                </ButtonDropdown>
                }
            <Form inline className="mt-2 mb-2 p-3">
            {columns.map((column) => (
                <InsertQueryColumn
                 key={column.id}
                 data={column} />
            ))}
            </Form>
        </div>
    );
};

const mapStateToProps = (store) => ({
    columns: store.query.columns,
    rows: store.query.rows,
    queries: store.queries,
    fromQuery: store.query.fromQuery,
    returning: store.query.returning,
});

const mapDispatchToProps = {
    addRows,
    removeRows,
    switchFromQuery,
    updateFromQuery,
    switchReturning,
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertQueryColumnList);