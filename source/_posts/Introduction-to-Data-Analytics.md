---
title: Introduction to Data Analytics
date: 2021-01-24
categories: 数据分析
tags: [IBM Data Analyst, 数据分析]
---

> The Introduction to Data Analytics course provided by IBM is the first in a series of courses designed to prepare me for a career as a junior data analyst. The course introduces me to the core concepts, processes, and tools I need to gain entry into data analytics. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-Intro-2-DA.png)

### Modern Data Ecosystem

#### Key Players in the Data Ecosystem

An Interconnected, Independent and Continually evolving network

Data Sources & Users

Emerging technologies shaping the modern data ecosystem

Organizations are using data to uncover opportunities and applying that knowledge to differentiate themselves from their competition.

Data engineering converts raw data into usable data. Data analytics uses this data to generate insights. Data scientists use data analytics and data engineering to predict the future using data from the past.

Business analysts and business intelligence analysts use these insights and predictions to drive decisions that benefit and grow their business.

#### Defining Data Analysis

Data analysis is the process of gathering, cleaning, analyzing and mining data, interpreting results, and reporting the findings.

Different Types of Data Analytics
- Descriptive Analytics
- Diagnostic Analytics
- Predictive Analytics
- Prescriptive Analytics (self-driving)

The Data Analysis Process
- Understanding the problem and desired result
- Setting a clear metric
- Gathering data
- Cleaning data
- Analyzing and Mining data
- Interpreting results
- Presenting your findings

Data Analytics vs. Data Analysis

### The Data Analyst Role

#### Responsibilities of a Data Analyst

1. Acquiring data
2. Creating queries to extract required data
3. Filtering, cleaning, standardizing, and reorganizing data
4. Using statistical tools
5. Using statistical techniques
6. Analyzing patterns
7. Preparing reports and charts
8. Creating appropriate documentation

#### Skills required for Data Analyst

Expertise in using spreadsheets (Excel)

Proficiency in statistical analysis and visualization tools and software (Power BI, SAS, Tableau)

Proficiency in programming languages (R, Python, C++, Java, MATLAB)

Good knowledge of SQL, and ability to work with data in relational and NoSQL databases

The ability to access and extract data from data repositories (Data marts, Data warehouses, Data lakes, Data pipelines)

Familiarity with Big Data processing tools (Hadoop, Hive, Spark)

Proficiency in Statistics

Analytical skills

Problem-solving skills

Probing skills

Data Visualization skills

Project Management skills

Collaboration and Communication ability

Curiosity and Intuition

### Data Analysts Ecosystem

A data analyst ecosystem includes the infrastructure, software, tools, frameworks, and processes used to gather, clean, analyze, mine, and visualize data.

#### Types of Data

Structured data is data that is well organized in formats that can be stored in databases and lends itself to standard data analysis methods and tools

Semi-structured data is data that is somewhat organized and relies on meta tags for grouping and hierarchy

Unstructured data is data that is not conventionally organized in the form of rows and columns in a particular format

#### Different Types of File Form

Delimited text files: `.CSV`, `.TSV`

Microsoft Excel Open XML Spreadsheet: `.XLSX`

Extensible Markup Language: `.XML`

JavaScript Object Notation: `.JSON`

#### Sources of Data

Relational Databases: Store structured data that can be leveraged for analysis

Flat Files: Store data in plain text format, each line or row is one record, delimited text

Spreadsheet files: Special type of flat files, organize data in a tabular format (`.XLSX`)

XML files: Contain data values that are identified or marked up using tags

APIs and Web Services

Web scraping: Extract relevant data from unstructured data

Data Streams and feeds (RSS feeds)

####  Languages for Data Professionals

Query languages are designed for accessing and manipulating data in a database (SQL)

Programming languages are designed for developing applications and controlling application behavior (Python, R, and Java)

Shell and Scripting languages (Unix/Linux Shell, and PowerShell) are ideal for repetitive and time-consuming operational tasks

SQL: Structured Query Language, Portable and Platform independent

Python libraries: Pandas, Numpy and Scipy, Beautifulsoup and Scrapy, Matplotlib and Seaborn, Opency

R libraries: Gggplot2 and Plotly

### Data Repositories and Big Data Platforms

A data repository is a general term used to refer to data that has been collected, organized, and isolated so that it can be used for business operations or mined for reporting and data analysis.

Data repositories help to isolate data and make reporting and analytics more efficient and credible while also serving as a data archive.

#### RDBMS

Databases: Collection of data, or information, designed for the input, storage, search and retrieval, and modification of data

DBMS: A set of programs that creates and maintains the database

RDBMS: Well-defined structure and schema, Optimized for data operations and querying, Use SQL for querying data

- A relational database is a collection of data organized into a table structure, where the tables can be linked, or related, based on data common to each.
- Create meaningful information, Flexibility, Minimize data redundancy, ease of backup and disaster recovery and ACID complaint (reliable)

#### NoSQL

Built for speed, flexibility and scale, can be stored in a schema-less form, widely used for processing big data

A non-relational database design that provides flexible schemas for the storage and retrieval of data.

NoSQL allows data to be stored in a schema-less or free-form fashion. 

Types: Key-value store (Redis), Document-based (Mongo DB), Column-based (Cassandra), and Graph-based (Neo4J)

#### Key Differences Between RDBMS & NoSQL

| **Relational Databases**                                                                        | **Non-Relational Data Bases**                                                                                       |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| RDBMS schemas rigidly define how all data inserted into the database must be typed and composed | NoSQL databases can be schema-agnostic, allowing unstructured and semi-structured data to be stored and manipulated |
| Maintaining high-end,commercial relational database management systems can be expensive         | Specifically designed for low-cost commodity hardware                                                               |
| Support ACID-compliance, which ensures reliability of transactions and crash recovery           | Most NoSQL databases are not ACID compliant                                                                         |
| A mature and well-documented technology, which means the risks are more or less perceivable     | A relatively newer technology                                                                                       |

#### Data Marts, Data Lakes, ETL and Data Pipelines

A data warehouse is a multi-purpose enabler of operational and performance analytics. 

A data mart is a sub-section of the data warehouse, built specifically for a particular business function, purpose, or community of users. (Business specific reporting and analytics)

A Data Lake is a storage repository that can store large amounts of structured, semi-structured, and unstructured data in their native format, classified and tagged with metadata. (Retain all source data without exclusions)

Extract, Transform and Load Process (ETL): Gathering raw data -> Extracting the information needed for reporting and analysis -> Cleaning, standardizing, and transforming data into usable format -> Loading data into a data repository

- Batch processing, Stream processing, Load verification

A data pipeline is a broader term that encompasses the entire journey of moving data from one system to another, including the ETL process.

#### Foundations of Big Data

Big data refers to the dynamic, large and disparate volumes of data being created by people, tools and machines. It requires new, innovative and scalable technology to collect, host, and analytically process the vast amount of data gathered in order to drive real-time business insights that relate to consumers, risk, profit, performance, productivity management, and enhanced shareholder value.

The V's of Big Data: Velocity, Volume, Variety, Veracity, Value

Big Data Processing Tools

- Apache Hadoop is a collection of tools that provides distributed storage and processing of big data. (Java based, Node&Cluster, HDFS)
- Apache Hive is a data warehouse for data query and analysis built on top of Hadoop. 
- Apache Spark is a distributed data analytics framework designed to perform complex data analytics in real-time. 

### Gathering Data

#### Identifying Data for Analysis

Process for Identifying data
1. Determine the information you want to collect (specific information/possible sources)
2. Define a plan for collecting data (establish timeframe/how much is sufficient/dependencies/risks/mitigation plan)
3. Determine your data collection methods depending on sources, types, timeframe and volume of data

Data identifying has implication for quality, security, and privacy. None of these are one-time considerations but are relevant through the life cycle of the data analysis process.

Data Quality: data needs to be free of errors, accurate, complete, relevant, and accessible.

Data Governance: Security, Regulation and Compliances (relate to the usability, integrity, and availability of data)

Data Privacy: confidentiality, license for use, and compliance to mandated regulations (Checks, validations, and an auditable trail needs to be planned.)

#### Data Sources

Data sources can be internal or external to the organization

Primary data refers to information obtained directly from the source.

Secondary data refers to information retrieved from existing sources, such as external databases, research articles, publications, training material and Internet searches, or financial records available as public data.

Third party data is data you purchased from aggregators who collect data from various sources and combine it into comprehensive datasets purely for the purpose of selling the data.

Sources for Gathering Data: Databases, Web, Social media sites and Interactive platforms, Sensor data, Data Exchange, Interviews and Observation studies

#### How to Gather and Import Data

Using queries to extract data from SQL databases
- Non-relational databases can be queried using SQL or SQL-like query tools.

Application Programming Interfaces (or APIs) are also popularly used for extracting data from a variety of data sources.
- APIs are also used for data validation.

Using Web Scraping to extract data from the web (RSS feeds are another source typically used for capturing updated data from online forums and news sites where data is refreshed on an ongoing basis.)

Data streams are a popular source for aggregating constant streams of data flowing from sources such as instruments, IoT devices and applications, and GPS data from cars.

Data Exchanges have a set of well-defined exchange standards, protocols, and formats relevant for exchanging data.

Specific data repositories are optimized for certain types of data. 
- Relational databases store structured data with a well-defined schema.
- Semi-structured can be stored in NoSQL clusters. XML and JSON are commonly used for storing and exchanging semi-structured data. JSON is also the preferred data type for web services.
- NoSQL databases and Data Lakes provide a good option to store and manipulate large volumes of unstructured data. Data lakes can accommodate all data types and schema. ETL tools and data pipelines provide automated functions that facilitate the process of importing data.

### Wrangling Data

#### Data Wrangling

Data wrangling, also known as data munging, is an iterative process that involves data exploration, transformation, validation, and making it available for a credible and meaningful analysis.

The Data Wrangling Process
1. Discovery: Examine and understand data & create a plan
2. Transformation: Structuring, Normalizing and Denormalizing, Cleaning, Enriching Data
3. Validation: Check the quality of the data post structuring, normalizing, cleaning and enriching of data.
4. Publishing: Delivering the output of the wrangled data for downstream project needs.
5. Documentation: It is vital that you document all considerations and actions.

#### Tools for Data Wrangling

Spreadsheets / Excel Power Query

OpenRefine

Google DataPrep

Watson Studio Refinery

Trifacta Wrangler

Python: Jupyter Notebook, NumPy, pandas

R: Dplyr, Data.Table, Jsonlite

#### Data Cleaning

Poor quality data weakens an organization's competitive standing and undermines critical business objectives.

Data Cleaning Workflow
- Inspection: Detect issues and errors, Validating against rules and constraints, Profiling data, visualizing data
- Cleaning: Imputate missing values, Remove duplicate data, Data type conversion, Standardize data, Rectify syntax errors, Examine outliers......
- Verification: Reinspect data
- It is important to document

### Analyzing and Mining Data

#### Statistical Analysis

Statistics is a branch of mathematics dealing with the collection, analysis, interpretation, and presentation of numerical or quantitative data.

Statistical Analysis is the application of statistical methods to a sample of data in order to develop an understanding of what that data represents.

Descriptive Statistics enables you to present data in a meaningful way allowing simpler interpretation of the data.
- Central Tendency: Mean(average value), Medium(Middle's value), Mode(Most popular value)
- Dispersion: Variance, Standard Deviation, Range
- Skewness: Measure of whether the distribution of values is symmetrical around a central value or skewed left or right.

Inferential statistics takes data from a sample to make inferences about the larger population from which the sample was drawn.
- Hypothesis Testing—For example, for studying the effectiveness of a vaccine by comparing outcomes in a control group
- Confidence Intervals incorporate the uncertainty and sample error to create a range of values the actual population value is like to fall within.
- Regression Analysis incorporates hypothesis tests that help determine whether the relationships observed in the sample data actually exist in the population rather than just the sample.

SAS, SPSS, StatsSoft

#### Data Mining

The process of extracting knowledge from data, is the heart of the data analysis process. 

An interdisciplinary field that involves the use of pattern recognition technologies, statistical analysis and mathematical techniques.

Aims to identify correlations in data, find patterns and variations. understand trends and predict probabilities.

Pattern recognition is the discovery of regularity's or commonality's in data.

A trend is the general tendency of a set of data to change overtime.

Data mining has applications across industries and disciplines.

Data mining techniques
- Classification: Classifying attributes into target categories
- Clustering: Involves grouping data into clusters so they can be treated as groups
- Anomaly or Outlier Detection: Finding patterns in data that are not normal or unexpected
- Association Rule Mining: Establishing a relationship between two data events
- Sequential Patterns: Tracing a series of events that take place in a sequence
- Affinity Grouping: Discovering co-occurrence in relationships
- Decision trees: Building classification models in the form of a tree structure with multiple branches, where each branch represents a probable occurrence.
- Regression: Identifying the nature of the relationship between two variables, which could be causal or correlational.

#### Tools for Data Mining

Spreadsheets: Host data, create pivot table, add-ins(Data Mining Client, XLMiner)

R-language: tm, twitteP, RStudio

Python: pandas, NumPy, Jupyter Notebook

IBM SPSS Statistics (Statistical Process for Social Sciences)

IBM Watson Studio

SAS Enterprise Miner: A comprehensive, graphical workbench for data mining.

### Communicating and Sharing Data Analysis Findings

The data analysis process ends with communicating the findings in ways that impact decision making.

Data projects involve
-  A collaborative effort spread across business functions
- People with multi-disciplinary skills
- Findings incorporated into a larger business initiative.

The success of your communication depends on how well others can understand and trust your insights to take further action.

Understanding the information needs of your audience will help you decide what and how much information is essential to enable a better understanding of your findings.

#### Structure your presentation

Begin your presentation by demonstrating your understanding of the business problem to your audience. Speak in the language of the organization’s business domain.

The next step in designing your communication is to structure and organize your presentation for maximum impact.

#### The Role of Visuals

A powerful visualization tells a story through the graphical depiction of facts and figures. (Graphs, Charts, Diagrams)

Trust, Understanding, Relatability

#### Introduction to Data Visualization

Data visualization is the discipline of communicating information through the use of visual elements such as graphs, charts, and maps. Its goal is to make information easy to comprehend, interpret, and retain.

Choosing appropriate visualizations

Common types of graphs
- Bar Charts are great for comparing related data sets or parts of a whole.
- Column Charts compare values side-by-side. You can use them quite effectively to show change over time.
- Pie Charts show the breakdown of an entity into its sub-parts and the proportion of the sub-parts in relation to one another. Each portion of the pie represents a static value or category, and the sum of all categories is equal to hundred percent.
- Line Charts display trends. They’re great for showing how a data value is changing in relation to a continuous variable.

Dashboards organize and display reports and visualizations coming from multiple data sources into a single graphical interface.
- Are easy to comprehend by an average user
- Make collaboration easy between teams
- Allow you to generate reports on the go

#### Introduction to Visualization and Dashboarding Software

Spreadsheets

Jupyter Notebook and Python libraries (Matplotlib, Bokeh, Dash)

R-Studio and R-Shiny

IBM Cognos Analytics

Tableau

Microsoft Power BI

### Opportunities and Learning Paths

Data analyst job openings exist across industry, government and academia.

Banking and Finance, Insurance, Healthcare, Retail and Information Technology

Roles and Responsibilities
- Data Analyst Specialist Roles
- Domain Specialist Roles
- Data Engineers & Data Scientists

4 important soft skills
- Problem-Solving
- Project Management
- Communication
- Storytelling
