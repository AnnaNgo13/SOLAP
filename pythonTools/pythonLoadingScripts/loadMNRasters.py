# -*- coding: utf-8 -*-
"""
Created on Thu Dec 12 09:10:02 2019

Script for Clipping MN Raster data
@author: dahaynes
"""

from clip import Clip
import glob, os



tiffFilePath = r"E:\imagery_datasets\meris_test"
shpPath = r"E:\git\SOLAP\datasets\shapefiles\mn_boundary_wgs84.shp"



tiffFiles = glob.glob(os.path.join(tiffFilePath, "*.tif"))

year = 2000
for i in tiffFiles:
    outTiff = r"E:\git\SOLAP\datasets\rasters\mn_meris_{}.tif".format(year)
    print(i, outTiff)
    r = Clip(i, shpPath, outTiff, 1, "GTiff")
    r.clip_raster()
    year += 5
    del r