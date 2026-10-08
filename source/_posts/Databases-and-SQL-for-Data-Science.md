---
title: Databases and SQL for Data Science with Python
date: 2021-02-15
tags: [IBM Data Science]
categories: Data Science and Analytics
---

> Much of the world's data resides in databases, A working knowledge of databases and SQL is a must to become a data scientist. The emphasis in this course provided by IBM is on hands-on and practical learning. So, I'll try to record how I work with real databases, real data science tools, real-world datasets and eventually, how I create a database instance in the cloud on the following notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Databases&SQL4Data-Science.png)

### Introduction to Databases

Structured Query Language (or SQL) is a powerful language which is used for communicating with and extracting data from databases.

SQL is among the top 3 skills for a Data Scientist or Data Analysts

A database is a repository of data, it provides the functionality for adding, modifying and querying data

RDBMS = Relational database management system

5 Basic SQL commands: Create, Insert, Select, Update, Delete

Cloud databases: Ease of use and access, Scalability & Economics, Disaster recovery
- IBM Db2, PostgreSQL, Oracle Cloud, Microsoft Azure, Amazon RDS

DBaaS (Database-as-a-Service) provides users with access to database resources in Cloud without the need for setting up hardware and installing software.

Relational Model allows for data independence (key advantage)

Entities are independent objects which have Attributes
- Entity-Relationship Model (ER-Model): used as a tool to design RDBMS
- Mapping Entity Diagrams to Tables: Entities become tables, Attributes get translated into columns

Primary Keys and Foreign Keys: A primary key uniquely identifies a specific row in a table and prevents duplication of data.

### Basic SQL

Data Definition Language statements (DDL) and Data Manipulation Language statements (DML)

Data Definition Language (DDL) statements are used to define, change, or drop database objects. 

- Common DDL statement types include: `CREATE`, `ALTER`, `TRUNCATE` and `DROP`

Data Manipulation Language (DML) statements are used to read and modify data in tables.

- CRUD operations: Create, Read, Update and Delete
- Common DML statement types include: `INSERT`, `SELECT`, `UPDATE` and `DELETE`

`CREATE` and `DROP` tables in the database

- It is quite common to issue a `DROP` before doing a `CREATE` in test and development scenarios, but if the table does not already exist and you try to drop it, you will see an error like `XXX.YYY` is an undefined name.

```mysql
drop table COUNTRY;  ## If table already exists
create table COUNTRY(
	ID int PRIMARY KEY NOT NULL,
	CCODE char(2) NOT NULL,
	NAME varchar(60)
);
```

Use `SELECT` queries to retrieve data from the database

```mysql
select COLUMN1, COLUMN2, ... from TABLE1 ;
##  or
select * from COUNTRY ;
## or
select * from COUNTRY where ID < 5 ;
## or
select * from COUNTRY where CCODE = 'CA';
```

Use `COUNT`, `DISTINCT`, `LIMIT`, `INSERT`, `UPDATE`, `DELETE` to compose and run basic queries

```mysql
-- 0. Drop table INSTRUCTOR in case it already exists
drop table INSTRUCTOR;
-- 1. Create table INSTRUCTOR
CREATE TABLE INSTRUCTOR
  (ins_id INTEGER PRIMARY KEY NOT NULL, 
   lastname VARCHAR(15) NOT NULL, 
   firstname VARCHAR(15) NOT NULL, 
   city VARCHAR(15), 
   country CHAR(2)
  );
-- 2A. Insert single row for Rav Ahuja
INSERT INTO INSTRUCTOR
  (ins_id, lastname, firstname, city, country)
  VALUES 
  (1, 'Ahuja', 'Rav', 'Toronto', 'CA');
-- 2B. Insert the two rows for Raul and Hima
INSERT INTO INSTRUCTOR
  VALUES
  (2, 'Chong', 'Raul', 'Toronto', 'CA'),
  (3, 'Vasudevan', 'Hima', 'Chicago', 'US');
-- 3. Select all rows in the table
SELECT * FROM INSTRUCTOR;
-- 3b. Select firstname, lastname and country where city is Toronto
SELECT firstname, lastname, country from INSTRUCTOR where city='Toronto';
-- 4. Change the city for Rav to Markham
UPDATE INSTRUCTOR SET city='Markham' where ins_id=1;
-- 5. Delete the row for Raul Chong
DELETE FROM INSTRUCTOR where ins_id=2;
-- 5b. Retrieve all rows from the table
SELECT * FROM INSTRUCTOR ;
```

### String Patterns, Ranges, Sorting and Grouping

Using String Patterns and Ranges

- The `WHERE` clause always requires a predicate, which is a condition that evaluates to true, false or unknown.
- Use the `LIKE` predicate with string patterns for the search：`WHERE <columnname> LIKE <string pattern>`

```mysql
select F_NAME , L_NAME
from EMPLOYEES
where ADDRESS LIKE '%Elgin,IL%' ;
```

Sorting Result Sets

- `ORDER BY`: Descending order，Specifying Column Sequence Number

  ```mysql
  select F_NAME, L_NAME, DEP_ID 
  from EMPLOYEES
  order by DEP_ID desc, L_NAME desc;
  ```

Grouping Result Sets

- `SELECT DISTINCT()` : Eliminating Duplicates
- `GROUP BY`
- `HAVING`: Restricting the result set

```mysql
select DEP_ID, COUNT(*) AS "NUM_EMPLOYEES", AVG(SALARY) AS "AVG_SALARY"
from EMPLOYEES
group by DEP_ID
having count(*) < 4
order by AVG_SALARY;
```

### Functions, Sub-Queries, Multiple Tables

Built-in Database Functions: Using database functions can significantly reduce the amount of data that needs to be retrieved from the database.

Aggregate or Column Functions

- INPUT: Collection of values (e.g. entire column), OUTPUT: Single value
- `SUM()`, `MIN()`, `MAX()`, `AVG()`

```mysql
select AVG( COST / QUANTITY ) from PETRESCUE where ANIMAL = 'Dog';
```

`SCALAR` and `STRING` functions

- Perform operations on every input value
- `ROUND()`, `LENGTH()`, `UCASE`, `LCASE`

```mysql
select DISTINCT(UCASE(ANIMAL)) from PETRESCUE;
select * from PETRESCUE where LCASE(ANIMAL) = 'cat';
```

Date and Time Built-in Functions
- `YEAR()`, `MONTH()`, `DAY()`, `DAYOFWEEK()`, `DAYOFYEAR()`, `WEEK()`, `HOUR()`, `MINUTE()`, `SECOND()`
- Date or Time Arithmetic

```mysql
select SUM(QUANTITY) from PETRESCUE where DAY(RESCUEDATE)='14';
select (RESCUEDATE + 3 DAYS) from PETRESCUE;
select (CURRENT DATE - RESCUEDATE) from PETRESCUE;
```

Sub-Queries and Nested Selects

- Sub-Queries cannot evaluate Aggregate functions like `AVG()` in the `WHERE` clause,therefore,use a sub-Select expression
- Sub-queries in `FROM` clause substitute the `TABLE` name with a sub-query called Derived Tables or Table Expressions.

```mysql
select * from employees where salary > AVG(salary)
select EMP_ID, F_NAME, L_NAME, SALARY from employees where SALARY > (select AVG(SALARY) from employees);
select EMP_ID, SALARY, ( select AVG(SALARY) from employees ) AS AVG_SALARY from employees ;
```

Working with Multiple Tables

- Sub-queries

```mysql
select * from employees where DEP_ID IN ( select DEPT_ID_DEP from departments where LOC_ID = 'L0002' );
select DEPT_ID_DEP, DEP_NAME from departments where DEPT_ID_DEP IN ( select DEP_ID from employees where SALARY > 70000 ) ;
```

Implicit `JOIN`

```mysql
select * from employees E, departments D where E.DEP_ID = D.DEPT_ID_DEP;
select E.EMP_ID, D.DEP_NAME from employees E, departments D where E.DEP_ID = D.DEPT_ID_DEP
```

`JOIN` operators（`INNER JOIN`, `OUTER JOIN`...）

### Accessing databases using Python

Python ecosystem: NumPy, pandas, matplotlib, SciPy

DB-API (Python Database API): Python's standard API for accessing relational databases.

- Connection Objects: Database connections, Manage transactions
- Cursor Objects: Database queries, Scroll through result set, Retrieve results
- Connection methods: `.cursor()`, `.commit()`, `.rollback()`, `.close()`
- Cursor methods: `.callproc()`, `.execute()`, `.executemany()`, `.fetchone()`, `.fetchmany()`, `.fetchall()`, `.nextset()`, `.arraysize()`, `.close()`

```python
from dbmodule import connect
#Create connection object
Connection = connect('databasename', 'username', 'pswd')
#Create a cursor object
Cursor=connection.cursor()
#Run Queries
Cursor.execute('select * from mytable')
Results = cursor.fetchall()
#Free resources
Cursor.close()
Connection.close()
```

Connect to Db2 database (ibm_db API)

```python
import ibm_db
#Replace the placeholder values with your actual Db2 hostname, username, and password:
dsn_hostname = "YourDb2Hostname"   # e.g.: "dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net"
dsn_uid = "YourDb2Username"        # e.g. "abc12345"
dsn_pwd = "YoueDb2Password"      # e.g. "7dBZ3wWt9XN6$o0J"
dsn_driver = "{IBM DB2 ODBC DRIVER}"
dsn_database = "BLUDB"            # e.g. "BLUDB"
dsn_port = "50000"                # e.g. "50000" 
dsn_protocol = "TCPIP"            # i.e. "TCPIP"
#Create the dsn connection string
dsn = (
    "DRIVER={0};"
    "DATABASE={1};"
    "HOSTNAME={2};"
    "PORT={3};"
    "PROTOCOL={4};"
    "UID={5};"
    "PWD={6};").format(dsn_driver, dsn_database, dsn_hostname, dsn_port, dsn_protocol, dsn_uid, dsn_pwd)
#Create database connection
try:
    conn = ibm_db.connect(dsn, "", "")
    print ("Connected to database: ", dsn_database, "as user: ", dsn_uid, "on host: ", dsn_hostname)
except:
    print ("Unable to connect: ", ibm_db.conn_errormsg() )
```

Close the connection

```python
ibm_db.close(conn)
```

Creating tables, loading data and querying data

```python
#Lets first drop the table INSTRUCTOR in case it exists from a previous attempt
dropQuery = "drop table INSTRUCTOR"
#Now execute the drop statment
dropStmt = ibm_db.exec_immediate(conn, dropQuery)
#Construct the Create Table DDL statement - replace the ... with rest of the statement
createQuery = "create table INSTRUCTOR(id INTEGER PRIMARY KEY NOT NULL, fname ...)"
#Now fill in the name of the method and execute the statement
createStmt = ibm_db.replace_with_name_of_execution_method(conn, createQuery)
#Construct the query - replace ... with the insert statement
insertQuery = "..."
#execute the insert statement
insertStmt = ibm_db.exec_immediate(conn, insertQuery)
#replace ... with the insert statement that inerts the remaining two rows of data
insertQuery2 = "..."
#execute the statement
insertStmt2 = ibm_db.exec_immediate(conn, insertQuery2)
#Construct the query that retrieves all rows from the INSTRUCTOR table
selectQuery = "select * from INSTRUCTOR"
#Execute the statement
selectStmt = ibm_db.exec_immediate(conn, selectQuery)
#Fetch the Dictionary (for the first row only) - replace ... with your code
...
#Fetch the rest of the rows and print the ID and FNAME for those rows
while ibm_db.fetch_row(selectStmt) != False:
   print (" ID:",  ibm_db.result(selectStmt, 0), " FNAME:",  ibm_db.result(selectStmt, "FNAME"))
updateQuery = "update INSTRUCTOR set CITY='MOOSETOWN' where FNAME='Rav'"
updateStmt = ibm_db.exec_immediate(conn, updateQuery))
```

Retrieve data into Pandas

```python
import pandas
import ibm_db_dbi
#connection for pandas
pconn = ibm_db_dbi.Connection(conn)
#query statement to retrieve all rows in INSTRUCTOR table
selectQuery = "select * from INSTRUCTOR"
#retrieve the query results into a pandas dataframe
pdf = pandas.read_sql(selectQuery, pconn)
#print just the LNAME for first row in the pandas data frame
pdf.LNAME[0]
#print the entire data frame
pdf
pdf.shape
```

SQL Magic
- Cell magics: start with a double `%%` sign and apply to the entire cell
- Line magics: start with a single `%`  sign and apply to a particular line in a cell
- `%magicname arguments`
- `%sql select * from tablename`

### Analyzing data with Python

```python
#Connect to the database
%load_ext sql
%sql ibm_db_sa://
#Store the dataset in a Table
import pandas
chicago_socioeconomic_data = pandas.read_csv('https://data.cityofchicago.org/resource/jcxq-k9xf.csv')
%sql PERSIST chicago_socioeconomic_data
%sql SELECT * FROM chicago_socioeconomic_data limit 5;
#How many rows are in the dataset
%sql SELECT COUNT(*) FROM chicago_socioeconomic_data;
#How many community areas in Chicago have a hardship index greater than 50.0
%sql SELECT COUNT(*) FROM chicago_socioeconomic_data WHERE hardship_index > 50.0;
#What is the maximum value of hardship index in this dataset
%sql SELECT MAX(hardship_index) FROM chicago_socioeconomic_data;
#Which community area which has the highest hardship index
%sql select community_area_name from chicago_socioeconomic_data where hardship_index = ( select max(hardship_index) from chicago_socioeconomic_data )
#Create a scatter plot using the variables per_capita_income_ and hardship_index
!pip install seaborn
import matplotlib.pyplot as plt
%matplotlib inline
import seaborn as sns
income_vs_hardship = %sql SELECT per_capita_income_, hardship_index FROM chicago_socioeconomic_data;
plot = sns.jointplot(x='per_capita_income_',y='hardship_index', data=income_vs_hardship.DataFrame())
```

### Using JOIN operations to work with multiple tables

Inner Join

Outer Join

- Left Outer Join
- Right Outer Join
- Full Outer Join

HR Database example

```sql
--- Select the names, job start dates, and job titles of all employees who work for the department number 5 ---	
select E.F_NAME,E.L_NAME, JH.START_DATE, J.JOB_TITLE 
	from EMPLOYEES as E 
	INNER JOIN JOB_HISTORY as JH on E.EMP_ID=JH.EMPL_ID 
	INNER JOIN JOBS as J on E.JOB_ID=J.JOB_IDENT
	where E.DEP_ID ='5'
;
--- Perform a Left Outer Join on the EMPLOYEES and DEPARTMENT tables and select employee id, last name, department id and department name for all employees ---
select E.EMP_ID,E.L_NAME,E.DEP_ID,D.DEP_NAME
	from EMPLOYEES AS E 
	LEFT OUTER JOIN DEPARTMENTS AS D ON E.DEP_ID=D.DEPT_ID_DEP
;	
--- Re-write the query to have the result set include all the employees but department names for only the employees who were born before 1980. ---
select E.EMP_ID,E.L_NAME,E.DEP_ID,D.DEP_NAME
	from EMPLOYEES AS E 
	LEFT OUTER JOIN DEPARTMENTS AS D ON E.DEP_ID=D.DEPT_ID_DEP 
	AND YEAR(E.B_DATE) < 1980
;
--- Perform a Full Join on the EMPLOYEES and DEPARTMENT tables and select the First name, Last name and Department name of all employees. ---
select E.F_NAME,E.L_NAME,D.DEP_NAME
	from EMPLOYEES AS E 
	FULL OUTER JOIN DEPARTMENTS AS D ON E.DEP_ID=D.DEPT_ID_DEP
;
--- Re-write Query to have the result set include all employee names but department id and department names only for male employees. ---
select E.F_NAME,E.L_NAME,D.DEPT_ID_DEP, D.DEP_NAME
	from EMPLOYEES AS E 
	FULL OUTER JOIN DEPARTMENTS AS D ON E.DEP_ID=D.DEPT_ID_DEP AND E.SEX = 'M'
;
```

### Working with Real World Datasets

Understand 3 Chicago datasets

Load the 3 datasets into 3 tables in a Db2 database

Execute SQL queries to answer assignment questions

### Assignments

Visit my [Github Repository](https://github.com/Bezhuang/IBM-Data-Science)