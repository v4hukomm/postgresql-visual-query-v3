import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    FormGroup,
    Row,
    Button,
} from 'reactstrap';
import Select from 'react-select';
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

  const handleTableChange = (e) => {
    const value = JSON.parse(e.value);

    let using = _.cloneDeep(props.using);
    let conditions = _.cloneDeep(props.using.conditions);

    if (_.isEmpty(value.table_name)
      || (!_.isEmpty(props.using.main_table.table_name)
        && !_.isEqual(props.using.main_table.table_name, value.table_name))) {
      conditions = [];
    }1

    if (value.id > 0) {
      using = {
        ...using,
        main_table: value,
        conditions,
      };

      props.updateUsing(using);
    }

  };
    
    return (
        <div>
            <Form className="border border-secondary rounded mt-2 mb-2 p-3">
                <Row>
                  USING
                  <div className="col-5">
                          <FormGroup className="m-0">
                            <Select
                              id="main_table"
                              placeholder={translations[props.language.code].queryBuilder.joinMainTable}
                              onChange={handleTableChange}
                              options={constructOptions()}/>
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
                          >
                            <FontAwesomeIcon icon="plus" />
                          </Button>
                          {' '}
                          Add Conditon
                        </div>
                      </Row>
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
});

const mapDispatchToProps = {
  updateUsing,
  removeUsing,
};


export default connect(mapStateToProps, mapDispatchToProps)(Using);