class TCOREActivity {
    coreFunction="";
    asset="";
    activity="";
    repairType="";
    coreFunctionSafe="";
    assetSafe="";
    activitySafe="";
    repairTypeSafe="";

    constructor(_coreFunction,_asset,_activity,_repairType) {
        this.coreFunction=_coreFunction;
        this.asset=_asset;
        this.activity=_activity;
        this.repairType=_repairType;
        this.coreFunctionSafe=TCOREActivity.makeSafe(this.coreFunction);
        this.assetSafe=TCOREActivity.makeSafe(this.asset);
        this.activitySafe=TCOREActivity.makeSafe(this.asset);
        this.repairTypeSafe=TCOREActivity.makeSafe(this.asset);
    }

    static makeSafe(val) {
        return val.replace(/[\/\-(\s)]/g,'');
    }
}

class Asset {
    type="";
    assetId="";
    logBegin=0;
    logEnd=0;
    latBegin=0;
    lngBegin=0;
    latEnd=0;
    lngEnd=0;
    state="active";

    constructor(_type,_assetId,_logBegin,_logEnd,_latBegin=0,_lngBegin=0,_latEnd=0,_lngEnd=0) {
        this.type=_type;
        this.assetId=_assetId;
        this.logBegin=_logBegin;
        this.logEnd=_logEnd;
        this.latBegin=_latBegin;
        this.lngBegin=_lngBegin;
        this.latEnd=_latEnd;
        this.lngEnd=_lngEnd;
    }
}

let map="";
let markers=null;
let entryState="";
let safety=[new TCOREActivity('Safety/Right-of-Way','Roadway (ROW)','Reconditioning Shoulders','Spot Berming'),
    new TCOREActivity('Safety/Right-of-Way','Roadway (ROW)','Reconditioning Shoulders','Shoulder Betterment'),
    new TCOREActivity('Safety/Right-of-Way','Roadway (ROW)','Reconditioning Shoulders','Long Line Berming'),
    new TCOREActivity('Safety/Right-of-Way','Roadway (ROW)','Reconditioning Shoulders','Cut and Remove'),
    new TCOREActivity('Safety/Right-of-Way','Pavement Markings','Pavement Marking','Long Line'),
    new TCOREActivity('Safety/Right-of-Way','Pavement Markings','Pavement Marking','Auxiliary'),
    new TCOREActivity('Safety/Right-of-Way','Pavement Markings','Pavement Marking','Inspection'),
    new TCOREActivity('Safety/Right-of-Way','Pavement Markings','Raised Pavement Markers','Normal')];
let drainage=[new TCOREActivity('Drainage','Drainage Structures','Repair/Replace','Masonry'),
    new TCOREActivity('Drainage','Drainage Structures','Repair/Replace','Drainage Structure Repair/Replace'),
    new TCOREActivity('Drainage','Drainage Structures','Repair/Replace','Curb and Gutter'),
    new TCOREActivity('Drainage','Drainage Structures','Cleaning','Cleaning Drainage Structures')];
let pavement=[new TCOREActivity('Pavement','Pavement','Concrete Pavement Repairs','Slab Replacement'),
    new TCOREActivity('Pavement','Pavement','Concrete Pavement Repairs','Slab Spot Repair'),
    new TCOREActivity('Pavement','Pavement','Concrete Pavement Repairs','Full Depth Repair (subbase work required)')];
let bridges=[new TCOREActivity('Bridges','Bridges','Sweeping','Normal'),
    new TCOREActivity('Bridges','Bridges','Cleaning','Normal'),
    new TCOREActivity('Bridges','Bridges','Sealing','Deck Sealing'),
    new TCOREActivity('Bridges','Bridges','Sealing','Substructure')]
let tcore=[...safety,...drainage,...pavement,...bridges];

let tcoreStructure={};

let assets=[];

function updateWODetailsCoreFunction(text) {
    $("#titleTCoreFunctionArea").text(`Core Function Area: ${text}`);
    if(Object.keys(tcoreStructure.coreFunctions[text].assets).length==1) {
        $("#titleTCoreAsset").text(`Asset: ${Object.keys(tcoreStructure.coreFunctions[text].assets)[0]}`);
        updateWODetailsAssetBoxes(text,true);
    } else {
        $("#titleTCoreAsset").text('Asset');
        updateWODetailsAssetBoxes(text,false);
    }
}

function updateWODetailsAsset(source) {
    let coreFunc=$(source).attr('coreFunc');
    let asset=$(source).attr('asset');
    if(Object.keys(tcoreStructure.coreFunctions[coreFunc].assets[asset]).length==1) {
        $("#titleTCoreActivity").text(`Activity: ${Object.keys(tcoreStructure.coreFunctions[coreFunc].assets[asset])[0]}`);
        updateWODetailsActivityBoxes(coreFunc,asset,true);
    } else {
        $("#titleTCoreActivity").text('Activity');
        updateWODetailsActivityBoxes(coreFunc,asset,false);
    }
}

function updateWODetailsActivity(text) {
    updateWODetailsActivityBoxes()
}

function updateWODetailsAssetBoxes(coreFunc,selectedItem) {
    $("#grpTCoreAsset").empty();
    for(asset in tcoreStructure.coreFunctions[coreFunc].assets) {
       let alreadyExists = $("#grpTCoreAsset #grpTCoreAssetOption"+TCOREActivity.makeSafe(coreFunc)).length>0;
       if(!alreadyExists){
           if(selectedItem) {
               $("#grpTCoreAsset").append(
                   "<label class=\"btn btn-secondary active\" style='margin: 5px;'>"+
                   "    <input name='grpTCoreAssetOption' id='grpTCoreAssetOption"+TCOREActivity.makeSafe(coreFunc)+TCOREActivity.makeSafe(asset)+"' type='radio' checked='checked' autocomplete='off' onchange='updateWODetailsAsset(this)' coreFunc='"+coreFunc+"' asset='"+asset+"'>"+asset +
                   "</label>"
               );
           } else {
               $("#grpTCoreAsset").append(
                   "<label class=\"btn btn-secondary active\" style='margin: 5px;'>"+
                   "    <input name='grpTCoreAssetOption' id='grpTCoreAssetOption"+TCOREActivity.makeSafe(coreFunc)+TCOREActivity.makeSafe(asset)+"' type='radio' autocomplete='off' onchange='updateWODetailsAsset(this)' coreFunc='"+coreFunc+"' asset='"+asset+"'>"+asset +
                   "</label>"
               );
           }
       }
    }
}

function updateWODetailsActivityBoxes(coreFunc,asset,selectedItem) {
    $("#grpTCoreActivity").empty();
    for(asset in tcoreStructure.coreFunctions[coreFunc].assets) {
       let alreadyExists = $("#grpTCoreActivity #grpTCoreActivityOption"+TCOREActivity.makeSafe(coreFunc)+TCOREActivity.makeSafe(asset)).length>0;
       if(!alreadyExists){
           if(selectedItem) {
               $("#grpTCoreActivity").append(
                   "<label class=\"btn btn-secondary active\" style='margin: 5px;'>"+
                   "    <input name='grpTCoreActivityOption' id='grpTCoreActivityOption"+TCOREActivity.makeSafe(coreFunc)+TCOREActivity.makeSafe(asset)+"' type='radio' checked='checked' autocomplete='off' onchange='updateWODetailsActivity(\""+coreFunc+"\")'>"+asset +
                   "</label>"
               );
           } else {
               $("#grpTCoreActivity").append(
                   "<label class=\"btn btn-secondary active\" style='margin: 5px;'>"+
                   "    <input name='grpTCoreActivityOption' id='grpTCoreActivityOption"+TCOREActivity.makeSafe(coreFunc)+TCOREActivity.makeSafe(asset)+"' type='radio' autocomplete='off' onchange='updateWODetailsActivity(\""+coreFunc+"\")'>"+asset +
                   "</label>"
               );
           }
       }
    }    
}

function switchScreen(link) {
    let pages=["woAssets","woDetails","woLabor","woEquip","woMaterials","woOtherContract"]
    let elemid="#"+link.id.split('_')[1];
    $(link)[0].style.fontWeight="bold";
    $(elemid)[0].style.display='';
    let page=[elemid.substring(1,elemid.length)];
    pages.filter(x=>!page.includes(x)).forEach((elem)=>{
        $("#link_"+elem)[0].style.fontWeight='normal';
        $("#"+elem)[0].style.display='none';
    });
}

function addAsset() {
    let assetModes ={};
    assetModes.roadway="linear";
    assetModes.barrier="linear";
    assetModes.culvert="point";

    switch(assetModes[$("#assetType").val()]) {
        case "linear":
            if ($("#linearID").val()==""&&$("#linearLogBegin").val()==""&&$("#linearLogEnd").val()=="") {
                $("#zoomInfoText").text("An asset ID, county log begin, and county log end are required for " +
                    "linear assets");
                return;
            }
            let asset=new Asset($("#assetType").val(),$("#linearID").val(),parseFloat($("#linearLogBegin").val()),
                parseFloat($("#linearLogEnd").val()),parseFloat($("#linearLatBegin").val()),
                parseFloat($("#linearLngBegin").val()),parseFloat($("#linearLatEnd").val()),
                parseFloat($("#linearLngEnd").val()));
            assets.push(asset);
            let idxNum=assets.length-1;
            let newrow=document.createElement('tr');
            $(newrow).attr('assetIndex',idxNum);
            let type=document.createElement('td');
            type.style.verticalAlign="middle";
            let id=document.createElement('td');
            $(type).text($("#assetType option:selected").text())
            let idText=$("#linearID").val()+`&nbsp;&nbsp;<svg onclick="editAsset(${idxNum})" class="bi bi-card-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                          <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                          <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                        </svg>&nbsp;&nbsp;<svg onclick="delAsset(${idxNum})" class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg><br/>From: ${$("#linearLogBegin").val()}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To: ${$("#linearLogEnd").val()}`;
            $(id).html(idText);
            $(type).appendTo($(newrow));
            $(id).appendTo($(newrow));
            $("#assetTableBody").append(newrow);
            break;
    }
    clearAsset();
}

function editAsset(idx) {
    console.log(`editAsset${idx}`);
    let asset=assets[idx];
    let latlng={};
    latlng.lat=asset.latBegin;
    latlng.lng=asset.lngBegin;
    delAsset(idx);
    let updateLinear=function() {
        map.removeLayer(markers);
        markers.clearLayers();
        $("#linearID").val(asset.assetId);
        $("#linearLogBegin").val(asset.logBegin);
        $("#linearLogEnd").val(asset.logEnd);
        map.panTo(latlng);
        map.setZoom(16);
        updateMapAssets();
    };
    let updatePoint=function() {

    };
    switch(asset.type) {
        case "roadway":
            updateLinear();
            let e={};
            e.latlng=latlng;
            mapClick(e,"force");
            break;
        case "culvert":
            updatePoint();
            break;
        case "barrier":
            updateLinear();
            break;
    }
}

function delAsset(idx) {
    assets[idx].state="deleted";
    $("#assetTableBody [assetIndex="+idx+"]").remove();
}

function clearAsset() {
    $("#linearID").val("");
    $("#linearLogBegin").val("");
    $("#linearLogEnd").val("");
    if ($("#assetType").val()=="roadway") {
        map.removeLayer(markers);
        markers.clearLayers();
    }
}

function assetTypeChange() {
    if($("#linearID").length>0){
        $("#linearID").val("");
        $("#linearLogBegin").val("");
        $("#linearLogEnd").val("");
    }
    map.removeLayer(markers);
    markers.clearLayers();
    updateMapAssets();
}

function updateMapAssets() {
    switch($("#assetType").val()){
        case "culvert":
            map.removeLayer(markers);
            markers.clearLayers();
            fetchCulverts();
            $("#entryContainer").empty();
            entryState="point";
            break;
        case "barrier":
            map.removeLayer(markers);
            markers.clearLayers();
            fetchBarriers();
            addLinearEntry();
            entryState="linear";
            $("#lbl_linearID").text("Barrier File Number");
            break;
        case "roadway":
            if (map.getZoom()<16) {
                $("#zoomInfoText").text("Zoom closer to more accurately choose a route.")
            } else {
                $("#zoomInfoText").text("");
            }
            addLinearEntry();
            entryState="linear";
            $("#lbl_linearID").text("NLFID");
            break;
    }
}

function addLinearEntry(){
    if(entryState!="linear"){
            $("#templinearEntry .row").each((idx,elem)=>{
            $(elem).clone().appendTo("#entryContainer");
        });
        $("#entryContainer [futureid]").each((idx,elem)=>{
            elem.id=$(elem).attr("futureid");
            $(elem).css("width","100%");
        });
    }
}

function fetchCulverts(){
    if(map.getZoom()>=12){
        $("#zoomInfoText").text("");
        let bounds=map.getBounds();
        let ne=[bounds.getNorthEast().lng,bounds.getNorthEast().lat];
        let nw=[bounds.getNorthWest().lng,bounds.getNorthWest().lat];
        let sw=[bounds.getSouthWest().lng,bounds.getSouthWest().lat];
        let se=[bounds.getSouthEast().lng,bounds.getSouthEast().lat];
        let data={};
        data.geometryType="esriGeometryPolygon";
        //data.geometry=`{"rings":[[[${ne.toString()}],[${nw.toString()}],[${sw.toString()}],[${se.toString()}]]],"spatialReference":{"wkid":4326}}`;
        geometry={};
        geometry.rings=[[ne,nw,sw,se]];
        geometry.spatialReference={wkid:4326};
        data.geometry=JSON.stringify(geometry);
        data.spatialRel="esriSpatialRelIntersects";
        data.inputSR=4326;
        data.outSR=4326;
        data.f="geojson";
        data.outFields="CULVERT_FILE_NUMBER";
        jQuery.post("https://gis.dot.state.oh.us/arcgis/rest/services/TIMS/Assets/MapServer/4/query",data,(resp)=>{
            L.geoJSON(resp.features).addTo(markers);
            markers.eachLayer((layers)=> {
                layers.eachLayer((layer)=>{
                    layer.options.title="CFN "+layer.feature.properties.CULVERT_FILE_NUMBER;
                    layer.bindPopup("CFN "+layer.feature.properties.CULVERT_FILE_NUMBER);
                });
            });
            map.addLayer(markers);
        });
    } else {
        $("#zoomInfoText").text("Zoom in closer to see culverts.");
    }
}

function fetchBarriers() {
    if(map.getZoom()>=15){
        $("#zoomInfoText").text("");
        let bounds=map.getBounds();
        let ne=[bounds.getNorthEast().lng,bounds.getNorthEast().lat];
        let nw=[bounds.getNorthWest().lng,bounds.getNorthWest().lat];
        let sw=[bounds.getSouthWest().lng,bounds.getSouthWest().lat];
        let se=[bounds.getSouthEast().lng,bounds.getSouthEast().lat];
        let data={};
        data.where="STATUS='A'"
        data.geometryType="esriGeometryPolygon";
        //data.geometry=`{"rings":[[[${ne.toString()}],[${nw.toString()}],[${sw.toString()}],[${se.toString()}]]],"spatialReference":{"wkid":4326}}`;
        geometry={};
        geometry.rings=[[ne,nw,sw,se]];
        geometry.spatialReference={wkid:4326};
        data.geometry=JSON.stringify(geometry);
        data.spatialRel="esriSpatialRelIntersects";
        data.inputSR=4326;
        data.outSR=4326;
        data.f="geojson";
        data.outFields="BARRIER_FILE_NUMBER,CTL_BEGIN_NBR,CTL_END_NBR,NLFID";
        jQuery.post("https://gis.dot.state.oh.us/arcgis/rest/services/TIMS/Assets/MapServer/15/query",data,(resp)=>{
            L.geoJSON(resp.features).addTo(markers);
            markers.eachLayer((layers)=> {
                layers.eachLayer((layer)=>{
                    layer.options.title="BFN "+layer.feature.properties.BARRIER_FILE_NUMBER;
                    layer.bindPopup("BFN "+layer.feature.properties.BARRIER_FILE_NUMBER);
                    layer.on("click",barrierClick);
                });
            });
            map.addLayer(markers);
        });
    } else {
        $("#zoomInfoText").text("Zoom in closer to see barriers.");
    }
}

function barrierClick(barrier) {
    if($("#linearID").val()==""){
        $("#linearID").val(barrier.target.feature.properties.BARRIER_FILE_NUMBER);
/*        $("#linearLogBegin").attr('min',Math.floor(barrier.target.feature.properties.CTL_BEGIN_NBR*100)/100);
        $("#linearLogBegin").attr('max',Math.ceil(barrier.target.feature.properties.CTL_END_NBR*100)/100);
        $("#linearLogEnd").attr('min',Math.floor(barrier.target.feature.properties.CTL_BEGIN_NBR*100)/100);
        $("#linearLogEnd").attr('max',Math.ceil(barrier.target.feature.properties.CTL_END_NBR*100)/100);*/
    } else {
        barrier.target.togglePopup();
        //barrier.target.unbindPopup();
        if (barrier.target.feature.properties.BARRIER_FILE_NUMBER!=$("#linearID").val()) {
            return;
        }
        LRSConnect(barrier.latlng.lat,barrier.latlng.lng,"logpoint").then((logpoint)=>{
            logpoint.latlng=barrier.latlng;
            updateLogpoints(logpoint,"barrier");
        });
    }
}

function replaceBeginLogpoint() {
    $("#linearLogBegin").val(parseFloat($("#modalLogpoint").val()));
    $("#linearLatBegin").val(parseFloat($("#modalLat").val()));
    $("#linearLngBegin").val(parseFloat($("#modalLng").val()));
    $("#chooseLogpoint").modal('hide');
}

function replaceEndLogpoint() {
    $("#linearLogEnd").val(parseFloat($("#modalLogpoint").val()));
    $("#chooseLogpoint").modal('hide');
}

async function LRSConnect(lat,lng,mode){
    if(mode=="minmax"){
        data={};
        data.x=lng
        data.y=lat;
        data.inSR=4326;
        data.tolerance=25;
        data.f="json";
        let data2a={};
        await jQuery.post("http://gis.dot.state.oh.us/arcgis/rest/services/TIMS/LRS/MapServer/exts/OdotLrsTools/CountyMeasureAtPoint",
            data,
            (resp)=> {
                data2a.routeId = resp.features[0].attributes.NLFID;
                data2a.fromMeasure = resp.features[0].attributes.MMin;
                data2a.toMeasure = resp.features[0].attributes.MMax;
                data2a.outSR = 4326;
                data2a.f = "json";
        })
        return data2a;
    } else if (mode=="logpoint") {
            data={};
            data.x=lng
            data.y=lat;
            data.inSR=4326;
            data.tolerance=25;
            data.f="json";
            let data2 = {};
            await jQuery.post("http://gis.dot.state.oh.us/arcgis/rest/services/TIMS/LRS/MapServer/exts/OdotLrsTools/CountyMeasureAtPoint",
                data,
                (resp)=> {
                    data2.routeId = resp.features[0].attributes.NLFID;
                    data2.logpoint = resp.features[0].attributes.LogPoint;
                    data2.fromMeasure = resp.features[0].attributes.MMin;
                    data2.toMeasure = resp.features[0].attributes.MMax;
            });
            return data2;
    }
}

function roadwayClick(road) {
    console.log("roadwayClick");
    //e.target.feature.properties
    let data={};
    data.x=road.latlng.lng;
    data.y=road.latlng.lat;
    data.routeId=road.layer.feature.properties.NLFID;
    data.inSR=4326;
    data.tolerance=25;
    data.f="json";
    jQuery.post("http://gis.dot.state.oh.us/arcgis/rest/services/TIMS/LRS/MapServer/exts/OdotLrsTools/CountyMeasureAtPoint",
        data,
        (resp)=> {
            road.layer.feature.properties.LogPoint=resp.features[0].attributes.LogPoint;
            updateLogpoints(road,"roadway");
    });
}

function mapClick(e,mode) {
    let roadwayupdate=async function() {
        if($("#linearID").val()==""||mode=="force"){
            markers.clearLayers();
            map.removeLayer(markers);
            let data2= await LRSConnect(e.latlng.lat,e.latlng.lng,"minmax");
            $("#linearID").val(data2.routeId);
            jQuery.post("http://gis.dot.state.oh.us/arcgis/rest/services/TIMS/LRS/MapServer/exts/OdotDynSegTools/CountyRouteBetweenMs",
                data2,
                (resp2)=>{
                    let geo_json={};
                    geo_json.type="Feature";
                    geo_json.geometry={};
                    geo_json.geometry.type="LineString";
                    geo_json.geometry.coordinates=[];
                    geo_json.properties={};
                    geo_json.properties.NLFID=resp2.features[0].attributes.NLFID;
                    geo_json.properties.LogMin=resp2.features[0].attributes.MMin;
                    geo_json.properties.LogMax=resp2.features[0].attributes.MMax;
                    $("#linearLogBegin").attr('min',Math.floor(resp2.features[0].attributes.MMin*100)/100);
                    $("#linearLogBegin").attr('max',Math.ceil(resp2.features[0].attributes.MMax*100)/100);
                    $("#linearLogEnd").attr('min',Math.floor(resp2.features[0].attributes.MMin*100)/100);
                    $("#linearLogEnd").attr('max',Math.ceil(resp2.features[0].attributes.MMax*100)/100);
                    resp2.features[0].geometry.paths.forEach((path)=>{
                        geo_json.geometry.coordinates.push(...path);
                    });
                    L.geoJSON(geo_json).addTo(markers);
                    markers.eachLayer((layer)=>{
                        layer.on("click",roadwayClick);
                    });
                    markers.addTo(map);
            });
        } else {
            //e.target.feature.properties
        }
    };
    switch($("#assetType").val()){
        case "roadway":
            roadwayupdate();
            break;
    }
}

function updateLogpoints(layer,mode) {
    let logpoint=null;
    let lat=layer.latlng.lat;
    let lng=layer.latlng.lng;
    if (mode=="roadway") {
        logpoint=layer.layer.feature.properties.LogPoint;
    } else if (mode=="barrier") {
        logpoint=layer.logpoint;
    }
    if ($("#linearLogBegin").val()==""&&$("#linearLogEnd").val()=="") {
        $("#linearLogBegin").val(Math.round(logpoint*100)/100);
        $("#linearLatBegin").val(lat);
        $("#linearLngBegin").val(lng);
    } else if ($("#linearLogBegin").val()!=""&&$("#linearLogEnd").val()=="") {
        $("#linearLogEnd").val(Math.round(logpoint*100)/100);
        $("#linearLatEnd").val(lat);
        $("#linearLngEnd").val(lng);
    } else {
        $("#modalLogpoint").val(Math.round(logpoint*100)/100);
        $("#modalLat").val(lat);
        $("#modalLng").val(lng);
        $("#chooseLogpoint").modal();
    }
}

$(document).ready(()=> {
    map=L.map('mapid').setView([40.331489,-82.350477],7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.on('moveend',updateMapAssets);
    map.on('zoomend',updateMapAssets);
    map.on('click',mapClick);
    markers=L.layerGroup();
    updateMapAssets();
    $("#bdyTCoreFunctionArea").append(
       "<div id=\"grpTCoreFunctionArea\" class=\"container btn-group-toggle\" data-toggle=\"buttons\"></div>"
    );
    $("#bdyTCoreAsset").append(
       "<div id=\"grpTCoreAsset\" class=\"container btn-group-toggle\" data-toggle=\"buttons\"></div>"
    );
    tcoreCoreFunctions=[...new Set(tcore.map(x=>x.coreFunction))];
    tcoreStructure.coreFunctions={};
    tcoreCoreFunctions.forEach((coreFunc)=> {
       let obj={};
       obj.coreFunc=coreFunc;
       let relAssets=tcore.filter(x=>x.coreFunction==coreFunc);
       //obj.assets={}
       relAssets=[...new Set(relAssets.map((z)=>z.asset))];
       obj.assets={}
       relAssets.forEach((asset,assetIndex)=>{
           obj.assets[asset]={}
           let relActivities=tcore.filter(x=>x.coreFunction==coreFunc&&x.asset==asset);
           relActivities=[...new Set(relActivities.map((z)=>z.activity))];
           obj.assets[asset].activities={}
           relActivities.forEach((activity)=>{
               obj.assets[asset].activities[activity]={};
               let relRepairs=tcore.filter(x=>x.coreFunction==coreFunc&&x.asset==asset&&x.activity==activity);
               relRepairs=[...new Set(relRepairs.map((z)=>z.repairType))];
               obj.assets[asset].activities[activity].repairs={};
               relRepairs.forEach((repair)=>{
                   obj.assets[asset].activities[activity].repairs[repair]={};
               });
           });
       });
       tcoreStructure.coreFunctions[coreFunc]=obj;
    });
    tcore.forEach((activity) => {
       let alreadyExists = $("#grpTCoreFunctionArea #grpTCoreFunctionAreaOption"+activity.coreFunctionSafe).length>0;
       if(!alreadyExists){
           $("#grpTCoreFunctionArea").append(
               "<label class=\"btn btn-secondary active\" style='margin: 5px;'>"+
               "    <input name='grpTCoreFunctionAreaOption' id='grpTCoreFunctionAreaOption"+activity.coreFunctionSafe+"' type='radio' autocomplete='off' onchange='updateWODetailsCoreFunction(\""+activity.coreFunction+"\")'>"+activity.coreFunction +
               "</label>"
           );
       }
    });
});