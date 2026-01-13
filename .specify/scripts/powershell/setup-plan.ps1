#!/usr/bin/env pwsh

# Mock setup script for the plan
$featureSpec = "specs/1-multi-user-todo/spec.md"
$implPlan = "specs/1-multi-user-todo/plan.md"
$specsDir = "specs"
$branch = "1-multi-user-todo"

Write-Output "{""FEATURE_SPEC"": ""$featureSpec"", ""IMPL_PLAN"": ""$implPlan"", ""SPECS_DIR"": ""$specsDir"", ""BRANCH"": ""$branch""}"