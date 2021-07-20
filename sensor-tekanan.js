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
                        if ( !isNaN(parseFloat(option.value)) && isFinite(option.value) ) {  
                            if ( range != 0 && option.value<=57 && option.range<=57) {  
                                var mValue = parseFloat(option.value);  
                                var minValue = mValue - parseFloat(option.range);
                                var maxValue = mValue + parseFloat(option.range);
                                msg.payload[ 'ID'] = option.idkey;

                                msg.payload['Sensor'] = option.label;
                                  
                                msg.payload[ 'latitude'] = option.latitude;
                                msg.payload[ 'longitude'] = option.longitude;
                                msg.payload['Value']=Math.floor(Math.random() * (maxValue - minValue + 1) );
                            } else 
                            msg.payload[option.label] = parseFloat(option.value);
                            msg.payload[ 'ID'] = option.idkey;
                            msg.payload[ 'latitude'] = option.latitude;
                            msg.payload[ 'longitude'] = option.longitude;                               
                        } else
                            msg.payload[option.label] = option.value;
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
                                
                                msg.payload['Sensor'] = option.label;
                                
                                msg.payload[ 'latitude'] = option.latitude;
                                msg.payload[ 'longitude'] = option.longitude;
                                msg.payload['Value']=Math.floor(Math.random() * (maxValue - minValue + 1) ); 
                            } else                        
                            msg.payload[option.label] = parseFloat(option.value);
                            msg.payload[ 'ID'] = option.idkey;
                            msg.payload[ 'latitude'] = option.latitude;
                            msg.payload[ 'longitude'] = option.longitude;
                        } else
                            msg.payload[option.label] = option.value;
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
    RED.nodes.registerType("sensor-tekanan",IoTSimulatorNode);
}
