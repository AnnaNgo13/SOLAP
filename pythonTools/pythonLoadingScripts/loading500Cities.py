# -*- coding: utf-8 -*-
"""
Created on Mon Oct 28 16:00:23 2019
Loading 500 Cities data
@author: dahaynes
"""


import pandas, glob, os
from sqlalchemy import create_engine

variables = {"Current lack of health insurance among adults aged 18-64 Years" : "Health", \
                   "Binge drinking among adults aged >=18 Years" : "Drinking" ,\
                   "Current smoking among adults aged >=18 Years" : "Smoking", \
                   "No leisure-time physical activity among adults aged >=18 Years": "Inactivity",\
                   "Visits to doctor for routine checkup within the past Year among adults aged >=18 Years" : "Checkup",\
                   "Physical health not good for >=14 days among adults aged >=18 Years" : "Physical",\
                   "Mental health not good for >=14 days among adults aged >=18 Years": "Mental",\
                   "Obesity among adults aged >=18 Years": "Obesity"}
geographicVariables = ["City", "Census Tract"]
listofVariables = list(variables.keys())

dataDirectory = r"E:\data\500_cities_datasets"
outDirectory = r"E:\git\SOLAP\datasets"
datasets = glob.glob(os.path.join(dataDirectory,"*.csv") )
#engine = create_engine('postgresql://david:secret@localhost:5432/spatial_analytics')

year = 2014
for d in datasets:
    print(d)
    df = pandas.read_csv(d)
    
    
    theData = df[df.Measure.isin( listofVariables ) & df.GeographicLevel.isin(geographicVariables)]
    newData = theData.drop(columns=['Data_Value_Footnote_Symbol', 'Data_Value_Footnote','GeoLocation'])
    del df, theData
    for v in variables:
        
        newData.loc[newData['Measure'] == v, 'short_code'] =  variables[v]        
    
    newData.to_csv(os.path.join(outDirectory, "health_{}.csv".format(year)), index=False  )
#    #theData.to_sql('health_behaviours_{}'.format(year), engine)
    year += 1
    #break
print("Finished")

#"Current lack of health insurance among adults aged 18–64 Years"