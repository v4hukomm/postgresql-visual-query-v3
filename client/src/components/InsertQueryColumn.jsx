import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
    Button,
    CustomInput,
    Col,
    Input,
    InputGroup,
    Row, 
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateColumn, removeColumn } from '../actions/queryActions';

export const InsertQueryColumn = (props) => {

    const [returning, setReturning] = useState(props.data.returning);

    let column = props.data;
    let rowCount = Array.from({ length: props.rows }, (_, index) => index);

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

    const handleRemoveColumn = () => {
        props.removeColumn(props.data);
    };

    const handleSwitch = () => {
        column.returning = !column.returning;
        setReturning(current => !current);

        props.updateColumn(column);
    };

    return (
        <div>
            <h6 className='ml-4 d-inline'>{column.column_name}</h6>
            <Button
                className="ml-3"
                size="sm"
                color="danger"
                onClick={handleRemoveColumn}
                >
                <FontAwesomeIcon icon="times" />
            </Button>
            <InputGroup size="sm">
            <CustomInput
                className="mr-4 ml-4"
                type="switch"
                id={`column-returning-${column.id}`}
                key={column.id}
                name="returning"
                checked={returning}
                onChange={handleSwitch}
                label="Returning">
            </CustomInput>
            </InputGroup>
            <Col sm='1' className='mr-4 ml-4'>
                {rowCount.map(i =>
                <Row key={`column-values-row-${i}`}>
                    <Input className='mt-2 mb-2'
                    key={`column-value-${i}`}
                    name={i}
                    type="text"
                    placeholder="filter"
                    defaultValue={props.data.column_values[i].value}
                    onBlur={handleSave}
                    onChange={handleChange}
                    disabled={props.fromQuery}>
                    </Input>
                </Row>
                    )}
            </Col>
        </div>
    );
};

const mapStateToProps = (store) => ({
    fromQuery: store.query.fromQuery,
    rows: store.query.rows,
});

const mapDispatchToProps = {
    updateColumn,
    removeColumn,
};


export default connect(mapStateToProps, mapDispatchToProps)(InsertQueryColumn);