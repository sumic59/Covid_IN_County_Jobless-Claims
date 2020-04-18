# Project-2

Indiana_County_Data_Plots.ipynb

Read 3 County Unemployment data for 2008
    1.	Read from BLS Website
    2.	Cleaned it changed the column names/header
    3.	Did Bar Graph to show Unemployment Count during 2008 recession (Just for 2008, as multiple-year graph overlapped)
    4.	Save the data frame as HTML
    5.	Save the data frame as Json for Charts in county.js

2020 CLAIMS DATA:

    1.	Read the CSV data for 3 counties
    2.	Convert to HTML and JSON

HTML Changes:

    1.	Created a index page the following 
        a. Dropdown link for each county 
        b. Some verbiage after the county
        c.	When a county is selected a. Display the county html 
        d. Dynamically generate 2008 Unemployment LINE graph using Chart.js 
        e. Dynamically generate 2020 Claims LINE graph using Chart.js
        f.	Added "Data" hyperlink in Index.html (Each County html's "Data" hyperlink will open the 2008 Graph data)

PYTHON CHANGES:
    1.	Flask App start
    2.	Created routes for each html files.

BOONE.js/LAKE.js/WARRICK.js
    1.	init() - Logic to add Options to be displayed in Select Option.
    2.	buildCharts() - Logic to get 2008 Recession Json data and display Line graph using Chart.js
    3.	buildWeeklyReport() - Logic to get 2020 Claims Json data and display Line graph using Chart.js
    4.	optionChanged() - When a county is selected in drop down ( Boone, Lake, Warrick htmls ) - Dynamically derive the Line graph using Chart.js
