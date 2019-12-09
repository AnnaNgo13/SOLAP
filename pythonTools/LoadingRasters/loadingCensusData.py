# -*- coding: utf-8 -*-
"""
Created on Thu Nov 21 20:34:30 2019

@author: dahaynes
"""

import pandas


theData = r"E:\git\SOLAP\datasets\nhgis0036_ts_nominal_tract.csv"

df = pandas.read_csv(theData, skiprows=1)