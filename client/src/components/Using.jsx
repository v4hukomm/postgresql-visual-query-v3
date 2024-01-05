import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Row,
    Button,
} from 'reactstrap';
import Select from 'react-select';
import UsingCondition from './UsingCondition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translations } from '../utils/translations';
import { removeUsing, updateUsing } from '../actions/queryActions';

export const Using = (props) => {
  const constructOptions = (e) => {
    let options = [];
    let newTables = [];
    let tables = [];

    props.databaseTables.map((table) => {
      const value = JSON.stringify(table);
      const option = table.table_name;
      if (table.table_schema === props.selectedSchema) {
        newTables.push({ value: value, key: `join-${props.id}-table-${table.table_name}-query-${props.queryId}`, label: option })
      };
    });

    props.tables.map((table, index) => {
      const value = JSON.stringify(table);
      const option = table.table_alias.length > 0
        ? `${table.table_name} (${table.table_alias})`
        : `${table.table_name}`;

      if (index > 0) {
        tables.push({ value: value, key: `join-${props.id}-table-${table.id}-query-${props.queryId}`, label: option })
      };
    });

    options.push({ label: translations[props.language.code].queryBuilder.joinMainTableExisting, options: tables });
    options.push({ label: translations[props.language.code].queryBuilder.joinMainTableNew, options: newTables });

    return options;
  };

  const isTableSelected = _.isEmpty(props.using.main_table.table_name);

  const handleTableChange = (e) => {
    const value = JSON.parse(e.value);

    let using = _.cloneDeep(props.using);
    let conditions = _.cloneDeep(props.using.conditions);

    if (_.isEmpty(value.table_name)
      || (!_.isEmpty(props.using.main_table.table_name)
        && !_.isEqual(props.using.main_table.table_name, value.table_name))) {
      conditions = [];
    }

    if (value.id > 0) {
      using = {
        ...using,
        main_table: value,
        conditions,
      };

      props.updateUsing(using);
    }

  };

  const handleAddCondition = () => {
    let id = 0;

    if (props.using.conditions.length > 0) {
      id = props.using.conditions[props.using.conditions.length - 1].id + 1;
    }

    const condition = {
      id,
      main_column: '',
      secondary_table: {
        table_schema: '',
        table_name: '',
        table_alias: '',
      },
      secondary_column: '',
    };

    let { using } = props;

    const conditions = _.cloneDeep(props.using.conditions);

    conditions.push(condition);

    using = {
      ...using,
      conditions,
    };

    props.updateUsing(using);
  };

  const handleRemove = () => {
    props.removeUsing(props.using);
  };
    
    return (
        <div>
            <Form className="border border-secondary rounded mt-2 mb-2 p-3">
                <Row className="ml-3">
                  {props.queryType === 'DELETE' ? 'USING' : 'FROM' }
                  <div className="col-5">
                          <FormGroup className="m-0">
                            <Select
                              id="main_table"
                              placeholder={translations[props.language.code].queryBuilder.joinMainTable}
                              onChange={handleTableChange}
                              options={constructOptions()}/>
                          </FormGroup>
                        </div>
                        <div className="col-1 d-flex ml-auto pr-2 justify-content-end">
                      <FormGroup className="align-self-center m-0">
                        <Button
                          size="sm"
                          color="danger"
                          onClick={handleRemove}
                          id={`${props.id}_remove_join-${props.queryId}`}
                        >
                          <FontAwesomeIcon icon="times" />
                        </Button>
                      </FormGroup>
                    </div>
                </Row>
                <Row>
                        <div className="col-12 text-info">
                          <Button
                            className=""
                            outline
                            color="info"
                            size="sm"
                            id="addCondition"
                            disabled={isTableSelected}
                            onClick={handleAddCondition}
                          >
                            <FontAwesomeIcon icon="plus" />
                          </Button>
                          {' '}
                          Add Conditon
                        </div>
                      </Row>
                      {!_.isEmpty(props.using.conditions)
                      && (
                        <Card className="mt-2">
                          <CardBody className="py-0 px-2">
                            {props.using.conditions.map(condition => (
                              <UsingCondition
                                key={`join-${props.using.id}-condition-${condition.id}-query-${props.queryId}`}
                                condition={condition}
                                using={props.using}
                              />
                            ))}
                          </CardBody>
                        </Card>
                      )}
            </Form>
        </div>
    );
};

const mapStateToProps = (store) => ({
  databaseTables: store.database.tables,
  columns: store.database.columns,
  selectedSchema: store.database.selectedSchema,
  constraints: store.database.constraints,
  lastTableId: store.query.lastTableId,
  tables: store.query.tables,
  language: store.settings.language,
  queryType: store.query.queryType,
});

const mapDispatchToProps = {
  updateUsing,
  removeUsing,
};


export default connect(mapStateToProps, mapDispatchToProps)(Using);