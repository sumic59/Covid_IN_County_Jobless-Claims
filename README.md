# Project-2

Jupyter File - 
Read 3 County Unemployment data for 2008 
  1. Read from BLS Website
  2. Clean with clear header
  3. Try a Bar graph
  4. Save the data frame as HTML
  5. Save the data frame as Json for Charts in app.js
2020 Claims data
  1. Read the CSV data for 3 county
  2. Convert to HTML and JSON  
HTML Changes :
1. Created a index page the following 
  a. Dropdown link for each county
  b. Some verbage after the county
2. When a county is selected
  a. Display the county html
  b. Dynamically generate 2008 Unemployment LINE graph using Chart.js
  c. Dynamically generate 2020 Claims LINE graph using Chart.js
3. Added "Data" hyperlink in Index.html
  a. Each County html's "Data" hyperlink will open the 2008 Graph data.
  
Python Changes :
1. Flask App start
2. Create routes for each html files.

App.js :
  1. init() - Logic to add Options to be displayed in Select Option.
  2. buildCharts() - Logic to get 2008 Recession Json data and display Line graph using Chart.js
  3. buildWeeklyReport() - Logic to get 2020 Claims Json data and display Line graph using Chart.js
  4. optionChanged() - When c county is selected in drop down ( Boone, Lake, Warrick htmls ) - Dynamically derive the Line graph using Chart.js
Tried reading the BLS data using the sample Python codebase and tried to plot a graph.
  a. Created a function to read BLS data
  b. Passed the Series, from and to year to the function and the function returns data frame
  c. Displayed the data frame and tried graphs(work in prgress)
