# Project-2

Jupyter File - Read 3 County Unemployment data for 2008

  Read from BLS Website
  Clean with clear header
  Try a Bar graph
  Save the data frame as HTML
  Save the data frame as Json for Charts in app.js 2020 Claims data
  Read the CSV data for 3 county
  Convert to HTML and JSON
HTML Changes :
  Created a index page the following a. Dropdown link for each county b. Some verbage after the county
  When a county is selected a. Display the county html b. Dynamically generate 2008 Unemployment LINE graph using Chart.js c. Dynamically generate 2020 Claims LINE graph using Chart.js
  Added "Data" hyperlink in Index.html a. Each County html's "Data" hyperlink will open the 2008 Graph data.
Python Changes :

  Flask App start
  Create routes for each html files.
App.js :

  init() - Logic to add Options to be displayed in Select Option.
  buildCharts() - Logic to get 2008 Recession Json data and display Line graph using Chart.js
  buildWeeklyReport() - Logic to get 2020 Claims Json data and display Line graph using Chart.js
  optionChanged() - When c county is selected in drop down ( Boone, Lake, Warrick htmls ) - Dynamically derive the Line graph using Chart.js 
