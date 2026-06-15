---
title: "Heart Disease Prediction with Classification Algorithms"
summary: "Machine learning models for predicting heart disease using Logistic Regression, Naive Bayes, and K-Nearest Neighbors."
date: "Dec 7 2024"
draft: false
tags:
- Python
- Machine Learning

repoUrl: https://github.com/shubham-kumr/heart_disease_prediction 
---

## Overview

This project implements machine learning models to predict the likelihood of heart disease based on various medical features. We use several classification algorithms, including **Logistic Regression**, **Naive Bayes**, and **K-Nearest Neighbors (KNN)**, and evaluate their performance using metrics like accuracy and F1 score.

The goal is to predict whether a person is likely to develop heart disease based on a set of medical features. The dataset contains information about patients' medical history, such as age, blood pressure, cholesterol levels, and more. By training various classification models, we aim to find the most accurate and reliable algorithm for heart disease prediction.

## Dataset

The dataset used is publicly available and consists of several medical attributes that help determine the likelihood of heart disease. The target variable is binary:
- `0` = No heart disease
- `1` = Heart disease

## Algorithms Implemented

- **Logistic Regression:** Models the relationship between a dependent binary variable and one or more independent variables.
- **Naive Bayes:** A probabilistic classifier based on Bayes' theorem with strong independence assumptions between features.
- **K-Nearest Neighbors (KNN):** A non-parametric method used for classification based on feature similarity.

All models are trained and evaluated on the same training and testing datasets for a fair comparison.

## Evaluation Metrics

- **Accuracy:** Measures the proportion of correct predictions.
- **F1 Score:** A weighted harmonic mean of precision and recall, especially useful for imbalanced datasets.

## Requirements

- Python 3.x
- scikit-learn
- pandas
- matplotlib
- seaborn
- numpy