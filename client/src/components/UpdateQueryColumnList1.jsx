import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { CustomInput, FormGroup, Input, InputGroup, UncontrolledTooltip } from 'reactstrap';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import {
  setLimitValue,
  switchReturning,
  switchLimit,
  switchTies,
  updateColumnsOrder,
} from '../actions/queryActions';
import UpdateQueryColumn from './UpdateQueryColumn1';
import FilterOperandSelectbox from './FilterOperandSelectbox';
import { translations } from '../utils/translations';

export const UpdateQueryColumnList = ({
  updateColumns, switchReturning, columns, returning,
  limit, switchLimitProp, limitValue, setLimitValueProp, language, queryId, withTies, switchWithTiesProp,
}) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const movedColumn = columns
      .find(column => _.isEqual(draggableId, `query-column-${column.id}`));
    const newColumns = Array.from(columns);

    newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, movedColumn);

    updateColumns(newColumns);
  };

  const showFilterOperandSelectbox = (column, queryColumns, index) => column.column_filter.length
    && index !== queryColumns.length - 1
    && queryColumns[index + 1].column_filter.length
    && queryColumns[index + 1].filter_as_having === queryColumns[index].filter_as_having;

  return (
    <div className="mt-2">
      <FormGroup className="d-flex m-auto align-items-center">
        <CustomInput
          type="switch"
          id="returning"
          label="Returning all"
          checked={returning}
          onChange={switchReturning}
        />
      </FormGroup>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-columns">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {columns.map((column, index) => (
                <React.Fragment key={column.id}>
                  <UpdateQueryColumn
                    key={`query-column-${column.id}-queryId-${queryId}`}
                    id={`query-column-${column.id}`}
                    index={index}
                    data={column}
                  />
                </React.Fragment>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

UpdateQueryColumnList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({ column_filter: PropTypes.string })),
  updateColumns: PropTypes.func,
  returning: PropTypes.bool,
  switchReturning: PropTypes.func,
  limit: PropTypes.bool,
  switchLimitProp: PropTypes.func,
  limitValue: PropTypes.string,
  setLimitValueProp: PropTypes.func,
  language: PropTypes.shape({ code: PropTypes.string }),
  queryId: PropTypes.number,
};

const mapStateToProps = (store) => {
  const columns = _.orderBy(store.query.columns, ['filter_as_having'], ['asc']);

  return ({
    columns,
    returning: store.query.returning,
    limit: store.query.limit,
    limitValue: store.query.limitValue.toString(),
    withTies: store.query.withTies,
    language: store.settings.language,
    queryId: store.query.id,
  });
};


const mapDispatchToProps = {
  updateColumns: data => updateColumnsOrder(data),
  switchReturning,
  switchLimitProp: () => switchLimit(),
  switchWithTiesProp: () => switchTies(),
  setLimitValueProp: limitValue => setLimitValue(limitValue),
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateQueryColumnList);