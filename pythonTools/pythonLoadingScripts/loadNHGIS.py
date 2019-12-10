# -*- coding: utf-8 -*-
"""
Created on Mon Dec  9 20:08:47 2019

Loading NHGIS timeseries
@author: david
"""


import pandas, glob, os



outDirectory = r"c:\git\SOLAP\datasets"
dataDirectory = r"C:\work\nhgis_demographics\nhgis0038_csv"
datasets = glob.glob(os.path.join(dataDirectory,"*.csv") )
#engine = create_engine('postgresql://david:secret@localhost:5432/spatial_analytics')

year = 1990
for c, d in enumerate(datasets):
    df = pandas.read_csv(d ,skiprows=1)
    
    if c == 0:
        allColumns = list(df.keys())
        goodColumns = [c for c in allColumns if 'bound' not in c]
    
    newData = df[goodColumns].drop(columns=["Geography Year"])    
    newData.to_csv(os.path.join(outDirectory, "demographics_{}.csv".format(year)), index=False  )

    year += 10
    
print("Finished")