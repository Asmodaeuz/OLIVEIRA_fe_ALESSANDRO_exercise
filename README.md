# E-Core Admission Test

## Description

This project was built upon the codebase provided by the company. In the following sections, all the changes made (from small adjustments to big refactoring) are listed. They are categorized into readability improvements, UI changes, test cases and error corrections, preceded by an overview listing small changes affecting multiple files. 

### Changes Overview

* Cleaned all import paths, using direct paths with src as a starting point as configured in tsconfig.json (e.g. `'../../componentElement'` to `'component/componentElement'`)
* Created a `hooks` folder to allocate code logic that is reused across the project to separate it from the rendering
* Created a custom hook for the search logic
* Refactored the map variables (e.g. mapU and mapTLead) into a custom hook file, removing some unnecessary ones to follow the DRY (Don't Repeat Yourself) principle and renaming the maintained ones for better clarity
* Removed component returns from the logic
* Renamed variables that were not named clearly and/or could cause confusion (e.g. all prop interfaces being named `Props`, `mapU` as the name of the map users function, `columns` as a prop name for a component with multiple rows but just one column, etc.)

### Error Corrections

* Explicitly declared some missing types and function returns to follow TypeScript best practices (e.g. frequent use of type `any` were replaced by respective types and `JSX.Element` added as the return of FEs (Functional Components))
* Corrected misused types (e.g. `string` for a `boolean` prop)
* Abstracted onClick and other logic code to outside the components' render
* Replaced `var` declarations with `const` for they were not being reasigned, improving project's predictability
* Separated Spinner styles into their own file, so that one single component does not have styles for another element
* Removed `<List />` styles since the `Container` styled-component was basically the same as the one on `GlobalComponents` 

### Visual Improvements

* Made some styling changes to achieve a more modern and appealing UI with the company's website as inspiration;
* Replaced the `BackButton` for text for an actual icon
* Added a search icon button to toggle the visibility of the search bar
* Minor adjustments on small mobile visualization

### Test Cases

#### Divided by files

1. API 
    * Index
        * Added missing test for the api calls

2. Components 
    * Card
        * Added a test case to check render with correct props
        * Separated positive click event test cases for team and user cards
    * Header
        * Removed unnecessary fake timers logic since there was no async code to be tested
        * Added test cases for search bar visibility toggle and search icon
    * List
        * Extracted item to avoid repetition

3. Pages
    * TeamOverview
        * Fixed the visualization of the Team's name
        * Correctly typed the mock variables instead of using `any`
        * Removed calling limitation for getUserData. Since it is called inside a map, it will be called the same number of times as the number of members in the team, so for 4 users as the mock variable states, the `Once` limitation on the call function returned an error
    * Teams
        * Added the required test for the Spinner
    
4. Hooks
    * useSearch
        * Made a test suite for the useSearch custom hook


> [!NOTE]
> It is worth mentioning that, because I did not know if it was allowed to use external sources, no library or third-party feature was installed. All icons are downloaded svgs and all data for the tests were hardcoded (instead of making use of fakerjs, for example)