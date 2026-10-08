---
title: Data Visualization With Python
date: 2021-03-06
tags: [IBM Data Science]
categories: Data Science and Analytics
---

> One of the key skills of a data scientist is the ability to tell a compelling story, visualizing data and findings in an approachable and stimulating way. Learning how to leverage a software tool to visualize data will helps one understand the data better, and make more effective decisions. The main goal of this Data Visualization with Python course provided by IBM is to use various techniques and several data visualization libraries in Python, namely Matplotlib, Seaborn, and Folium for presenting data visually. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-Data-Visualization-with-Py.png)

### Introduction to Data Visualization Tools

Why Build Visuals?

- For exploratory data analysis
- Communicate data clearly
- Share unbiased representation of data
- Use them to support recommendations to different stakeholders

Less is more (more effective, attractive and impactive)

Matplotlib ([History](http://www.aosabook.org/en/matplotlib.html) and Architecture): Created by John Hunter 

- Backend Layer has three built-in abstract interface classes: FigureCavas, Renderer, Event
- Artist Layer is comprised of one main object - Artist. Title, lines, tick labels, images all correspond to individual Artist instances.
- Two types of Artist objects: Primitive (Line2D, Rectangle, Circle and Text), Composite (Axis, Tick, Axes and Figure)

```python
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas # import FigureCanvas
frim matplotlib.figure import Figure # import Figure artist
fig = Figure()
canvvas = FigureCanvas(fig)
import numpy as np #create 10000 random numbers using numpy
x = np.random.randn(10000)
ax = fig.add_subplot(111) # create an axes artist
ax.hist(x, 100) # generate a histogram of the 10000 numbers
ax.set_title('Normal distribution with $\mu=0, \sigma=1$') # add a title to the figure and save it
fig.savefig('matplotlib_histogram.png')
```

Scripting Layer is comprised mainly of pyplot, ascripting interface that is lighter that the Artist layer.

```python
import matplotlib.pyplot as plt
import numpy as np
x = np.random.randn(10000)
plt.hist(x, 100)
plt.title(r'Normal distribution with $\mu=0, \sigma=1$')         plt.savefig('matplotlib_histogram.png')
plt.show()
```

Basic Plotting with Matplotlib

- Plot Function

```python
%matplotlib inline # pass in inline as the backend to enforce plots to be rendered within the browser
import matplotlib.pyplot as plt
plt.plot(5, 5, 'o')
plt.ylabel("Y")
plt.xlabel("x")
plt.title("Plotting Example")
plt.show()
```

Matplotlib - Pandas

```python
df.plot(kind="line") # create a line plot
df["column"].plot(kind="hist") # create a histogram
```

Line Plots

- A line plot is a type of plot which displays information as a series of data points called 'makers' connected by straight line segments.
- Creating line plots

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
years = list(map(str, range(1980, 2014)))
df_canada.loc['Haiti', years].plot(kind='line')
plt.title('Immigration from Haiti')
plt.ylabel("Number of immigrants")
plt.xlabel("Years")
plt.show()
```

### Basic and Specialized Visualization Tools

Area Plots (based on line plot)

- Also known as area chart or area graph, is commonly used to represent cumulated totals using numbers or percentages over time
- Area plots are stacked by default.

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
years=list(map(str,range(1980,2014)))
df_canada.sort_values(['Total'], ascending=False, axis=0, inplace=True)
df_top5=df_canada.head()
df_top5=df_top5[years].transpose()
df_top5.plot(kind='area')
plt.title('Immigration trend of top 5 countries')
plt.ylabel("Number of immigrants")
plt.xlabel("Years")
plt.show()
```

Histograms

- A histogram is a way of representing the frequency distribution of a numeric dataset.

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np
count, bin_edges=np.histogram(df_canada['2013']) # numpy function
df_canada['2013'].plot(kind='hist', xticks=bin_edges)
plt.title('Histogram of Immigration from 195 countries in 2013')
plt.ylabel("Number of Countries")
plt.xlabel("Number of immigrants")
plt.show()
```

Bar Charts

- Unlike a histogram, a bar chart is a type of plot where the length of each bar is proportional to the value of the item that it represents.
- It is commonly used to compare the values of a variable at a given point in time. 

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
years=list(map(str,range(1980,2014)))
df_iceland=df_canada.loc['Iceland',years]
df_iceland.plot(kind='bar')
plt.title('Icelandic immigrants to Canada from 1980 to 2013')
plt.ylabel("Year")
plt.xlabel("Number of immigrants")
plt.show()
```

Pie Charts

- A pie chart is a circular statistical graphic divided into slices to illustrate numerical proportion.
- [Arguments against pie charts](http://www.surveygizmo.com/resources/blog/pie-chart-or-bar-graph)

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
df_continents=df_canada.groupby('Continent', axis=0).sum()
df_continents['Total'].plot(kind='pie')
plt.title('Immigration to Canada by Continent')
plt.show()
```

Box Plots

- A boxplot is a way of statistically representing the distribution of given data through 5 main dimensions. 
- Minimum, First Quartile, Median, Third Quartile, Maximum, Outliers
- IQR (Inter Quartile Range): between First Quartile and Third Quartile
- `Function = plot, and Parameter = kind with value = "box"`

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
df_japan=df_canada.loc('Japan', years).transpose()
df_japan.plot(kind='box')
plt.title('Box plot of Japanese Immigrants from 1980 to 2013')
plt.ylabel('Number of Immigrants')
plt.show()
```

Scatter Plots

- A scatter plot is a type of plot that displays values pertaining to typically two variables against each other. 
- Usually it is a dependent variable to be plotted against an independent variable in order to determine if any correlation between the two variables exists.

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
df_total.plot{kind='scatter',x='year',y='total'}
plt.title('Total immigrant population to Canada from 1980 to 2013')
plt.ylabel("Year")
plt.xlabel("Number of immigrants")
plt.show()
```

Bubble Plots

- A bubble plot is a variation of the scatter plot that displays three dimensions of data (x, y, z). 
- The data points are replaced with bubbles, and the size of the bubble is determined by the third variable 'z', also known as the weight. 

### Advanced Visualizations and Geospatial Data

Waffle Charts

- A waffle chart is an interesting visualization that is normally created to display progress toward goals
- Matplotlib does not have a built-in function to create waffle charts.

Word Clouds

- A Word Cloud is a depiction of the frequency of different words in some textual data
- Mueller's word cloud generator

Seaborn and Regression Plots

- Seaborn is a Python visualization library based on Matplotlib

```python
import seaborn as sns
ax=sns.regplot(x='year',y='total',data=df_total,color='green',marker='+')
```

Introduction to Folium and Map Styles

- Folium is a powerful Python library that helps you create several types of Leaflet maps
- It enables both the binding of data to a map for choropleth visualizations as well as passing visualizations as markers on the map

```python
word_map=folium.Map() #define the world map
world_map #display world map
```

Define the world map centered around Canada with a low zoom level

```python
world_map=folium.Map(
	location=[56.130, -106.35],
	zoom_start=4,
    tiles='Stamen Terrain' #or 'Stream Toner'
)
world_map #display
```

Maps with Markers

```python
canada_map=folium.Map(
	location=[56.130, -106.35],
	zoom_start=4
)
ontario=folium.map.FeatureGroup() #create a feature group
ontario.add_child(
  folium.features.CircleMarker([51.25,-85.32],radius=5,color='red',fill_color='Red')
) #style the feature group
canada_map.add_child(ontario) #add the feature group to the map
folium.Marker([51.25,-85.32],popup='Ontario').add_to(canada_map) #label the marker
canada map
```

Choropleth Maps

- A choropleth map is a thematic map in which areas are shaded or patterned in proportion to the measurement of the statistical variable being displayed on the map, such as population density or per capita income.
- Geojson File

```python
world_map=folium.Map(
	zoom_start=2,
    tiles='Mapbox Bright'
)
world_geo=r'world_countries.json' #geojson file
world_map.choropleth(
	geo_path=world_geo,
	data=df_canada,
	columns=['Country','Total'],
	key_on='feature.properties.name',
	fill_color='YlOrRd',
	legend_name='Immigration to Canada'
)
world_map
```

### Creating Dashboards with Plotly and Dash

Dashboard

- Produce real-time visuals
- Understand business moving parts
- Visually track, analyze and display key performance indicators (KPI)
- Take informed decisions and improve performance. 
- Reduced hours of analyzing

Best dashboards answer critical business questions.

[Python dashboarding tools](https://pyviz.org/dashboarding/): Dash from Plotly, Panel, voila, Streamlit, Bokeh, ipywidgets, matplotlib, Flask

[Plotly](https://plotly.com/python/getting-started/)

- Interactive, open-source plotting library
- Supports over 40 unique chart types
- Includes chart types like statistical, financial, maps, scientific and 3-dimensional
- Visualizations can be displayed in Jupyter notebook, saved to HTML files, or can be used in developing Python-built web applications using Dash

Plotly Graph Objects: Low-level interface to figures, traces, and layout: `plotly.gragh_objects.Figure`

Plotly express: High-level wrapper for Plotly 

```python
import plotly.gragh_objects as go
import plotly.express as px
import numpy as np
np.random.seed(10) #set random seed for reproducibility
x=np.arange(12)
y=np.random.randint(50, 500, size=12) #create random y values
fig=go.Figure(data=go.Scatter(x=x,y=y)) #create figure and add trace (scatter)
fig.update_layout(title='Simple Line Plot',xais_title='Month',yaxis_title='Sales')
fig.show()
fig=px.line(x=x,y=y,title='Simple Line Plot',labels=dict(x='Month',y='Sales')) #Entire line chart can be created in a single command
fig.show()
```

[Plotly cheatsheet](https://images.plot.ly/plotly-documentation/images/plotly_js_cheat_sheet.pdf)

Dash

- Open-Source User Interface Python library for creating reactive, web-based applications
- Easy to build GUI
- Declarative and Reactive
- Rendered in web browser and can be deployed to servers
- Inherently cross-platform and mobile ready
- Both enterprise-ready and a first-class member of Plotly’s open-source tools

[Dash core components](https://dash.plotly.com/dash-core-components): `import dash_core_components as dcc`

- Describe higher-level components that are interactive and are generated with JavaScript, HTML, and CSS through the React.js library

[Dash HTML components](https://dash.plotly.com/dash-html-components): `import dash_html_components as html`

- Component for every HTML tag

Callback function is a python function that is automatically called by Dash whenever an input component's property changes

Callback function is decorated with `@app.callback` decorator

```python
@app.callback(Output, Input)
def callback_fuction:
    ......
    return some_result
```

Callback decorator function takes two parameters: Input and Output

- Input and Output to the callback function will have component id and component property
- Multiple inputs or outputs should be enclosed inside either a list or tuple. 

[Callbacks with one input](https://dash.plotly.com/basic-callbacks)

```python
import pandas as pd
import plotly.express as px
import dash
import dash_html_components as html
import dash_core_components as dcc
from dash.dependencies import Input, Output
airline_data=pd.read_csv('airline.csv',encoding='ISO-8859-1',dtype={'Airport':str,'TailNum':str}) #read the data
app=dash.Dash()
# Design dash app layout
app.layout=html.Div(children=[html.H1('Airline Dashboard',style={'textAlign':'center','color':colors['text'],'font-size':40}),html.Div(['Input:',dcc.Input(id='input-yr',value='2010',type='number',style={'height':'50px','font-size':35}),],style={'font-size':40}),html.Br(),html.Br(),html.Div(dcc.Gragh(id='bar-plot')),])
@app.callback(Output(component_id='bar-plot',component_property='figure'),Input(component_id='input-yr',component_property='value'))
def get_gragh(entered_year):
    df=airline_data[airline_data['Year']==int(entered_year)] #select data
    g1=df.groupby(['Reporting_Airline'])['Flights'].sum().nlargest(10).reset_index() #top 10 airline carrier in terms of number of flights
    fig1=px.bar(g1,x='Reporting_Airline',y='Flights',title='Top 10 airline carrier in year '+str(entered_year)+' in terms of number of flights') #plot the gragh
    fig1.update_layout()
    return fig1
if __name__=='__main__':
    app.run_server(port=8002,host='127.0.0.1',debug=True)
```

### Assignments

Visit my [Github Repository](https://github.com/Bezhuang/IBM-Data-Science)