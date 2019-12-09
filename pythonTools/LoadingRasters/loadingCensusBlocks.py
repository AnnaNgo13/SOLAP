# -*- coding: utf-8 -*-
"""
Created on Thu Nov 21 09:16:21 2019

Script for loading the census data
@author: dahaynes
"""

import os, pandas



censusData = r"e:\git\SOLAP\nhgis0032_ds147_2000_block.csv"


df = pandas.read_csv(censusData, skiprows = 1)
mnDF = df.loc[df['State Name'] == 'Minnesota']
aitkinMN = mnDF.loc[mnDF['County Name'] == 'Aitkin']