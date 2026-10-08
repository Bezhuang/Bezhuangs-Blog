---
title: Data Science Math Skills
date: 2020-05-25
mathjax: true
categories: 数学基础
tags: [Duke University, 数学, 数据科学]
---

> Data Science Math Skills course provided by DUKE UNIVERSITY is designed to teach the vocabulary, notation, concepts, and algebra rules that all data scientists must know before moving on to more advanced material. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-DSMS.png)

### 1. Sets

A set is made up of elements.

The cardinality (size) of a set is the number of elements in it.

$|A| = 4$ (there are 4 elements in A, so the cardinality is 4)

#### Intersections

The intersection is defined as elements that are in both sets. Symbol $∩$: “intersects” (and)
$$
A ∩ B = {x : x ∈ A and x ∈ B}
$$
If there are no elements in common, the answer is the empty set ∅. The cardinality of the empty set $|∅| = 0$

The union is defined as elements that are in either set. Symbol ∪: “union” (or)
$$
A ∪ B = {x ∈ A or x ∈ B}
$$
Visualizing sets: Venn diagrams

Inclusion-exclusion formula: $|A ∪ B| = |A| + |B| − |A ∩ B|$

### 2. Numbers

Integers and rational numbers: Some real numbers terminate, and some do not. The number π = 3.14159... is irrational, it does not repeat after the decimal point.

Absolute value: The absolute value of a number x, |x|, is the distance from x to 0.

Intervals and Interval Notation

- Closed intervals $[2, 3.1]$

- Open intervals $(5, 8)$

- Half-open intervals $(2, 3], [20, 20.3)$

### 3. Sigma notation (Σ)

distributive property: $a(b + c) = ab + ac$

commutative property: $a + b = b + a$

### 4. Cartesian Plane

Axes and quadrants:

- X−axis
- Y−axis
- first quadrant
- second quadrant
- third quadrant
- fourth quadrant

Pythagorean theorem

Derivation using point-slope form

Slope-intercept form: If L has slope m, and hits the y-axis at (0, b), then y = mx + b is an equation for L, where m is the slope and b is the y-intercept.

Point-Slope Formula for Lines:

- $y-y_{0}=m\left( x-x_{0}\right)$ Point-slope form

- $y=mx+b$ Slope-intercept form

### 5. Functions & Tangent Lines

f : A → B

The Slope of a Graph at a Point: The slope of the tangent line gives the instantaneous rate of change. This is also called the derivative of the function at that point, or f(a).

The Derivative Function (Derivative formula): $\lim _{n\rightarrow 0}\dfrac{f\left( a+h\right) -f\left( a\right) }{h}$

### 6. Fast Growth, Slow Growth

Integer Exponents:

1. Multiplication rule: $x^{n}x^{m}=x^{m+n}$

2. Power to a power: $x^{n^{m}}=x^{nm}$

3. Product to a power: $\left( x\cdot y\right) ^{n}=x^{n}\cdot y^{n}$

4. Fraction to a power: $\left( \dfrac{x}{y}\right) ^{n}=\dfrac{x^{n}}{y^{n}}$

5. Division and negative powers

How Logarithms and Exponents Are Related:

- $b^{x}=N$ “exponential form”

- $x=\log _{b}N$ “logarithmic form”

1. Product rule: $\log(xy) = \log(x) + \log(y)$

2. Quotient rule: $\log ( \dfrac{x}{y}) = \log(x) − \log(y)$

3. Power and root rule: $\log \left( x^{n}\right) =nlog\left( x\right)$

### 7. Basic Probability Definitions

probability—the degree of belief in the truth or falsity of a statement

Range of uncertainty from 0 to 1

P(x) probability of x

∼x negation of statement x

joint probability—probability that two separate events with separate probability distributions are both true.

P(A and B) is written P(A, B), and read “the joint probability of A and B” or “the probability that A is true and B is true.”

### 8. Problem Solving Methods

Permutations and Combinations:

- permutation—order matters, $\dfrac{n!}{\left( n-m\right) !}$
- combination—order does not matter, n! / (m! \* (n-m)!)

Using Factorial and “M Choose N”: $(m n) = m! / ((m − n)! · n!)$

The Sum Rule, Conditional Probability, and the Product Rule:

- P(A) = P(A, B1) + P(A, B2) + ... + P(A, Bn)
- P(A | B) = (relevant outcomes) / (total outcomes remaining in universe, when B is true)
- P(A | B) = P(A, B) / P(B)

### 9. Bayes’ Theorem

P(A | B) = P(B | A) \* P(A) / P(B)

Technical vocabulary of Bayesian inverse probability: posterior probability = likelihood \* prior probability / marginal probability
- posterior probability—probability after new data is observed
- prior probability—probability before any data is observed or before new data is observed
- likelihood—standard forward probability of data given parameters
- marginal probability—probability of the data

#### 10. The Binomial Theorem and Bayes’ Theorem

Binomial theorem used when there are two possible outcomes—a success or a non-success, for example, flipping a coin—heads are a success, binary outcome.

Not limited to fair coins, where the probability of success is 0.5. Probability can be any value > 0 and < 1.

Probability of s successes in n trials, when probability of 1 success is p: $(n s) - p^s - (1 − p)^(n−s)$. where n is the number of independent trials (with replacement), s is the number of successes,and p is the probability of one success.
