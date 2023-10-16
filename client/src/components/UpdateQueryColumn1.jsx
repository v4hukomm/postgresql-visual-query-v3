import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  Container,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { addColumn, removeColumn, updateColumn } from '../actions/queryActions';
import { translations } from '../utils/translations';
import { bannedWords } from '../utils/bannedWords';
import { getCorrectQueryName } from '../utils/getCorrectQueryName';
  
  const RemoveButton = ({ id, handleRemoveColumn }) => (
    <div>
      <Button
        size="sm"
        color="danger"
        id={`${id}_remove`}
        onClick={handleRemoveColumn}
      >
        <FontAwesomeIcon icon="times" />
      </Button>
    </div>
  );
  
  RemoveButton.propTypes = {
    id: PropTypes.string,
    handleRemoveColumn: PropTypes.func,
  };
  
  export class UpdateQueryColumn extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        column_alias: props.data.column_alias,
        column_filter: props.data.column_filter,
        filter_valid: true,
        dropDownOpen: false,
        column_value: props.data.column_value,
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSetChange = this.handleSetChange.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.handleSwitch = this.handleSwitch.bind(this);
      this.handleRemoveColumn = this.handleRemoveColumn.bind(this);
      this.handleCopy = this.handleCopy.bind(this);
      this.handleDropDown = this.handleDropDown.bind(this);
    }
  
    componentDidMount() {
      if (this.props.data.subqueryId) {
        let column = _.cloneDeep(this.props.data);
  
        const subquerySql = this.props.queries
          .find(query => query.id === this.props.data.subqueryId).sql;
  
        column = {
          ...column,
          subquerySql,
        };
  
        this.props.updateColumn(column);
      }
    }
  
    handleDropDown() {
      this.setState(prevState => ({
        dropDownOpen: !prevState.dropDownOpen,
      }));
    }
  
    handleRemoveColumn() {
      this.props.removeColumn(this.props.data);
    }
  
    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    handleSetChange(e) {
      console.log(e.target.value);
      console.log(this.state)
      this.setState({ [e.target.name]: e.target.value });
    };
  
    handleCopy() {
      this.props.addColumn(this.props.data);
    }
  
    handleRemove(e) {
      const { state } = this;
  
      this.setState({
        ...state,
        [e.currentTarget.name]: '',
      });
  
      let column = _.cloneDeep(this.props.data);
  
      column = {
        ...column,
        [e.currentTarget.name]: '',
      };
  
      if (_.isEqual(e.target.name, 'column_filter')) {
        this.setState({
          filter_valid: true,
        });
      }
  
      this.props.updateColumn(column);
    }
  
    handleSave(e) {
      let column = _.cloneDeep(this.props.data);

      if (e.currentTarget.name === 'subqueryDefault') {
        column = {
          ...column,
          subqueryId: 0,
          subquerySql: '',
        };
      }
  
      if (e.currentTarget.name === 'subqueryId') {
        const subqueryId = +e.target.value;
        const subquerySql = this.props.queries.find(query => query.id === subqueryId).sql;
  
        column = {
          ...column,
          subqueryId,
          subquerySql,
        };
      } else {
        column = {
          ...column,
          [e.target.name]: e.target.value,
        };
      }

      this.props.updateColumn(column);
    }
  
    handleSwitch(e) {
      let column = _.cloneDeep(this.props.data);
  
      column = {
        ...column,
        [e.target.name]: !column[e.target.name],
      };
  
      this.props.updateColumn(column);
    }
  
    render() {
      const orderDirection = this.props.data.column_order_dir
        ? translations[this.props.language.code].queryBuilder.ascL
        : translations[this.props.language.code].queryBuilder.descL;
      const columnOrderVisibility = this.props.data.column_order ? 'visible' : 'invisible';
      const columnName = _.isEmpty(this.props.data.table_alias)
        ? `${this.props.data.table_name}.${this.props.data.column_name}`
        : `${this.props.data.table_alias}.${this.props.data.column_name}`;
      const filterValid = this.state.filter_valid ? '' : 'is-invalid';
      const linkedQuery = this.props.queries.find(query => query.id === this.props.data.subqueryId);
      const linkedQueryName = linkedQuery
        ? getCorrectQueryName(this.props.language, linkedQuery.queryName, linkedQuery.id)
        : translations[this.props.language.code].queryBuilder.linkSq;
  
      return (
        <Draggable
          draggableId={`${this.props.id}`}
          index={this.props.index}
        >
          {provided => (
            <div className="m-auto">
              <Card
                className="px-0 my-2"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
              >
                <CardBody className="mx-0 pr-2 pl-1 pt-1 pb-1">
                  <Form inline className="align-content-center">
                    <Container fluid className="pr-0">
                      <Row form>
                        <div className="col-auto pl-0 pr-3 d-flex align-items-center">
                          <FontAwesomeIcon className="" icon="sort" />
                        </div>
                        <div className="col-10 p-0">
                          <Row form>
                            <div className="col-auto d-flex">
                              <CustomInput
                                className=""
                                type="checkbox"
                                id={`display-${this.props.data.id}`}
                                name="display_in_query"
                                checked={this.props.data.display_in_query}
                                onChange={this.handleSwitch}
                              />
                              <small
                                className="mr-2 align-self-center text-muted"
                              >
                                {`${this.props.data.table_schema}`}
                              </small>
                              <h6
                                className="m-0 mr-2 align-self-center"
                                id="column_name"
                              >
                                {columnName}
                              </h6>
                            </div>
                            <div className="col-auto">
                              <FormGroup>
                                <CustomInput
                                  className="mr-2"
                                  disabled={this.props.returning}
                                  type="switch"
                                  id={`column-returning-${this.props.data.id}`}
                                  name="returning"
                                  checked={this.props.data.returning}
                                  onChange={this.handleSwitch}
                                  label="Returning"
                                />
                              </FormGroup>
                            </div>
                          </Row>
                          <Row form>
                            SET
                          <div className="col-auto">
                            <InputGroup
                              className="my-1 align-self-start"
                              size="sm"
                            >
                              <Input
                                id={`column-value-${this.props.id}`}
                                name="column_value"
                                key={this.props.id}
                                type="text"
                                placeholder="SET"
                                defaultValue=""
                                onBlur={this.handleSave}
                                onChange={this.handleSetChange}
                              />
                            </InputGroup>
                            </div>
                            WHERE
                            <div className="col-auto" style={{ minWidth: '35%' }}>
                              <InputGroup className="my-1 align-self-start" size="sm">
                                <Input
                                  type="text-dark"
                                  name="column_filter"
                                  id={`column-filter-${this.props.data.id}`}
                                  className={filterValid}
                                  onBlur={this.handleSave}
                                  onChange={this.handleChange}
                                  value={this.state.column_filter}
                                />
                                <div className="invalid-feedback order-1">
                                  {translations[this.props.language.code].tooltips.invalidFilter}
                                </div>
                                <InputGroupAddon addonType="append">
                                  <ButtonDropdown
                                    isOpen={this.state.dropDownOpen}
                                    toggle={this.handleDropDown}
                                    id={`link-subquery-${this.props.data.id}`}
                                  >
                                    <DropdownToggle
                                      className="btn-sm btn-light btn-outline-secondary"
                                      style={{ borderColor: '#d3d8de' }}
                                      caret
                                    >
                                      {linkedQueryName}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                      <DropdownItem
                                        key="query-link-SQ"
                                        id={`subquery-default-${this.props.data.id}`}
                                        name="subqueryDefault"
                                        value=""
                                        onClick={this.handleSave}
                                      >
                                        {translations[this.props.language.code].queryBuilder.linkSq}
                                      </DropdownItem>
                                      {this.props.queries.map((query, index) => (
                                        <DropdownItem
                                          key={`query-${query.id}-column-${this.props.data.id}`}
                                          id={`subquerySql-${index}-${this.props.data.id}`}
                                          name="subqueryId"
                                          value={query.id}
                                          onClick={this.handleSave}
                                        >
                                          {getCorrectQueryName(
                                            this.props.language, query.queryName, query.id,
                                          )}
                                        </DropdownItem>
                                      ))}
                                    </DropdownMenu>
                                  </ButtonDropdown>
                                </InputGroupAddon>
                                <InputGroupAddon addonType="append">
                                  <Button
                                    color="danger"
                                    id={`column-filter-btn-${this.props.data.id}`}
                                    name="column_filter"
                                    onClick={this.handleRemove}
                                  >
                                    <FontAwesomeIcon icon="times" />
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </div>
                          </Row>
                        </div>
                        <div className="col d-flex w-100 ml-auto">
                          <FormGroup className="align-self-center justify-content-end m-0 ml-auto">
                            <RemoveButton
                              id={`remove-btn-${this.props.data.id}`}
                              languageCode={this.props.language.code}
                              handleRemoveColumn={this.handleRemoveColumn}
                            />
                          </FormGroup>
                        </div>
                      </Row>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </div>
          )}
        </Draggable>
      );
    }
  }
  
  UpdateQueryColumn.propTypes = {
    data: PropTypes.shape({
      column_alias: PropTypes.string,
      column_filter: PropTypes.string,
      column_order_dir: PropTypes.bool,
      column_order: PropTypes.bool,
      table_alias: PropTypes.string,
      table_name: PropTypes.string,
      column_name: PropTypes.string,
      id: PropTypes.number,
      display_in_query: PropTypes.bool,
      table_schema: PropTypes.string,
      data_type: PropTypes.string,
      column_distinct_on: PropTypes.bool,
      column_group_by: PropTypes.bool,
      column_aggregate: PropTypes.string,
      subqueryId: PropTypes.number,
      filter_as_having: PropTypes.bool,
    }),
    removeColumn: PropTypes.func,
    addColumn: PropTypes.func,
    updateColumn: PropTypes.func,
    id: PropTypes.string,
    index: PropTypes.number,
    distinct: PropTypes.bool,
    language: PropTypes.shape({ code: PropTypes.string }),
    queries: PropTypes.arrayOf(PropTypes.shape({})),
  };
  
  const mapStateToProps = store => ({
    returning: store.query.returning,
    language: store.settings.language,
    queries: store.queries.filter(query => query.id !== 0)
      .sort((query1, query2) => query1.id - query2.id),
  });
  
  const mapDispatchToProps = {
    updateColumn,
    removeColumn,
    addColumn,
  };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateQueryColumn);