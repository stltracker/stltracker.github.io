                    <div class="buttonScreen" id="itemInformation">
                        <div class="buttonScreenInner" id="itemInformationInner">
                            <p>STL Tracker Online provides satellite tracking capabilities from within your browser. </p>
                            <p>The primary view can display the selected satellites in a number of projections. 
                                When a satellite (or observer) is selected in the view the relevant buttons located at the bottom-left of the screen are 
                                (noting that for the Textual view the relevant buttons are associated directly with each satellite entry in the table):</p>
  
                            <div>&nbsp;&nbsp;&nbsp;&#x271A;: increase (or decrease) the level of information presented</div>    
                            <div>&nbsp;&nbsp;&nbsp;&ocir;: center the object in the view</div>    
                            <div>&nbsp;&nbsp;&nbsp;&#9967;: open the settings for the selected object</div>
                            <div>&nbsp;&nbsp;&nbsp;&cross;: delete the satellite from the view</div>

                            <p>The purpose of each of the buttons located at the top-left of the display are described below:</p>
                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Satellite.png" /><div class="divInformationTitle">Satellites:</div></div>
                            <div class="divInformationContent">
                                The Satellites configuration screen is broadly split into the left (or top in a vertically oriented screen) side of the screen,
                                which is used to select the satellites of interest, and the right (or bottom) side of the screen,
                                which displays the selected satellites and provides sorting, display, and configuration options.
                                <ul>
                                    <li>Search all satellites: Search all satellites by Name, <a href="https://en.wikipedia.org/wiki/Satellite_Catalog_Number" target="_blank" rel="noopener">NORAD Id/Catalog number</a>,
                                    or <a href="https://en.wikipedia.org/wiki/International_Designator" target="_blank" rel="noopener">International designator</a>. 
                                    You can also restrict the search results to satellites that are:
                                    <ul>
                                        <li>on orbit - if checked excludes objects that have decayed or are no longer in orbit around the Earth</li>
                                        <li>payload - if checked excludes debris, rocket boosters, <em>etc.</em></li>
                                        <li>active - if checked excludes non-functional objects</li>
                                    </ul>
                                    Enter the text you want to search for and hit the 'Enter' key.
                                    The search results will be displayed in the Results table.</li>
                                    <li>Browse orbiting satellites: Select one the categories to display the satellites within that category in the Results table.
                                    'Displayed' will give all the satellites currently being displayed on-screen. 'All' displays all the satellites currently in orbit.
                                    Underneath 'All' are hierarchically arranged sub-categories.</li>
                                    <li>Results: Displays the results from the Search or Browse.
                                        <ul>
                                            <li>The results can be sorted by any column by clicking on the associated sort indicator, <img class="divInformationInlineImage" src="Sort/UpDown.png" />.</li>
                                            <li>For orbiting satellites the 'Display' option can be toggled to display/hide the satellite within the view.</li>
                                            <li>For satellites toggled to display clicking the &#x2B01; symbol will select the satellite within the view.</li>
                                            <li>Decayed satellites are displayed in gray text and the Display option is not available.</li>
                                            <li>Hitting the 'i' key with a satellite selected (or tapping on a satellite) will open a new browser page with the <a href="https://nssdc.gsfc.nasa.gov/" target="_blank" rel="noopener">NASA Space Science Data Coordinated Archive (NSSDCA)</a> information on that satellite.</li>
                                            <li>Clicking on the <img class="divInformationInlineImage" src="Buttons/Settings.png"/> symbol at the upper left of the Results table allows various visual settings of the satellites selected for Display to be modified.
                                                <ul>
                                                    <li>Satellite:
                                                        <ul>
                                                            <li>color - the color used to display the satellite symbol, footprint, tracks, and text label</li>
                                                            <li>display label - whether or not the satellite name is displayed</li>
                                                            <li>with background color - background color for satellite name, if displayed</li>
                                                        </ul>
                                                    </li>
                                                    <li>Symbol: the symbol used for displaying the satellite(s), including an initial blank option
                                                    </li>
                                                    <li>Footprint:
                                                        <ul>
                                                            <li>shade - whether or not the satellite footprint is shaded</li>
                                                            <li>&alpha; - the alpha value for the shaded satellite footprint, if any</li>
                                                            <li>outline - whether or not the satellite footprint is outlined and (optionally) a list of comma-seperated values giving the elevation angles to draw the outline for (default = '0')</li>
                                                        </ul>
                                                    </li>
                                                    <li>Track:
                                                        <ul>
                                                            <li>forward - length of track to draw forward of the satellite position</li>
                                                            <li>backward - length of track to draw backward of the satellite position</li>
                                                            <li>units - the units used for drawing the satellite tracks, which can be one of orbits, days, hours, or minutes</li>
                                                            <li>style - applies only to the Perspective projection. Can be one of ground only, aerial only, ground and aerial, or ground and aerial joined</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>

                                    </li>
                                </ul>
                            </div>
                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Projection.png" /><div class="divInformationTitle">Projection:</div></div>
                            <div class="divInformationContent">Allows selection of one of the supported projections, each of which has an associated explanatory image and brief description.</div>
                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Fullscreen.png" /><div class="divInformationTitle">Fullscreen:</div></div>
                            <div class="divInformationContent">Toggles the full-screen mode on and off. When in full-screen mode the button image is changed to <img class="divInformationInlineImage" src="Buttons/ExitFullscreen.png"/>.</div>
                            
                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Antenna.png" /><div class="divInformationTitle">Observer:</div></div>
                            <div class="divInformationContent">Specifies the location of the observer, which can be provided as either a longitude, latitude, and altitude (in meters)
                                or by selecting the desired position on the associated map. The observer's position is denoted using the icon in the perspective and projection views, as well as for calculating
                                observer-based properties such as azimuth, elevation, range, and range rate for the selected satellite. 
                            </div>

                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Refresh.png" /><div class="divInformationTitle">Refresh:</div></div>
                            <div class="divInformationContent">Reloads the satellite TLE and catalog information and refreshes the display.</div>
                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Information.png" /><div class="divInformationTitle">Information:</div></div>
                            <div class="divInformationContent">This is used to display the information that you are currently reading.</div>
                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Settings.png" /><div class="divInformationTitle">Settings:</div></div>
                            <div class="divInformationContent">These settings are applied to the view. Not all settings are applicable in all projections.
                                <ul>
                                    <li>Visual settings:
                                        <ul>
                                            <li>Display sky image (<b>perspective projection only</b>) &ndash; show/hide sky image. If not shown uses the associated color for the sky</li>
                                            <li>Background color (<b>all projections except perspective</b>) &ndash; background color of view</li>    
                                            <li>Display Earth - show/hide the Earth
                                                <ul>
                                                    <li>Display satellite image - show/hide satellite imagery</li>
                                                    <li>Display day/night - show/hide day/night imagery. If shown and satellite imagery is hidden uses the associated colors for day/night </li>
                                                    <li>Display terminator - show/hide the terminator (line separating the illuminated day side and the dark night side)</li>
                                                    <li>Display latitude/longitude grid - show/hide lines of longitude and latitude</li>
                                                    <li>
                                                        Display political boundaries - show/hide political boundaries
                                                        <ul>
                                                            <li>Include coastlines, islands, and lakes - show/hide coastlines</li>
                                                            <li>Include selected internal boundaries - show/hide selected internal boundaries</li>
                                                        </ul>
                                                    </li>
                                                    <li>Fill land - show/hide land</li>
                                                    <li>Fill seas - show/hide seas</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Radar settings:
                                        <ul>
                                            <li>Display stars - show/hide stars within observer's view
                                                <ul>
                                                    <li>Limiting magnitude - faintest magnitude of stars to be displayed</li>
                                                </ul>
                                            </li>
                                            <li>Display constellations - show/hide constellations within observer's view
                                                <ul>
                                                    <li>Include boundaries - show/hide constellation boundaries</li>
                                                    <li>Include names - show/hide constellation names</li>
                                                </ul>
                                            </li>
                                            <li>Display altitude and azimuth grid - show/hide altitude and azimuth grid</li>
                                            <li>Display R.A. and declination grid - show/hide R.A. and declination grid</li>
                                            <li>Display central position - show/hide central position</li>
                                        </ul>
                                    </li>
                                    <li>Textual settings:</li>
                                    <li>Other settings:
                                        <ul>
                                            <li>Display Coordinated Universal Time (UTC/GMT) - if set the time will be displayed as UTC,
                                                else in the default timezone.
                                            </li>
                                            <li>Apply refraction correction - account for atmospheric refraction when displaying satellite footprints.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Empty.png" /><div class="divInformationTitle">Credits:</div></div>
                            <div class="divInformationContent">
                                <ul>
                                    <li>The Simplified General Perturbations model used was taken from Revisiting Spacetrack Report #3: Rev 2 (American Institute of Aeronautics and Astronautics 2006-6753-Rev1) by David A. Vallado <em>et al.</em></li>
                                    <li>Satellite two-line element (TLE) information is acquired from <a href="www.celestrak.com" target="_blank">CelesTrak</a> and <a href="www.space-track.org" target="_blank">Space Track</a></li>
                                    <li>Earth imagery is owned by NASA and is made available courtesy of the <a href="http://visibleearth.nasa.gov" target="_blank">NASA Visible Earth</a> team</li>
                                    <li>All sky images are made available by <a href="http://T.NOMOTO.org/AllSkyHipp2GAIA/" target="_blank">NOMOTO Tomonori</a> under a <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 International License.</a>
                                        The following data are used for generation of the all sky images:</li>
                                        <ul>
                                            <li><b>Hipparcos and Tycho Catalogues</b>: ESA, 1997, <a href="https://www.cosmos.esa.int/web/hipparcos/catalogues">The Hipparcos and Tycho Catalogues</a>, ESA SP-1200.</li>
                                            <li><b>Hipparcos-2 Catalogue</b>: 
                                            F. van Leeuwen, "<a href="http://cdsads.u-strasbg.fr/cgi-bin/nph-bib_query?2007A%26A...474..653V&db_key=AST&nosetcookie=1">Validation of the new Hipparcos reduction</a>", Astronomy and Astrophysics, 474, (2007) 653-664.
                                            F. van Leeuwen, "<a href="https://www.springer.com/us/book/9781402063411">Hipparcos, the New Reduction of the Raw Data</a>", 2007, Springer Netherlands.</li>
                                            <li><b>Tycho-2 catalogue:</b>Hog, E.; Fabricius, C.; Makarov, V. V.; Urban, S.; Corbin, T.; Wycoff, G.; Bastian, U.; Schwekendiek, P.; Wicenec, A., "<a href="http://adsabs.harvard.edu/abs/2000A%26A...355L..27H">The Tycho-2 catalogue of the 2.5 million brightest stars</a>", Astronomy and Astrophysics,  355, (2000) L27-L30.</li>
                                            <li><b>Hipparcos Input catalogue</b>: ESA, 1992, The Hipparcos Input Catalogue, ESA SP-1136.</li>
                                            <li><b>GAIA DR2</b>: This work has made use of data from the European Space Agency (ESA) mission Gaia (<a href="https://www.cosmos.esa.int/gaia" title="">https://www.cosmos.esa.int/gaia</a>), processed by the Gaia Data Processing and Analysis Consortium (DPAC, <a href="https://www.cosmos.esa.int/web/gaia/dpac/consortium" title="">https://www.cosmos.esa.int/web/gaia/dpac/consortium</a>).   Funding for the DPAC has been provided by national institutions, in   particular the institutions participating in the Gaia Multilateral Agreement.</li>
                                        </ul>
                                    <li>Matrix manipulation is performed in part by <a href="https://github.com/toji/gl-matrix" target="_blank">gl-matrix</a>:
                                        <p>Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.</p>

                                        <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
                                        and associated documentation files (the "Software"), to deal in the Software without restriction, 
                                        including without limitation the rights to use, copy, modify, merge, publish, distribute, 
                                        sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
                                        furnished to do so, subject to the following conditions:</p>

                                        <p>The above copyright notice and this permission notice shall be included in all copies or 
                                        substantial portions of the Software.</p>

                                        <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
                                        BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
                                        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
                                        DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
                                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
                                    </li>
                                    <li>Data zlib decompression is performed by <a href="https://github.com/nodeca/pako" target="_blank">pako</a>:
                                        <p>Copyright (C) 2014-2017 by Vitaly Puzrin and Andrei Tuputcyn</p>

                                        <p>Permission is hereby granted, free of charge, to any person obtaining a copy
                                        of this software and associated documentation files (the "Software"), to deal
                                        in the Software without restriction, including without limitation the rights
                                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                        copies of the Software, and to permit persons to whom the Software is
                                        furnished to do so, subject to the following conditions:</p>

                                        <p>The above copyright notice and this permission notice shall be included in
                                        all copies or substantial portions of the Software.</p>

                                        <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                                        THE SOFTWARE.</p>
                                    </li>
                                    <li>Additional satellite information is provided to the user through <a href="nssdc.gsfc.nasa.gov" target="_blank">NASA's National Space Science Data Center</a></li>
                                    <li>Constellation boundary data was derived from a catalog compiled by A.C. Davenhall and S.K. Leggett in 1989</li>
                                    <li>Several material icons made available by <a href="https://fonts.google.com/icons" target="_blank">Google</a> under an <a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache License, Version 2.0</a></li>
                                    <li>Satellite dish icon made available by <a href="http://www.devcom.com" target="_blank">DevCom Ltd.</a> under a <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank">CC Attribution 3.0 license</a></li>
                                    <li>Satellite icon made available by <a href="http://www.iconshock.com" target="_blank">Iconshock</a> under the the terms of their <a href="http://www.iconshock.com/license.php" target="_blank">license agreement</a></li>                                                                              
                                </ul>
                            </div>

                            <div class="divInformationTopic"><img class="divInformationImage" src="Buttons/Copyright.png" /><div class="divInformationTitle">Copyright:</div></div>
                            <div class="divInformationContent">
                                <ul>
                                    <li>&copy; Copyright Sumus Technology Limited 2017-2022</li>
                                    <li>All rights reserved</li>
                                </ul>
                            </div>
                        </div>
                    </div>
