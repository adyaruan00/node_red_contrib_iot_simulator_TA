module.exports = function(RED) {
    function IoTSimulatorNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {           
            if ( config.options.length > 0 ) { 
                if ( config.allinone ) { 
                    msg.payload = {};
                    for (var i=0; i< config.options.length; i++) {
                        var option = config.options[i]; 
                        var range = 0;
                        
                        if ( !isNaN(parseFloat(option.range)) && isFinite(option.range) )              
                            range = parseFloat(option.range);
                        if ( !isNaN(parseFloat(option.batas)) && isFinite(option.batas) )              
                            median = parseFloat(option.batas);
                        if ( !isNaN(parseFloat(option.value)) && isFinite(option.value) ) {  
                            if ( range != 0 ) {  
                                var mValue = parseFloat(option.value);  
                                var minValue = mValue - parseFloat(option.range);
                                var maxValue = mValue + parseFloat(option.range);
                                var batas= Math.floor(Math.random() * (maxValue - minValue + 1) );
                                var High='High';
                                var Low='Low';
                                if (batas <= option.batas) {

                                msg.payload[ 'ID'] = option.idkey;
                                msg.payload['Sensor']=option.label ;
                                 
                    
                                msg.payload[ 'Voltage'] = Low;
                                 msg.payload[ 'latitude'] = option.latitude;
                                msg.payload[ 'longitude'] = option.longitude;
                                 msg.payload['Value']=batas;
                                
                                }else{
                            
                                msg.payload[ 'ID'] = option.idkey;
                               msg.payload['Sensor']=option.label ;
                               msg.payload[ 'Voltage'] = High;
                                msg.payload[ 'latitude'] = option.latitude;
                                msg.payload[ 'longitude'] = option.longitude;
                                 msg.payload['Value']=batas;
}
                            } else 
                             msg.payload['Sensor']=option.label ;
                            msg.payload[ 'ID'] = option.idkey;
                            msg.payload[ 'latitude'] = option.latitude;
                                msg.payload[ 'longitude'] = option.longitude;
                                                
                        } else
                             msg.payload['Sensor']=option.label ;
                            msg.payload[ 'ID'] = option.idkey;
                            msg.payload[ 'latitude'] = option.latitude;
                                msg.payload[ 'longitude'] = option.longitude;
                         
                    }
                    if ( config.timestamp) msg.payload[ 'timestamp'] = Date.now();
                    node.send(msg);
                } else {
                    for (var i=0; i< config.options.length; i++) {
                        msg.payload = {};
                        var option = config.options[i];
                        var range = 0;
                        if ( !isNaN(parseFloat(option.range)) && isFinite(option.range) )              
                            range = parseFloat(option.range);
                        
                        if ( !isNaN(parseFloat(option.value)) && isFinite(option.value) )  {            
                            if ( range != 0 ) {  
                                var mValue = parseFloat(option.value);  
                                var minValue = mValue - parseFloat(option.range);
                                var maxValue = mValue + parseFloat(option.range);     
                                 msg.payload[ 'ID'] = option.idkey;                            
                                msg.payload['Sensor']=option.label ;
                               
                                msg.payload['Voltage'] = Low;
                                 msg.payload['latitude'] = option.latitude;
                                msg.payload['longitude'] = option.longitude;   
                                msg.payload['Value']=batas; 
                          
                            } else                        
                          msg.payload['Sensor']=option.label ;
                            msg.payload['ID'] = option.idkey;
                           msg.payload['latitude'] = option.latitude;
                                msg.payload['longitude'] = option.longitude;
                        } else
                             msg.payload['Sensor']=option.label ;
                            msg.payload[ 'ID'] = option.idkey;
                            msg.payload[ 'latitude'] = option.latitude;
                                msg.payload[ 'longitude'] = option.longitude;
                    
                        if ( config.timestamp) msg.payload[ 'timestamp'] = Date.now();
                        node.send(msg);
                    } 
                } 
           }  
        });


    }
    RED.nodes.registerType("sensor-cahaya",IoTSimulatorNode);
}
