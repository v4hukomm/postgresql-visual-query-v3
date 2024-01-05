import React from 'react';
import { connect } from 'react-redux';
import {
  CustomInput,
} from 'reactstrap';
import { updateColumn } from '../actions/queryActions';

export const UpdateSwitch = (props) => {
  const { column } = props;

  const handleChange = () => {
    column.value_enabled = !column.value_enabled;
    props.updateColumn(column);
  };

  return (
    <CustomInput
      id={`column-value-switch-${column.id}`}
      name="valueSwitch"
      key={column.id}
      type="switch"
      defaultValue={props.column.value_enabled}
      checked={props.column.value_enabled}
      onChange={handleChange}
    />
  );
};

const mapDispatchToProps = {
  updateColumn,
};

export default connect(null, mapDispatchToProps)(UpdateSwitch);
