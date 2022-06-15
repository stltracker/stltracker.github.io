STL Tracker Online provides satellite tracking capabilities from within your browser.

The primary view can display the selected satellites in a number of projections. When a satellite (or observer) is selected in the view the relevant buttons located at the bottom-left of the screen are (noting that for the Textual view the relevant buttons are associated directly with each satellite entry in the table):

   ✚: increase (or decrease) the level of information presented

   ⊚: center the object in the view

   ⛯: open the settings for the selected object

   ✗: delete the satellite from the view

The purpose of each of the buttons located at the top-left of the display are described below:

![](Buttons/Satellite.png) Satellites:

The Satellites configuration screen is broadly split into the left (or top in a vertically oriented screen) side of the screen, which is used to select the satellites of interest, and the right (or bottom) side of the screen, which displays the selected satellites and provides sorting, display, and configuration options.

*   Search all satellites: Search all satellites by Name, [NORAD Id/Catalog number](https://en.wikipedia.org/wiki/Satellite_Catalog_Number), or [International designator](https://en.wikipedia.org/wiki/International_Designator). You can also restrict the search results to satellites that are:
    *   on orbit - if checked excludes objects that have decayed or are no longer in orbit around the Earth
    *   payload - if checked excludes debris, rocket boosters, _etc._
    *   active - if checked excludes non-functional objectsEnter the text you want to search for and hit the 'Enter' key. The search results will be displayed in the Results table.
*   Browse orbiting satellites: Select one the categories to display the satellites within that category in the Results table. 'Displayed' will give all the satellites currently being displayed on-screen. 'All' displays all the satellites currently in orbit. Underneath 'All' are hierarchically arranged sub-categories.
*   Results: Displays the results from the Search or Browse.
    *   The results can be sorted by any column by clicking on the associated sort indicator, ![](Sort/UpDown_md.png).
    *   For orbiting satellites the 'Display' option can be toggled to display/hide the satellite within the view.
    *   For satellites toggled to display clicking the ⬁ symbol will select the satellite within the view.
    *   Decayed satellites are displayed in gray text and the Display option is not available.
    *   Hitting the 'i' key with a satellite selected (or tapping on a satellite) will open a new browser page with the [NASA Space Science Data Coordinated Archive (NSSDCA)](https://nssdc.gsfc.nasa.gov/) information on that satellite.
    *   Clicking on the ![](Buttons/Settings.png) symbol at the upper left of the Results table allows various visual settings of the satellites selected for Display to be modified.
        *   Satellite:
            *   color - the color used to display the satellite symbol, footprint, tracks, and text label
            *   display label - whether or not the satellite name is displayed
            *   with background color - background color for satellite name, if displayed
        *   Symbol: the symbol used for displaying the satellite(s), including an initial blank option
        *   Footprint:
            *   shade - whether or not the satellite footprint is shaded
            *   α - the alpha value for the shaded satellite footprint, if any
            *   outline - whether or not the satellite footprint is outlined and (optionally) a list of comma-seperated values giving the elevation angles to draw the outline for (default = '0')
        *   Track:
            *   forward - length of track to draw forward of the satellite position
            *   backward - length of track to draw backward of the satellite position
            *   units - the units used for drawing the satellite tracks, which can be one of orbits, days, hours, or minutes
            *   style - applies only to the Perspective projection. Can be one of ground only, aerial only, ground and aerial, or ground and aerial joined

![](Buttons/Projection.png) Projection:

Allows selection of one of the supported projections, each of which has an associated explanatory image and brief description.

![](Buttons/Fullscreen.png) Fullscreen:

Toggles the full-screen mode on and off. When in full-screen mode the button image is changed to ![](Buttons/ExitFullscreen.png).

![](Buttons/Antenna.png) Observer:

Specifies the location of the observer, which can be provided as either a longitude, latitude, and altitude (in meters) or by selecting the desired position on the associated map. The observer's position is denoted using the icon in the perspective and projection views, as well as for calculating observer-based properties such as azimuth, elevation, range, and range rate for the selected satellite.

![](Buttons/Refresh.png) Refresh:

Reloads the satellite TLE and catalog information and refreshes the display.

![](Buttons/Information.png) Information:

This is used to display the information that you are currently reading.

![](Buttons/Settings.png) Settings:

These settings are applied to the view. Not all settings are applicable in all projections.

*   Visual settings:
    *   Display sky image (**perspective projection only**) – show/hide sky image. If not shown uses the associated color for the sky
    *   Background color (**all projections except perspective**) – background color of view
    *   Display Earth - show/hide the Earth
        *   Display satellite image - show/hide satellite imagery
        *   Display day/night - show/hide day/night imagery. If shown and satellite imagery is hidden uses the associated colors for day/night
        *   Display terminator - show/hide the terminator (line separating the illuminated day side and the dark night side)
        *   Display latitude/longitude grid - show/hide lines of longitude and latitude
        *   Display political boundaries - show/hide political boundaries
            *   Include coastlines, islands, and lakes - show/hide coastlines
            *   Include selected internal boundaries - show/hide selected internal boundaries
        *   Fill land - show/hide land
        *   Fill seas - show/hide seas
*   Radar settings:
    *   Display stars - show/hide stars within observer's view
        *   Limiting magnitude - faintest magnitude of stars to be displayed
    *   Display constellations - show/hide constellations within observer's view
        *   Include boundaries - show/hide constellation boundaries
        *   Include names - show/hide constellation names
    *   Display altitude and azimuth grid - show/hide altitude and azimuth grid
    *   Display R.A. and declination grid - show/hide R.A. and declination grid
    *   Display central position - show/hide central position
*   Textual settings:
*   Other settings:
    *   Display Coordinated Universal Time (UTC/GMT) - if set the time will be displayed as UTC, else in the default timezone.
    *   Apply refraction correction - account for atmospheric refraction when displaying satellite footprints.

![](Buttons/Empty.png) Credits:

*   The Simplified General Perturbations model used was taken from Revisiting Spacetrack Report #3: Rev 2 (American Institute of Aeronautics and Astronautics 2006-6753-Rev1) by David A. Vallado _et al._
*   Satellite two-line element (TLE) information is acquired from [CelesTrak](www.celestrak.com) and [Space Track](www.space-track.org)
*   Earth imagery is owned by NASA and is made available courtesy of the [NASA Visible Earth](http://visibleearth.nasa.gov) team
*   All sky images are made available by [NOMOTO Tomonori](http://T.NOMOTO.org/AllSkyHipp2GAIA/) under a [Creative Commons Attribution 4.0 International License.](http://creativecommons.org/licenses/by/4.0/) The following data are used for generation of the all sky images:
      *   **Hipparcos and Tycho Catalogues**: ESA, 1997, [The Hipparcos and Tycho Catalogues](https://www.cosmos.esa.int/web/hipparcos/catalogues), ESA SP-1200.
      *   **Hipparcos-2 Catalogue**: F. van Leeuwen, "[Validation of the new Hipparcos reduction](http://cdsads.u-strasbg.fr/cgi-bin/nph-bib_query?2007A%26A...474..653V&db_key=AST&nosetcookie=1)", Astronomy and Astrophysics, 474, (2007) 653-664. F. van Leeuwen, "[Hipparcos, the New Reduction of the Raw Data](https://www.springer.com/us/book/9781402063411)", 2007, Springer Netherlands.
      *   **Tycho-2 catalogue:**Hog, E.; Fabricius, C.; Makarov, V. V.; Urban, S.; Corbin, T.; Wycoff, G.; Bastian, U.; Schwekendiek, P.; Wicenec, A., "[The Tycho-2 catalogue of the 2.5 million brightest stars](http://adsabs.harvard.edu/abs/2000A%26A...355L..27H)", Astronomy and Astrophysics, 355, (2000) L27-L30.
      *   **Hipparcos Input catalogue**: ESA, 1992, The Hipparcos Input Catalogue, ESA SP-1136.
      *   **GAIA DR2**: This work has made use of data from the European Space Agency (ESA) mission Gaia ([https://www.cosmos.esa.int/gaia](https://www.cosmos.esa.int/gaia)), processed by the Gaia Data Processing and Analysis Consortium (DPAC, [https://www.cosmos.esa.int/web/gaia/dpac/consortium](https://www.cosmos.esa.int/web/gaia/dpac/consortium)). Funding for the DPAC has been provided by national institutions, in particular the institutions participating in the Gaia Multilateral Agreement.

*   Matrix manipulation is performed in part by [gl-matrix](https://github.com/toji/gl-matrix):
    
    Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
*   Data zlib decompression is performed by [pako](https://github.com/nodeca/pako):
    
    Copyright (C) 2014-2017 by Vitaly Puzrin and Andrei Tuputcyn
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
*   Additional satellite information is provided to the user through [NASA's National Space Science Data Center](nssdc.gsfc.nasa.gov)
*   Constellation boundary data was derived from a catalog compiled by A.C. Davenhall and S.K. Leggett in 1989
*   Several material icons made available by [Google](https://fonts.google.com/icons) under an [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
*   Satellite dish icon made available by [DevCom Ltd.](http://www.devcom.com) under a [CC Attribution 3.0 license](http://creativecommons.org/licenses/by/3.0/)
*   Satellite icon made available by [Iconshock](http://www.iconshock.com) under the the terms of their [license agreement](http://www.iconshock.com/license.php)

![](Buttons/Copyright.png) Copyright:

*   © Copyright Sumus Technology Limited 2017-2022
*   All rights reserved
