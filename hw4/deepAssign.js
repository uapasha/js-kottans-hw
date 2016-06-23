(function()
{
  'use strict';
  if (typeof Object.deepAssign == "function") return;

  Object.defineProperty(Object, 'deepAssign',
  {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function deepAssign(target, ...sources)
    { 
      if (target === undefined || target === null) {
        throw new TypeError('Target is null or udefined');
      }
      if (sources.some(src => src === null)){
        throw new TypeError('One of sources is null');
      }
      //convert target
      let to = copy(target);

      for (let i = 0; i < sources.length; i++)
      {
        let from = sources[i];
        //check if to and from have same type and are objects
        if (from === Object(from) && to === Object(to) && 
                                      from.constructor === to.constructor)
        {
          Reflect.ownKeys(from).forEach( key => 
          {        
            if (from.propertyIsEnumerable(key))
            { let descr = Object.getOwnPropertyDescriptor(from, key);
              if ('value' in descr) {
                if (key in to) 
                {
                  if (Object.getOwnPropertyDescriptor(to, key)
                                          .configurable === false){
                    throw new Error('won\'t write unconfigurable');
                  }
                  else to[key] = deepAssign(to[key], from[key]);
                }                
                else to[key] = copy(from[key]);
              }
              else Object.defineProperty(to, key, descr); 
            }        
          });
        }
        else{
          to = copy(from);
        }
      }
      return to; 
    
      function copy(from)
      { 
        if (!(from instanceof Object)){
          //if not Object - return it
          return from;
        }

        if (from === null) {
          throw new TypeError('null is not allowed');
        }
        if (from instanceof Object || from instanceof Array) 
        {
          // Filter out special objects.
          // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
          var Constructor = from.constructor;

          switch (Constructor) {
            // Implement other special objects here.
            case RegExp:
              Constructor = new Constructor(from);
              break;
            case Date:
              Constructor = new Constructor(from.getTime());
              break;
            case Set:
              Constructor = new Constructor(Set.prototype.constructor);
              break;
            default:
              Constructor = new Constructor(from);
          }
          Reflect.ownKeys(from) /* returns an array of the target
                                 object's own property keys.*/
                      .forEach( key => 
          { 
            if (from.propertyIsEnumerable(key))
            {
              // iterate through keys, get descriptors,
              //define keys in object
              let descr = Object.getOwnPropertyDescriptor(from, key);
              if ('value' in descr){
                Constructor[key] = copy(descr.value);
                
                
              } else {
                Object.defineProperty(Constructor, key, descr);
              }
            }        
          });
          return Constructor;
          }else if (from === Object(from)) {
            let Constructor = new from.constructor(from);
            return Constructor;
          }
      }

    },
  });
}
)();