/*
 |============================================================================
 |
 |  Project:          Tracker
 |
 |  Author(s):        Andrew Walker
 |
 |  Description:      
 |
 |  Copyright:        Sumus Technology Limited 2017-
 |
 |  Notes:            
 |
 |============================================================================
 |  Build       Date        Author  Description
 |----------------------------------------------------------------------------
 |  1.0.0.1     21-Mar-17   ARW     Removed compiler warnings.
 |============================================================================
*/

window.addEventListener("load", loaded);
window.addEventListener('resize', resized);

function cancelFullScreen(el) {
    var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;

    if (requestMethod) {
        requestMethod.call(el);
    }
}

function requestFullScreen(el) {
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

    if (requestMethod) {
        requestMethod.call(el);
    }
}

function toggleFull() {
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

    if (isInFullScreen) {
        cancelFullScreen(document);
    } else {
        var elem = document.body;

        requestFullScreen(elem);
    }
}

function updateElement(itemName, buttonName, bShowElement) {
    var element = document.getElementById(itemName);
    var button = document.getElementById(buttonName);

    //
    // we used to use visibility (visible, hidden) to switch between the UI elements, 
    //  but when the satellite table has a lot of entries this becomes very slow...
    //

    if (bShowElement) {
        if (button) {
            button.style.backgroundColor = "#007f00";
        }

        if (element) {
            if (element.style.display !== "block") {
                Object.assign( element.style, {
                    display: "block",
                    pointerEvents: "auto",
                });
            }
        }
    } else {
        if (button) {
            button.style.backgroundColor = "#000000";
        }

        if (element) {
            if (element.style.display !== "none") {
                Object.assign( element.style, {
                    display: "none",
                    pointerEvents: "none",
                });
            }
        }
    }
}

function showElements() {
    updateElement("itemFindSatellite", "buttonSatellite", bShowFindSatellite);
    updateElement("itemSelectObserver", "buttonObserver", bShowSelectObserver);
    updateElement("itemSelectProjection", "buttonProjection", bShowSelectProjection);
    updateElement("itemInformation", "buttonInformation", bShowInformation);
    updateElement("itemSettings", "buttonSettings", bShowSettings);

    // 
    // xxx these probably belong elsewhere...
    //

    var divObserver = document.getElementById(observer.element);

    if (projection === "projectionRadar") {
        if (divObserver) {
            divObserver.style.display = "none";
        }
        document.getElementById("radarText").style.display = "block";
    } else {
        if (divObserver) {
            divObserver.style.display = "block";
        }
        document.getElementById("radarText").style.display = "none";
    }

    if (projection === "projectionTextual") {
        document.getElementById("divTableTextualOuter").style.visibility = "visible";
        document.getElementById("container").style.visibility = "hidden";
        document.getElementById("labelContainer").style.display = "none";
        document.getElementById("lonandlat").style.display = "none";
        document.getElementById("position").style.display = "none";
    } else {
        document.getElementById("divTableTextualOuter").style.visibility = "hidden";
        document.getElementById("container").style.visibility = "visible";
        document.getElementById("labelContainer").style.display = "block";
        document.getElementById("lonandlat").style.display = "block";
        document.getElementById("position").style.display = "block";
    }

    if (bShowSettings) {
        if (projection === "projectionRadar") {
            document.getElementById("settingsVisual").style.display = "none";
            document.getElementById("settingsRadar").style.display = "block";
            document.getElementById("settingsTextual").style.display = "none";
        } else if (projection === "projectionTextual") {
            document.getElementById("settingsVisual").style.display = "none";
            document.getElementById("settingsRadar").style.display = "none";
            document.getElementById("settingsTextual").style.display = "block";
        } else {
            document.getElementById("settingsVisual").style.display = "block";
            document.getElementById("settingsRadar").style.display = "none";
            document.getElementById("settingsTextual").style.display = "none";            
        }
    }

    //
    // handle the hiding of the 'popup' dialogs for the satellite and observer settings...
    //

    if (!bShowFindSatellite) {
        bShowSatelliteSettings = false;

        document.getElementById("divSatelliteSettings").style.visibility = "hidden";
    }

    if (!bShowSelectObserver) {
        bShowObserverSettings = false;

        document.getElementById("divObserverSettings").style.visibility = "hidden";
    }

    if (bShowFindSatellite || bShowSelectProjection || bShowSelectObserver || bShowInformation || bShowSettings) {
        document.getElementById("frameouter").style.zIndex = "800";
    } else {
        document.getElementById("frameouter").style.zIndex = "500";
    }

    if (bShowSelectObserver) {
        //
        // this is needed otherwise the map is not aware of its 
        //  real limits, and restricts redrawing to a subregion
        //  of that expected. We could just do this once...
        //

        setTimeout(function() {
            var center = observerMap.getCenter(); 
            google.maps.event.trigger(observerMap, 'resize'); 
            observerMap.setCenter(center);
        }, 100);
    }
}

function resetVisible() {
    bShowFindSatellite = false;
    bShowSelectObserver = false;
    bShowSelectProjection = false;
    bShowInformation = false;
    bShowSettings = false;
}

function findSatellite() {
    var bShowFindSatelliteLocal = !bShowFindSatellite;

    resetVisible();

    bShowFindSatellite = bShowFindSatelliteLocal;

    showElements();

    if (bShowFindSatellite) {
        resized();
    }
}

function selectObserver() {
    var bShowSelectObserverLocal = !bShowSelectObserver;

    resetVisible();

    bShowSelectObserver = bShowSelectObserverLocal;

    showElements();

    if (bShowSelectObserver) {
        resized();
    }    
}

function selectProjection() {
    var bShowSelectProjectionLocal = !bShowSelectProjection;

    resetVisible();
    
    bShowSelectProjection = bShowSelectProjectionLocal;

    showElements();
}

function showInformation() {
    var bShowInformationLocal = !bShowInformation;

    resetVisible();

    bShowInformation = bShowInformationLocal;

    showElements();
}

function showSettings() {
    var bShowSettingsLocal = !bShowSettings;

    resetVisible();

    bShowSettings = bShowSettingsLocal;

    showElements();
}

function setDefaultSatelliteSettings() {
    var settings = getSatelliteSettings();

    if (settings.color != undefined) {
        satelliteDefaultSettings.color = makeColor(settings.color, 1.0);
    }

    if (settings.label != undefined) {
        satelliteDefaultSettings.label = settings.label;
    }

    if (settings.fillBackground != undefined) {
        satelliteDefaultSettings.fillBackground = settings.fillBackground;
    }

    if (settings.colorBackground != undefined) {
        satelliteDefaultSettings.colorBackground = makeColor(settings.colorBackground, 1.0);
    }

    if (settings.symbol != undefined) {
        satelliteDefaultSettings.symbol = settings.symbol;
    }

    if (settings.footprintAlpha != undefined) {
        satelliteDefaultSettings.footprintAlpha = settings.footprintAlpha;
    }

    if (settings.footprintShade != undefined) {
        satelliteDefaultSettings.footprintShade = settings.footprintShade;
    }

    if (settings.footprintOutline != undefined) {
        satelliteDefaultSettings.footprintOutline = settings.footprintOutline;
    }

    if (settings.footprintAngles != undefined) {
        satelliteDefaultSettings.footprintAngles = settings.footprintAngles;
    }

    if (settings.trackUnits != undefined) {
        satelliteDefaultSettings.trackUnits = settings.trackUnits;
    }

    if (settings.trackForward != undefined) {
        satelliteDefaultSettings.trackForward = settings.trackForward;
    }

    if (settings.trackBackward != undefined) {
        satelliteDefaultSettings.trackBackward = settings.trackBackward;
    }

    if (settings.trackStyle != undefined) {
        satelliteDefaultSettings.trackStyle = settings.trackStyle;
    }
}

function applyAndHideSatelliteSettings() {
    bShowSatelliteSettings = false;

    setSelectedSatelliteSettings();

    document.getElementById("divSatelliteSettings").style.visibility = "hidden";

    redrawScene();
}

function resetSatelliteSettings() {
    fillSatelliteSettings(satelliteDefaultSettings);
}

function showSatelliteSettings() {
    bShowSatelliteSettings = !bShowSatelliteSettings;

    if (bShowSatelliteSettings) {
        document.getElementById("divSatelliteSettings").style.visibility = "visible";

        fillSelectedSatelliteSettings();
    } else {
        document.getElementById("divSatelliteSettings").style.visibility = "hidden";
    }
}

function applyAndHideObserverSettings() {
    bShowObserverSettings = false;

    setObserverSettings();

    document.getElementById("divObserverSettings").style.visibility = "hidden";
    
    redrawScene();    
}

function resetObserverSettings() {
    fillObserverSettings();
}

function showObserverSettings() {
    bShowObserverSettings = !bShowObserverSettings;

    if (bShowObserverSettings) {
        document.getElementById("divObserverSettings").style.visibility = "visible";

        fillObserverSettings();
    } else {
        document.getElementById("divObserverSettings").style.visibility = "hidden";
    }
}

function removeDisplayedSatellite(id) {
    var index = satellitesToDisplay.indexOf(id);

    if (index >= 0) {
        satellitesToDisplay.splice(index, 1);

        deleteSatellite(id);
    }
}

function satellitesUpdateProgress(event) {
    if (event.lengthComputable) {
        document.getElementById("progress").value = 100 * ( event.loaded / event.total );
    } else {
        //
        // seems like we can't set an accurate report of the progress,
        //  so we just use the prgoress bar as an indicator of activity...
        //

        var value = document.getElementById("progress").value + 5;

        if (value > 100) {
            value = 0;
        }   
        
        document.getElementById("progress").value = value;
    }
}

function satellitesTransferFailed(event) {
    document.getElementById("loading").style.visibility = "hidden";
}

function satellitesTransferCanceled(event) {
    document.getElementById("loading").style.visibility = "hidden";
}

function satellitesTransferComplete(event) {
    document.getElementById("progress").value = 100;

    oReqCategories.addEventListener("progress", categoriesUpdateProgress);
    oReqCategories.addEventListener("load", categoriesTransferComplete);
    oReqCategories.addEventListener("error", categoriesTransferFailed);
    oReqCategories.addEventListener("abort", categoriesTransferCanceled);

    oReqCategories.open("GET", "Celestrak/categories.txt");
    oReqCategories.send();

    if (jsonSatellites === undefined)
    {
        try
        {
            jsonSatellites = JSON.parse(event.currentTarget.responseText);
        }
        catch(e)
        {
        }
    } else {
        try
        {
            var jsonSatellitesNew;
            var satelliteNew;
            var satellite;
            var index;
            var id;

            jsonSatellitesNew = JSON.parse(event.currentTarget.responseText);

            //
            // need to copy everything over to jsonSatellites...
            //

            for (id in jsonSatellitesNew) {
                satelliteNew = jsonSatellitesNew[id];

                if (jsonSatellites.hasOwnProperty(id)) {
                    satellite = jsonSatellites[id];

                    if (satelliteNew.hasOwnProperty("satcat") ) {
                        satellite["satcat"] = satelliteNew["satcat"];
                    }

                    if (satelliteNew.hasOwnProperty("le1") && satelliteNew.hasOwnProperty("le2")) {
                        satellite["le1"] = satelliteNew["le1"];
                        satellite["le2"] = satelliteNew["le2"];

                        if (satellite.tracking.satrec) {
                            //
                            // only initialize the satellite if we are already tracking it...
                            //

                            initializeSatellite(satellite, id);
                        }
                    } else {
                        index = id.substr(1, id.length - 1);
                        removeDisplayedSatellite(index);

                        if (satellite.hasOwnProperty("le1")) {
                            delete satellite["le1"];
                        }

                        if (satellite.hasOwnProperty("le2")) {
                            delete satellite["le2"];
                        }
                    }
                }
            }
        }
        catch(e)
        {
        }

        //
        // need to refill the satellite list...
        //


    }

    event.currentTarget.responseText = null;
}

function categoriesUpdateProgress(event) {
    if (event.lengthComputable) {
        document.getElementById("progress").value = 100 * ( event.loaded / event.total );
    } else {
        //
        // seems like we can't set an accurate report of the progress,
        //  so we just use the prgoress bar as an indicator of activity...
        //

        var value = document.getElementById("progress").value + 5;

        if (value > 100) {
            value = 0;
        }   
        
        document.getElementById("progress").value = value;
    }
}

function categoriesTransferFailed(event) {
    document.getElementById("loading").style.visibility = "hidden";
}

function categoriesTransferCanceled(event) {
    document.getElementById("loading").style.visibility = "hidden";
}

function categoriesTransferComplete(event) {
    var index;

    document.getElementById("progress").value = 100;

    try
    {
        jsonCategories = JSON.parse(event.currentTarget.responseText);
    }
    catch (e)
    {

    }

    //
    // do this here, rather than in loaded(), as we need
    //  the satellites to have been fully transferred...
    //

    setInitialParameters();

    event.currentTarget.responseText = null;

    fillSatelliteCategories();

    document.getElementById("progress").value = 100;

    document.getElementById("loading").style.visibility = "hidden";

    updateTime();
}

function setInitialParameters() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var length = vars.length;
    var selectedSatellite = false;

    for (var i = 0; i < length; i++) {
        var pair = vars[i].split("=");

        if (pair[0] === "display")
        {
            //
            // select the satellites for display...
            //

            var ids = pair[1].split(",");
            var lengthIds = ids.length;
            var index;

            for (index = 0; index < lengthIds; index++) {
                var id = ids[index].trim();

                addDisplayedSatellite(id);
            }
        }
        else if (pair[0] === "projection") {
            var projectionToSet = pair[1].trim().toLowerCase();

            if (projectionToSet === "perspective") {
                projection = "projectionPerspective";
            } else if (projectionToSet === "cylindrical") {
                projection = "projectionCylindrical";
            } else if (projectionToSet === "robinson") {
                projection = "projectionRobinson";            
            } else if (projectionToSet === "elliptical") {
                projection = "projectionElliptical";            
            } else if (projectionToSet === "sinusoidal") {
                projection = "projectionSinusoidal";            
            } else if (projectionToSet === "radar") {
                projection = "projectionRadar";           
            } else if (projectionToSet === "textual") {
                projection = "projectionTextual";           
            }
        }
        else if (pair[0] === "observer") {
            var observerToSet = pair[1].trim().toLowerCase();

            observer.tracking.longitude = 0.0;
            observer.tracking.latitude = 0.0;
        }
    }

    //
    // if the user hasn't requested anything then display the ISS...
    //

    if (!selectedSatellite) {
        if (jsonSatellites["S" + initialSatelliteID]) {
            addDisplayedSatellite(initialSatelliteID);

            searchForSatellitesRoutine(initialSatelliteName);
        }
    }
}

function switchedProjection() {
    var element;
    var index;

    for (index = 0; index < projections.length; index++) {
        element = document.getElementById(projections[index]);

        if (element) {
            if (projections[index] === projection) {
                element.style.borderColor = "#007f00";
            }
            else {
                element.style.borderColor = "transparent";
            }
        }
    }
}

function projectionSwitch(event) {
    if (event.target.id.slice(0, 10) === "projection") {
        projection = event.target.id;
    } else {
        projection = event.target.parentNode.id;
    }

    switchedProjection();

    redrawScene();
}

function applyShaderSettingsCenter() {
    var longitudeScaled = ((centralPosition.longitudeRadians + (2.0 * Math.PI)) / (2.0 * Math.PI)) % 1.0;

    gl.useProgram(shaderProgramGlobeCylindrical);
    gl.uniform1f(shaderProgramGlobeCylindrical.centralLongitude, longitudeScaled);

    gl.useProgram(shaderProgramTrackCylindrical);
    gl.uniform1f(shaderProgramTrackCylindrical.centralLongitude, longitudeScaled);

    gl.useProgram(shaderProgramGlobeElliptical);
    gl.uniform1f(shaderProgramGlobeElliptical.centralLongitude, longitudeScaled);

    gl.useProgram(shaderProgramTrackElliptical);
    gl.uniform1f(shaderProgramTrackElliptical.centralLongitude, longitudeScaled);

    gl.useProgram(shaderProgramGlobeSinusoidal);
    gl.uniform1f(shaderProgramGlobeSinusoidal.centralLongitude, longitudeScaled);

    gl.useProgram(shaderProgramTrackSinusoidal);
    gl.uniform1f(shaderProgramTrackSinusoidal.centralLongitude, longitudeScaled);

    gl.useProgram(shaderProgramGlobeRobinson);
    gl.uniform1f(shaderProgramGlobeRobinson.centralLongitude, longitudeScaled);

    gl.useProgram(shaderProgramTrackRobinson);
    gl.uniform1f(shaderProgramTrackRobinson.centralLongitude, longitudeScaled);
}

function enterSatellite(e) {
    if (e.target !== e.currentTarget) {
        var element = e.target;

        if (element.className === "satellite") {
            var identifier = element.id.replace("SATELLITE_", "");

            objectReport = jsonSatellites["S" + identifier];

            updateObjectReport();
        } else if (element.className === "satelliteHoverShape") {
            var identifier = element.id.replace("SATELLITE_SHAPE_", "");

            objectReport = jsonSatellites["S" + identifier];

            updateObjectReport();            
        } else if (element.className === "observer" || element.className === "observerHoverShape") {
            objectReport = observer;

            updateObjectReport();            
        }
    }

    e.stopPropagation();
}

function updateScene(updateFootprintsOnly) {
    updateSatellites(updateFootprintsOnly);

    redrawScene();
}

function redrawScene() {
    var shaderProgram = null;

    if (projection === "projectionPerspective") {
        shaderProgram = shaderProgramGlobePerspective;
    } else if (projection === "projectionCylindrical") {
        shaderProgram = shaderProgramGlobeCylindrical;
    } else if (projection === "projectionElliptical") {
        shaderProgram = shaderProgramGlobeElliptical;   
    } else if (projection === "projectionSinusoidal") {
        shaderProgram = shaderProgramGlobeSinusoidal;   
    } else if (projection === "projectionRobinson") {
        shaderProgram = shaderProgramGlobeRobinson;   
    }

    if (shaderProgram) {
        //
        // we update the solar position here as we may have just made a projection change,
        //  and the new projection needs to know of the current solar position...
        //

        gl.useProgram(shaderProgram);
        gl.uniform1f(shaderProgram.solarLongitude, solarPosition.longitude);
        gl.uniform1f(shaderProgram.solarLatitude, solarPosition.latitude);

        //
        // if we're not about to update (we may have just made a projection change) then the new 
        //  projection needs to know of the number of satellite footprints to be displayed...
        //

        gl.uniform1i(shaderProgram.numSatellites, satellitesToDisplay.length);
    }
    
    if (objectCenter) {
        if (centralPosition.longitudeRadians !== objectCenter.tracking.longitude ||
            centralPosition.latitudeRadians !== objectCenter.tracking.latitude) {
            centralPosition.longitudeRadians = objectCenter.tracking.longitude;
            centralPosition.latitudeRadians = objectCenter.tracking.latitude;

            applyShaderSettingsCenter();
            applyPerspectiveRotation();

            reportMousePosition(posX, posY);
        }
    }
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    mat4.identity(scaleMatrix);
       
    if (projection === "projectionPerspective" && bDisplayEarth) {
        drawGlobePerspective();
    } else if (projection === "projectionCylindrical" && bDisplayEarth) {
        drawGlobeCylindrical();
    } else if (projection === "projectionRobinson" && bDisplayEarth) {
        drawGlobeRobinson();
    } else if (projection === "projectionElliptical" && bDisplayEarth) {
        drawGlobeElliptical();
    } else if (projection === "projectionSinusoidal" && bDisplayEarth) {
        drawGlobeSinusoidal();
    } else if (projection === "projectionRadar") {
        drawGlobeRadar();
    } else if (projection === "projectionTextual") {
        drawTextual();
    }

    if (projection === "projectionPerspective" ||
        projection === "projectionCylindrical" ||
        projection === "projectionSinusoidal" ||
        projection === "projectionElliptical" ||
        projection === "projectionRobinson" ||
        projection === "projectionRadar") {
        divLabelContainerNew = document.createElement("div");
        if (divLabelContainerNew) {
            divLabelContainerNew.id = "labelContainer";
        }
    }
    
    drawObserver();
    drawSatellites();

    if (projection === "projectionPerspective" ||
        projection === "projectionCylindrical" ||
        projection === "projectionSinusoidal" ||
        projection === "projectionElliptical" ||
        projection === "projectionRobinson" ||
        projection === "projectionRadar") {
        document.getElementById("background").replaceChild(divLabelContainerNew, document.getElementById("labelContainer"));

        divLabelContainerNew.addEventListener("mouseenter", enterSatellite, true);
    } else if (projection === "projectionTextual") {
        setColumnWidths("tableHeadTextual", "tableBodyTextual");        
    }

    //
    // always update the object report as we may
    //  have just moved the observer position...
    //

    updateObjectReport();

    gl.disable(gl.BLEND);
}

function loadSatellites() {
    oReqSatellites.addEventListener("progress", satellitesUpdateProgress);
    oReqSatellites.addEventListener("load", satellitesTransferComplete);
    oReqSatellites.addEventListener("error", satellitesTransferFailed);
    oReqSatellites.addEventListener("abort", satellitesTransferCanceled);

    oReqSatellites.open("GET", "Celestrak/satellites.txt");
    oReqSatellites.send();
}

function reload() {
    document.getElementById("progress").value = 0;

    document.getElementById("loading").style.visibility = "visible";

    loadSatellites();
}

function reportMousePosition(x, y) {
    //
    // report the longitude and latitude...
    //

    if (projection === "projectTextual") {
        document.getElementById("lonandlat").innerHTML = "&ndash;"
    } else if (projection === "projectionRadar") {
        var radarAltitude;
        var radarAzimuth;

        mouseLongitude = null;
        mouseLatitude = null;

        x -= canvas.clientWidth / 2;
        y -= canvas.clientHeight / 2;

        if (canvas.clientWidth > canvas.clientHeight) {
            x /= canvas.clientHeight / 2;
            y /= canvas.clientHeight / 2;
        } else {
            x /= canvas.clientWidth / 2;
            y /= canvas.clientWidth / 2;
        }

        radarAltitude = 90.0 - ( Math.sqrt((x * x) + (y * y)) * 90.0 );

        if (radarAltitude >= -90.0) {
            radarAzimuth = 90.0 + ( 180.0 * Math.atan2(y, x) / Math.PI );
            if (radarAzimuth < 0.0) {
                radarAzimuth += 360.0;
            }

            document.getElementById("lonandlat").innerHTML = "Az: " + azimuthToString(radarAzimuth, true) + "&deg;&nbsp;&nbsp;El: " + elevationToString(radarAltitude, true) + "&deg;";
        } else {
            document.getElementById("lonandlat").innerHTML = "&ndash;"
        }
    } else {
        var longitudeLocal = NaN;
        var latitudeLocal = NaN;

        if (projection === "projectionPerspective") {
            var pMatrixInvert = mat4.create();
            var mvMatrixInvert = mat4.create();
            var posCartesian;
            var increasing = false;
            var mouse = [];
            var z;
            var zMax;
            var zMin;
            var zStep;
            var found = true;
            var loop = 0;

            //
            // find the minimum and maximum permissible values for the z-value...
            //

            {
                var matrix = mat4.create();
                var pos;

                mat4.translate(matrix, matrix, [0, 0, -distanceScale]);
                mat4.rotateY(matrix, matrix, (Math.PI / 2.0));

                pos = toCartesianECEF(0.0, 0.0, 0.0);
                pos = vec4.fromValues(pos[0], pos[1], pos[2], 1.0);
                vec4.transformMat4(pos, pos, matrix);
                vec4.transformMat4(pos, pos, pMatrix);
                zMin = pos[2] / pos[3];

                pos = toCartesianECEF(0.0, 0.0, EARTH_SEMI_MAJOR_AXIS_KM * (Math.sin(angleGrazingEarthRadians) - 1.0));
                pos = vec4.fromValues(pos[0], pos[1], pos[2], 1.0);
                vec4.transformMat4(pos, pos, matrix);
                vec4.transformMat4(pos, pos, pMatrix);
                zMax = pos[2] / pos[3];
            }

            zStep = (zMax - zMin) / 3.0;

            mat4.invert(pMatrixInvert, pMatrix);
            mat4.invert(mvMatrixInvert, mvMatrix);
            mouse.altitude = 0.01;

            x = (2.0 * x / gl.drawingBufferWidth) - 1.0;
            y = 1.0 - (2.0 * y / gl.drawingBufferHeight);
            z = zMax;

            while (Math.abs(mouse.altitude) > 0.00005) {
                posCartesian = vec4.fromValues(x, y, z, 1.0);
                vec4.transformMat4(posCartesian, posCartesian, pMatrixInvert);
                vec4.transformMat4(posCartesian, posCartesian, mvMatrixInvert);
                vec4.scale(posCartesian, posCartesian, 1.0 / posCartesian[3]);
                fromCartesianECEF(mouse, vec3.fromValues(posCartesian[0], posCartesian[1], posCartesian[2]));

                if (loop === 0 && mouse.altitude > 0.0) {
                    found = false;

                    break;
                }

                if (mouse.altitude > 0.0) {
                    z += zStep;
                    if (!increasing) {
                        zStep /= 2.0;
                        increasing = true;
                    }
                } else {
                    z -= zStep;
                    if (increasing) {
                        zStep /= 2.0;
                        increasing = false;
                    }
                }

                loop++;
                if (loop > 100) {
                    break;
                }
            }

            if (found) {
                longitudeLocal = 180.0 * mouse.longitude / Math.PI;
                latitudeLocal = 180.0 * mouse.latitude / Math.PI;
            }
        } else if (projection === "projectionCylindrical") {
            longitudeLocal = 180.0 * ((2.0 * x / gl.drawingBufferWidth) + (centralPosition.longitudeRadians / Math.PI) + 1.0);
            latitudeLocal = 90.0 * (1.0 - (2.0 * y / gl.drawingBufferHeight));
        } else if (projection === "projectionRobinson") {
            var xScaled;
            var yScaled;
            var length = RobinsonMapStructs.length;
            var edge;

            xScaled = 2.0 * (x - (0.5 * gl.drawingBufferWidth)) / gl.drawingBufferWidth;
            yScaled = 2.0 * (y - (0.5 * gl.drawingBufferHeight)) / gl.drawingBufferHeight;

            for (var i = 0; i < length - 1; i++) {
                if (Math.abs(yScaled) >= RobinsonMapStructs[i + 0][2] &&
                    Math.abs(yScaled) <= RobinsonMapStructs[i + 1][2]) {
                    latitudeLocal = (((Math.abs(yScaled) - RobinsonMapStructs[i + 0][2]) * RobinsonMapStructs[i + 1][0]) +
                        ((RobinsonMapStructs[i + 1][2] - Math.abs(yScaled)) * RobinsonMapStructs[i + 0][0])) /
                        (RobinsonMapStructs[i + 1][2] - RobinsonMapStructs[i + 0][2]);

                    //
                    // Math.sign() is not yet supported in all browsers,
                    //  so we do it the long way for now...
                    //

                    if (yScaled > 0.0) {
                        latitudeLocal *= -1.0;
                    }

                    break;
                }
            }

            edge = longLatToXY(centralPosition.longitudeRadians - Math.PI, latitudeLocal * Math.PI / 180.0);

            if (Math.abs(xScaled) <= Math.abs(edge.x)) {
                var plen;

                plen = (((Math.abs(yScaled) - RobinsonMapStructs[i + 0][2]) * RobinsonMapStructs[i + 1][1]) +
                    ((RobinsonMapStructs[i + 1][2] - Math.abs(yScaled)) * RobinsonMapStructs[i + 0][1])) /
                    (RobinsonMapStructs[i + 1][2] - RobinsonMapStructs[i + 0][2]);

                longitudeLocal = (centralPosition.longitudeRadians * 180.0 / Math.PI) + (180.0 * (xScaled / plen));
            } else {
                longitudeLocal = NaN;
            }
        } else if (projection === "projectionElliptical") {
            var xScaled;
            var theta;
            var edge;

            xScaled = 2.0 * (x - (0.5 * gl.drawingBufferWidth)) / gl.drawingBufferWidth;
            theta = Math.asin(2.0 * ((0.5 * gl.drawingBufferHeight) - y) / gl.drawingBufferHeight);

            latitudeLocal = Math.asin(((2.0 * theta) + Math.sin(2.0 * theta)) / Math.PI);
            edge = longLatToXY(centralPosition.longitudeRadians - Math.PI, latitudeLocal);

            if (Math.abs(xScaled) <= Math.abs(edge.x)) {
                longitudeLocal = (180.0 / Math.PI) * (centralPosition.longitudeRadians + (Math.PI * xScaled / Math.cos(theta)));
                latitudeLocal *= 180.0 / Math.PI;
            }
        } else if (projection === "projectionSinusoidal") {
            var xScaled;
            var edge;

            xScaled = 2.0 * (x - (0.5 * gl.drawingBufferWidth)) / gl.drawingBufferWidth;
            latitudeLocal = ( Math.PI / 2.0 ) * (1.0 - (2.0 * y / gl.drawingBufferHeight));

            edge = longLatToXY(centralPosition.longitudeRadians - Math.PI, latitudeLocal);

            if (Math.abs(xScaled) <= Math.abs(edge.x) && Math.cos(latitudeLocal) > 0.0) {
                longitudeLocal = (180.0 / Math.PI) * ( (Math.PI * xScaled / Math.cos(latitudeLocal)) + centralPosition.longitudeRadians );
                latitudeLocal *= 180.0 / Math.PI;
            }
        }

        if (isNaN(longitudeLocal) || isNaN(latitudeLocal)) {
            document.getElementById("lonandlat").innerHTML = "&ndash;"

            mouseLongitude = null;
            mouseLatitude = null;
        } else {
            document.getElementById("lonandlat").innerHTML = longitudeToString(longitudeLocal, false, true) + "&nbsp;&nbsp;" + latitudeToString(latitudeLocal, false, true);

            mouseLongitude = longitudeLocal;
            mouseLatitude = latitudeLocal;
        }
    }
}

function updateCentralPosition(setToFixedCenter) {
    var distanceScaleLocal = (EARTH_SEMI_MAJOR_AXIS_KM + (centralPosition.altitudeMeters / 1000.0)) / EARTH_SEMI_MAJOR_AXIS_KM;

    //
    // if setToFixedCenter is true then we've just performed some action
    //  (such as adjusting the central position with mouse or keys) that
    //  removes the specified satellite or observer at the center...
    //

    if (setToFixedCenter) {
        objectCenter = null;
    }

    //
    // restrict latitude to the range [-90,90]...
    //

    centralPosition.latitudeRadians = Math.max(centralPosition.latitudeRadians, -Math.PI / 2.0);
    centralPosition.latitudeRadians = Math.min(centralPosition.latitudeRadians, Math.PI / 2.0);
            
    //
    // restrict longitude to the range [-180, 180]...
    //

    centralPosition.longitudeRadians %= 2.0 * Math.PI;
    
    if (centralPosition.longitudeRadians <= -Math.PI) {
        centralPosition.longitudeRadians += 2.0 * Math.PI;
    } else if (centralPosition.longitudeRadians > Math.PI) {
        centralPosition.longitudeRadians -= 2.0 * Math.PI;
    }

    distanceScale = distanceScaleLocal;

    angleGrazingEarthRadians = Math.asin(1.0 / distanceScale);

    applyShaderSettingsCenter();
    applyPerspectiveRotation();

    reportMousePosition(posX, posY);

    redrawScene();  
}

function handleMouseMove(event) {
    if (bShowFindSatellite || bShowSelectProjection || bShowSelectObserver || bShowInformation || bShowSettings) {
        //
        // one of the configration displays is showing,
        //  so we don't want to process the mouse move
        //  ourselves...
        //

        return false;
    }

    if (mouseDown === true) {
        if (posX != event.clientX ||
            posY != event.clientY) {
            centralPosition.longitudeRadians += glMatrix.toRadian((posX - event.clientX) / 2);
            centralPosition.latitudeRadians += glMatrix.toRadian((event.clientY - posY) / 2);

            posX = event.clientX;
            posY = event.clientY;
            
            updateCentralPosition(true);
        }
    } else {
        posX = event.clientX;
        posY = event.clientY;

        reportMousePosition(posX, posY);
    }

    eventLast = event;
}

function handleMouseUp(event) {
    reportMousePosition(event.clientX, event.clientY);

    mouseDown = false;
}

function handleMouseDown(event) {
    posX = event.clientX;
    posY = event.clientY;

    mouseDown = true;
}

function handleMouseWheel(event) {
    if (bShowFindSatellite || bShowSelectProjection || bShowSelectObserver || bShowInformation || bShowSettings) {
        //
        // one of the configration displays is showing,
        //  so we don't want to process the mouse wheel
        //  ourselves...
        //

        return false;
    }

    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

    centralPosition.altitudeMeters -= delta * centralPosition.altitudeMeters * 0.1;

    if (centralPosition.altitudeMeters > MAX_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0) {
        centralPosition.altitudeMeters = MAX_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0;
    } else if (centralPosition.altitudeMeters < MIN_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0) {
        centralPosition.altitudeMeters = MIN_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0;
    }

    updateCentralPosition(false);
}

function cancelInterval( ) {
    if (timeout) {
        clearTimeout(timeout);
    }

    if (interval) {
        clearInterval(interval);
    }
}

function createInterval(intervalSeconds) {
    cancelInterval();

    //
    // do things immediately...
    //

    offsetSeconds += intervalSeconds;
    updateTime();

    //
    // and then at a set interval
    //  after an initial pause...
    //

    timeout = setTimeout( function() {
        var intervalLocal = intervalSeconds;

        interval = setInterval( function() {
            offsetSeconds += intervalLocal;
            updateTime();
        }, 50);  
    }, 500);
}

function addDay(event) {
    createInterval(86400);
}

function addHour() {
    createInterval(3600);    
}

function addMinute() {
    createInterval(60);      
}

function subtractDay( ) {
    createInterval(-86400);
}

function subtractHour() {
    createInterval(-3600);    
}

function subtractMinute() {
    createInterval(-60); 
}

function play() {
    var element;

    paused = !paused;

    element = document.getElementById("dateandtimeplay");
    if (element) {
        if (paused) {
            element.src = "Time/Play128.png";
            element.classList.add("modifyTimehighlighted");
        } else {
            element.src = "Time/Pause128.png";
            element.classList.remove("modifyTimehighlighted");

            updateTime();
        }
    }
}

function zero() {
    offsetSeconds = 0;        

    updateTime();
}

function handleKeyDown(event) {
    if (bShowFindSatellite || bShowSelectProjection || bShowSelectObserver || bShowInformation || bShowSettings) {
        //
        // one of the configration displays is showing,
        //  so we don't want to process the mouse move
        //  ourselves...
        //

        return;
    }

    if (event.shiftKey && event.altKey) {
        if (event.key === "Add" || event.key === "+") {
            offsetSeconds += 1;
            updateTime();
        } else if (event.key === "Subtract" || event.key === "-") {
            offsetSeconds -= 1;
            updateTime();
        }
    } else if (event.shiftKey) {
        if (event.key === "ArrowUp" || event.key === "Up") {
            centralPosition.altitudeMeters -= centralPosition.altitudeMeters * 0.1;

            if (centralPosition.altitudeMeters > MAX_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0) {
                centralPosition.altitudeMeters = MAX_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0;
            } else if (centralPosition.altitudeMeters < MIN_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0) {
                centralPosition.altitudeMeters = MIN_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0;
            }

            updateCentralPosition(false);
        } else if (event.key === "ArrowDown" || event.key === "Down") {
            centralPosition.altitudeMeters += centralPosition.altitudeMeters * 0.1;

            if (centralPosition.altitudeMeters > MAX_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0) {
                centralPosition.altitudeMeters = MAX_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0;
            } else if (centralPosition.altitudeMeters < MIN_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0) {
                centralPosition.altitudeMeters = MIN_SPHERICAL_VIEW_ALTITUDE_KM * 1000.0;
            }

            updateCentralPosition(false);
        } else if (event.key === "Add" || event.key === "+") {
            offsetSeconds += 3600;
            updateTime();
        } else if (event.key === "Subtract" || event.key === "-") {
            offsetSeconds -= 3600;
            updateTime();
        } else {
            return;
        }
    } else if (event.altKey) {
        if (event.key === "Add" || event.key === "+") {
            offsetSeconds += 86400;
            updateTime();
        } else if (event.key === "Subtract" || event.key === "-") {
            offsetSeconds -= 86400;
            updateTime();
        }
    } else if (event.ctrlKey) {
        if (event.key === "ArrowLeft" || event.key === "Left") {
            observer.tracking.longitude -= glMatrix.toRadian(1.0);
            updateObserverPosition();
            redrawScene();
            updateObjectReport();
        } else if (event.key === "ArrowRight" || event.key === "Right") {
            observer.tracking.longitude += glMatrix.toRadian(1.0);
            updateObserverPosition();
            redrawScene();
            updateObjectReport();
        } else if (event.key === "ArrowUp" || event.key === "Up") {
            observer.tracking.latitude += glMatrix.toRadian(1.0);
            updateObserverPosition();
            redrawScene();
            updateObjectReport();
        } else if (event.key === "ArrowDown" || event.key === "Down") {
            observer.tracking.latitude -= glMatrix.toRadian(1.0);
            updateObserverPosition();
            redrawScene();
            updateObjectReport();
        }
    } else if (event.key === "ArrowLeft" || event.key === "Left") {
        centralPosition.longitudeRadians += glMatrix.toRadian(1.0);
        updateCentralPosition(true);
    } else if (event.key === "ArrowRight" || event.key === "Right") {
        centralPosition.longitudeRadians -= glMatrix.toRadian(1.0);
        updateCentralPosition(true);
    } else if (event.key === "ArrowUp" || event.key === "Up") {
        centralPosition.latitudeRadians -= glMatrix.toRadian(1.0);
        updateCentralPosition(true);
    } else if (event.key === "ArrowDown" || event.key === "Down") {
        centralPosition.latitudeRadians += glMatrix.toRadian(1.0);
        updateCentralPosition(true);
    } else if (event.key === "Delete" || event.key === "Del" || event.key === "d" || event.key === "x") {
        deleteObjectReport();
    } else if (event.key === "Add" || event.key === "+") {
        offsetSeconds += 60;
        updateTime();
    } else if (event.key === "Subtract" || event.key === "-") {
        offsetSeconds -= 60;
        updateTime();
    } else if (event.key === "c") {
        centerObjectReport();
    } else if (event.key === "e") {
        //
        // edit the selected satellite...
        //

        if (objectReport) {
            if (objectReport.hasOwnProperty("satcat")) {
                
            }
        }
    } else if (event.key === "i") {
        //
        // display the associated NSSDC info for the selected satellite...
        //

        if (objectReport) {
            if (objectReport.hasOwnProperty("satcat")) {
                var page = WEBSITE_NSSDC + objectReport.satcat[SATCAT_ENTRY_DESIGNATOR];

                window.open(page);
            }
        }
    } else if (event.key === "o") {        
        if(mouseLongitude && mouseLatitude) {
            setObserverPosition(mouseLongitude, mouseLatitude, 0.0);
            redrawScene();
            updateObjectReport();
        }
    }
    else if (event.key === "z") {
        offsetSeconds = 0;
        updateTime();
    } else if (event.key === "") {

    } else {
        return;
    }
}

function changeSettingInteger(property, value) {
    gl.useProgram(shaderProgramGlobePerspective);
    gl.uniform1i(shaderProgramGlobePerspective[property], value);

    gl.useProgram(shaderProgramGlobeCylindrical);
    gl.uniform1i(shaderProgramGlobeCylindrical[property], value);

    gl.useProgram(shaderProgramGlobeElliptical);
    gl.uniform1i(shaderProgramGlobeElliptical[property], value);

    gl.useProgram(shaderProgramGlobeSinusoidal);
    gl.uniform1i(shaderProgramGlobeSinusoidal[property], value);

    gl.useProgram(shaderProgramGlobeRobinson);
    gl.uniform1i(shaderProgramGlobeRobinson[property], value);
}

function changeSettingColor(property, color) {
    gl.useProgram(shaderProgramGlobePerspective);
    gl.uniform4f(shaderProgramGlobePerspective[property], color[0], color[1], color[2], color[3]);

    gl.useProgram(shaderProgramGlobeCylindrical);
    gl.uniform4f(shaderProgramGlobeCylindrical[property], color[0], color[1], color[2], color[3]);

    gl.useProgram(shaderProgramGlobeElliptical);
    gl.uniform4f(shaderProgramGlobeElliptical[property], color[0], color[1], color[2], color[3]);

    gl.useProgram(shaderProgramGlobeSinusoidal);
    gl.uniform4f(shaderProgramGlobeSinusoidal[property], color[0], color[1], color[2], color[3]);

    gl.useProgram(shaderProgramGlobeRobinson);
    gl.uniform4f(shaderProgramGlobeRobinson[property], color[0], color[1], color[2], color[3]);
}

function changeSettingBackgroundColor() {
    var colorBackground = makeColor(document.getElementById("colorBackground").value, 1.0);

    document.getElementById("colorBackground").style.backgroundColor = document.getElementById("colorBackground").value;

    gl.clearColor(colorBackground[0], colorBackground[1], colorBackground[2], 1.0);
}

function changeSettingDisplayEarth() {
    bDisplayEarth = document.getElementById("displayEarth").checked;
}

function changeSettingDisplayImage() {
    var bUseSatelliteImage = document.getElementById("displayImage").checked;

    changeSettingInteger("bUseSatelliteImage", bUseSatelliteImage);
}

function changeSettingDisplayDayNight() {
    var bDisplayDayNight = document.getElementById("displayDayNight").checked;

    changeSettingInteger("bDisplayDayNight", bDisplayDayNight);
}

function changeSettingColorDay() {
    var colorDay = makeColor(document.getElementById("colorDay").value, 1.0);

    document.getElementById("colorDay").style.backgroundColor = document.getElementById("colorDay").value;

    changeSettingColor("colorDay", colorDay);
}

function changeSettingColorNight() {
    var colorNight = makeColor(document.getElementById("colorNight").value, 1.0);

    document.getElementById("colorNight").style.backgroundColor = document.getElementById("colorNight").value;

    changeSettingColor("colorNight", colorNight);
}

function changeSettingDisplayTerminator() {
    var bDisplayTerminator = document.getElementById("displayTerminator").checked;

    changeSettingInteger("bDisplayTerminator", bDisplayTerminator);
}

function changeSettingColorTerminator() {
    var colorTerminator = makeColor(document.getElementById("colorTerminator").value, document.getElementById("alphaTerminator").value);

    document.getElementById("colorTerminator").style.backgroundColor = document.getElementById("colorTerminator").value;

    changeSettingColor("colorTerminator", colorTerminator);
}

function changeSettingDisplayLatLongGrid() {
    var bDisplayLatLongGrid = document.getElementById("displayLatLongGrid").checked;

    changeSettingInteger("bDisplayLongitudeLatitudeGrid", bDisplayLatLongGrid);
}

function changeSettingColorLatLongGrid() {
    var colorLatLongGrid = makeColor(document.getElementById("colorLatLongGrid").value, document.getElementById("alphaLatLongGrid").value);

    document.getElementById("colorLatLongGrid").style.backgroundColor = document.getElementById("colorLatLongGrid").value;

    changeSettingColor("colorLongitudeLatitudeGrid", colorLatLongGrid);
}

function changeSettingDisplayBoundaries() {
    var bDisplayBoundaries = document.getElementById("displayBoundaries").checked;

    changeSettingInteger("bDisplayBoundaries", bDisplayBoundaries);
}

function changeSettingDisplayBoundariesCoastline() {
    var bDisplayBoundariesCoastline = document.getElementById("displayBoundariesCoastline").checked;

    changeSettingInteger("bDisplayBoundariesCoastlines", bDisplayBoundariesCoastline);
}

function changeSettingDisplayBoundariesInternal() {
    var bDisplayBoundariesInternal = document.getElementById("displayBoundariesInternal").checked;

    changeSettingInteger("bDisplayBoundariesInternal", bDisplayBoundariesInternal);
}

function changeSettingColorBoundaries() {
    var colorBoundaries = makeColor(document.getElementById("colorBoundaries").value, document.getElementById("alphaBoundaries").value);

    document.getElementById("colorBoundaries").style.backgroundColor = document.getElementById("colorBoundaries").value;

    changeSettingColor("colorBoundaries", colorBoundaries);
}

function changeSettingDisplayLand() {
    var bDisplayLand = document.getElementById("displayFillLand").checked;

    changeSettingInteger("bFillLand", bDisplayLand);
}

function changeSettingColorLand() {
    var colorLand = makeColor(document.getElementById("colorLand").value, document.getElementById("alphaFillLand").value);

    document.getElementById("colorLand").style.backgroundColor = document.getElementById("colorLand").value;

    changeSettingColor("colorLand", colorLand);
}

function changeSettingDisplaySeas() {
    var bDisplaySeas = document.getElementById("displayFillSeas").checked;

    changeSettingInteger("bFillSeas", bDisplaySeas);
}

function changeSettingColorSeas() {
    var colorSeas = makeColor(document.getElementById("colorSeas").value, document.getElementById("alphaFillSeas").value);

    document.getElementById("colorSeas").style.backgroundColor = document.getElementById("colorSeas").value;

    changeSettingColor("colorSeas", colorSeas);
}

function changeSettingRadarDisplayStars() {
    radarDisplayStars = document.getElementById("displayStars").checked;
}

function changeSettingRadarColorStarsValue(radarColorStars) {
    var gradient = [];
    var constant = [];
    var index;

    gl.useProgram(shaderProgramStars);

    for (index = 0; index < 3; index++) {
        gradient[index] = (radarColorStars[index] - colorBackground[index]) / (radarBrightestMagnitude - radarLimitingMagnitude);
        constant[index] = radarColorStars[index] - (gradient[index] * radarBrightestMagnitude);
    }

    gl.uniform3f(shaderProgramStars.colorGradients, gradient[0], gradient[1], gradient[2]);
    gl.uniform3f(shaderProgramStars.colorConstants, constant[0], constant[1], constant[2]);
}

function changeSettingRadarColorStars() {
    var radarColorStars = makeColor(document.getElementById("colorStars").value, 1.0);

    document.getElementById("colorStars").style.backgroundColor = document.getElementById("colorStars").value;

    changeSettingRadarColorStarsValue(radarColorStars);
}

function changeSettingRadarLimitingMagnitude() {
    radarLimitingMagnitude = document.getElementById("limitingMagnitude").value;

    gl.useProgram(shaderProgramStars);
    gl.uniform1f(shaderProgramStars.limitingMagnitude, radarLimitingMagnitude);
}

function changeSettingRadarDisplayConstellations() {
    bShowConstellationShapes = document.getElementById("displayConstellations").checked;
}

function changeSettingRadarColorConstellations() {
    radarColorConstellationShapes = makeColor(document.getElementById("colorConstellations").value, 1.0);  

    document.getElementById("colorConstellations").style.backgroundColor = document.getElementById("colorConstellations").value;
}

function changeSettingRadarDisplayConstellationBoundaries() {
    bShowConstellationBoundaries = document.getElementById("includeConstellationBoundaries").checked;
}

function changeSettingRadarColorConstellationBoundaries() {
    radarColorConstellationBoundaries = makeColor(document.getElementById("colorConstellationBoundaries").value, 1.0);  

    document.getElementById("colorConstellationBoundaries").style.backgroundColor = document.getElementById("colorConstellationBoundaries").value;
}

function changeSettingRadarDisplayConstellationNames() {
    bShowConstellationNames = document.getElementById("includeConstellationNames").checked;
}

function changeSettingRadarColorConstellationNamesValue(color) {
    var labels = document.getElementById("constellationLabels");
    
    if (labels) {
        labels.style.color = color;
    }
}

function changeSettingRadarColorConstellationNames() {
    var color = document.getElementById("colorConstellationNames").value;

    document.getElementById("colorConstellationNames").style.backgroundColor = document.getElementById("colorConstellationNames").value;

    changeSettingRadarColorConstellationNamesValue(color);
}

function changeSettingRadarDisplayAzElGrid() {
    var labels = document.getElementById("radarLabels");

    radarDisplayAzElGrid = document.getElementById("displayAzElGrid").checked;

    if (labels) {
        if (radarDisplayAzElGrid) {
            labels.style.visibility = "visible";
        } else {
            labels.style.visibility = "hidden";
        }
    }
}

function changeSettingRadarColorAzElGrid() {
    radarColorAzElGrid = makeColor(document.getElementById("colorAzElGrid").value, 1.0);

    document.getElementById("colorAzElGrid").style.backgroundColor = document.getElementById("colorAzElGrid").value;

    gl.useProgram(shaderProgramXY);
    gl.uniform4f(shaderProgramXY.color, radarColorAzElGrid[0], radarColorAzElGrid[1], radarColorAzElGrid[2], 1.0);
}

function changeSettingRadarDisplayRADecGrid() {
    radarDisplayRADecGrid = document.getElementById("displayRADecGrid").checked;
}

function changeSettingRadarColorRADecGrid() {
    radarColorRADecGrid = makeColor(document.getElementById("colorRADecGrid").value, 1.0);

    document.getElementById("colorRADecGrid").style.backgroundColor = document.getElementById("colorRADecGrid").value;

    gl.useProgram(shaderProgramRADec);
    gl.uniform4f(shaderProgramRADec.color, radarColorRADecGrid[0], radarColorRADecGrid[1], radarColorRADecGrid[2], 0.5);
}

function changeSettingRadarDisplayCentralPosition() {
    var label = document.getElementById("radarCenter");

    if (label) {
        radarShowCentralPosition = document.getElementById("displayCentralPosition").checked;

        if (radarShowCentralPosition) {
            label.style.visibility = "visible";
        } else {
            label.style.visibility = "hidden";
        }
    }
}

function changeSettingRadarColorCentralPosition() {
    var label = document.getElementById("radarCenter"); 

    if (label) {
        radarColorCentralPosition = makeColor(document.getElementById("colorCentralPosition").value, 1.0);

        document.getElementById("colorCentralPosition").style.backgroundColor = document.getElementById("colorCentralPosition").value;

        var colorContrast = getColorContrast(radarColorCentralPosition);
        var textShadow = "-1px -1px 5px " + colorContrast + ", 1px -1px 5px " + colorContrast + ", -1px 1px 5px " + colorContrast + ", 1px 1px 5px " + colorContrast;

        label.style.color = document.getElementById("colorCentralPosition").value;
        label.style.textShadow = textShadow;
    }
}

function changeTimeZoneUTC() {
    timeZoneUTC = document.getElementById("timeZoneUTC").checked;

    updateTimeDisplay();
}

function changeRefractionCorrection() {
    refractionCorrection = document.getElementById("refractionCorrection").checked;
}

function deleteFromView() {
    if (objectReport) {
        if (objectReport.tracking) {
            removeDisplayedSatellite(objectReport.id);

            //
            // we update the scene, but set updateFootprintsOnly to true,
            //  so we don't incur the penalty of updating all the satellites...
            //

            updateScene(true);
        }
    }    
}

function expandReport() {
    if (objectReport) {
        if (objectReport.tracking) {
            reportLevelSatellite++;
        
            if (reportLevelSatellite > MAX_REPORT_LEVEL_SATELLITE) {
                reportLevelSatellite = 0;
            }
        } else {
            reportLevelObserver++;

            if (reportLevelObserver > MAX_REPORT_LEVEL_OBSERVER) {
                reportLevelObserver = 0;
            }
        }
    
        updateObjectReport();
    }
}

function updateTimeDisplay() {
    if (timeZoneUTC) {
        document.getElementById("dateandtimeyear").innerHTML = dateNow.getUTCFullYear();
        document.getElementById("dateandtimemonth").innerHTML = (dateNow.getUTCMonth() + 1).toString().padStart(2, "0");
        document.getElementById("dateandtimeday").innerHTML = dateNow.getUTCDate( ).toString().padStart(2, "0");
        document.getElementById("dateandtimehour").innerHTML = dateNow.getUTCHours().toString().padStart(2, "0");
        document.getElementById("dateandtimeminute").innerHTML = dateNow.getUTCMinutes().toString().padStart(2, "0");
        document.getElementById("dateandtimesecond").innerHTML = dateNow.getUTCSeconds( ).toString().padStart(2, "0");
    } else {
        document.getElementById("dateandtimeyear").innerHTML = dateNow.getFullYear();
        document.getElementById("dateandtimemonth").innerHTML = (dateNow.getMonth() + 1).toString().padStart(2, "0");
        document.getElementById("dateandtimeday").innerHTML = dateNow.getDate( ).toString().padStart(2, "0");
        document.getElementById("dateandtimehour").innerHTML = dateNow.getHours().toString().padStart(2, "0");
        document.getElementById("dateandtimeminute").innerHTML = dateNow.getMinutes().toString().padStart(2, "0");
        document.getElementById("dateandtimesecond").innerHTML = dateNow.getSeconds( ).toString().padStart(2, "0");
    }
}

function updateTime() {
    if (!paused) {
        dateBase = new Date();
    }

    dateNow = new Date((dateBase * 1) + (1000 * offsetSeconds));
    jdNow = julianDate(dateNow);
    solarPosition = subSolarPoint(jdNow);
  
//
//  the following is now obsolete, but can be used to display the current 
//  date and time in UTC or the local time zone, based on the current locale...
//
//    if (timeZoneUTC) {
//        document.getElementById("dateandtime").innerHTML = date.toLocaleString([], { timeZone: 'UTC', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'});
//    } else {
//        document.getElementById("dateandtime").innerHTML = date.toLocaleString([], {                  hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'});
//    }
//

    updateTimeDisplay();

    updateScene(false);
}

function updateFromTimer() {
    if (!paused) {
        updateTime();
    }
}

function applyInitialUISettings() {
    //
    // set the initial settings values for the projection views...
    //

    document.getElementById("colorBackground").value = makeHTMLColor(colorBackground);
    document.getElementById("colorBackground").style.backgroundColor = makeHTMLColor(colorBackground);
    
    document.getElementById("displayEarth").checked = bDisplayEarth;
    document.getElementById("displayImage").checked = bUseSatelliteImage;

    document.getElementById("displayDayNight").checked = bDisplayDayNight;
    document.getElementById("colorDay").value = makeHTMLColor(colorDay);
    document.getElementById("colorNight").value = makeHTMLColor(colorNight);
    document.getElementById("colorDay").style.backgroundColor = makeHTMLColor(colorDay);
    document.getElementById("colorNight").style.backgroundColor = makeHTMLColor(colorNight);

    document.getElementById("displayTerminator").checked = bDisplayTerminator;
    document.getElementById("colorTerminator").value = makeHTMLColor(colorTerminator);
    document.getElementById("colorTerminator").style.backgroundColor = makeHTMLColor(colorTerminator);
    document.getElementById("alphaTerminator").value = alphaTerminator;
    document.getElementById("alphaTerminatorValue").value = alphaTerminator;

    document.getElementById("displayLatLongGrid").checked = bDisplayLongitudeLatitudeGrid;
    document.getElementById("colorLatLongGrid").value = makeHTMLColor(colorLongitudeLatitudeGrid);
    document.getElementById("colorLatLongGrid").style.backgroundColor = makeHTMLColor(colorLongitudeLatitudeGrid);
    document.getElementById("alphaLatLongGrid").value = alphaLongitudeLatitudeGrid;
    document.getElementById("alphaLatLongGridValue").value = alphaLongitudeLatitudeGrid;

    document.getElementById("displayBoundaries").checked = bDisplayBoundaries;
    document.getElementById("colorBoundaries").value = makeHTMLColor(colorBoundaries);
    document.getElementById("colorBoundaries").style.backgroundColor = makeHTMLColor(colorBoundaries);
    document.getElementById("alphaBoundaries").value = alphaBoundaries;
    document.getElementById("alphaBoundariesValue").value = alphaBoundaries;

    document.getElementById("displayFillLand").checked = bFillLand;
    document.getElementById("colorLand").value = makeHTMLColor(colorLand);
    document.getElementById("colorLand").style.backgroundColor = makeHTMLColor(colorLand);
    document.getElementById("alphaFillLand").value = alphaLand;
    document.getElementById("alphaFillLandValue").value = alphaLand;

    document.getElementById("displayFillSeas").checked = bFillSeas;
    document.getElementById("colorSeas").value = makeHTMLColor(colorSeas);
    document.getElementById("colorSeas").style.backgroundColor = makeHTMLColor(colorSeas);
    document.getElementById("alphaFillSeas").value = alphaSeas;
    document.getElementById("alphaFillSeasValue").value = alphaSeas;
    
    //
    // set the initial settings values for the radar view...
    //

    document.getElementById("displayStars").checked = radarDisplayStars;
    document.getElementById("colorStars").value = makeHTMLColor(radarColorStars);  
    document.getElementById("colorStars").style.backgroundColor = makeHTMLColor(radarColorStars);  
    document.getElementById("limitingMagnitude").value = radarLimitingMagnitude;  
    document.getElementById("limitingMagnitudeValue").value = radarLimitingMagnitude;

    document.getElementById("displayConstellations").checked = bShowConstellationShapes;
    document.getElementById("colorConstellations").value = makeHTMLColor(radarColorConstellationShapes);
    document.getElementById("colorConstellations").style.backgroundColor = makeHTMLColor(radarColorConstellationShapes);
    document.getElementById("includeConstellationBoundaries").checked = bShowConstellationBoundaries;
    document.getElementById("colorConstellationBoundaries").value = makeHTMLColor(radarColorConstellationBoundaries);    
    document.getElementById("colorConstellationBoundaries").style.backgroundColor = makeHTMLColor(radarColorConstellationBoundaries);    
    document.getElementById("includeConstellationNames").checked = bShowConstellationNames;
    document.getElementById("colorConstellationNames").value = makeHTMLColor(radarColorConstellationNames);
    document.getElementById("colorConstellationNames").style.backgroundColor = makeHTMLColor(radarColorConstellationNames);

    document.getElementById("displayAzElGrid").checked = radarDisplayAzElGrid;
    document.getElementById("colorAzElGrid").value = makeHTMLColor(radarColorAzElGrid);
    document.getElementById("colorAzElGrid").style.backgroundColor = makeHTMLColor(radarColorAzElGrid);

    document.getElementById("displayRADecGrid").checked = radarDisplayRADecGrid;
    document.getElementById("colorRADecGrid").value = makeHTMLColor(radarColorRADecGrid);
    document.getElementById("colorRADecGrid").style.backgroundColor = makeHTMLColor(radarColorRADecGrid);

    document.getElementById("displayCentralPosition").checked = bShowConstellationShapes;
    document.getElementById("colorCentralPosition").value = makeHTMLColor(radarColorCentralPosition);
    document.getElementById("colorCentralPosition").style.backgroundColor = makeHTMLColor(radarColorCentralPosition);
}

function applyShaderSettingsCommon(shader) {
    gl.useProgram(shader);

    gl.uniform4f(shader["colorSeas"], colorSeas[0], colorSeas[1], colorSeas[2], alphaSeas);
    gl.uniform4f(shader["colorLand"], colorLand[0], colorLand[1], colorLand[2], alphaLand);
    gl.uniform1i(shader["bUseSatelliteImage"], bUseSatelliteImage);
    gl.uniform1i(shader["bFillLand"], bFillLand);
    gl.uniform1i(shader["bFillSeas"], bFillSeas);
    gl.uniform1i(shader["bDisplayDayNight"], bDisplayDayNight);
    gl.uniform4f(shader["colorDay"], colorDay[0], colorDay[1], colorDay[2], 1);
    gl.uniform4f(shader["colorNight"], colorNight[0], colorNight[1], colorNight[2], 1);
    gl.uniform4f(shader["colorLongitudeLatitudeGrid"], colorLongitudeLatitudeGrid[0], colorLongitudeLatitudeGrid[1], colorLongitudeLatitudeGrid[2], alphaLongitudeLatitudeGrid);
    gl.uniform1i(shader["bDisplayLongitudeLatitudeGrid"], bDisplayLongitudeLatitudeGrid);
    gl.uniform4f(shader["colorTerminator"], colorTerminator[0], colorTerminator[1], colorTerminator[2], alphaTerminator);
    gl.uniform4f(shader["colorBoundaries"], colorBoundaries[0], colorBoundaries[1], colorBoundaries[2], alphaBoundaries);
    gl.uniform1i(shader["bDisplayTerminator"], bDisplayTerminator);
    gl.uniform1i(shader["bDisplayBoundaries"], bDisplayBoundaries);
    gl.uniform1i(shader["bDisplayBoundariesCoastlines"], bDisplayBoundariesCoastlines);
    gl.uniform1i(shader["bDisplayBoundariesInternal"], bDisplayBoundariesInternal);
    gl.uniform1i(shader["numSatellites"], 0);
}

function applyShaderSettingsRadar() {
    changeSettingRadarColorStarsValue(radarColorStars);
    changeSettingRadarColorConstellationNamesValue(makeHTMLColor(radarColorConstellationNames));

    gl.useProgram(shaderProgramStars);
    gl.uniform1f(shaderProgramStars.limitingMagnitude, radarLimitingMagnitude);    

    gl.useProgram(shaderProgramRADec);
    gl.uniform4f(shaderProgramRADec.color, radarColorRADecGrid[0], radarColorRADecGrid[1], radarColorRADecGrid[2], 0.5);
}

function applyShaderSettings() {
    angleGrazingEarthRadians = Math.asin(1.0 / distanceScale);

    gl.clearColor(colorBackground[0], colorBackground[1], colorBackground[2], 1.0);

    applyShaderSettingsCommon(shaderProgramGlobePerspective);
    applyShaderSettingsCommon(shaderProgramGlobeCylindrical);
    applyShaderSettingsCommon(shaderProgramGlobeElliptical);
    applyShaderSettingsCommon(shaderProgramGlobeSinusoidal);
    applyShaderSettingsCommon(shaderProgramGlobeRobinson);

    applyShaderSettingsRadar();
}

function enterConstellationName(event) {
    event.target.style.fontSize = "150%";
    event.target.innerHTML = event.target.getAttribute("fullName");
}

function leaveConstellationName(event) {
    event.target.style.fontSize = "100%";
    event.target.innerHTML = event.target.getAttribute("abbr");
}

function addConstellationListeners(constellations, index) {
    var label = constellations.children[index];

    label.addEventListener("mouseover", enterConstellationName);
    label.addEventListener("mouseout", leaveConstellationName);
}

function setConstellationLabels() {
    //
    // set the radar and constellation label settings...
    //

    var radarLabels = document.getElementById("radarLabels");

    if (radarLabels) {
        var length = radarLabels.children.length;

        for (var i=0; i<length; i++) {
            var label = radarLabels.children[i];

            if (label) {
                label.style.transform = "translate(" + label.getAttribute("xOffset") + "%, " + label.getAttribute("yOffset") + "%)";
            }
        }
    }

    var constellations = document.getElementById("constellationLabels");

    if (constellations) {
        for (var i=0; i<constellations.children.length; i++) {
            var label = constellations.children[i];

            if (label) {
                label.innerHTML = label.getAttribute("abbr");
            }

            addConstellationListeners(constellations, i);
        }
    }
}

function initiateGoogleMap() {
    if (google) {
        var observerPos = {lat: 180.0 * observer.tracking.latitude / Math.PI, lng: 180.0 * observer.tracking.longitude / Math.PI};
        var mapOptions = {
            center: new google.maps.LatLng(0.0, 0.0),
            zoom: 3,
            streetViewControl: false,
            mapTypeControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {      
                mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE
                ]
            }
        }

        observerMap = new google.maps.Map(document.getElementById("mapObserver"), mapOptions);
        if (observerMap) {
            document.getElementById("mapObserver").style.display = "block";
        }   

        observerMarker = new google.maps.Marker({
            position: observerPos,
            map: observerMap });

        google.maps.event.addListener(observerMap, 'click', function(event) {
            updateMarkerPositionOnClick(event.latLng);
        });

        observerMap.setOptions({draggableCursor:'crosshair'});
    }
}

function handleLoadedTexture(texture, image, shader, sampler, index) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }
    catch (e) {
        messageError(e.message);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    gl.useProgram(shader);
    gl.uniform1i(sampler, index);

    redrawScene();
}

//
// it might be tempting to create a function to remove dupicate code in the following
//  handleLoadedTexture...( ... ) functions. However, do not do this, as it will not
//  work well with minification. In particular you would have to use ["..."] notation
//  to access properties which are elsewhere accessed by . notation.
//

function handleLoadedTextureDay(image) {
    handleLoadedTexture(globeTextureDay, image, shaderProgramGlobePerspective, shaderProgramGlobePerspective.samplerUniformDay, TEXTURE_DAY);
    handleLoadedTexture(globeTextureDay, image, shaderProgramGlobeCylindrical, shaderProgramGlobeCylindrical.samplerUniformDay, TEXTURE_DAY);
    handleLoadedTexture(globeTextureDay, image, shaderProgramGlobeElliptical, shaderProgramGlobeElliptical.samplerUniformDay, TEXTURE_DAY);
    handleLoadedTexture(globeTextureDay, image, shaderProgramGlobeSinusoidal, shaderProgramGlobeSinusoidal.samplerUniformDay, TEXTURE_DAY);
    handleLoadedTexture(globeTextureDay, image, shaderProgramGlobeRobinson, shaderProgramGlobeRobinson.samplerUniformDay, TEXTURE_DAY);
}

function handleLoadedTextureNight(image) {
    handleLoadedTexture(globeTextureNight, image, shaderProgramGlobePerspective, shaderProgramGlobePerspective.samplerUniformNight, TEXTURE_NIGHT);
    handleLoadedTexture(globeTextureNight, image, shaderProgramGlobeCylindrical, shaderProgramGlobeCylindrical.samplerUniformNight, TEXTURE_NIGHT);
    handleLoadedTexture(globeTextureNight, image, shaderProgramGlobeElliptical, shaderProgramGlobeElliptical.samplerUniformNight, TEXTURE_NIGHT);
    handleLoadedTexture(globeTextureNight, image, shaderProgramGlobeSinusoidal, shaderProgramGlobeSinusoidal.samplerUniformNight, TEXTURE_NIGHT);
    handleLoadedTexture(globeTextureNight, image, shaderProgramGlobeRobinson, shaderProgramGlobeRobinson.samplerUniformNight, TEXTURE_NIGHT);
}

function handleLoadedTextureMask(image) {
    handleLoadedTexture(globeTextureMask, image, shaderProgramGlobePerspective, shaderProgramGlobePerspective.samplerUniformMask, TEXTURE_MASK);
    handleLoadedTexture(globeTextureMask, image, shaderProgramGlobeCylindrical, shaderProgramGlobeCylindrical.samplerUniformMask, TEXTURE_MASK);
    handleLoadedTexture(globeTextureMask, image, shaderProgramGlobeElliptical, shaderProgramGlobeElliptical.samplerUniformMask, TEXTURE_MASK);
    handleLoadedTexture(globeTextureMask, image, shaderProgramGlobeSinusoidal, shaderProgramGlobeSinusoidal.samplerUniformMask, TEXTURE_MASK);
    handleLoadedTexture(globeTextureMask, image, shaderProgramGlobeRobinson, shaderProgramGlobeRobinson.samplerUniformMask, TEXTURE_MASK);
}

function handleLoadedTextureBoundaries(image) {
    handleLoadedTexture(globeTextureBoundaries, image, shaderProgramGlobePerspective, shaderProgramGlobePerspective.samplerUniformBoundaries, TEXTURE_BOUNDARIES);
    handleLoadedTexture(globeTextureBoundaries, image, shaderProgramGlobeCylindrical, shaderProgramGlobeCylindrical.samplerUniformBoundaries, TEXTURE_BOUNDARIES);
    handleLoadedTexture(globeTextureBoundaries, image, shaderProgramGlobeElliptical, shaderProgramGlobeElliptical.samplerUniformBoundaries, TEXTURE_BOUNDARIES);
    handleLoadedTexture(globeTextureBoundaries, image, shaderProgramGlobeSinusoidal, shaderProgramGlobeSinusoidal.samplerUniformBoundaries, TEXTURE_BOUNDARIES);
    handleLoadedTexture(globeTextureBoundaries, image, shaderProgramGlobeRobinson, shaderProgramGlobeRobinson.samplerUniformBoundaries, TEXTURE_BOUNDARIES);
}

function initGL(canvas) {
    try {
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);

        gl = canvas.getContext("webgl", { antialias: true }) || canvas.getContext("experimental-webgl", { antialias: true });
        if (gl) {
            initShaders();
            initBuffers();
            initTexture();
            initialize();

            gl.enable(gl.DEPTH_TEST);
            gl.lineWidth(1.0);

            perspective();

            redrawScene();
        } else {
            messageError("Browser plugin unable to acquire WebGL context.");
        }
    }
    catch (e) {
        messageError("Browser plugin does not support WebGL. Check [HKEY_CURRENT_USER|HKEY_LOCAL_MACHINE]\\SOFTWARE\\Microsoft\\Internet Explorer\\MAIN\\FeatureControl\\FEATURE_BROWSER_EMULATION\\Tracker.exe=0x00002af8");
    }
}

function loadUtilities() {
    canvas = document.getElementById("canvas");

    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";

    footprintData = new Uint8Array(SIZE_OF_FLOAT * FOOTPRINTS_ARRAY_NUM_SATELLITES * FOOTPRINTS_ARRAY_NUM_ENTRIES);
   
    initGL(canvas);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    imageTextureDay = new Image();
    imageTextureDay.src = "Images/EarthDay.jpg";
    imageTextureDay.onload = function () {
        handleLoadedTextureDay(imageTextureDay);
    }

    imageTextureNight = new Image();
    imageTextureNight.src = "Images/EarthNight.jpg";
    imageTextureNight.onload = function () {
        handleLoadedTextureNight(imageTextureNight);
    }

    imageTextureMask = new Image();
    imageTextureMask.src = "Images/EarthMonochrome.bmp";
    imageTextureMask.onload = function () {
        handleLoadedTextureMask(imageTextureMask);
    }

    imageTextureBoundaries = new Image();
    imageTextureBoundaries.src = "Images/boundaries_combined_4bit.png";
    imageTextureBoundaries.onload = function () {
        handleLoadedTextureBoundaries(imageTextureBoundaries);
    }
}

function loaded() {
    var body;
    var searchFor;

    addHeaderToHeadTableSatellites();
    addHeaderToHeadTableProjection();

    document.getElementById("buttonSatellite").addEventListener("click", findSatellite);
    document.getElementById("buttonObserver").addEventListener("click", selectObserver);
    document.getElementById("buttonProjection").addEventListener("click", selectProjection);
    document.getElementById("buttonFullscreen").addEventListener("click", toggleFull);
    document.getElementById("buttonRefresh").addEventListener("click", reload);
    document.getElementById("buttonInformation").addEventListener("click", showInformation);
    document.getElementById("buttonSettings").addEventListener("click", showSettings);
    document.getElementById("imgSatelliteSettings").addEventListener("click", showSatelliteSettings);
    document.getElementById("resetSatelliteSettings").addEventListener("click", resetSatelliteSettings);
    document.getElementById("doneSatelliteSettings").addEventListener("click", applyAndHideSatelliteSettings);
    document.getElementById("setDefaultSatelliteSettings").addEventListener("click", setDefaultSatelliteSettings);
    document.getElementById("selectAllNone").addEventListener("click", selectAllNone);

    document.getElementById("divSatellitesBody").addEventListener("scroll", scrollSatellitesBody);

    document.getElementById("searchInputEntry").addEventListener("keypress", searchForSatellites);

    document.getElementById("imgObserverSettings").addEventListener("click", showObserverSettings);
    document.getElementById("resetObserverSettings").addEventListener("click", resetObserverSettings);
    document.getElementById("doneObserverSettings").addEventListener("click", applyAndHideObserverSettings);
    document.getElementById("resetObserverPositionSettings").addEventListener("click", resetObserverPositionSettings);
    document.getElementById("applyObserverPositionSettings").addEventListener("click", applyObserverPositionSettings);
    document.getElementById("useDeviceLocation").addEventListener("click", useDeviceLocation);

    document.getElementById("addDay").addEventListener("mousedown", addDay);
    document.getElementById("addDay").addEventListener("mouseup", cancelInterval);
    document.getElementById("addDay").addEventListener("mouseleave", cancelInterval);
    document.getElementById("addHour").addEventListener("mousedown", addHour);
    document.getElementById("addHour").addEventListener("mouseup", cancelInterval);
    document.getElementById("addHour").addEventListener("mouseleave", cancelInterval);
    document.getElementById("addMinute").addEventListener("mousedown", addMinute);
    document.getElementById("addMinute").addEventListener("mouseup", cancelInterval);
    document.getElementById("addMinute").addEventListener("mouseleave", cancelInterval);
    document.getElementById("dateandtimeplay").addEventListener("click", play);
    document.getElementById("dateandtimezero").addEventListener("click", zero);

    document.getElementById("subtractDay").addEventListener("mousedown", subtractDay);
    document.getElementById("subtractDay").addEventListener("mouseup", cancelInterval);
    document.getElementById("subtractDay").addEventListener("mouseleave", cancelInterval);
    document.getElementById("subtractHour").addEventListener("mousedown", subtractHour);
    document.getElementById("subtractHour").addEventListener("mouseup", cancelInterval);
    document.getElementById("subtractHour").addEventListener("mouseleave", cancelInterval);
    document.getElementById("subtractMinute").addEventListener("mousedown", subtractMinute);
    document.getElementById("subtractMinute").addEventListener("mouseup", cancelInterval);
    document.getElementById("subtractMinute").addEventListener("mouseleave", cancelInterval);

    //
    // add change event listeners. These were originally in the html
    //  file, but we've moved them here to better handle minification...
    //

    document.getElementById("satelliteLabel").addEventListener("change", changeSatelliteLabel);
    document.getElementById("satelliteLabelBackground").addEventListener("change", changeSatelliteBackgroundFill);
    document.getElementById("satelliteShade").addEventListener("change", changeSatelliteFootprintShade);
    document.getElementById("satelliteOutline").addEventListener("change", changeSatelliteFootprintOutline);
    document.getElementById("satelliteTrackUnits").addEventListener("change", changeSatelliteTrackUnits);
    document.getElementById("satelliteTrackStyle").addEventListener("change", changeSatelliteTrackStyle);
    document.getElementById("colorBackground").addEventListener("change", changeSettingBackgroundColor);
    document.getElementById("displayEarth").addEventListener("change", changeSettingDisplayEarth);
    document.getElementById("displayImage").addEventListener("change", changeSettingDisplayImage);
    document.getElementById("displayDayNight").addEventListener("change", changeSettingDisplayDayNight);
    document.getElementById("colorDay").addEventListener("change", changeSettingColorDay);
    document.getElementById("colorNight").addEventListener("change", changeSettingColorNight);
    document.getElementById("displayTerminator").addEventListener("change", changeSettingDisplayTerminator);
    document.getElementById("colorTerminator").addEventListener("change", changeSettingColorTerminator);
    document.getElementById("alphaTerminator").addEventListener("change", changeSettingColorTerminator);
    document.getElementById("displayLatLongGrid").addEventListener("change", changeSettingDisplayLatLongGrid);
    document.getElementById("colorLatLongGrid").addEventListener("change", changeSettingColorLatLongGrid);
    document.getElementById("alphaLatLongGrid").addEventListener("change", changeSettingColorLatLongGrid);
    document.getElementById("displayBoundaries").addEventListener("change", changeSettingDisplayBoundaries);
    document.getElementById("colorBoundaries").addEventListener("change", changeSettingColorBoundaries);
    document.getElementById("alphaBoundaries").addEventListener("change", changeSettingColorBoundaries);
    document.getElementById("displayBoundariesCoastline").addEventListener("change", changeSettingDisplayBoundariesCoastline);
    document.getElementById("displayBoundariesInternal").addEventListener("change", changeSettingDisplayBoundariesInternal);
    document.getElementById("displayFillLand").addEventListener("change", changeSettingDisplayLand);
    document.getElementById("colorLand").addEventListener("change", changeSettingColorLand);
    document.getElementById("alphaFillLand").addEventListener("change", changeSettingColorLand);
    document.getElementById("displayFillSeas").addEventListener("change", changeSettingDisplaySeas);
    document.getElementById("colorSeas").addEventListener("change", changeSettingColorSeas);
    document.getElementById("alphaFillSeas").addEventListener("change", changeSettingColorSeas);
    document.getElementById("displayStars").addEventListener("change", changeSettingRadarDisplayStars);
    document.getElementById("colorStars").addEventListener("change", changeSettingRadarColorStars);
    document.getElementById("limitingMagnitude").addEventListener("change", changeSettingRadarLimitingMagnitude);
    document.getElementById("displayConstellations").addEventListener("change", changeSettingRadarDisplayConstellations);
    document.getElementById("colorConstellations").addEventListener("change", changeSettingRadarColorConstellations);
    document.getElementById("includeConstellationBoundaries").addEventListener("change", changeSettingRadarDisplayConstellationBoundaries);
    document.getElementById("colorConstellationBoundaries").addEventListener("change", changeSettingRadarColorConstellationBoundaries);
    document.getElementById("includeConstellationNames").addEventListener("change", changeSettingRadarDisplayConstellationNames);
    document.getElementById("colorConstellationNames").addEventListener("change", changeSettingRadarColorConstellationNames);
    document.getElementById("displayAzElGrid").addEventListener("change", changeSettingRadarDisplayAzElGrid);
    document.getElementById("colorAzElGrid").addEventListener("change", changeSettingRadarColorAzElGrid);
    document.getElementById("displayRADecGrid").addEventListener("change", changeSettingRadarDisplayRADecGrid);
    document.getElementById("colorRADecGrid").addEventListener("change", changeSettingRadarColorRADecGrid);
    document.getElementById("displayCentralPosition").addEventListener("change", changeSettingRadarDisplayCentralPosition);
    document.getElementById("colorCentralPosition").addEventListener("change", changeSettingRadarColorCentralPosition);
    document.getElementById("timeZoneUTC").addEventListener("change", changeTimeZoneUTC);
    document.getElementById("refractionCorrection").addEventListener("change", changeRefractionCorrection);

    document.getElementById("colorSatellite").addEventListener("input", changeSatelliteColor);
    document.getElementById("colorSatelliteLabelBackground").addEventListener("input", changeSatelliteBackgroundColor);
    document.getElementById("satelliteFootprintAlpha").addEventListener("input", changeSatelliteFootprintAlpha);
    document.getElementById("satelliteOutlineAngles").addEventListener("input", changeSatelliteFootprintAngles);
    document.getElementById("satelliteTrackForwardCount").addEventListener("input", changeSatelliteTrackForwardCount);
    document.getElementById("satelliteTrackBackwardCount").addEventListener("input", changeSatelliteTrackBackwardCount);
    document.getElementById("colorObserver").addEventListener("input", changeObserverColor);
    document.getElementById("colorObserverLabelBackground").addEventListener("input", changeObserverBackgroundColor);

    document.getElementById("alphaTerminator").addEventListener("input", function() {document.getElementById("alphaTerminatorValue").value = document.getElementById("alphaTerminator").value});
    document.getElementById("alphaLatLongGrid").addEventListener("input", function() {document.getElementById("alphaLatLongGridValue").value = document.getElementById("alphaLatLongGrid").value});
    document.getElementById("alphaBoundaries").addEventListener("input", function() {document.getElementById("alphaBoundariesValue").value = document.getElementById("alphaBoundaries").value});
    document.getElementById("alphaFillLand").addEventListener("input", function() {document.getElementById("alphaFillLandValue").value = document.getElementById("alphaFillLand").value});
    document.getElementById("alphaFillSeas").addEventListener("input", function() {document.getElementById("alphaFillSeasValue").value = document.getElementById("alphaFillSeas").value});
    document.getElementById("limitingMagnitude").addEventListener("input", function() {document.getElementById("limitingMagnitudeValue").value = document.getElementById("limitingMagnitude").value});

    searchFor = document.getElementById("searchFor");
    if (searchFor) {
        var entries = [COLUMNS.NAME, COLUMNS.NORAD, COLUMNS.INTERNATIONAL_DESIGNATOR];

        for (var index = 0; index < entries.length; index++) {
            var option = document.createElement("option");

            option.setAttribute("value", headersSatellite[entries[index]].html);
            option.innerHTML = headersSatellite[entries[index]].html;

            if (entries[index] === COLUMNS.NAME) {
                option.selected = true;
            }

            searchFor.appendChild(option);
        }
    }

    document.addEventListener("webkitfullscreenchange", fullScreenToggled);
    document.addEventListener("mozfullscreenchange", fullScreenToggled);
    document.addEventListener("fullscreenchange", fullScreenToggled);

    for (var index = 0; index < projections.length; index++) {
        document.getElementById(projections[index]).addEventListener("click", projectionSwitch);
    }

    switchedProjection();

    loadSatellites();
    loadUtilities();

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("pointerdown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("pointerup", handleMouseUp);
    document.addEventListener("mousewheel", handleMouseWheel, {passive: true});
    document.addEventListener("keydown", handleKeyDown);

    applyInitialUISettings();

    //
    // handle changes to the satellite settings...
    //

    for (var i=0; i<symbols.length; i++) {
        document.getElementById(symbols[i]).addEventListener("click", setSatelliteSymbolEvent);
        document.getElementById(symbols[i] + "Observer").addEventListener("click", setObserverSymbolEvent);
    }
    
    //
    // now that we have created the observer we can set the initial position...
    //
    
    setObserverPosition(0.0, 0.0, 0.0);
   
    setConstellationLabels();
    updateCenterLabelPosition();
    changeSettingRadarColorCentralPosition();

    applyShaderSettings();

    updateCentralPosition(false);
    setObserverPositionInShaders();

    initiateGoogleMap();

    resized();

    updateFromTimer();

    timer = setInterval(updateFromTimer, updatePeriodMS);
}

function centerSettings(id, frameOuter) {
    var divSettings = document.getElementById(id);

    if (divSettings) {
        var left;
        var top;

        left = Math.max( 0, (frameOuter.getBoundingClientRect().width - divSettings.getBoundingClientRect().width) / 2 );
        top = Math.max( 0, (frameOuter.getBoundingClientRect().height - divSettings.getBoundingClientRect().height) / 2 );
        
        Object.assign(divSettings.style, {left: left + "px", top: top + "px"});
    }
}

function setTextualViewTableHeight() {
    var divTableTextualOuter = document.getElementById("divTableTextualOuter");

    //
    // if the textual view is not on display then cannot get the size of the various elements...
    //

    if (divTableTextualOuter && divTableTextualOuter.style.display != "none") {
        var tableHeadTextual = document.getElementById("tableHeadTextual");

        if (tableHeadTextual) {
            var divTableBodyTextual = document.getElementById("divTableBodyTextual");

            if (divTableBodyTextual) {
                var divTableTextual = document.getElementById("divTableTextual");

                if (divTableTextual) {
                    var height = divTableTextualOuter.getBoundingClientRect().height;
                    var style = window.getComputedStyle(divTableTextualOuter);

                    height -= parseInt(style.paddingTop, 10);
                    height -= parseInt(style.paddingBottom, 10);
                    height -= 2 * parseInt(window.getComputedStyle(divTableTextual).getPropertyValue("border-width"), 10);
                    height -= tableHeadTextual.getBoundingClientRect().height;

                    divTableBodyTextual.style.height = height + "px";
                }
            }
        }
    }
}

function alignButton(alignOn, toAlign) {
    var rect;

    rect = document.getElementById(alignOn).getBoundingClientRect();

    document.getElementById(toAlign).style.left = rect.left + "px";
    document.getElementById(toAlign).style.width = rect.width + "px";
}

function resized() {
    var categorySatellites = document.getElementById("categorySatellites");
    var tableHeadSatellites = document.getElementById("tableHeadSatellites");
    var divBodySatellites = document.getElementById("divSatellitesBody");
    var frameLeft = document.getElementById("frameleft");
    var frameRight = document.getElementById("frameright");
    var frameTable = document.getElementById("frametable");
 //   var frameInner = document.getElementById("frameinner");
    var frameOuter = document.getElementById("frameouter");
    var results = document.getElementById("results");
    var height;
    
    setColumnWidths("tableHeadSatellites", "tableBodySatellites");
    setColumnWidths("tableHeadTextual", "tableBodyTextual");

    //
    // note that in general we need to explicitly set the height of the 
    //  potentially scrolling lists and tables else the scrolling will 
    //  not work properly...
    //
           
//    height = frameInner.getBoundingClientRect().bottom - frameInner.getBoundingClientRect().top - parseInt(window.getComputedStyle(frameInner).paddingTop, 10) - parseInt(window.getComputedStyle(frameInner).paddingBottom, 10);
   
    //
    // set the heights of the various elements in the satellite settings...
    //   

    height = frameLeft.getBoundingClientRect().bottom;
    height -= categorySatellites.getBoundingClientRect().top;
    height -= parseInt(window.getComputedStyle(categorySatellites).marginBottom, 10);
    categorySatellites.style.height = height + "px";

    height = frameRight.getBoundingClientRect().bottom - results.getBoundingClientRect().bottom;
    frameTable.style.height = height + "px";

    height = frameTable.getBoundingClientRect().bottom - tableHeadSatellites.getBoundingClientRect().bottom;
    if (window.getComputedStyle(frameTable).borderBottom) {
        height -= parseInt(window.getComputedStyle(frameTable).borderBottom, 10);
    }

    divBodySatellites.style.height = height + "px";

    //
    // set the height of the google map and reset the center location...
    //

    if (observerMap) {
        var divSelectObserver = document.getElementById("itemSelectObserver");
        var divSelectObserverInner = document.getElementById("itemSelectObserverInner");
        var center = observerMap.getCenter();
        var map = document.getElementById("mapObserver");

        height = divSelectObserver.getBoundingClientRect().bottom - divSelectObserver.getBoundingClientRect().top;
     //   height -= parseInt(window.getComputedStyle(divSelectObserverInner).paddingBottom, 10);
     //   height -= parseInt(window.getComputedStyle(divSelectObserverInner).paddingTop, 10);
        height -= map.getBoundingClientRect().top;

        if (height < 200) {
            height = 200;
        }

        map.style.height = Math.floor(height) + "px";

        setTimeout(function() {
            observerMap.setCenter(center);
        }, 5);
    }

    setTextualViewTableHeight();
    
    centerSettings("divSatelliteSettings", frameOuter);
    centerSettings("divObserverSettings", frameOuter);

    //
    // handle resizing the radar view...
    //

    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
        perspective();
        updateCenterLabelPosition();
        updateConstellationLabels();
    }

    //
    // handle the add and subtract buttons...
    //

    alignButton("dateandtimeday", "subtractDay");
    alignButton("dateandtimehour", "subtractHour");
    alignButton("dateandtimeminute", "subtractMinute");
    alignButton("dateandtimeday", "addDay");
    alignButton("dateandtimehour", "addHour");
    alignButton("dateandtimeminute", "addMinute");

    perspective();

    redrawScene();
}

function changeObserverColor() {
    document.getElementById("colorObserver").style.backgroundColor = document.getElementById("colorObserver").value;
}

function changeObserverBackgroundColor() {
    document.getElementById("colorObserverLabelBackground").style.backgroundColor = document.getElementById("colorObserverLabelBackground").value;
}

function initShaderGlobeCommon(shaderProgramGlobe) {
    shaderProgramGlobe.vertexPositionAttribute = gl.getAttribLocation(shaderProgramGlobe, "aVertexPosition");
    shaderProgramGlobe.textureCoordAttribute = gl.getAttribLocation(shaderProgramGlobe, "aTextureCoord");
    shaderProgramGlobe.samplerUniformDay = gl.getUniformLocation(shaderProgramGlobe, "uSamplerDay");
    shaderProgramGlobe.samplerUniformNight = gl.getUniformLocation(shaderProgramGlobe, "uSamplerNight");
    shaderProgramGlobe.samplerUniformMask = gl.getUniformLocation(shaderProgramGlobe, "uSamplerMask");
    shaderProgramGlobe.samplerUniformBoundaries = gl.getUniformLocation(shaderProgramGlobe, "uSamplerBoundaries");
    shaderProgramGlobe.samplerUniformFootprints = gl.getUniformLocation(shaderProgramGlobe, "uSamplerFootprints");
    shaderProgramGlobe.solarLongitude = gl.getUniformLocation(shaderProgramGlobe, "uSolarLongitude");
    shaderProgramGlobe.solarLatitude = gl.getUniformLocation(shaderProgramGlobe, "uSolarLatitude");
    shaderProgramGlobe.lineWidth = gl.getUniformLocation(shaderProgramGlobe, "uLineWidth");
    shaderProgramGlobe.numSatellites = gl.getUniformLocation(shaderProgramGlobe, "uNumSatellites");
    
    //
    // the following are all user definable quantities, and we need to access 
    //  them as strings in order to efficiently modify them in the script...
    //

    shaderProgramGlobe["colorSeas"] = gl.getUniformLocation(shaderProgramGlobe, "uColorSeas");
    shaderProgramGlobe["colorLand"] = gl.getUniformLocation(shaderProgramGlobe, "uColorLand");
    shaderProgramGlobe["colorLongitudeLatitudeGrid"] = gl.getUniformLocation(shaderProgramGlobe, "uColorLongitudeLatitudeGrid");
    shaderProgramGlobe["colorTerminator"] = gl.getUniformLocation(shaderProgramGlobe, "uColorTerminator");
    shaderProgramGlobe["colorBoundaries"] = gl.getUniformLocation(shaderProgramGlobe, "uColorBoundaries");
    shaderProgramGlobe["bUseSatelliteImage"] = gl.getUniformLocation(shaderProgramGlobe, "bUseSatelliteImage");
    shaderProgramGlobe["bFillLand"] = gl.getUniformLocation(shaderProgramGlobe, "bFillLand");
    shaderProgramGlobe["bFillSeas"] = gl.getUniformLocation(shaderProgramGlobe, "bFillSeas");
    shaderProgramGlobe["colorDay"] = gl.getUniformLocation(shaderProgramGlobe, "uColorDay");
    shaderProgramGlobe["colorNight"] = gl.getUniformLocation(shaderProgramGlobe, "uColorNight");
    shaderProgramGlobe["bDisplayDayNight"] = gl.getUniformLocation(shaderProgramGlobe, "bDisplayDayNight");
    shaderProgramGlobe["bDisplayLongitudeLatitudeGrid"] = gl.getUniformLocation(shaderProgramGlobe, "bDisplayLongitudeLatitudeGrid");
    shaderProgramGlobe["bDisplayTerminator"] = gl.getUniformLocation(shaderProgramGlobe, "bDisplayTerminator");
    shaderProgramGlobe["bDisplayBoundaries"] = gl.getUniformLocation(shaderProgramGlobe, "bDisplayBoundaries");
    shaderProgramGlobe["bDisplayBoundariesCoastlines"] = gl.getUniformLocation(shaderProgramGlobe, "bDisplayBoundariesCoastlines");
    shaderProgramGlobe["bDisplayBoundariesInternal"] = gl.getUniformLocation(shaderProgramGlobe, "bDisplayBoundariesInternal");
}

function initShaderProjection(shaderProgram, fs, vs) {
    if (shaderProgram) {
        var fragmentShaderGlobe = getShader(gl, fs);
        var vertexShaderGlobe = getShader(gl, vs);

        gl.attachShader(shaderProgram, vertexShaderGlobe);
        gl.attachShader(shaderProgram, fragmentShaderGlobe);
        gl.linkProgram(shaderProgram);
        if (gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            initShaderGlobeCommon(shaderProgram);
            shaderProgram.centralLongitude = gl.getUniformLocation(shaderProgram, "uCentralLongitude");
            shaderProgram.lineWidthS = gl.getUniformLocation(shaderProgram, "uLineWidthS");
            shaderProgram.lineWidthT = gl.getUniformLocation(shaderProgram, "uLineWidthT");
        }
    }
}

function initShaderGlobe() {
    shaderProgramGlobePerspective = gl.createProgram();
    if (shaderProgramGlobePerspective) {
        var fragmentShaderGlobe = getShader(gl, "shader-fs-globe-perspective");
        var vertexShaderGlobe = getShader(gl, "shader-vs-globe-perspective");

        gl.attachShader(shaderProgramGlobePerspective, vertexShaderGlobe);
        gl.attachShader(shaderProgramGlobePerspective, fragmentShaderGlobe);
        gl.linkProgram(shaderProgramGlobePerspective);
        if (gl.getProgramParameter(shaderProgramGlobePerspective, gl.LINK_STATUS)) {
            initShaderGlobeCommon(shaderProgramGlobePerspective);
            shaderProgramGlobePerspective.pMatrixUniform = gl.getUniformLocation(shaderProgramGlobePerspective, "uPMatrix");
            shaderProgramGlobePerspective.mvMatrixUniform = gl.getUniformLocation(shaderProgramGlobePerspective, "uMVMatrix");
        }
    }

    shaderProgramGlobeCylindrical = gl.createProgram();
    initShaderProjection(shaderProgramGlobeCylindrical, "shader-fs-globe-cylindrical", "shader-vs-globe-cylindrical");

    shaderProgramGlobeElliptical = gl.createProgram();    
    initShaderProjection(shaderProgramGlobeElliptical, "shader-fs-globe-elliptical", "shader-vs-globe-elliptical");

    shaderProgramGlobeSinusoidal = gl.createProgram();
    initShaderProjection(shaderProgramGlobeSinusoidal, "shader-fs-globe-sinusoidal", "shader-vs-globe-sinusoidal");

    shaderProgramGlobeRobinson = gl.createProgram();
    initShaderProjection(shaderProgramGlobeRobinson, "shader-fs-globe-robinson", "shader-vs-globe-robinson");
}

function initShaders() {
    initShaderSymbol();
    initShaderGlobe();
    initShaderTrack();
    initShaderXY();
    initShaderRADec();
    initShaderStars();
}

function deleteSatellite(identifier) {
    var satellite;

    satellite = jsonSatellites["S" + identifier];

    if (satellite) {
        try {
            document.getElementById("labelContainer").removeChild( document.getElementById( satellite.elementShape ) );
        } catch(err) {

        }
               
        try {
            document.getElementById("labelContainer").removeChild( document.getElementById( satellite.element ) );
        } catch(err) {

        }

        try {
            document.getElementById("tableBodyTextualBody").removeChild(satellite.tracking.rowLabel);  
        } catch(err) {

        }
          
        //
        // remove all the tracking information...
        //

        delete satellite.tracking;

        //
        // uncheck the satellite in the Results satellite list, if it is present...
        //

        var row = document.getElementById(identifier);

        if (row) {
            var checkbox = row.firstChild.firstChild;

            if (checkbox) {
                checkbox.checked = false;

                setSelectedSatellitesAllNone();
            }
        }

        //
        // reset the object centered on if necessary...
        //

        if (satellite === objectCenter) {
            objectCenter = null;
        }

        //
        // reset the object being reported on if necessary...
        //
        
        if (satellite === objectReport) {
            objectReport = null;

            updateObjectReport();
        }
    }
}

function deleteObjectReport() {
    if (objectReport) {
        try {
            var id = objectReport.id;

            removeDisplayedSatellite(objectReport.id);
            
            //
            // we update the scene, but set updateFootprintsOnly to true,
            //  so we don't incur the penalty of updating all the satellites...
            //

            updateScene(true);
        } catch (error) {
            
        }
    }
}

function updateSatellite(satellite, identifier, index) {
    var retVal = false;

    try {
        var timeBase = (jdNow - satellite.tracking.satrec.jdsatepoch) * 60.0 * 24.0;
        var timeBaseStep = Math.floor((timeBase - satellite.tracking.trackBackwardMinutes) / satellite.tracking.timeStep) * satellite.tracking.timeStep;
        var dataPrevNext = [];
        var data = [];
        var time;
        var step;

        satellite.tracking.pos = satellitePosition(satellite, timeBase);
        if (satellite.tracking.pos) {
            fromCartesianECEF(satellite.tracking, satellite.tracking.pos);

            satellite.tracking.azel = satelliteAzElDegrees(satellite, observer);
            satellite.tracking.range = satelliteRangeAndRangeRate(satellite, observer);
            satellite.tracking.eclipse = eclipseState(satellite);

            while (satellite.tracking.longitude < 0.0) {
                satellite.tracking.longitude += 2.0 * Math.PI;
            }

            //
            // the satellite track array is arranged as follows:
            //
            //  1: loop value (contains a copy of the last value in the following circular buffer)
            //  satellite.tracking.trackBackwardSteps + satellite.tracking.trackForwardSteps + 1: a circular buffer, 
            //                  with the start point indicated by satellite.tracking.circularBufferIndexStart 
            //  3: satellite position at current time rounded down to nearest satellite.timeStep
            //     satellite position at current time
            //     satellite position at current time rounded up to nearest satellite.timeStep
            //

            if (satellite.tracking.recalculate || timeBase < satellite.tracking.timeBase ||
                timeBaseStep >= satellite.tracking.timeBaseStep + (satellite.tracking.trackStepsActual * satellite.tracking.timeStep)) {
                var posPrev = [];
                var posNext = [];

                //
                // recalculate all of the satellite track, as the
                //  tle has changed, the length of forward or backward
                //  track has been modified, or the satellite track
                //  needs to be completely recalculated...
                //

                satellite.tracking.recalculate = false;
                satellite.tracking.timeBase = timeBase;
                satellite.tracking.timeBaseStep = timeBaseStep;
                satellite.tracking.trackStepsMaximum = Math.ceil((satellite.tracking.trackForwardMinutes + satellite.tracking.trackBackwardMinutes) / satellite.tracking.timeStep);
                satellite.tracking.trackStepsActual = Math.floor((timeBase - timeBaseStep + satellite.tracking.trackForwardMinutes) / satellite.tracking.timeStep);
                satellite.tracking.trackStepIndexCurrent = Math.floor((timeBase - timeBaseStep) / satellite.tracking.timeStep);
                satellite.tracking.stepBack = 1;

                if (satellite.tracking.trackStepsMaximum > 0) {
                    //
                    // this is the loop value, which simply replicates the last value in the circular buffer...
                    //

                    posNext = addToSatelliteTrack(data, satellite, timeBase + satellite.tracking.trackForwardMinutes, true);
                    if (posNext) {
                        addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, true);
                    
                        //
                        // this is the first value of the satellite track:
                        //  the current time minus the length of the backward track...
                        //

                        posNext = addToSatelliteTrack(data, satellite, timeBase - satellite.tracking.trackBackwardMinutes, true);
                        if (posNext) {
                            addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, false);

                            //
                            // these are the other values of the satellite track...
                            //

                            for (step = 0; step < satellite.tracking.trackStepsActual; step++) {
                                posPrev = posNext;
                                posNext = addToSatelliteTrack(data, satellite, satellite.tracking.timeBaseStep + ((step + 1) * satellite.tracking.timeStep), true);

                                if (posNext) {
                                    addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, false);
                                    addToSatelliteTrackPos(dataPrevNext, posPrev.pos, posPrev.latitude, false);
                                } else {
                                    break;
                                }
                            }

                            //
                            // this is the last value of the satellite track:
                            //  the current time plus the length of the forward track...
                            //

                            if (posNext) {
                                posPrev = posNext;
                                posNext = addToSatelliteTrack(data, satellite, timeBase + satellite.tracking.trackForwardMinutes, true);

                                if (posNext) {
                                    addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, false);
                                    addToSatelliteTrackPos(dataPrevNext, posPrev.pos, posPrev.latitude, false);
                                    addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, false);

                                    if (satellite.tracking.trackStepsActual < satellite.tracking.trackStepsMaximum) {
                                        //
                                        // if the track doesn't span trackStepsMaximum gridded times 
                                        //  then we throw in a placeholder...
                                        //

                                        posNext = addToSatelliteTrack(data, satellite, timeBase + satellite.tracking.trackForwardMinutes, true);
                                        addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, true);

                                        satellite.tracking.stepBack = 2;
                                    }
                                }
                            }
                        }
                    }
                }

                addToSatelliteTrackCurrentPosition(data, dataPrevNext, satellite);

                gl.bindBuffer(gl.ARRAY_BUFFER, satellite.tracking.track);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);

                gl.bindBuffer(gl.ARRAY_BUFFER, satellite.tracking.trackPrevNext);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataPrevNext), gl.DYNAMIC_DRAW);

                gl.bindBuffer(gl.ARRAY_BUFFER, null);

                satellite.tracking.recalculate = false;
                satellite.tracking.track.numItems = data.length / satellite.tracking.track.itemSize;
                satellite.tracking.circularBufferIndexStart = 1;
            } else {
                var stepFirstChange = Math.floor((timeBase - satellite.tracking.trackBackwardMinutes) / satellite.tracking.timeStep) - Math.floor((satellite.tracking.timeBase - satellite.tracking.trackBackwardMinutes) / satellite.tracking.timeStep);
                var stepLastChange = Math.floor((timeBase + satellite.tracking.trackForwardMinutes) / satellite.tracking.timeStep) - Math.floor((satellite.tracking.timeBase + satellite.tracking.trackForwardMinutes) / satellite.tracking.timeStep);
                var trackStepsActual = Math.floor((timeBase - timeBaseStep + satellite.tracking.trackForwardMinutes) / satellite.tracking.timeStep);
                var posPrev = [];
                var posNext = [];
                var dummy = [];
                var stepBack = 1;

                satellite.tracking.trackStepIndexCurrent = Math.floor((timeBase - timeBaseStep) / satellite.tracking.timeStep);

                if (satellite.tracking.trackStepsMaximum > 0) {
                    if (satellite.tracking.timeBaseStep + (satellite.tracking.trackStepsActual * satellite.tracking.timeStep) > timeBase) {
                        posNext = addToSatelliteTrack(dummy, satellite, satellite.tracking.timeBaseStep + (satellite.tracking.trackStepsActual * satellite.tracking.timeStep), false);
                    } else {
                        posNext = addToSatelliteTrack(dummy, satellite, timeBase, false);
                    }

                    //
                    // these are the other values of the satellite track, which are necessary because the value of 
                    //  Math.floor((timeBase + satellite.tracking.trackForwardMinutes) / satellite.tracking.timeStep) has increased...
                    //

                    if (posNext) {
                        for (step = 0; step < stepLastChange; step++) {
                            posPrev = posNext;
                            posNext = addToSatelliteTrack(data, satellite, satellite.tracking.timeBaseStep + ((satellite.tracking.trackStepsActual + step + 1) * satellite.tracking.timeStep), true);

                            if (posNext) {
                                addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, false); 
                                addToSatelliteTrackPos(dataPrevNext, posPrev.pos, posPrev.latitude, false);
                            } else {
                                break;
                            }
                        }

                        //
                        // this is the last value of the satellite track:
                        //  the current time plus the length of the forward track...
                        //

                        if (posNext) {
                            posPrev = posNext;
                            posNext = addToSatelliteTrack(data, satellite, timeBase + satellite.tracking.trackForwardMinutes, true);

                            if (posNext) {
                                addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, false);
                                addToSatelliteTrackPos(dataPrevNext, posPrev.pos, posPrev.latitude, false);
                                addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, false);

                                if (trackStepsActual < satellite.tracking.trackStepsMaximum) {
                                    //
                                    // if the track doesn't span trackStepsMaximum gridded times 
                                    //  then we throw in a placeholder...
                                    //

                                    addToSatelliteTrackPos(data, posNext.pos, posNext.latitude, true);
                                    addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, true);
                                }

                                if (satellite.tracking.trackStepsActual < satellite.tracking.trackStepsMaximum) {
                                    //
                                    // if the previous track dooesn't span trackStepsMaximum, but the updated track
                                    //  does span trackStepsMaximum then we need to increase stepBack by 1 to write
                                    //  over the previous placeholder...
                                    //

                                    stepBack += 1;
                                }

                                //
                                // this is the first value of the satellite track:
                                //  the current time minus the length of the backward track...
                                //

                                if (timeBaseStep + satellite.tracking.timeStep < timeBase) {
                                    posNext = addToSatelliteTrack(dummy, satellite, timeBaseStep + satellite.tracking.timeStep, false);
                                } else {
                                    posNext = addToSatelliteTrack(dummy, satellite, timeBase, false);
                                }

                                if (posNext) {
                                    posPrev = addToSatelliteTrack(data, satellite, timeBase - satellite.tracking.trackBackwardMinutes, true);

                                    addToSatelliteTrackPos(dataPrevNext, posPrev.pos, posPrev.latitude, false);
                                    addToSatelliteTrackPos(dataPrevNext, posNext.pos, posNext.latitude, false);

                                    //
                                    // finally we need to change the 'previous' entry for the slot following the final slot modified...
                                    //

                                    addToSatelliteTrackPos(dataPrevNext, posPrev.pos, posPrev.latitude, false);

                                    addToCircularBuffer(data, dataPrevNext, satellite, stepBack);
                                }
                            }
                        }
                    }
                }

                satellite.tracking.timeBase = timeBase;
                satellite.tracking.timeBaseStep = timeBaseStep;
                satellite.tracking.trackStepsActual = trackStepsActual;

                //
                // update the satellite position...
                //

                data.length = 0;
                dataPrevNext.length = 0;

                addToSatelliteTrackCurrentPosition(data, dataPrevNext, satellite);

                gl.bindBuffer(gl.ARRAY_BUFFER, satellite.tracking.track);
                gl.bufferSubData(gl.ARRAY_BUFFER, SIZE_OF_FLOAT * satellite.tracking.track.itemSize * (satellite.tracking.track.numItems - 6), new Float32Array(data));

                gl.bindBuffer(gl.ARRAY_BUFFER, satellite.tracking.trackPrevNext);
                gl.bufferSubData(gl.ARRAY_BUFFER, SIZE_OF_FLOAT * satellite.tracking.trackPrevNext.itemSize * (satellite.tracking.track.numItems - 6), new Float32Array(dataPrevNext));

                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }

            if (satellite.setting.trackStyle === "joined") {
                var posNormalized = vec3.create();
                var dataConnect = [];

                vec3.normalize(posNormalized, satellite.tracking.pos);
                dataConnect.push(satellite.tracking.pos[0], satellite.tracking.pos[1], satellite.tracking.pos[2], 0.0, posNormalized[0], posNormalized[1], posNormalized[2], 0.0);

                gl.bindBuffer(gl.ARRAY_BUFFER, satellite.tracking.connect);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataConnect), gl.DYNAMIC_DRAW);
            }

            retVal = true;
        } else {
            //
            // couldn't determine the satellite position, so probably best
            //  to delete it from the list of satellites being tracked...
            //

            removeDisplayedSatellite(identifier);
        }        
    } catch (error) {
        
    }

    return retVal;
}
