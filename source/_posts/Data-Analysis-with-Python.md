---
title: Data Analysis With Python
date: 2021-03-27
tags: [IBM Data Science]
mathjax: true
categories: Data Science and Analytics
---

> This Data Analysis with Python course provided by IBM is designed to teach future data analysts how to prepare data for analysis, perform simple statistical analysis, create meaningful data visualizations, predict future trends from data through a number of lecture, lab, and assignments using Python libraries. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-Data-Analysis-with-py.png)

### Importing Datasets

Data, Dataset & Attributes in the dataset

Python Packages for Data Science

- Scientifics Computing Libraries: Pandas, NumPy, SciPy
- Visualization Libraries: Matplotlib, Seaborn
- Algorithmic Libraries: Scikit-learn, Statsmodels

Importing Data: Format & File Path of dataset

```python
import pandas as pd
url = ""
df = pd.read_csv(url, header = None)  #create dataframe
df.head(n) #shows the first n rows while df.tail(n) shows the bottom n rows
path = ""
df.to_csv(path) #exporting dataframe, you can also use df.to_json() / df.to_excel() / df.to_sql()
```

Data Types
- `df.dtypes` Checks datatypes
- `df.describe(include="all")` Returns a statistical summary
- `df.info()` Provides a concise summary of dataframe

[Accessing Databases with Python](/Databases&SQL4Data-Science/#Accessing%20databases%20using%20Python) (DB-API)

### Data Wrangling

Pre-processing Data in Python = Data Cleaning = Data Wrangling

Dealing with Missing Values

- Drop: `df.dropna(subset=["column_name"], axis=0, inplace=True)`
- Replace: `df.replace(missing_value, new_value)` 
- Mean: `df["column_name"].mean()`

Data Formatting

```python
df["city-mpg"] = 235/df["city-mpg"]
df.rename(columns=("city_mpg": "city-L/100km"), inplace=True)
df["city-L/100km"]=df["city-L/100km"].astype("float") 
```

`dataframe.astype()` Converts data type

Data Normalization

- Simple Feature scaling:  $x_{new}=\dfrac{x_{old}}{x_{max}}$

```python
df["length"]=df["length"]/df["length"].max()
```

Min - Max:  $x_{new}=\dfrac{x_{old}-x_{min}}{x_{max}-x_{min}}$

```python
df["length"]=(df["length"]-df["length"].min())/(df["length"].max()-df["length"].min())
```

Z-score (Standard Score):  $x_{new}=\dfrac{x_{old}-\mu}{\sigma }$

z-score values typically range between [-3,3]


```python
df["length"]=(df["length"]-df["length"].mean())/df["length"].std()
```

Binning: Converts numeric into categorical variables by Grouping them in a set of “bins"

```python
bins=np.linspace(min(df["price"]),max(df["price"]),4)
group_names=["Low","Medium","High"]
df["price-binned"]=pd.cut(df["price"],bins,labels=group_names,include_lowest=True)
```

Turning categorical variables into quantitative variables
- Convert categorical variables into dummy variables (0 or 1)
- `pd.get_dummies(df['fuel'])`

### Exploratory Data Analysis (EDA)

EDA is preliminary step in data analysis to summarize main characteristics of the data, gain better understanding of the data set, uncover relationships between different variables, and extract important variables for the problem we're trying to solve.

Descriptive Statistics

- Describe basic features of data
- Giving short summaries about the sample and measures of the data
- `df.describe` Summarize statistics, `value_counts()` Summarize the categorical data

```python
wheels_counts=df["wheels"].value_counts().to_frame()
```

Box Plot

```python
sns.boxplot(x="wheels",y="price",data=df)
```

Scatter Plot

```python
y=df["price"]
x=df["engine-size"]
plt.scatter(x,y)
plt.title("Scatterplot of Engine Size vs Price")
plt.xlabel("Engine Size")
plt.ylabel("Price")
```

GroupBy

- The groupby method is used on categorical variables, groups the data into subsets according to the different categories of that variable.

```python
df_test=df[['drive-wheels','body-style','price']]
df_grp=df_test.grop[by(['drive-wheels','body-style'], as_index= False).mean()
df_grp
```

Pivot table

```python
df_pivot=df_grp.pivot(index='drive-wheels',columns='body-style')
```

Heatmap

```python
plt.pcolor(df_pivot,cmap='RdBu')
plt.colorbar()
plt.show()
```

Correlation

- Correlation measures to what extent different variables are interdependent
- Correlation doesn't imply causation
- Linear Relationship

```python
import seaborn as sns
sns.regplot(x="engine-size",y="price",data=df)
plt.ylim(0,)
```

Correlation - Statistics

- Pearson Correlation: Measure the strength of the correlation between two features (Correlation coefficient & P-value)
- Correlation coefficient close to +1: Large Positive relationship, close to -1: Large Negative relationship, close to 0: No relationship
- P-value < 0.001: Strong certainty in the result, < 0.05: Moderate certainty in the result, < 0.1: Weak certainty in the result, > 0.1: No certainty in the result

```python
pearson_coef, p_value=stats.pearsonr(df['horsepower'],df['price'])
```

Correlation-Heatmap

Chi-Square: Test for Association

- The Chi-square test is intended to test how likely it is that an observed distribution is due to chance. 
- It measures how well the observed distribution of data fits with the distribution that is expected if the variables are independent.
- The Chi-square does not tell you the type of relationship that exists between both variables only that a relationship exists.
- $X^{2}=\sum^{n}_{i=1}\dfrac{\left(O_{i}-E_{i}\right)^{2}}{E_{i}}$
- Degree of freedom = (row-1) * (column-1)

```python
scipy.stats.chi2_contingency(cont_table, correction = True)
```

### Model Development

A model can be thought of as a mathematical equation used to predict a value given one or more other values, relating one or more independent variables to dependent variables

Usually the more relevant data you have the more accurate your model is

Linear regression will refer to one independent variable to make a prediction

Multiple Linear Regression will refer to multiple independent variables to make a prediction

Simple Linear Regression (SLR)

- The predictor (independent) variable - x, The target (dependent) variable - y
- $b_{0}$: the intercept, $b_{1}$: the slope
- $y=b_{0}+b_{1}x$
- Fit: $\left( b_{0},b_{1}\right)$

```python
from sklearn.linear_model import LinearRegression
lm=LinearRegression() #create a linear regression object using the constructor
x=df[['highway-mpg']] #define the predictor variable and target variable
y=df['price']
lm.fit(x,y) #fit the model
Yhat=lm.predict(X) #obtain a prediction
lm.intercept_ #view the intercept
lm.coef_ #view the slope
```

Multiple Linear Regression (MLR)

- One continuous target (Y) variables, Two or more predictor (X) variables
- $\widehat{Y}=b_{0}+b_{1}x_{1}+b_{2}x_{2}+b_{3}x_{3}+b_{4}x_{4}$
- $b_{0}$: interception (x=0), $b_{1}$: the coefficient or parameter of $x_{1}$, $b_{2}$: the coefficient of parameter $x_{2}$ and so on

```python
Z=df[['horsepower','curb-weight','engine-size','highway-mpg']] #extract predictor variables and store them in the variable Z (dataframe)
lm.fit(Z, df['price']) #train the model
Yhat=lm.predict(X) #obtain a prediction
lm.intercept_ #view the intercept
lm.coef_ #view the slope
```

Model Evaluation using Visualization

- Regression plots are a good estimate of the relationship between two variables, the strength of the correlation, and the direction of the relationship (positive or negative)
- Regression plot shows a combination of scatterplot and the fitted linear regression line ($\widehat{Y}$)

```python
import seaborn as sns
sns.regplot(x="highway-mpg",y="price",data=df)
plt.ylim(0,)
```

Residual plot represents the error between the actual value

```python
import seaborn as sns
sns.resifplot(df['highway-mpg'],df['price'])
```

Distribution plot counts the predicted value versus the actual value

MLR - Distribution plots

```python
import seaborn as sns
ax1=sns.displot(df['price'],hist=False,color='r',label='Actual Value')
sns.distplot(Yhat,hist=False,color='b',label='Fitted Values',ax=axl)
```

Polynomial Regression and Pipelines

- Polynomial regression is a special case of the general linear regression model, useful for describing curvilinear relationships
- Curvilinear relationship: By squaring or setting higher order terms of the predictor variables
- Quadrac - 2nd order: $\widehat{Y}=b_{0}+b_{1}x_{1}+b_{2}(x_{1})^2$
- Cubic - 3rd order: $\widehat{Y}=b_{0}+b_{1}x_{1}+b_{2}(x_{1})^2+b_{3}(x_{1})^3$

```python
f=np.polyfit(x,y,3) #calculate polynomial of 3rd order
p=np.polyld(f)
print(p) #print out the model
```

We could also have multi-dimensional polynomial linear regression: $\widehat{Y}=b_{0}+b_{1}x_{1}+b_{2}x_{2}+b_{3}x_{1}x_{2}+b_{4}(x_{1})^2+b_{5}(x_{3})^2+..$

```python
from sklearn.preprocessing import PolynomialFeatures
pr=PolynomialFeatures(degree=2,include_bias=False)
x_polly=pr.fit_transform(x[['horsepower','curb-weight']])
```

Pre-processing

```python
from sklearn.preprocessing import StandardScaler
SCALE=StandardScaler()
SCALE.fit(x_data[['horsepower','curb-weight']])
x_scale=SCALE.transform(x_data[['horsepower','curb-weight']])
```

Pipelines: transform -> prediction

```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
Input=[('Scale',StandardScaler()),('polynomial',PolynomialFeatures(degree=2),('mode',LinearRegression()))]
Pipe.fit(df[['horsepower','curb-weight','engine-size','highway-mpg']],y) #train the pipeline object
yhat=Pipe.predict(X[['horsepower','curb-weight','engine-size','highway-mpg']])
```

Measures for In-Sample Evaluation

- A way to numerically determine how good the model fits on our data
- Mean Squared Error (MSE)

```python
from sklearn.metrics import mean_squared_error
mean_squared_error(df['price'],Y_predict_simple_fit)
```

R-squared: The coefficient of determination

R-squared is a measure to determine how close the data is to the fitted regression line

R^2: the percentage of variation of the target variable (Y) that is explained by the linear model

$R^{2}=\left( 1-\dfrac{MSE-of-regression-line}{MSE-of-the-average-of-the-data}\right)$

```python
lm.fit(X,Y)
lm.score(X,y)
```

Generally the values of the MSE are between 0 and 1

R^2 = 0 indicates your model performs worst

Prediction and Decision Making

```python
lm.fit(df['highway-mpg'],df['prices'])  #Train the model
lm.predict(np.array(30.0).reshape(-1,1))  #Predict the price
lm.coef_  #Value of the Slope
```

Residual Plot

```python
import numpy as np
new_input=np.arrange(1,101,1).reshape(-1,1)  #Arrange to generate sequence
yhat=lm.predict(new_input)  #Predict new values
```

Numerical measures for Evaluation

Comparing MLR and SLR: A lower Mean Square Error does not necessarily imply better fit

Mean Square Error for a Multiple Linear Regression Model will be smaller than the Mean Square Error for a Simple Linear Regression model, since the errors of the data will decrease when more variables are included in the model

Polynomial regression will also have a smaller Mean Square Error than the linear regular regression

### Model Evaluation and Refinement

In-sample evaluation tells us how well our model will fit the data used to train it

Build and train the model with a training set (70% dataset)

Use testing set to access the performance of a predictive model (30% dataset)

Function `train_test_split()`: Split data into random train and test subsets

- x_data: features or independent variables, y_data: dataset target (`df['price']`)
- x_train, y_train: parts of available data as training set

```python
from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x_data,y_data,test_size=0.3,random_state=0)
```

Generalization error is measure of how well our data does at predicting previously unseen data, the error we obtain using our testing data is an approximation of this error.

Lots of training data

Cross Validation

- Most common out-of-sample evaluation metrics
- More effective use of data (each observation is used for both training and testing)

Function `cross_val_score()`

```python
from sklearn.model_selection import cross_val_score
scores=cross_val_score(lr,x_data,y_data,cv=3)
np.mean(scores)
```

Function `cross_val_predict()`

- It returns the prediction that was obtained for each element when it was in the test set

```python
from sklearn.model_selection import cross_val_score  #Has a similar interface to cross_cal_score()
scores=cross_val_score(lr,x_data,y_data,cv=3)
```

Model Selection: y(x)+noise

Underfitting: Where the model is too simple to fit the data.

Overfitting: Where the model is too flexible and fits the noise rather than the function

Ridge regression
- A regression that is employed in a Multiple regression model when Multicollinearity occurs
- Multicollinearity is when there is a strong relationship among the independent variables
- Ridge regression is very common with polynomial regression

```python
from sklearn.linear_model import Ridge
RidgeModel=Ridge(alpha=0.1)
RidgeModel.fit(X,y)
Yhat=RidgeModel.predict(X)
```

Grid Search allows us to scan through multiple free parameters with few lines of code.

- Hyperparameters: Parameters that are not part of the fitting or training process. (eg. Ridge regression)
- Scikit-learn has a means of automatically iterating over these hyperparameters using cross-validation called Grid Search
- Training data、Validation data、Test data

```python
from sklearn.linear_model import Ridge
from sklearn.model_selection import GridSearchCV
parameters1=[{'alpha':[0.001,0.1,1,10,100,1000,10000,100000,1000000]}]
parameters2=[{'alpha':[0.001,0.1,1,10,100],'normalize':[True,False]}]
RR=Ridge()
Grid1=GridSearchCV(rr,parameters1,cv=4)
Grid1.fit(x_data[['horsepower','curb-weight','engine-size','highway-mpg']],y_data)
Grid.best_estimator_
scores=Grid.cv_results_
scores['mean_test_score']
```

### Project Case

Determining the market price of a house given a set of features

[Final Assignment Notebook Url](https://dataplatform.cloud.ibm.com/analytics/notebooks/v2/178b3007-1e92-4946-97ed-f22763f254d2/view?access_token=6f0d33f3dd579324e58eac3e6416508d2f47372218c970f98d418bc68133d33c) (May not be accessible from Mainland China)

### Assignments

Visit my [Github Repository](https://github.com/Bezhuang/IBM-Data-Science)