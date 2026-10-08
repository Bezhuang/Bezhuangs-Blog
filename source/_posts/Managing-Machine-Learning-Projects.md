---
title: Managing Machine Learning Projects with Google Cloud
date: 2020-06-08
tags: []
categories: Artificial Intelligence
---

> This course provided by GOOGLE CLOUD is intended to be an introduction to machine learning for business professionals. It teaches me how to translate business problems into machine learning use cases and vet them for feasibility and impact. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-Managing-Machine-Learning-Projects.png)

### 1. What is Machine Learning ?

ML is a way to use standard algorithms to derive predictive insights from data and make repeated decisions.

#### Phases of ML

1. Collecting data.
2. Labeling data.
3. Training using chosen metrics and objectives.
4. Evaluate a model.
5. Deploy a model.

### 2. Good data characteristic

1. Has coverage.
2. Is clean.
3. Is complete.

### 3. ML vs AI

ML is a type of Artificial intelligence.

Logic vs Machine Learning.

Neural networks & Deep learning.

Use AI responsibly --- responsible AI = successful AI.

### 4. Why ML now ?

1.  Increasing availability of data.
2.  Increasing maturity and sophistication of ML algorithms.
3.  Increasing power and availability of computing hardware and software.

### 5. Labeling data

Label is the true answer for a given input.

Regression vs Classification.

Every example needs to have features and a label.

Ways to label your data:
1. Use a proxy label.
2. Build a labeling system.
3. Use a labeling service.

### 6. Modeling Training

Continuous training keeps models fresh.

https://github.com/tensorflow.

#### Formulating the ML problem

1. Choosing input features.
2. Get labels.
3. Choose an objective.

### 7. Modeling Evaluation

Test data (20%)

Confusion matrices measure performance relative to expectations for classification.

### 8. ML Best Practices

1. ML involves experimentation.
2. start simple.
3. Don't use your test data during experimentation.
4. Do pilot projects with end-users.

### 9. Human Bias in ML

Decisions made as you do ML have real world impact for you and your customers.

Unconscious biases exist in data.

Fairness in ML.

### 10. Discovering ML Use Cases

Simplifying rule-based systems.

Streaming business processes.

Understanding unstructured data.

Personalizing experiences: Adds significant value to users.

Recommender systems.

ML in Series.

### 11. Data Strategy

ML is about repeated decisions:

1. Design a system so that you will have more data next year.
2. Break down data silos.
3. Transition from data lakes to data warehouses.
4. Learn about your data.
5. Integrate pilots into your tools.
6. Run ML models on real-time data to extract the most value.
7. Collect more data.

### 12. Data Governance

Data access must be balanced against security.

Three goals for ML and Privacy:
1. Identify sensitive data.
2. Protect sensitive data by removing, masking or coarsening.
3. Create public governance documentation.

Types of sensitive data:
1. Specific columns in structured datasets.
2. Patterned text, e.g., credit card numbers.
3. Unstructured data, like audio, video and images.
4. Combination of fields.

Common principles for establishing a policy framework:
1. Establish a secure location for documentation.
2. Exclude sensitive information from documentation.
3. Document all sources and processes.
4. Establish a process to review and enforce policies.

Build your ML team:
1. Data engineers.
2. ML engineers.
3. Data analysts.

### 13. Create a Culture of Innovation

Starts with a dedicated mindset.

Focus on the user.

10X thinking.

Launch and iterate.

Change is inevitable.
