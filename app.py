import requests
import json
import prettytable
import xlwt
import pandas as pd
import matplotlib.pyplot as plt


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

print (df.dtype)
print (df.dtype)

df.value=df.value.astype(float)
df.year = df.year.astype(int)


# writer = pd.ExcelWriter('bls1.xlsx', engine='xlsxwriter', options={'strings_to_numbers': True})
# df.to_excel(writer, sheet_name='Sheet1', index=False)
# writer.save()
#print (df)
df.plot(kind='bar',x='year',y='value',color='red')
plt.show()

# ax = plt.gca()

#df.plot(kind='line',x='year',y='value',ax=ax)
#df.plot(kind='line',x='period',y='value', color='red', ax=ax)

plt.show()