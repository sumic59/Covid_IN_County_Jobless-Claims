import requests
import json
import prettytable
import xlwt
import pandas as pd
import matplotlib.pyplot as plt
import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template


def get_bls_data(series, start, end):
    headers = {'Content-Type': 'application/json'}
    data = json.dumps({"seriesid": series,"startyear":"%d" % (start), "endyear":"%d" % (end)})
    p = requests.post('https://api.bls.gov/publicAPI/v1/timeseries/data/', data=data, headers=headers)
    json_data = json.loads(p.text)

    try:
        df = pd.DataFrame()
        for series in json_data['Results']['series']:
            df_initial = pd.DataFrame(series)
            series_col = df_initial['seriesID'][0]
            for i in range(0, len(df_initial) - 1):
                df_row = pd.DataFrame(df_initial['data'][i])
                df_row['seriesID'] = series_col
                if 'code' not in str(df_row['footnotes']): 
                    df_row['footnotes'] = ''
                else:
                    df_row['footnotes'] = str(df_row['footnotes']).split("'code': '",1)[1][:1]
                df = df.append(df_row, ignore_index=True)
        return df
    except:
        json_data['status'] == 'REQUEST_NOT_PROCESSED'
        print('BLS API has given the following Response:', json_data['status'])
        print('Reason:', json_data['message'])

start = 2008
end = 2018
series = ['LAUCN180110000000003','LAUCN180110000000004','LAUCN180110000000005','LAUCN180110000000006']

df = get_bls_data(series=series, start=start, end=end)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/County-1.html")
def index1():
    """Return the homepage."""
    return render_template("County-1.html")

@app.route("/County-2.html")
def index2():
    """Return the homepage."""
    return render_template("County-2.html")

@app.route("/County-3.html")
def index3():
    """Return the homepage."""
    return render_template("County-3.html")

@app.route("/WarrickData.html")
def warrickData():
    """Return the homepage."""
    return render_template("WarrickData.html")

@app.route("/LakeData.html")
def lakeData():
    """Return the homepage."""
    return render_template("LakeData.html")

@app.route("/BooneData.html")
def booneData():
    """Return the homepage."""
    return render_template("BooneData.html")

df.value=df.value.astype(float)
df.year = df.year.astype(int)

from sqlalchemy import create_engine
db = create_engine('sqlite:///project2.sqlite')

country_data = df.to_sql('CountyUnemployment', con=db, if_exists='append')
country_data = pd.read_sql_query('SELECT * FROM CountyUnemployment LIMIT 3',db)
country_data.head()

# writer = pd.ExcelWriter('bls1.xlsx', engine='xlsxwriter', options={'strings_to_numbers': True})
# df.to_excel(writer, sheet_name='Sheet1', index=False)
# writer.save()
#print (df)
if __name__ == '__main__':
    app.run()