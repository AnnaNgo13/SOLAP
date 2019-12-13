# -*- coding: utf-8 -*-
"""
Created on Thu Dec 12 09:10:02 2019

Script for Clipping MN Raster data
@author: dahaynes
"""

from clip import Clip
import glob, os, re



tiffFilePath = r"E:\imagery_datasets\meris_annual"
shpPath = r"E:\git\SOLAP\datasets\shapefiles\mn_boundary_wgs84.shp"



tiffFiles = glob.glob(os.path.join(tiffFilePath, "*.tif"))


for i in tiffFiles:
    print(i)
    imageYear = r"[0-9][0-9][0-9][0-9]"
    result = re.search(imageYear, i)
    if result.group():
        year = result.group()
        outTiff = r"E:\git\SOLAP\datasets\rasters\mn_meris_annual_{}.tif".format(year)
        print(i, outTiff)
        r = Clip(i, shpPath, outTiff, 1, "GTiff")
        r.clip_raster()
        #year += 5
        del r