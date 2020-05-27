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

class Employee {
    name="";
    costcenter="";
    rate=0.0;
    
    constructor(_name,_costcenter,_rate) {
        this.name=_name;
        this.costcenter=_costcenter;
        this.rate=_rate;
    }
    
    getName() {
        return this.name + " : " + this.costcenter;
    }
}

class Equipment {
    equipDesc="";
    equipId=0;
    equipCostCenter="";
    meterType="";
    equipRate=0.0;
    
    constructor(_equipDesc, _equipId,_equipCostCenter,_meterType,_equipRate) {
        this.equipDesc=_equipDesc;
        this.equipId=_equipId;
        this.equipCostCenter=_equipCostCenter;
        this.meterType=_meterType;
        this.equipRate=_equipRate;
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

class Labor {
    lbDt="";
    employee="";
    costcenter="";
    hours=0.0;
    rate=0.0;
    callback=false;
    state="active";
    
    constructor(_lbDt="",_employee="",_costcenter="",_hours=0.0,_rate=0.0,_callback=false) {
        this.lbDt=_lbDt;
        this.employee=_employee;
        this.costcenter=_costcenter;
        this.hours=_hours;
        this.rate=_rate;
        this.callback=_callback;
    }
}

class Equip {
    equipDt="";
    equipDesc="";
    equipId=0;
    equipCostCenter="";
    meterUsage=0.0;
    meterType="";
    equipRate=0.0;
    state="active";
    
    constructor(_equipDt,_equipDesc,_equipId,_equipCostCenter,_meterUsage,_meterType,_equipRate) {
        this.equipDt=_equipDt;
        this.equipDesc=_equipDesc;
        this.equipId=_equipId;
        this.equipCostCenter=_equipCostCenter;
        this.meterUsage=_meterUsage;
        this.meterType=_meterType;
        this.equipRate=_equipRate;
    }
}

class Material {
    mtDt="";
    mtDesc="";
    mtId=0;
    mtCostCenter="";
    mtQty=0;
    mtUnits="";
    mtRate=0;
    state="active";
    
    constructor(_mtDt="",_mtDesc="",_mtId=0,_mtCostCenter="",_mtQty=0,_mtUnits="",_mtRate=0) {
        this.mtDt=_mtDt;
        this.mtDesc=_mtDesc;
        this.mtId=_mtId;
        this.mtCostCenter=_mtCostCenter;
        this.mtQty=_mtQty;
        this.mtUnits=_mtUnits;
        this.mtRate=_mtRate;
    }
}

class OtherContract {
    ocDt="";
    ocType="";
    ocDesc="";
    ocCost=0.0;
    state="active";
    
    constructor(_ocDt,_ocType,_ocDesc,_ocCost) {
        this.ocDt=_ocDt;
        this.ocType=_ocType;
        this.ocDesc=_ocDesc;
        this.ocCost=_ocCost;
    }
}

class Accomplishment {
    accAssetType="";
    accAssetIdentifier=""
    accWorkDate="";
    accAmount=0.0;
    state="active";
    
    constructor(_accAssetType="",_accAssetIdentifier="",_accWorkDate="",_accAmount=0.0) {
        this.accAssetType=_accAssetType;
        this.accAssetIdentifier=_accAssetIdentifier;
        this.accWorkDate=_accWorkDate;
        this.accAmount=_accAmount;
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

let employees=[new Employee("Matt Blankenship","D3 - RIC - CtyHq", 20.0),
    new Employee("Paul Ensinger","D4 - SUM - CtyHQ", 20.0),
    new Employee("Todd Dyckes", "D12 - CUY - Warrensville", 20.0),
    new Employee("Jim Cook", "D6 - FRA - Westerville", 20.0),
    new Employee("Michael Piolata", "CO - Fin - Inventory",20.0),
    new Employee("Ray Henry","D10 - DHQ - DistHQ",20.0),
    new Employee("Bill Welch", "CO - Ops - TrafMgmt",20.0),
    new Employee("Mike Moreland","CO - Ops - MaintAdmin", 20.0),
    new Employee("Dean Otworth","CO - Ops - DD", 20.0),
    new Employee("Josh Thieman","CO - Ops - Permits",20.0),
    new Employee("Bill Welch","D4 - STA- CtyHQ", 20.0)];

let equipment=[new Equipment("221 - PICKUP, 1/2 TON",2214100,"D4 - SUM - CtyHQ","miles",0.57),
    new Equipment("221 - PICKUP, 1/2 TON",2216100,"D6 - FRA - Westerville","miles",0.57),
    new Equipment("221 - PICKUP, 1/2 TON",2213100,"D3 - RIC - CtyHQ","miles",0.57),
    new Equipment("254 - DUMP TRUCK, S&I, SINGLE AXLE, GVWR > 26000 LB",2544000,"D4 - SUM - CtyHQ","miles",3.6),
    new Equipment("254 - DUMP TRUCK, S&I, SINGLE AXLE, GVWR > 26000 LB",2546002,"D6 - FRA - Westerville","miles",3.6),
    new Equipment("254 - DUMP TRUCK, S&I, SINGLE AXLE, GVWR > 26000 LB",2543002,"D3 - RIC - CtyHQ","miles",3.6),
    new Equipment("321 - BROOM, SELF-PROPELLED",3214000, "D4 - SUM - CtyHQ","hours",42.15),
    new Equipment("321 - BROOM, SELF-PROPELLED",3216000, "D6 - FRA - Westerville","hours",42.15),
    new Equipment("321 - BROOM, SELF-PROPELLED",3213000, "D3 - RIC - CtyHQ","hours",42.15)];

let materials=[new Material("","#42011000 - SALT",42011000,"D4 - SUM - CtyHQ",0,"tons",60),
    new Material("","#42011000 - SALT",42011000,"D6 - FRA - Westerville",0,"tons",60),
    new Material("","#42011000 - SALT",42011000,"D3 - RIC - CtyHQ",0,"tons",60),
    new Material("","#42011500 - SALT BRINE",42011500,"D4 - SUM - CtyHQ",0,"gals",.14),
    new Material("","#42011500 - SALT BRINE",42011500,"D6 - FRA - Westerville",0,"gals",.14),
    new Material("","#42011500 - SALT BRINE",42011500,"D3 - RIC - CtyHQ",0,"gals",.14)];

let tcoreStructure={};

let assets=[];
let labor=[];
let woEquip=[];
let woMaterials=[];
let woOtherContract=[];
let woAccomplishments=[];

function submitForm() {
    let data={};
    data.woDetails = {
        coreFunction: document.querySelector("input[name='grpTCoreFunctionAreaOption']:checked").getAttribute("tcoreCoreFunction"),
        asset: document.querySelector("input[name='grpTCoreAssetOption']:checked").getAttribute("tcoreAsset"),
        activity: document.querySelector("input[name='grpTCoreActivityOption']:checked").getAttribute("tcoreActivity"),
        repairType: document.querySelector("input[name='grpTCoreRepairTypeOption']:checked").getAttribute("tcoreRepair")
    };
    data.assets=assets.filter(x=>x.state==="active");
    data.labor=labor.filter(x=>x.state==="active");
    data.equip=woEquip.filter(x=>x.state==="active");
    data.materials=woMaterials.filter(x=>x.state==="active");
    data.otherContract=woOtherContract.filter(x=>x.state==="active");
    data.accomplishments=woAccomplishments.filter(x=>x.state==="active");
    data.woProject={};
    try {
        projName="";
        document.querySelector("#woProject").value.split(' - ').forEach((elem,idx)=>{
            if(idx>=2){
                projName+=elem;
            }
        });
        if(!projName){
            projName=document.querySelector("#woProject").value;
        }
        data.woProject={"projectName": projName,
            "district":document.querySelector("#woProjectDist").value,
            "county":document.querySelector("#woProjectCty").value};
    } catch { }
    jQuery.post("new",{"data":JSON.stringify(data)},(resp)=>{
        console.log(resp);
        window.location.href="/mms/index";
    });
}

function addLabor() {
    let createRow=function(_idx,_dt,_empl,_costcenter,_hours,_callback){
        let btns=`<svg onclick="editLabor(${_idx})" class="bi bi-card-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                      <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg><br/><svg onclick="delLabor(${_idx})" class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>`;
        let tr=document.createElement('tr');
        tr.setAttribute("scope","row");
        tr.setAttribute("lbIndex",_idx);
        let tdDt=document.createElement('td');
        tdDt.style.display="grid";
        tdDt.style.gridTemplateColumns="1.1em 1fr";
        tdDt.innerHTML="<div>"+btns+"</div><div style='display:flex;align-items:center;'><p style='margin-top: auto!important;; margin-bottom: auto!important;margin-left: 5px;'>"+_dt+"</p></div>";
        let tdEmpl=document.createElement('td');
        tdEmpl.innerHTML=_empl+"<br/>"+_costcenter;
        let tdHours=document.createElement('td');
        tdHours.innerHTML=_hours;
        let tdCallback = document.createElement('td');
        tdCallback.innerHTML = _callback ? "Y" : "N";
        tr.append(tdDt,tdEmpl,tdHours,tdCallback);
        document.querySelector("#bdyLabor").append(tr);
    }
    document.querySelector("#lbMessages").innerHTML="";
    let dt=$("#lbDateOfWork").val();
    let empl=$("#lbEmployee").val().split(' :')[0];
    let hours=$("#lbHours").val();
    let callback=$("#lbCallback").prop("checked");
    if ((!dt||!empl||!hours)||(!document.querySelector("#lbHours").validity.valid)) {
        let incomplete=(!dt||!empl||!hours);
        let invalidHrs=(!document.querySelector("#lbHours").validity.valid);
        if (incomplete) {
            let msg=document.createElement('p');
            msg.classList.add('zoomInfoText');
            msg.innerHTML='Please ensure Date of Work, Employee, and Hours Worked are filled in.';
            document.querySelector("#lbMessages").append(msg);
            
        }
        if (invalidHrs) {
            let msg=document.createElement('p');
            msg.classList.add('zoomInfoText');
            msg.innerHTML='Hours entry is invalid. Must be less than or equal to 24 hours and contain only 1 decimal place';
            document.querySelector("#lbMessages").append(msg);
        }
        return;
    }
    let dt2=null;
    let hours2=null;
    if($("#lbDateOfWork2").length>0){
        dt2=$("#lbDateOfWork2").val();
    }
    if ($("#lbHours2").length>0) {
        hours2=$("#lbHours2").val();
    }
    let emplObj=employees.filter(x=>x.name==empl)[0]
    let rate=emplObj.rate;
    let costcenter=emplObj=emplObj.costcenter;
    let lb1 = new Labor(dt,empl,costcenter,hours,rate,callback);
    labor.push(lb1);
    let lb1_idx=labor.length-1;
    let lb2 = null;
    let lb2_idx = null;
    if (dt2!=null&&hours2!=null) {
        lb2 = new Labor(dt2,empl,costcenter,hours2,rate,callback);
        labor.push(lb2);
        lb2_idx=labor.length-1;
    }
    createRow(lb1_idx,dt,empl,costcenter,hours,callback);
    if (lb2) {
        createRow(lb2_idx,dt2,empl,costcenter,hours2,callback);
    }
    document.querySelector("#lbDateOfWork").value='';
    document.querySelector("#lbEmployee").value='';
    document.querySelector("#lbHours").value='';
    document.querySelector("#lbCallback").checked=false;
    document.querySelector("#midnightSplitDateWorkedDay2").innerHTML="";
    document.querySelector("#midnightSplitDateWorkedDay2").style.display="none";
    document.querySelector("#midnightSplitHoursWorkedDay2").innerHTML="";
    document.querySelector("#midnightSplitHoursWorkedDay2").style.display="none";
}

function editLabor(idx) {
    let rec=labor[idx];
    document.querySelector("#lbDateOfWork").value=rec.lbDt;
    document.querySelector("#lbEmployee").value=rec.employee+' : '+rec.costcenter;
    document.querySelector("#lbHours").value=rec.hours;
    document.querySelector("#lbCallback").checked=rec.callback;
    delLabor(idx);
}

function delLabor(idx) {
    labor[idx].state="deleted";
    document.querySelector(`tr[lbIndex="${idx}"]`).remove();
}

function calcHoursCalc() {
    let createSplitDayFields = function () {
        let dateworked2labeldiv=document.createElement('div');
        dateworked2labeldiv.classList.add('col');
        let dateworked2label=document.createElement('label');
        dateworked2label.htmlFor='lbDateOfWork2';
        dateworked2label.innerHTML='Day 2 Date of Work';
        dateworked2labeldiv.append(dateworked2label);
        
        let dateworked2inputdiv=document.createElement('div');
        dateworked2inputdiv.classList.add('col','d-flex');
        let dateworked2input=document.createElement('input');
        dateworked2input.id='lbDateOfWork2';
        dateworked2input.style.width='100%';
        dateworked2input.type='date';
        dateworked2inputdiv.append(dateworked2input);
        
        let hours2labeldiv=document.createElement('div');
        hours2labeldiv.classList.add('col')
        let hours2label=document.createElement('label');
        hours2label.htmlFor='lbHours2';
        hours2label.innerHTML="Day 2 Hours Worked";
        hours2labeldiv.append(hours2label);
        
        let hours2inputdiv=document.createElement('div');
        hours2inputdiv.classList.add('col','d-flex','flex-column','justify-content-center');
        let hours2input=document.createElement('input');
        hours2input.id='lbHours2';
        hours2input.type='number';
        hours2input.step='0.1';
        hours2input.max=24;
        hours2input.min=0;
        hours2input.classList.add('hideOverflow');
        hours2inputdiv.append(hours2input);
        
        $("#midnightSplitDateWorkedDay2").append(dateworked2labeldiv);
        $("#midnightSplitDateWorkedDay2").append(dateworked2inputdiv);
        $("#midnightSplitHoursWorkedDay2").append(hours2labeldiv);
        $("#midnightSplitHoursWorkedDay2").append(hours2inputdiv);
    }
    
    let modStartDt=document.querySelector("#modalStartDate").value;
    let modStartTime=document.querySelector("#modalStartTime").value;
    let modEndDt=document.querySelector("#modalEndDate").value;
    let modEndTime=document.querySelector("#modalEndTime").value;
    let startDt=moment(modStartDt);
    let endDt=moment(modEndDt);
    let startDtTm=moment(modStartDt+"T"+modStartTime);
    let endDtTm=moment(modEndDt+"T"+modEndTime);
    if (endDt.diff(startDt,'days')<0) {
        //error
    } else if (endDt.diff(startDt,'days')==0) {
        //same day
        let hours=Math.round(endDtTm.diff(startDtTm,'minutes')/60*10)/10;
        document.querySelector("#lbHours").value=hours;
        $("#calcHours").modal('hide');
    } else if (endDt.diff(startDt,'days')>0) {
        let firstHours=Math.round(endDt.diff(startDtTm,'minutes')/60*10)/10;
        let secondHours=Math.round(endDtTm.diff(endDt,'minutes')/60*10)/10;
        document.querySelector("#lbHours").value=firstHours;
        createSplitDayFields();
        document.querySelector("#lbDateOfWork2").value=endDt.format().split('T')[0];
        document.querySelector("#lbHours2").value=secondHours;
        document.querySelector("#midnightSplitDateWorkedDay2").style.display="";
        document.querySelector("#midnightSplitHoursWorkedDay2").style.display="";
    }
    if (document.querySelector("#lbDateOfWork").value=="") {
        document.querySelector("#lbDateOfWork").value=document.querySelector("#modalStartDate").value;
    }
    document.querySelector("#modalStartDate").value="";
    document.querySelector("#modalStartTime").value="";
    document.querySelector("#modalEndDate").value="";
    document.querySelector("#modalEndTime").value="";
    $("#calcHours").modal('hide');
}

function eqSearch() {
    document.querySelector("#bdyEqSelect").innerHTML="";
    document.querySelector("#eqMessages").innerHTML="";
    let eqTypeNum=document.querySelector("#eqSelType").value;
    let eqCC=document.querySelector("#eqSelCC").value;
    let eqId=document.querySelector("#eqSelId").value;
    if (!eqTypeNum&&!eqCC&&!eqId) {
        document.querySelector("#eqMessages").innerHTML="<p class='zoomInfoText'>Must enter search criteria</p>";
    }
    let results=null;
    if (eqTypeNum) {
        if(eqTypeNum!='any') {
            results = equipment.filter(x => x.equipDesc.startsWith(eqTypeNum));
        } else {
            if(!eqId) {
                document.querySelector("#eqMessages").innerHTML="<p class='zoomInfoText'>Must choose equip type</p>";
                return;
            } else {
                //do nothing
            }
        }
    }
    if (eqCC) {
        if(eqCC=='any') {
            //do nothing
        } else {
            if(results) {
                results=results.filter(x=>x.equipCostCenter==eqCC);
            } else {
                results=equipment.filter(x=>x.equipCostCenter==eqCC);
            }
        }
    }
    if (eqId) {
        if(results) {
            results=results.filter(x=>x.equipId==parseInt(eqId));
        } else {
            results=equipment.filter(x=>x.equipId==parseInt(eqId));
        }
    }
    if (results==null) {
        document.querySelector("#eqMessages").innerHTML="<p class='zoomInfoText'>No results. Try again.</p>";
    } else {
        results.forEach((elem,idx)=> {
            let tr=document.createElement('tr');
            let tdradio=document.createElement('td');
            let radio=document.createElement('input');
            radio.type='radio';
            radio.name='eqId';
            radio.id=`eqId${idx}`;
            radio.value=elem.equipId;
            tdradio.append(radio);
            let tdequipid=document.createElement('td');
            tdequipid.innerHTML=elem.equipId;
            let tdcc=document.createElement('td');
            tdcc.innerHTML=elem.equipCostCenter;
            tr.append(tdradio,tdequipid,tdcc);
            document.querySelector("#bdyEqSelect").append(tr);
        });
        $("input[name='eqId']").change((e)=> {
            let equip=equipment.filter(x=>x.equipId==parseInt($("input[name='eqId']:checked").val()))[0];
            document.querySelector("#eqMeterLabel").innerHTML=equip.meterType;
            if(equip.meterType=="hours") {
                with(document.querySelector("#eqMeterUsage")) {
                    max=24;
                    min=0;
                }
            } else {
                with(document.querySelector("#eqMeterUsage")) {
                    min=0;
                    max=600;
                }
            }
        });
    }
}

function eqClear() {
    document.querySelector("#eqSelType").value="any";
    document.querySelector("#eqSelCC").value="any";
    document.querySelector("#eqSelId").value="";
    document.querySelector("#bdyEqSelect").innerHTML="";
}

function addEquip() {
    let eqId=null;
    let workDate=null;
    let meterUsage=null;
    try {
        eqId = document.querySelector("input[name='eqId']:checked").value;
        workDate = document.querySelector("#eqWorkDate").value;
        meterUsage = document.querySelector("#eqMeterUsage").value;
    } catch { }
    if(!eqId||!workDate||!meterUsage) {
        document.querySelector("#eqMessages").innerHTML="<p class='zoomInfoText'>Please choose an equipment item and enter a work date and meter usage.</p>";
        return;
    }
    if(!document.querySelector("#eqMeterUsage").validity.valid) {
        document.querySelector("#eqMessages").innerHTML="<p class='zoomInfoText'>Please correct the meter usage field.</p>";
        return;
    }
    console.log(eqId);
    eqId=parseInt(eqId);
    console.log(meterUsage);
    meterUsage=parseFloat(meterUsage);
    let equipObj=equipment.filter(x=>x.equipId==eqId)[0];
    console.log(equipObj);
    let equip=new Equip(workDate,equipObj.equipDesc,eqId,equipObj.equipCostCenter,meterUsage,equipObj.meterType,equipObj.equipRate);
    woEquip.push(equip);
    let idx=woEquip.length-1;
    let tr=document.createElement('tr');
    tr.setAttribute("eqIndex",idx);
    let tdDate=document.createElement('td');
    let btns=`<svg onclick="editEquip(${idx})" class="bi bi-card-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                      <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg><br/><svg onclick="delEquip(${idx})" class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>`;
    tdDate.style.display='grid';
    tdDate.style.gridTemplateColumns='1.1em 1fr';
    tdDate.innerHTML="<div>"+btns+"</div><div style='display:flex;align-items:center;'><p style='margin-top: auto!important;; margin-bottom: auto!important;margin-left: 5px;'>"+workDate+"</p></div>";
    let tdEquip=document.createElement('td');
    tdEquip.innerHTML=equipObj.equipDesc+`<br/><span class='text-muted'>${equipObj.equipCostCenter}</span>`;
    let tdUsage=document.createElement('td');
    tdUsage.innerHTML=meterUsage;
    let tdUnits=document.createElement('td');
    tdUnits.innerHTML=equipObj.meterType;
    tr.append(tdDate,tdEquip,tdUsage,tdUnits);
    document.querySelector("#bdyEquip").append(tr);
    $("#eqMessages").empty();
    $("#eqSelType").val('any');
    $("#eqSelCC").val('any');
    $("#eqSelId").val('');
    $("#bdyEqSelect").empty();
    $("#eqWorkDate").val('');
    $("#eqMeterUsage").val('');
    $("#eqMeterLabel").text('');
}

function editEquip(idx) {
    let addEquipResult=function() {
        let tr=document.createElement('tr');
        let tdradio=document.createElement('td');
        let radio=document.createElement('input');
        radio.type='radio';
        radio.name='eqId';
        radio.id=`eqId${idx}`;
        radio.value=equip.equipId;
        tdradio.append(radio);
        let tdequipid=document.createElement('td');
        tdequipid.innerHTML=equip.equipId;
        let tdcc=document.createElement('td');
        tdcc.innerHTML=equip.equipCostCenter;
        tr.append(tdradio,tdequipid,tdcc);
        document.querySelector("#bdyEqSelect").append(tr);
    }
    let equip=woEquip[idx];
    console.log(equip);
    addEquipResult();
    document.querySelector("#eqWorkDate").value=equip.equipDt;
    document.querySelector("#eqMeterUsage").value=parseFloat(equip.meterUsage);
    document.querySelector("#eqMeterLabel").innerHTML=equip.meterType;
    woEquip[idx].status="deleted";
    delEquip(idx);
}

function delEquip(idx) {
    woEquip[idx].state="deleted";
    document.querySelector(`tr[eqIndex="${idx}"]`).remove();
}

function addMt() {
    document.querySelector("#mtMessages").innerHTML="";
    let mtId=document.querySelector("input[name='mtId']:checked").value;
    let workDate=document.querySelector("#mtWorkDate").value;
    let qty=document.querySelector("#mtQtyUsed").value;
    if(!mtId||!workDate||!qty) {
        document.querySelector("#mtMessages").innerHTML="<p class='zoomInfoText'>Ensure you have selected a material and entered a date and quantity.</p>";
        return;
    }
    if(!document.querySelector("#mtWorkDate").validity.valid) {
        document.querySelector("#mtMessages").innerHTML+="<p class='zoomInfoText'>Work Date not valid</p>";
    }
    if(!document.querySelector("#mtQtyUsed").validity.valid) {
        document.querySelector("#mtMessages").innerHTML+="<p class='zoomInfoText'>Quantity not valid</p>";
    }
    if(document.querySelector("#mtMessages").innerHTML!=""){
        return;
    }
    mtId=parseInt(mtId);
    qty=parseFloat(qty);
    let mtObj=materials.filter(x=>x.mtId==mtId)[0];
    let mt=new Material(workDate,mtObj.mtDesc,mtId,mtObj.mtCostCenter,qty,mtObj.mtUnits,mtObj.mtRate);
    woMaterials.push(mt);
    let idx=woMaterials.length-1;
    let tr=document.createElement('tr');
    tr.setAttribute("mtIndex",idx);
    let tdDate=document.createElement('td');
    let btns=`<svg onclick="editMt(${idx})" class="bi bi-card-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                      <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg><br/><svg onclick="delMt(${idx})" class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>`;
    tdDate.style.display='grid';
    tdDate.style.gridTemplateColumns='1.1em 1fr';
    tdDate.innerHTML="<div>"+btns+"</div><div style='display:flex;align-items:center;'><p style='margin-top: auto!important;; margin-bottom: auto!important;margin-left: 5px;'>"+workDate+"</p></div>";
    let tdMt=document.createElement('td');
    tdMt.innerHTML=mtObj.mtDesc;
    tdMt.style.verticalAlign="middle";
    let tdQty=document.createElement('td');
    tdQty.innerHTML=qty;
    tdQty.style.verticalAlign="middle";
    let tdUnits=document.createElement('td');
    tdUnits.innerHTML=mtObj.mtUnits;
    tdUnits.style.verticalAlign="middle";
    tr.append(tdDate,tdMt,tdQty,tdUnits);
    document.querySelector("#bdyMt").append(tr);
    $("#mtMessages").empty();
    $("#mtSelDesc").val('');
    $("#bdyMtSelect").empty();
    $("#mtWorkDate").val('');
    $("#mtQtyUsed").val('');
    $("#mtQtyUsedLabel").text('');
}

function editMt(idx) {
    let mt=woMaterials[idx];
    let workDate=mt.mtDt;
    let qty=mt.mtQty;
    let desc=mt.mtDesc;
    let mtId=mt.mtId;
    document.querySelector("#mtQtyUsed").value=qty;
    document.querySelector("#mtWorkDate").value=workDate;
    document.querySelector("#mtQtyUsedLabel").innerHTML=mt.mtUnits;
    let tr=document.createElement('tr');
    let tdradio=document.createElement('td');
    let radio=document.createElement('input');
    radio.type='radio';
    radio.name='mtId';
    radio.id=`mtId${mt.mtId}`;
    radio.value=mt.mtId;
    radio.checked=true;
    tdradio.append(radio);
    let tdmtdesc=document.createElement('td');
    tdmtdesc.innerHTML=mt.mtDesc;
    tr.append(tdradio,tdmtdesc);
    document.querySelector("#bdyMtSelect").append(tr);
    $("input[name='mtId']").change((e)=>{
        let mtId=document.querySelector("input[name='mtId']:checked").value;
        let mtObj=materials.filter(x=>x.mtId==parseInt(mtId))[0];
        document.querySelector("#mtQtyUsedLabel").innerHTML=mtObj.mtUnits;
    });
    delMt(idx);
}

function delMt(idx) {
    woMaterials[idx].state="deleted";
    document.querySelector(`tr[mtIndex="${idx}"]`).remove();
}

function addOC() {
    document.querySelector("#ocMessages").innerHTML="";
    let workDate=document.querySelector("#ocWorkDate").value;
    let costType=document.querySelector("#ocType").value;
    let description=document.querySelector("#ocDesc").value;
    let cost=document.querySelector("#ocCost").value;
    if(costType=='any'||!description||!cost||!workDate){
        document.querySelector("#ocMessages").innerHTML+="<p class='zoomInfoText'>All fields are required.</p>";
    }
    if(!document.querySelector("#ocCost").validity.valid) {
        document.querySelector("#ocMessages").innerHTML+="<p class='zoomInfoText'>Cost must be greater than 0</p>";
    }
    if (document.querySelector("#ocMessages").innerHTML!="") {
        return;
    }
    cost=parseFloat(cost);
    let ocObj=new OtherContract(workDate,costType,description,cost);
    woOtherContract.push(ocObj);
    let idx=woOtherContract.length-1;

    let tr=document.createElement('tr');
    tr.setAttribute("ocIndex",idx);
    let tdDate=document.createElement('td');
    let btns=`<svg onclick="editOC(${idx})" class="bi bi-card-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                      <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg><br/><svg onclick="delOC(${idx})" class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>`;
    tdDate.style.display='grid';
    tdDate.style.gridTemplateColumns='1.1em 1fr';
    tdDate.innerHTML="<div>"+btns+"</div><div style='display:flex;align-items:center;'><p style='margin-top: auto!important;; margin-bottom: auto!important;margin-left: 5px;'>"+workDate+"</p></div>";
    let tdType=document.createElement('td');
    tdType.style.verticalAlign="middle";
    tdType.innerHTML=costType;
    let tdDesc=document.createElement('td');
    tdDesc.innerHTML=description;
    tdDesc.style.verticalAlign="middle";
    let tdCost=document.createElement('td');
    tdCost.innerHTML="$"+cost;
    tdCost.style.verticalAlign="middle";
    tr.append(tdDate,tdType,tdDesc,tdCost);
    document.querySelector("#bdyOC").append(tr);
    
    document.querySelectorAll("#ocInputFields input").forEach((elem)=>{
        elem.value='';
    });
    document.querySelectorAll("#ocInputFields select").forEach((elem)=> {
        elem.value='any';
    });
    document.querySelector("#ocMessages").innerHTML="";
}

function editOC(idx) {
    let ocObj=woOtherContract[idx];
    document.querySelectorAll("#ocInputFields input").forEach((elem)=>{
        elem.value='';
    });
    document.querySelectorAll("#ocInputFields select").forEach((elem)=> {
        elem.value='any';
    });
    document.querySelector("#ocType").value=ocObj.ocType;
    document.querySelector("#ocWorkDate").value=ocObj.ocDt;
    document.querySelector("#ocDesc").value=ocObj.ocDesc;
    document.querySelector("#ocCost").value=ocObj.ocCost;
    delOC(idx);
}

function delOC(idx) {
    woOtherContract[idx].state='deleted';
    document.querySelector(`tr[ocIndex='${idx}']`).remove();
}

function addAcc() {
    document.querySelector("#accMessages").innerHTML="";
    let workDate=document.querySelector("#accWorkDate").value;
    let asset=document.querySelector("#accAsset").value;
    let amt=document.querySelector("#accAmount").value;
    if(!asset||asset==='any'||!amt||!workDate){
        document.querySelector("#accMessages").innerHTML+="<p class='zoomInfoText'>All fields are required.</p>";
    }
    if(!document.querySelector("#accAmount").validity.valid) {
        document.querySelector("#accMessages").innerHTML+="<p class='zoomInfoText'>Amount must be greater than 0</p>";
    }
    if (document.querySelector("#accMessages").innerHTML!="") {
        return;
    }
    amt=parseFloat(amt);
    asset=parseInt(asset);
    let assetObj=assets[asset];
    let accObj=new Accomplishment(assetObj.type,assetObj.assetId,workDate,amt);
    woAccomplishments.push(accObj);
    let idx=woAccomplishments.length-1;

    let tr=document.createElement('tr');
    tr.setAttribute("accIndex",idx);
    let tdDate=document.createElement('td');
    let btns=`<svg onclick="editAcc(${idx})" class="bi bi-card-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                      <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg><br/><svg onclick="delAcc(${idx})" class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>`;
    tdDate.style.display='grid';
    tdDate.style.gridTemplateColumns='1.1em 1fr';
    tdDate.innerHTML="<div>"+btns+"</div><div style='display:flex;align-items:center;'><p style='margin-top: auto!important;; margin-bottom: auto!important;margin-left: 5px;'>"+workDate+"</p></div>";
    let tdAsset=document.createElement('td');
    tdAsset.style.verticalAlign="middle";
    tdAsset.innerHTML=assets[asset].type.substring(0,1).toUpperCase()+assets[asset].type.substring(1,assets[asset].type.length)+" "+assets[asset].assetId;
    let tdAmt=document.createElement('td');
    tdAmt.innerHTML=amt;
    tdAmt.style.verticalAlign="middle";
    tr.append(tdDate,tdAsset,tdAmt);
    document.querySelector("#bdyAcc").append(tr);
    
    document.querySelectorAll("#accInputFields input").forEach((elem)=>{
        elem.value='';
    });
    document.querySelectorAll("#accInputFields select").forEach((elem)=> {
        elem.value='any';
    });
    document.querySelector("#accMessages").innerHTML="";
}

function editAcc(idx) {
    let accObj=woAccomplishments[idx];
    document.querySelectorAll("#accInputFields input").forEach((elem)=>{
        elem.value='';
    });
    document.querySelectorAll("#accInputFields select").forEach((elem)=> {
        elem.value='any';
    });
    document.querySelector("#accAsset").value=accObj.accAsset;
    document.querySelector("#accWorkDate").value=accObj.accWorkDate;
    document.querySelector("#accAmount").value=accObj.accAmount;
    delAcc(idx);
}

function delAcc(idx) {
    woAccomplishments[idx].state='deleted';
    document.querySelector(`tr[accIndex='${idx}']`).remove();
}

function woDetailsItemSelect(elem,tcoreLevel) {
    if($(elem).attr("tcoreLevel")=="coreFunction"){
        $("#woDetails #woDetailsNextDiv").remove();
        $("#titleTCoreFunctionArea").text(`Core Function Area: ${tcoreLevel.coreFunc}`);
        $("#grpTCoreAsset").empty();
        Object.values(tcoreLevel.assets).forEach((asset,idx)=>{
            let alreadyExists = $(`#grpTCoreAsset input[tcoreLevel="asset"][tcoreAsset="${asset.asset}"]`).length>0;
            if(!alreadyExists){
               $("#grpTCoreAsset").append(
                   `<label class="btn btn-secondary" style='margin: 5px;'>`+
                   `    <input name='grpTCoreAssetOption' id="grpTCoreAssetOption${idx.toString()}" type='radio' autocomplete='off' tcoreLevel="asset" tcoreCoreFunction="${tcoreLevel.coreFunc}" tcoreAsset="${asset.asset}" tcoreActivity="" tcoreRepair="" onchange="woDetailsItemSelect(this,tcoreStructure.coreFunctions['${tcoreLevel.coreFunc}'].assets['${asset.asset}'])">`+asset.asset +
                   `</label>`
               );
            }
        });
        $("#titleTCoreFunctionArea").addClass("collapsed");
        $("#bdyTCoreFunctionArea").removeClass("show");
        $("#titleTCoreAsset").removeClass("collapsed");
        $("#bdyTCoreAsset").addClass("show");
        if(Object.values(tcoreLevel.assets).length==1) {
            $("#grpTCoreAsset input").prop('checked',true);
            $("#grpTCoreAsset input").change();
            //woDetailsItemSelect($("#grpTCoreAsset input")[0],tcoreStructure.coreFunctions[tcoreLevel.coreFunc].assets[$("#grpTCoreAsset input").attr("tcoreAsset")]);
        } else {
            $("#titleTCoreAsset").text("Asset");
            $("#titleTCoreActivity").text("Activity");
            $("#titleTCoreRepairType").text("Repair Type");
        }
    } else if ($(elem).attr("tcoreLevel")=="asset") {
        $("#woDetails #woDetailsNextDiv").remove();
        $("#titleTCoreAsset").text(`Asset: ${tcoreLevel.asset}`);
        $("#grpTCoreActivity").empty();
        let coreFunc=$(elem).attr("tcoreCoreFunction");
        let asset=$(elem).attr("tcoreAsset");
        Object.values(tcoreLevel.activities).forEach((activity,idx)=>{
            let alreadyExists = $(`#grpTCoreAsset input[tcoreLevel="activity"][tcoreActivity="${activity.activity}"]`).length>0;
            if(!alreadyExists) {
                $("#grpTCoreActivity").append(
                    `<label class="btn btn-secondary" style='margin: 5px;'>` +
                    `    <input name='grpTCoreActivityOption' id="grpTCoreActivityOption${idx.toString()}" type='radio' autocomplete='off' tcoreLevel="activity" tcoreCoreFunction="${coreFunc}" tcoreAsset="${asset}" tcoreActivity="${activity.activity}" tcoreRepair="" onchange="woDetailsItemSelect(this,tcoreStructure.coreFunctions['${coreFunc}'].assets['${asset}'].activities['${activity.activity}'])">` + activity.activity +
                    `</label>`
                );
            }
        });
        $("#titleTCoreAsset").addClass("collapsed");
        $("#bdyTCoreAsset").removeClass("show");
        $("#titleTCoreActivity").removeClass("collapsed");
        $("#bdyTCoreActivity").addClass("show");
        if(Object.values(tcoreLevel.activities).length==1) {
            $("#grpTCoreActivity input").prop('checked',true);
            $("#grpTCoreActivity input").change();
            //woDetailsItemSelect($("#grpTCoreActivity input")[0],tcoreStructure.coreFunctions[coreFunc].assets[asset].activities[$("#grpTCoreActivity input").attr("tcoreActivity")]);
        } else {
            $("#titleTCoreActivity").text("Activity");
            $("#titleTCoreRepairType").text("Repair Type");
        }
    } else if ($(elem).attr("tcoreLevel")=="activity") {
        $("#woDetails #woDetailsNextDiv").remove();
        $("#titleTCoreActivity").text(`Activity: ${tcoreLevel.activity}`);
        $("#grpTCoreRepairType").empty();
        let coreFunc=$(elem).attr("tcoreCoreFunction");
        let asset=$(elem).attr("tcoreAsset");
        let activity=$(elem).attr("tcoreActivity");
        Object.values(tcoreLevel.repairs).forEach((repair,idx)=>{
            let alreadyExists = $(`#grpTCoreRepairType input[tcoreLevel="repair"][tcoreRepair="${repair.repair}"]`).length>0;
            if(!alreadyExists) {
                $("#grpTCoreRepairType").append(
                    `<label class="btn btn-secondary" style='margin: 5px;'>` +
                    `    <input name='grpTCoreRepairTypeOption' id="grpTCoreRepairTypeOption${idx.toString()}" type='radio' autocomplete='off' tcoreLevel="repair" tcoreCoreFunc="${coreFunc}" tcoreAsset="${asset}" tcoreActivity="${activity}" tcoreRepair="${repair.repair}" onchange="woDetailsItemSelect(this,tcoreStructure.coreFunctions['${coreFunc}'].assets['${asset}'].activities['${activity}'].repairs['${repair.repair}'])">` + repair.repair +
                    `</label>`
                );
            }
        });
        $("#titleTCoreActivity").addClass("collapsed");
        $("#bdyTCoreActivity").removeClass("show");
        $("#titleTCoreRepairType").removeClass("collapsed");
        $("#bdyTCoreRepairType").addClass("show");
        if(Object.values(tcoreLevel.repairs).length==1) {
            $("#grpTCoreRepairType input").prop('checked',true);
            $("#grpTCoreRepairType input").trigger('change');
        } else {
            $("#titleTCoreRepairType").text("Repair Type");
        }
    } else if ($(elem).attr("tcoreLevel")=="repair") {
        $("#titleTCoreRepairType").text(`Repair Type: ${tcoreLevel.repair}`);
        if ($("#woDetailsNextDiv").length==0) {
            let newdiv = document.createElement('div');
            newdiv.id = "woDetailsNextDiv";
            newdiv.classList.add("justify-content-center", "d-flex");
            newdiv.style.paddingTop = "10px";
            let nextbtn = document.createElement('button');
            nextbtn.id = "btnWoDetailsNext";
            nextbtn.innerHTML = "Next";
            $(nextbtn).click(() => switchScreen($("#link_woLabor")[0]));
            $(nextbtn).addClass("btn");
            $(nextbtn).addClass("btn-success")
            $(newdiv).append(nextbtn);
            $("#woDetailsContainer").append(newdiv);
        }
    }
}

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
        $("#titleTCoreActivity").text(`Activity: ${Object.keys(tcoreStructure.coreFunctions[coreFunc].assets[asset].activities)[0]}`);
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
    for(activity in tcoreStructure.coreFunctions[coreFunc].assets[asset].activities) {
       let alreadyExists = $("#grpTCoreActivity #grpTCoreActivityOption"+TCOREActivity.makeSafe(coreFunc)+TCOREActivity.makeSafe(asset)+TCOREActivity.makeSafe(activity)).length>0;
       if(!alreadyExists){
           if(selectedItem) {
               $("#grpTCoreActivity").append(
                   "<label class=\"btn btn-secondary active\" style='margin: 5px;'>"+
                   "    <input name='grpTCoreActivityOption' id='grpTCoreActivityOption"+TCOREActivity.makeSafe(coreFunc)+TCOREActivity.makeSafe(asset)+TCOREActivity.makeSafe(activity)+"' type='radio' checked='checked' autocomplete='off' onchange='updateWODetailsActivity(\""+coreFunc+"\")'>"+activity +
                   "</label>"
               );
           } else {
               $("#grpTCoreActivity").append(
                   "<label class=\"btn btn-secondary active\" style='margin: 5px;'>"+
                   "    <input name='grpTCoreActivityOption' id='grpTCoreActivityOption"+TCOREActivity.makeSafe(coreFunc)+TCOREActivity.makeSafe(asset)+TCOREActivity.makeSafe(activity)+"' type='radio' autocomplete='off' onchange='updateWODetailsActivity(\""+coreFunc+"\")'>"+activity +
                   "</label>"
               );
           }
       }
    }    
}

function switchScreen(link) {
    let pages=["woAssets","woDetails","woLabor","woEquip","woMaterials","woOtherContract","woAccomplishments"]
    let elemnoid=link.id.split('_')[1];
    let titles= {
        woAssets: { title: "Work Order Assets" },
        woDetails: { title: "Work Order Details" },
        woLabor: { title: "Work Order Labor"},
        woEquip: { title: "Work Order Equipment"},
        woMaterials: { title: "Work Order Materials"},
        woOtherContract: { title: "Work Order Other/Contract"},
        woAccomplishments: { title: "Work Order Accomplishments"}
    }
    let elemid="#"+link.id.split('_')[1];
    $(link)[0].style.fontWeight="bold";
    $(elemid)[0].style.display='';
    let page=[elemid.substring(1,elemid.length)];
    pages.filter(x=>!page.includes(x)).forEach((elem)=>{
        $("#link_"+elem)[0].style.fontWeight='normal';
        $("#"+elem)[0].style.display='none';
    });
    document.querySelector("#secHeader").innerHTML=`<h2>${titles[elemnoid].title}</h2>`;
    if(elemnoid=="woAccomplishments") {
        document.querySelector("#accAsset").innerHTML="";
        let anyOption=document.createElement('option');
        anyOption.value='any';
        anyOption.innerHTML='Choose one...';
        document.querySelector("#accAsset").append(anyOption);
        assets.filter(x=>x.state=="active").forEach((asset)=>{
            let idx=assets.indexOf(asset);
            let option=document.createElement('option');
            option.value=idx;
            console.log(idx);
            let assetBase=asset.type.substring(0,1).toUpperCase()+asset.type.substring(1,asset.length) + " " + asset.assetId;
            if (asset.type=="barrier"||asset.type=="roadway") {
                assetBase+=" "+asset.logBegin+"-"+asset.logEnd;
            }
            option.innerHTML=assetBase;
            document.querySelector("#accAsset").append(option);
        });
    }
}

function addAsset() {

    const linearAdd=function() {
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
    };
    const pointAdd=function() {
        if ($("#pointID").val()=="") {
            $("#zoomInfoText").text("An asset ID is required for point assets.");
            return;
        }
        let asset=new Asset($("#assetType").val(),$("#pointID").val(),0.0,
            0.0,parseFloat($("#pointLat").val()),
            parseFloat($("#pointLng").val()),parseFloat($("#pointLat").val()),
            parseFloat($("#pointLng").val()));
        assets.push(asset);
        let idxNum=assets.length-1;
        let newrow=document.createElement('tr');
        $(newrow).attr('assetIndex',idxNum);
        let type=document.createElement('td');
        type.style.verticalAlign="middle";
        let id=document.createElement('td');
        $(type).text($("#assetType option:selected").text())
        let idText=$("#pointID").val()+`&nbsp;&nbsp;<svg onclick="editAsset(${idxNum})" class="bi bi-card-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                      <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg>&nbsp;&nbsp;<svg onclick="delAsset(${idxNum})" class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>`;
        $(id).html(idText);
        $(type).appendTo($(newrow));
        $(id).appendTo($(newrow));
        $("#assetTableBody").append(newrow);
    };

    let assetModes ={};
    assetModes.roadway="linear";
    assetModes.barrier="linear";
    assetModes.culvert="point";

    switch(assetModes[$("#assetType").val()]) {
        case "linear":
            linearAdd();
            break;
        case "point":
            pointAdd();
            break;
    }
    clearAsset();
}

async function editAsset(idx) {
    console.log(`editAsset${idx}`);
    let asset=assets[idx];
    console.log(asset);
    let latlng={};
    latlng.lat=asset.latBegin;
    latlng.lng=asset.lngBegin;
    delAsset(idx);
    document.querySelector("#entryContainer").innerHTML="";
    let updateLinear=async function() {
        map.removeLayer(markers);
        markers.clearLayers();
        addLinearEntry("force");
        $("#linearID").val(asset.assetId);
        $("#linearLogBegin").val(asset.logBegin);
        $("#linearLogEnd").val(asset.logEnd);
        $("#linearLatBegin").val(asset.latBegin);
        $("#linearLatEnd").val(asset.latEnd);
        $("#linearLngBegin").val(asset.lngBegin);
        $("#linearLngEnd").val(asset.lngEnd);
        map.off('moveend',updateMapAssets);
        map.off('zoomend',updateMapAssets);
        map.setView(latlng,16,{animate:false});
        entryState="linear";
        await updateMapAssets();
        if(asset.type=="barrier") {
            markers.eachLayer((layer1)=>{
                layer1.eachLayer((layer2)=>{
                    if(layer2.feature.properties.BARRIER_FILE_NUMBER==asset.assetId) {
                        layer2.setStyle({"color":"red"});
                    }
                });
            });
        }
        map.on('moveend',updateMapAssets);
        map.on('zoomend',updateMapAssets);
    };
    let updatePoint=async function() {
        map.removeLayer(markers);
        markers.clearLayers();
        addPointEntry("force");
        $("#pointID").val(asset.assetId);
        $("#pointLat").val(asset.latBegin);
        $("#pointLng").val(asset.lngBegin);
        console.log(latlng);
        map.off('moveend',updateMapAssets);
        map.off('zoomend',updateMapAssets);
        map.setView(latlng,16,{animate:false});
        //setTimeout((test)={},300);
        // map.panTo(latlng);
        // map.setZoom(16);
        entryState="point";
        await updateMapAssets();
        markers.eachLayer((layer1)=>{
            layer1.eachLayer((layer2)=>{
                if(layer2.feature.properties.CULVERT_FILE_NUMBER==asset.assetId) {
                    let redIcon=new L.icon({iconUrl:'/static/mms/images/marker-icon-red.png',shadowUrl:'/static/mms/images/marker-shadow.png',iconSize:[25,41],popupAnchor:[1,-34],shadowSize:[41,41],tooltipAnchor:[16,-28],iconAnchor: [12,41]});
                    layer2.setIcon(redIcon);
                }
            });
        });
        map.on('moveend',updateMapAssets);
        map.on('zoomend',updateMapAssets);
    };
    document.querySelector("#assetType").value=asset.type;
    switch(asset.type) {
        case "roadway":
            await updateLinear();
            document.querySelector("#lbl_linearID").value="NLFID";
            let e={};
            e.latlng=latlng;
            mapClick(e,"force");
            break;
        case "culvert":
            updatePoint();
            document.querySelector("#lbl_pointID").value="Culvert File Number";
            break;
        case "barrier":
            updateLinear();
            document.querySelector("#lbl_linearID").value="Barrier File Number";
            break;
    }
}

function delAsset(idx) {
    assets[idx].state="deleted";
    $("#assetTableBody [assetIndex="+idx+"]").remove();
}

function clearAsset() {
    switch($("#assetType").val()) {
        case "roadway": case "barrier":
            $("#linearID").val("");
            $("#linearLogBegin").val("");
            $("#linearLogEnd").val("");
            $("#linearLatBegin").val("");
            $("#linearLatEnd").val("");
            $("#linearLngEnd").val("");
            $("#linearLngBegin").val("");
            if ($("#assetType").val()=="roadway") {
                map.removeLayer(markers);
                markers.clearLayers();
            }
            break;
        case "culvert":
            $("#pointID").val("");
            $("#pointLat").val("");
            $("#pointLng").val("");
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

async function updateMapAssets(e) {
    switch($("#assetType").val()){
        case "culvert":
            map.removeLayer(markers);
            markers.clearLayers();
            addPointEntry();
            entryState="point";
            $("#lbl_pointID").text("Culvert File Number");
            await fetchCulverts();
            //$("#lbl_pointID ~ .col-6").css("align-items","middle");
            break;
        case "barrier":
            map.removeLayer(markers);
            markers.clearLayers();
            await fetchBarriers();
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

function addLinearEntry(mode="default"){
    if(entryState!="linear"||mode=="force"){
        $("#entryContainer").empty();
        $("#templinearEntry .row").each((idx,elem)=>{
            $(elem).clone().appendTo("#entryContainer");
        });
        $("#entryContainer [futureid]").each((idx,elem)=>{
            elem.id=$(elem).attr("futureid");
            $(elem).css("width","100%");
        });
    }
}

function addPointEntry(mode="default"){
    if(entryState!="point"||mode=="force") {
        $("#entryContainer").empty();
        $("#temppointEntry .row").each((idx,elem)=> {
            $(elem).clone().appendTo("#entryContainer");
        });
        $("#entryContainer [futureid]").each((idx,elem)=>{
            elem.id=$(elem).attr("futureid");
            $(elem).css("width","100%");
        });
    }
}

async function fetchCulverts(){
    if(map.getZoom()>=12){
        $("#zoomInfoText").text("");
        let bounds=map.getBounds();
        let ne=[bounds.getNorthEast().lng,bounds.getNorthEast().lat];
        let nw=[bounds.getNorthWest().lng,bounds.getNorthWest().lat];
        let sw=[bounds.getSouthWest().lng,bounds.getSouthWest().lat];
        let se=[bounds.getSouthEast().lng,bounds.getSouthEast().lat];
        let data={};
        data.where="STATUS='A'";
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
        await jQuery.post("https://gis.dot.state.oh.us/arcgis/rest/services/TIMS/Assets/MapServer/4/query",data,(resp)=>{
            L.geoJSON(resp.features).addTo(markers);
            markers.eachLayer((layers)=> {
                layers.eachLayer((layer)=>{
                    layer.options.title="CFN "+layer.feature.properties.CULVERT_FILE_NUMBER;
                    layer.bindPopup("CFN "+layer.feature.properties.CULVERT_FILE_NUMBER);
                    layer.on('click',culvertClick);
                });
            });
            map.addLayer(markers);
        });
    } else {
        $("#zoomInfoText").text("Zoom in closer to see culverts.");
    }
}

function culvertClick(culvert) {
    $("#pointID").val(culvert.target.feature.properties.CULVERT_FILE_NUMBER);
    $("#pointLat").val(culvert.target.feature.geometry.coordinates[1]);
    $("#pointLng").val(culvert.target.feature.geometry.coordinates[0]);
}

async function fetchBarriers() {
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
        await jQuery.post("https://gis.dot.state.oh.us/arcgis/rest/services/TIMS/Assets/MapServer/15/query",data,(resp)=>{
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
        await jQuery.post("https://gis.dot.state.oh.us/arcgis/rest/services/TIMS/LRS/MapServer/exts/OdotLrsTools/CountyMeasureAtPoint",
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
            await jQuery.post("https://gis.dot.state.oh.us/arcgis/rest/services/TIMS/LRS/MapServer/exts/OdotLrsTools/CountyMeasureAtPoint",
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
    jQuery.post("https://gis.dot.state.oh.us/arcgis/rest/services/TIMS/LRS/MapServer/exts/OdotLrsTools/CountyMeasureAtPoint",
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
            jQuery.post("https://gis.dot.state.oh.us/arcgis/rest/services/TIMS/LRS/MapServer/exts/OdotDynSegTools/CountyRouteBetweenMs",
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
    // $("#bdyTCoreFunctionArea").append(
    //    "<div id=\"grpTCoreFunctionArea\" class=\"container btn-group-toggle\" data-toggle=\"buttons\"></div>"
    // );
    // $("#bdyTCoreAsset").append(
    //    "<div id=\"grpTCoreAsset\" class=\"container btn-group-toggle\" data-toggle=\"buttons\"></div>"
    // );
    let tcoreCoreFunctions=[...new Set(tcore.map(x=>x.coreFunction))];
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
           obj.assets[asset].asset=asset;
           obj.assets[asset].activities={}
           relActivities.forEach((activity)=>{
               obj.assets[asset].activities[activity]={};
               obj.assets[asset].activities[activity].activity=activity;
               let relRepairs=tcore.filter(x=>x.coreFunction==coreFunc&&x.asset==asset&&x.activity==activity);
               relRepairs=[...new Set(relRepairs.map((z)=>z.repairType))];
               obj.assets[asset].activities[activity].repairs={};
               relRepairs.forEach((repair)=>{
                   obj.assets[asset].activities[activity].repairs[repair]={};
                   obj.assets[asset].activities[activity].repairs[repair].repair=repair;
               });
           });
       });
       tcoreStructure.coreFunctions[coreFunc]=obj;
    });
    Object.values(tcoreStructure.coreFunctions).forEach((cf,idx)=>{
        let alreadyExists = $(`#grpTCoreFunctionArea input[tcoreLevel="coreFunction"][tcoreDesc="${cf.coreFunc}"]`).length>0;
        if(!alreadyExists){
           $("#grpTCoreFunctionArea").append(
               `<label class="btn btn-secondary" style='margin: 5px;'>`+
               `    <input name='grpTCoreFunctionAreaOption' id="grpTCoreFunctionAreaOption${idx.toString()}" type='radio' autocomplete='off' tcoreLevel="coreFunction" tcoreCoreFunction="${cf.coreFunc}" tcoreAsset="" tcoreActivity="" tcoreRepair="" onchange="woDetailsItemSelect(this,tcoreStructure.coreFunctions['${cf.coreFunc.toString()}'])">`+cf.coreFunc +
               `</label>`
           );
        }
    });
    $("#modalStartDate").on('change',(e)=>{
        let selDate=moment(document.querySelector("#modalStartDate").value);
        let maxDate=selDate.clone().add(1,'day');
        document.querySelector("#modalEndDate").setAttribute("max",maxDate.format().split('T')[0]);
        document.querySelector("#modalEndDate").setAttribute("min",selDate.format().split('T')[0]);
    });
    $("#calcHours").on('shown.bs.modal',()=> {
        dateofwork=document.querySelector("#lbDateOfWork").value;
        if (dateofwork) {
            document.querySelector("#modalStartDate").value=(moment(dateofwork)).format().split('T')[0];
            $("#modalStartDate").change();
        } else {
            document.querySelector("#modalStartDate").value=(new Date()).format().split('T')[0];
            $("#modalStartDate").change();
        }
    });
    let laborComplete=new autoComplete({
        selector: '#lbEmployee',
        minChars: 2,
        source: (term,suggest) => {
            term=term.toLowerCase();
            let choices = employees.map(x=>x.getName());
            let matches = [];
            choices.forEach((choice)=> {
                if (choice.toLowerCase().indexOf(term)>=0) {
                    matches.push(choice);
                }
            });
            suggest(matches);
        }
    });
    let projComplete=new autoComplete({
        selector: '#woProject',
        minChars: 2,
        source: (term,response)=> {
            $.getJSON('/mms/projectsAPI',{text:term},(data)=>{
                console.log(data);
                let out=data.map(x=>x.fields.district+" - " +x.fields.county+" - "+x.fields.projectName)
                response(out);
            });
        }
    });
    let equipTypes=[...new Set(equipment.map(x=>x.equipDesc))];
    equipTypes.forEach((eqtype)=>{
        let elem=document.createElement('option');
        elem.value=eqtype.substring(0,3);
        elem.innerHTML=eqtype;
        document.querySelector("#eqSelType").append(elem);
    });
    let equipCC=[...new Set(equipment.map(x=>x.equipCostCenter))];
    equipCC.forEach((eqCC)=>{
        let elem=document.createElement('option');
        elem.value=eqCC;
        elem.innerHTML=eqCC;
        document.querySelector("#eqSelCC").append(elem);
    });
    $("#mtSelDesc").keyup((e)=> {
        document.querySelector("#bdyMtSelect").innerHTML="";
        let mtSelValue=document.querySelector("#mtSelDesc").value;
        if (mtSelValue=="") {
            return;
        }
        let mts=[...new Set(materials.filter(x=>x.mtDesc.toLowerCase().indexOf(mtSelValue.toLowerCase())>-1).map(x=>x.mtId))];
        mts.forEach((mt)=> {
            let mtObj=materials.filter(x=>x.mtId==mt)[0];
            let tr=document.createElement('tr');
            let tdradio=document.createElement('td');
            let radio=document.createElement('input');
            radio.type='radio';
            radio.name='mtId';
            radio.id=`mtId${mtObj.mtId}`;
            radio.value=mtObj.mtId;
            tdradio.append(radio);
            let tdmtdesc=document.createElement('td');
            tdmtdesc.innerHTML=mtObj.mtDesc;
            tr.append(tdradio,tdmtdesc);
            document.querySelector("#bdyMtSelect").append(tr);
        });
        $("input[name='mtId']").change((e)=>{
            let mtId=document.querySelector("input[name='mtId']:checked").value;
            let mtObj=materials.filter(x=>x.mtId==parseInt(mtId))[0];
            document.querySelector("#mtQtyUsedLabel").innerHTML=mtObj.mtUnits;
        });
    });
    document.querySelectorAll("input[type='date']").forEach((elem)=>{
        elem.max=moment().format().split('T')[0];
    });
    $("#woProjectDist").change((e)=>{
        $(`#woProjectCty option[dist!='${$("#woProjectDist").val()}']`).css('display','none');
        $(`#woProjectCty option[dist='${$("#woProjectDist").val()}']`).css('display','');
        $(`#woProjectCty option[dist='X']`).css('display','');
    });
});