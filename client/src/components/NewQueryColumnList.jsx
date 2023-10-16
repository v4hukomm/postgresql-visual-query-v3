import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, CustomInput } from 'reactstrap';
import NewQueryColumn from './NewQueryColumn';
import { switchReturning } from '../actions/queryActions';

export const NewQueryColumnList = ({columns, returning, switchReturning}) => {

    return (
        <div className="mt-2">
            <Row>
            <div className="col-sm-1 d-flex">
                <h3>
                    Column
                </h3>
            </div>
            <CustomInput
             className="mr-2"
             type="switch"
             id="returning"
             checked={returning}
             onChange={switchReturning}
             label="Returning all">
            </CustomInput>
            <Col>
                WHERE
            </Col>
            </Row>
            {columns.map((column) => (
                <NewQueryColumn
                 key={column.id}
                 data={column} />
            ))}
        </div>
    );
};

const mapStateToProps = (store) => ({
    columns: store.query.columns,
    returning: store.query.returning,
});

const mapDispatchToProps = {
    switchReturning,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQueryColumnList);