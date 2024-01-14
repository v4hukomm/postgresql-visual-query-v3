# Postgres Visual Query v3

Application that allows users to visually create PostgreSQL SELECT queries.

## Functionality

### Queries

* Add/remove queries
* Change query names
* Hide/view query menu
* View queries as list
* Use queries as subqueries

### INSERT statement
* Create INSERT statements
* Add singular or multiple value rows to database
* Use subquery to insert data
* RETURNING clause on individual columns or all

### UPDATE statement
* Create UPDATE statements
* RETURNING clause on individual columns or all
* Join tables with FROM clause
* Add filter condition to column

### DELETE statement
* Create DELETE statements
* RETURNING clause on individual columns or all
* Join tables with USING clause
* Add filter condition to column

### Database

* View tables in a schema
* Switch schemas
* Search for tables

### Tables

* Add/remove tables to/from query
* Add alias to table
* Copy tables

### Columns

* Add/remove columns to/from query
* Add alias to column
* Add aggregate function to column
* Add filter condition to column
* DISTINCT ON
* ORDER BY ASC/DESC
* GROUP BY
* Change order of columns
* Copy columns
* Switch between displaying and not displaying column in query
* Limit rows
* Link subqueries to filter
* Filter grouping results
* Combine multiple filters with operators

### Join

* Join table
* Change order of joins
* Add multiple conditions to join

### Set operations
* Add/remove set operations
* Change order of set operations
* Find UNION/UNION ALL/INTERSECT/EXCPEPT between queries

### Result
 
* View built SQL
* Write queries manually or modify built SQL in editor
* Resize editor window
* Highlight matching brackets
* Syntax highlight for SQL clauses/statements
* Immediately see the number of results found
* Run the query and view the results
* Download generated SQL
* Download query results
* Delete all queries at once or one by one

### Utility

* Change the language (English, Estonian)
* Refresh the page without losing the built query

## Setup

The setup for front-end is described at [client](../master/client) and back-end at [server](../master/server)

## Pictures

### Login page
![Login page image](../master/common/images/loginPage.png)

### Query creation page

![Query creation page](../master/common/images/queryPage.png)

## Licence

MIT
