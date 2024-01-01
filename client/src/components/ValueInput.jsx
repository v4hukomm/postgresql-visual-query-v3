import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Input,
} from 'reactstrap';
import { updateColumn } from '../actions/queryActions';

export const ValueInput = (props) => {

    let column = props.column;

    const handleChange = (e) => {
        column.column_values.map((value) => {
            if (value.id === parseInt(e.target.name)) {
                value.value = e.target.value;
            }
            return value;
            });
    };

    const handleSave = () => {
        props.updateColumn(column);
    };
    
    return (
        <Input
        key={`column-value-${props.index}`}
        name={props.index}
        type="text"
        placeholder="NULL"
        defaultValue={props.column.column_values[props.index].value}
        onBlur={handleSave}
        onChange={handleChange}
        disabled={props.returningOnly}>
        </Input>
    );
};

const mapDispatchToProps = {
    updateColumn,
};

export default connect(null, mapDispatchToProps)(ValueInput);