#!/usr/bin/env pwsh

param(
    [Parameter(Mandatory=$true)]
    [string]$Json,

    [Parameter(Mandatory=$false)]
    [int]$Number = 1,

    [Parameter(Mandatory=$false)]
    [string]$ShortName = "feature"
)

# Create the feature directory structure
$featureDir = "specs/$Number-$ShortName"
$checklistDir = "$featureDir/checklists"
$specFile = "$featureDir/spec.md"

# Create directories
New-Item -ItemType Directory -Path $checklistDir -Force

# Output the branch name and spec file path
$branchName = "$Number-$ShortName"
Write-Output "{""BRANCH_NAME"": ""$branchName"", ""SPEC_FILE"": ""$specFile""}"