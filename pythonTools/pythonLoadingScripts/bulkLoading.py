# -*- coding: utf-8 -*-
"""
Created on Thu Dec 12 09:56:00 2019

@author: dahaynes
"""

from PG_Raster import PG_Raster



rasterFilePath = r"E:\git\SOLAP\datasets\rasters\mn_meris_2000.tif"
rsql = 'raster2pgsql -C -x -I -Y -F -t 250x250 -s 4326 -l 2,4,8,16,32 -vrt {} -table landcover.meris_mn_2000'.format(rasterFilePath, )

dbConnect = {
            "host":"149.165.157.154", 
             "port": 5433, 
             "database": "research", 
             "user": "david", 
             "password": "haynes",
             "geoserver": "149.165.157.200:8080",
             "rsql": rsql 
             }

geoserverConnect = { 
                    "geoServerUser": "SOLAP",
                    "geoServerPassword" : "SDOH@s0y",
                    "dataDirectory": "/usr/share/geoserver/geoserver-2.15.2/data_dir/coverages",
                    "serverUser" : "dhaynes",
                    "serverPass" : r"C:\Users\dahaynes\Documents\haynesUMNDesktop.key"
                    }

theRast = PG_Raster(dbConnect)
theRast.UploadRaster(dbConnect["host"], dbConnect["database"], dbConnect["port"], dbConnect["user"])
theRast.CreateGeoserverDatasets(geoserverConnect, "minnesota", dbConnect["geoserver"], ["minnesota"])


#"file:/coverages/landcover/landcover.mn_2000.xml"

#key = paramiko.RSAKey.from_private_key_file(r"C:\Users\dahaynes\Documents\haynesUMNDesktop.key") 

#"C:\Users\dahaynes\Documents\haynesUMNDesktop.key"