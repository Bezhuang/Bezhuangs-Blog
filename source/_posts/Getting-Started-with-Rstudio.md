---
title: Getting Started with RStudio
date: 2022-12-08
tags: []
categories: 待分类
---

> Getting Started with RStudio is a project-based course provided by [Coursera Project Network](https://www.coursera.org/learn/getting-started-rstudio/). It aims to focus on three learning objectives: Install R and RStudio on desktop, or use the new cloud-based solution that allows anyone to learn R,  know the 10 most important things that 99% of R programmers should know about the RStudio IDE Interface and Be able to explain what R packages are, how to install and load them, from CRAN and Github, into the R session, and create interactive HTML widgets. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-Getting-Started-with-Rstudio.png)

### 1. Install R and Get started with RStudio

Download and Install R via https://cloud.r-project.org/, and Download and Install RStudio via https://posit.co/downloads/ .

Using RStudio with the new cloud-based solution of RStudio via https://posit.cloud/ that allows anyone to do, share, teach and learn R, directly from your browser.

### 2. Most Important Features About RStudio

Know the 10 most important things that 99% of R programmers should know about the RStudio IDE Interface.  

Within Tools `>` Global Options, you can change the theme of the code editor and the pane layout. Most developers will turn off Save `.RData` and History in the General tab of Gloabl Options as well.

A project is the fundamental unit of work in RStudio. It encapsulates your R code, packages and data files and provides isolation from other analyses.

### 3. Install and load R packages, from CRAN and Github.

The public clearing house for R packages is called CRAN, CRAN stands for Comprehensive R Archive Network.

Install the package `dplyr` which is used to manipulate data:

```R
install.packages(“dplyr”); library(dplyr)
```

To download packages from Github, you need to download a package first, called `devtools`and it is on CRAN.

Download a package called `broman` from Github:

```R
install_github("kbroman/broman")
```

### 4. Create and display interactive graphs and tables with 1 line of code.    

Data sets in package `broman`:

```R
data()
```

Show Violent Crime Rates by US State:

```R
USArrests
```

The very common library to create interactive tables, interactive charts and interactive maps in R are DT, highcharter, leaflet.

Install the package `DT` from CRAN:

```R
install.packages("DT")
library(DT)
```

Create a data table:

```R
datatable(mtcars)
```

Create a Interactive map:

```R
install.packages("highcharter")
library(highcharter)
hchart(mtcars, "scatter", hcaes(x=wt, y=mpg, z=drat, color=hp))
```

Create another map:

```r
install.packages("leaflet")
library(leaflet)
leaflet() %>% addTiles() %>% setView(-85.39, 31.22, zoom=12)
```

The `%>%` sign called is called the pipe operator.
