---
title: Accenture Coding Virtual Experience Program
date: 2022-01-16
categories: 后端开发
tags: [Java, 软件开发, 线上实训]
---

> The Accenture Know-the-Code Virtual Experience Program covers the fundamentals of software development, including object-oriented programming, code refactoring, and agile delivery. It empowers me to explore what a career in software development could look like at Accenture while practicing my coding skills. The following are the notes I took during this virtual experience.

<!--more-->

![](https://hexo.bezhuang.cn/img/Accenture-Coding-Virtual-Experience.png)

### Task 1: Object Oriented Programming

#### Background Information

Recently, a company has brought on Accenture to help with the development of its e-commerce website written in Java using the Spring Boot framework. The first task they need help with is searching for products.

One of the UX designers at Accenture has already implemented the new search capability in the UI, My responsibility is to implement the search capability in our backend Java app.

#### Requirements

Expose an HTTP GET request on the path `/api/products/search`

The request should take a single parameter named “`query`” which will be the text that was entered in the search bar

The request will return a Collection of `ProductItem` which are the matching products for the search

#### Implement a new controller to handle searching

1. Download and unzip the mock-company-webapp codebase
1. Open the application in IDEA with Gradle support
2. Follow the README.md instructions for setting up the development environment
3. Implement the “`search`” method of the class `SearchController`, the relevant code is outlined with a TODO comment
4. The controller should use the “`productItemRepository`” to interface with the product database
5. Review the tests and implement the controller to the spec

#### Practical skills gained

Object Oriented Programming, Java, Spring

### Task 2: Code Refactoring

#### Background Information

Now we’ve identified some code in the `ReportController` class that seems to be doing similar product searching

I need to refactor the `SearchController` logic into a new `SearchService` class that can be used in the `SearchController` as well as in the `ReportController`

#### Requirements

Logic moved from `SearchController` to `SearchService`

`SearchController` and `ReportController` both updated to use the `SearchService`

All unit tests pass

####  Refactor controllers to a shared service

1. Follow the README.md instructions for setting up the development environment
2. Create the new `SearchService` class in the “`services`” package. All of the search logic from the `SearchController` should be moved into a function in this class for reusability. The relevant code is outlined with a TODO comment
3. Using `@Autowired`, inject the `SearchService` into the `SearchController` and `ReportController`
4. Refactor both controller classes to use the service by rewriting their functions to use the new service
5. Ensure unit tests all pass

#### Practical skills gained

Java, Spring


### Task 3: Continuous Integration

#### Background Information

Continuous Integration is the practice of automating the integration of code changes from multiple contributors into a single software project

It's a primary DevOps best practice, allowing developers to frequently merge code changes into a central repository where building and test runs can occur. Use the most popular Continuous Integration tool, Jenkins.Creating a `Jenkinsfile` that will build and test the application on all branches of the repository

#### Requirements

GitHub account created, Git CLI setup, mock-company-webapp repository forked and cloned

`Jenkinsfile` defined with stages setting it up to run on commit to any branch in the repository

Continuous Integration server runs `build/test` and succeeds

Change made to code that breaks test

Continuous Integration server runs `build/test` and fails

#### Simulating Jenkins using the `Jenkinsfile` Runner Action in a GitHub Workflow

1. Create an account with GitHub and fork the mock-company-webapp repository
2. Setup the Git CLI on workstation and “`clone`” the repository you forked to workstation
3. Install the Pipelines application from the GitHub marketplace to use Jenkins directly
4. use the Simulated Jenkins for GitHub link to add a `.github/workflows/workflow.yml` to the repository.
5. Add the following stages to the `Jenkinsfile`, the relevant code is outlined with a TODO comment.
   - Build: `./gradlew assemble`
   - Test: `./gradlew test`
6. Continue to tweak the `Jenkinsfile` until the build is successful
7. Change the `SearchService` to always return `Collections.emptyList()` in order to break the tests.
8. Commit the change and validate the Continuous Integration build fails which proves that we’ve properly set up Continuous Integration guard rails, that will catch failing tests each time a commit is made by a developer

#### Practical skills gained

Continuous Integration, Jenkins, DevOps

### Task 4: Agile Planning

#### Background Information

In an Agile planning session, developers are given a set of large software features that they then must break up into smaller units of work, called stories, that can be completed within a one to three week period, called a sprint

A story is an informal, general explanation of a software feature written from the perspective of the end user or customer and is made up of the following components: Who the feature is for, What they need, Why they need it, What shows it’s done
#### Requirements

Stories are written in the following format: As a `<who the feature is for>`, I need to be able to `<what they need>` so I can `<why they need it>`

The “`what shows it’s done`”, called acceptance criteria, must be provided with the story as well

Stories are then pointed or sized which means to assign some kind of value indicating the difficulty of implementing the story

Use a T-Shirt size strategy assigning a value of small/medium/large to each story

It's very important that stories are broken down as small as they can be so try and keep them either small or medium

This allows for better concurrency throughout the sprint and easier completion within a single sprint

#### planning a sprint to implement the checkout feature of the site

Create a document that defines around 10 to 20 stories around the checkout feature

Pull in a subset of these stories based on our capacity to work on in the next sprint

Make sure the stories are broken up as small as possible, and the acceptance criteria is testable

#### Practical skills gained

Agile Methodology, Software Development Lifecycle (SDLC)
