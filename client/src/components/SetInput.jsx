import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Input,
} from 'reactstrap';
import { updateColumn } from '../actions/queryActions';

export const SetInput = (props) => {

    let column = props.column;

    const handleChange = (e) => {
        column.column_value = e.target.value
    };

    const handleSave = () => {
        props.updateColumn(column);
    };
    
    return (
        <Input
            id={`column-set-${props.column.id}`}
            name="column_set"
            key={props.column.id}
            type="text"
            placeholder="NULL"
            defaultValue=""
            onBlur={handleSave}
            onChange={handleChange}>
        </Input>
    );
};

const mapDispatchToProps = {
    updateColumn,
};

export default connect(null, mapDispatchToProps)(SetInput);