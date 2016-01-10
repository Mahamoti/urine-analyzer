Template.SamplesGrid.helpers({
  samples: function(){
    let analysis = Analysis.findOne({},{sort:{firstDate:-1}})
    let perHour = Samples.findOne({},{sort:{timeStamp:-1}})
    let {samples,timeStamp} = perHour || {}
    let data = Settings.findOne({_id:'Data'}).data
    for (var i = 0; i < data.length; i++) {
      if(analysis && analysis.counter > -1 && perHour){
        data[i].value = samples[analysis.counter%Math.floor((60*60000/analysis.frequency))][data[i]._id];
        data[i].timeStamp = timeStamp;
      }else{
        data[i].value = '--'
      }
    }
    return data;
    /*for (var i = samples.length; i > 0 ; i--) {
    for (var property in samples[i-1]) {
    if (samples[i-1].hasOwnProperty(property)) {
    if(samples[i-1][property] != null || (i-1) == 0){
    let {label,measure} = Settings.findOne({_id:property})
    let type=property,value=samples[i-1][property]||'No Value';
    array.push({type,value,label,measure,timeStamp})
  }
}
}
if(array.length){
return array
}
array = []
}*/
}
});
