---
title: Tools for Data Science
date: 2021-05-15
tags: [IBM Data Science]
categories: Data Science and Analytics
---

> In this course provided by IBM, I learned about Jupyter Notebooks, JupyterLab, RStudio IDE, Git, GitHub, and Watson Studio, what each tool is used for, what programming languages they can execute, their features and limitations. With the tools hosted in the cloud on Skills Network Labs, I can now run simple code in Python, R or Scala. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Tools-for-Data-Science.png)

### Languages of Data Science

Python
- General Purpose language with Large standard library
- Scientific computing libraries like Pandas, NumPy, SciPy and Matplotlib
- For artificial intelligence it has PyTorch, TensorFlow, Keras and Scikit-learn
- Python can be used for Natural Language Processing (NLP) using the Natural Language Toolkit (NLTK)

R Language
- Python is Open Source, R is Free Software
- Open Source Initiative (OSI) champions open source while the Free Software Foundation (FSF) defines free software
- Open Source is more business focused while Free Software is more focused on a set of values
- R is most often used by statisticians, mathematicians and data miners for developing statistical software, graphing and data analysis
- The array-oriented syntax makes it easier to translate from math to code
- R has become the world's largest repository of statistical knowledge
- Common mathematical operations like matrix multiplication work straight out of the box
- R has stronger object-oriented programming facilities than most statistical computing languages 

SQL (Structured Query Language)
- SQL = 
- SQL was initially developed at IBM, first appeared in 1974
- Useful in handling structured data, i.e. data incorporating relations among entities and variables
- The SQL language is subdivided into several language elements, including clauses, expressions, predicates, queries, and statements
- Knowing SQL will help you do many different jobs in data science, including business and data analyst, and it's a must in data engineering. 
- When performing operations with SQL, you access the data directly ( without any need to copy it beforehand). This can speed up workflow executions considerably.
- SQL is the interpreter between you and the database
- SQL is an American National Standards Institute, or "ANSI," standard, which means if you learn SQL and use it with one database, you will be able to easily apply that SQL knowledge to many other databases.
- MySQL, IBM Db2, PostgreSQL, Apache OpenOffice Base, SQLite, Oracle, MariaDB, Microsoft SQL Server

Java
- Java is a tried and true general purpose object oriented programming language
- Huge adoption in the enterprise space, designed to be fast and scalable
- Java applications are compiled to bytecode and run on JVM
- Tools include Weka (data mining), Java-ML (ml library), Apache MLlib (scalable ml) and Deeplearning4j
- Hadoop manages data processing and storage for big data applications running in clustered systems

Scala
- Scala is a general purpose programming language that provides support for functional programming
- Designed as an extension to Java, it is inter-operable with Java as it also runs on JVM
- The name Scala comes from "Scalable Language"
- Apache Spark is a fast and general-purpose cluster computing system. It provides APIs that make parallel jobs easy to write, and an optimized engine that supports general computation graphs.
- Spark includes Shark, which is a query engine; MLlib, for machine learning; GraphX, for graph processing; and Spark Streaming. 
- Apache Spark was designed to be faster than Hadoop

C++
- Another general purpose language, C++ is an extension of C
- Improve processing speed, enables system programming and gives you broader control over the application
- Many organizations rely on C++ to develop programs that feed data to customers in real-time
- TensorFlow is a deep learning library
- MongoDB is a NoSQL database for big data management
- Caffe is a deep learning algorithm repository

Javascript
- A core technology for the WWW, A general purpose language that extended beyond the browser with Node.js and other server side approaches
- TensorFlow.js makes machine learning and deep learning possible in Node.js and in the browser, It is adopted by other open source libraries including brain.js and machinelearn.js
- R-js makes linear algebra possible in Typescript

Julia
- Designed at MIT for high-performance numerical analysis and computational science
- Same speedy development like Python or R while producing programs that run as fast as C or Fortran programs would
- It's compiled, calls C, Go, Java, MATLAB, R, Fortran and Python libraries and has refined parallelism
- A young language with a lot of promise in the data science industry
- JuliaDB is a particularly useful application of Julia for data science. It's a package for working with large persistent data sets.

### Data Science Tools

Data Management tools: persisting and retrieving data
- Open Source: MySQL, PostgreSQL, MongoDB, Apache CouchDB, Apache Cassandra, Hadoop File System, Ceph(Cloud File systems), Elasticsearch
- Commercial: Oracle Database, Microsoft SQL Server, IBM Db2
- SaaS(cloud based): Amazon DynamoDB, Cloudant(based on CouchDB), Db2

Data Integration and Transformation tools: ETL(extract, transform, load)
- Open Source: Apache AirFlow, KubeFlow, Apache Kafka, Apache Nifi, Apache SparkSQL, NodeRED
- Commercial: Informatica, IBM InfoSphere DataStage, Talend
- Cloud Based(ELT): Informatica, IBM Data Refinery

Data Visualization tools
- Open Source: Hue, Kibana, Apache Superset
- Commercial: Tableau, Microsoft Power BI, IBM Cognos Analytics
- Cloud Based: Datameer, IBM Cognos Analytics

Model Building: creating a machine learning or deep learning model using an appropriate algorithm
- Commercial: SPSS Modeler, SAS Enterprise Miner
- Cloud Based: IBM Watson Machine Learning, Google Cloud

Model Deployment tools: make machine learning or deep learning model consumable
- Open Source: Apache PredictionIO, Seldon, Mleap, TensorFlow Service, TensorFlow lite
- Commercial: SPSS Collaboration and Deployment Service

Model Monitoring and Assessment tools: keep track of prediction performance
- Open Source: ModelDB, Prometheus, IBM AI Fairness 360 open source toolkit, IBM Adversarial Robustness 360 Toolbox, IBM AI Explainability 360 Toolkit
- Cloud Based: Amazon SageMaker Model Monitor, Watson OpenScale

Code Asset Management tools: versioning and other collaborative features to facilitate teamwork
- Open Source: git, Github, GitLab, Bitbucket

Data Asset Management tools: supports replication, backup, and access right management
- Open Source: Apache Atlas, ODPi Egeria, Kylo
- Commercial: Informatica, IBM InfoSphere Information Governance

Development Environments (IDE): help data scientistd to implement, execute, test and deploy their work
- Open Source: Jupyter notebook, Jupyter lab, Apache Zeppelin, R Studio, Spyder

Execution Environments: where data processing, model training and deployment take place
- Open Source: Apache Spark, Apache Flink, Ray

Fully Integrated Visual Tools
- Open Source: KNIME, Orange
- Cloud Based: Watson Studio, Open Scale, Azure Machine Learning, H2O Driverless AI

### Packages, APIs, Data Sets and Models

Libraries for Data Science
- Scientifics Computing Libraries: Pandas, NumPy
- Visualization Libraries: Matplotlib, Seaborn
- Machine Learning and Deep Learning: Scikit-learn, Keras
- Deep Learning Libraries: TensorFlow, PyTorch
- Apache Spark
- Scala-Libraries: Vegas(statistical data visualization), BigDL
- R-Libraries: Ggplot2

Application Programming Interfaces (API)
- REST APIs (Representational, State, Transfer): used to interact with web services
- REST APIs have a set of rules regarding communication, input or request, output or response

Data Sets
- A data set is a structured collection of data
- Tabular data: CSV (comma separated values)
- Hierarchical data, Network data
- Raw files: images and audio

Data Ownership
- Private data: Confidential, Private or personal information, Commercially sensitive
- Open data: Scientific institutions, Governments, Organizations, Companies, Publicly available
- Kaggle, datacatalogs.org, Google data set search
- CDLA: Community Data License Agreement

Data Asset eXchange
- Curated collection of data sets
- Data Science friendly licences

Machine Learning Models
- Data can contain a wealth of information, Machine learning (ML) models identify patterns in data 
- A model must be trained on data before it can be used to make predictions 
- Supervised, unsupervised and reinforcement learning are types of ML
- Supervised Learning: Data is labeled and model trained to make correct predictions 
  - Regression: Predict real numerical values 
  - Classification: Classify things into categories 
- Unsupervised Learning: Data us not labeled, model tries to identify patterns without external help
  - Common learning problems: clustering and anomaly detection 
- Reinforcement Learning: Conceptually similar to human learning processes
- Deep Learning: Tries to loosely emulate how the human brain works
  - Applications in: Natural Language Processing, Image, audio and video analysis, Time series forecasting
  - Requires typically very large datasets of labeled data and is compute intensive
  - TensorFlow, Pytorch, Keras, ONNX model zoo

The Model Asset Exchange
- MAX use pre-trained or custom-trainable state-of-the-art models reduces time to value
- Model-serving microservices expose standardized REST API

### Jupyter Notebook and JupyterLab

Jupyter Notebook is a tool for recording Data Science experiments, it allows data scientist to combine text and code block in a single file, it generates plots and tables within the file

JupyterLab is an interactive environment for Jupyter Notebooks, it allows for real time editing and is compatible with several file formats. It is open source

A notebook kernel is a computational engine that executes the code contained in a Notebook file

Jupyter implements a two-process model, with a kernel and a client
- The client is the interface offering the user the ability to send the code to a kernel. The client is the browser when using a Jupyter notebook.
- The kernel executes the code and returns the result to the client for display

### RStudio IDE

R is a statistical programming language. It is a powerful tool for data processing and manipulation, statistical inference, data analysis, and Machine Learning algorithms.

R supports importing data from different sources: Flat files, Databases, Web, Statistical software

Rstudio is an integrated development environment that helps improve and increase productivity with the R language

```R
library (datasets)
data(iris)
View(iris) 
unique(iris$Species)
```

Popular R Libraries for Data Science

- `dplyr` : Data Manipulation
- `stringr` : String Manipulation 
- `ggplot` : Data Visualization 
- `caret` : Machine Learning
- `install.packages("package name", repos = "https://cran.r-project.org", type= "source")` : install packages 

Data Visualization in R

- `ggplot` - used for data visualizations such as histograms, bar charts, scatterplots etc. It allows adding layers and components on a single visualization
- `Plotly` - an R package can be used to create web-based data visualizations that can be displayed or saved as individual HTML files
- `Lattice` - a data visualization tool that is used to implement complex, multi-variable data sets, a high-level data visualization library; it can handle many of the typical graphics without needing many customizations
- `Leaflet` - very useful in creating interactive plots

Using the plot function

```R
# Define the cars vector with 5 values
cars <- c(1,4,6,5,10)
# Gragh the cars vector with all defaults
plot(caars, type="o")
# Create a title
title(main="Cars vs Index")
```

Using ggplot

```R
library(datasets)
# Load Data
data(mtcars)
# View first 5 rows
head(mtcars, 5)
#load ggplot package
library(ggplot2)
# create a scatterplot of displacement (disp) and miles per gallon (mpg)
ggplot(aes(x=disp,y=mpg,),data=mtcars)+geom_point()
# Add a title
ggplot(aes(x=disp,y=mpg,),data=mtcars)+geom_point()+ggtitle("displacement vs miles per gallon")
# change axis name
ggplot(aes(x=disp,y=mpg,),data=mtcars)+geom_point()+ggtitle("displacement vs miles per gallon") + labs(x = "Displacement", y = "Miles per Gallon")
#make vs a factor
mtcars$vs <- as.factor(mtcars$vs)
# create boxplot of the distribution for v-shaped and straight Engine
ggplot(aes(x=vs, y=mpg), data = mtcars) + geom_boxplot()
# Add color to the boxplots to help differentiate
ggplot(aes(x=vs, y=mpg, fill = vs), data = mtcars) + 
  geom_boxplot(alpha=0.3) +
  theme(legend.position="none")
# reate the histogram of weight wt
ggplot(aes(x=wt),data=mtcars) + geom_histogram(binwidth=0.5)
# GGally is an extension of ggplot2
library(GGally)
ggpairs(iris, mapping=ggplot2::aes(colour = Species))
```

### Github

A version control system allows you to keep track of changes to your documents

Git is free and open source software distributed under the GNU General Public License

Git is a distributed version control system and is accessible anywhere in the world

SSH protocol is a method for secure remote login from one computer to another

Repository contains project folders that are set up for version control

Fork is a copy of a repository

Pull request is the way you request that someone reviews and approves your changes before they become final

Working directory contains the files and subdirectories on your computer that are associated with a Git repository

Basic Git Commands

```bash
git init
git add *
git status
git commit
git reset
git log
git branch
git checkout
git merge
```

Working with Branches

- A branch is a snapshot of your repository to which you can make changes
- Master Branch is the official version of the project, The child branch creates a copy of the master branch
- Edits and changes are made in the child branch. Tests are done to ensure quality before merging to the Master Branch
- Branches allow for simultaneous development and testing by multiple team members 

Pull Requests (PR) are a way of proposing changes to the main branch. Ideally, another team member reviews the changes and approves it to be merged to the Master branch

### IBM Tools for Data Science

Watson Studio is an integrated platform of tools, services, and data that helps companies accelerate their shift to become data-driven organizations

Watson Knowledge Catalog unites all information assets into a single metadata-rich catalog, based on Watson’s understanding of relationships between assets and how they’re being used and socialized among users in existing projects
- Main features: Find data, Catalog data, Govern data, Understand data, Power data Science, Prepare data, Connect data, Deploy anywhere

Data refinery simplifies data cleansing, shaping and preparation tasks by providing graphical tools for analyzing and preparing data

SPSS based products include easy to use graphical interfaces for wide varieties of statistical and machine learning algorithms and data transformations
- SPSS Modeler flows include some data management capabilities, as well as tools for data preparation, visualization, and model building
- SPSS Modeler is a data mining and text analytics software application used to build predictive models and conduct other analytics tasks. It has a visual interface that enables users to leverage statistical and data mining algorithms without programming
- SPSS Statistics is a statistical and machine learning software application and is widely used in academia, government agencies, and large enterprises used to build predictive models, perform statistical analysis of data, and conduct other analytic tasks. It has a visual interface, which enables users to leverage statistical and data mining algorithms without programming, although the interface is very different from Modeler

Model Deployment with Watson Machine Learning
- Open standards for model deployment: PMML(Predictive Model Markup Language), PFA(Portable Format for Analytics from DMG)
- ONNX: Open Neural Network eXchange

Auto AI help simplify an AI lifecycle management, it provides a graphical interface to create and deploy machine learning models with real time visualizations

IBM Watson Openscale is a product that includes several important features
- Fairness, Explainability, Model Monitoring, Business Impact
