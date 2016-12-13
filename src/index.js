var __origin = {
    __state : {},
    __objs: {},
    create: function(id){
        this.__state[id] = {
            id,
            depends: [],
            stacks: [0],
            resonants: [],
        }

        return this.__state[id];
    },

    state: function(id) {
        if(typeof id == 'undefined') return this.create(id)
        if(typeof this.__state[id] == 'undefined') return this.create(id)
        return this.__state[id]
    },

    obj: function(id) {
        if(typeof id == 'undefined') return false
        if(typeof this.__objs[id] == 'undefined') return false

        if(typeof this.__objs[id].__zen == 'undefined'){
            return {
                base: true,
                getter: Object.getOwnPropertyDescriptor( this.__objs, id).get,
                setter: Object.getOwnPropertyDescriptor( this.__objs, id).set,
            }
        }else{
            return {
                base: false,
                obj: this.__objs[id]
            }
        }
    },

    formBase: function(name, getter, setter){
        if(getter && setter){
            Object.defineProperty( this.__objs, name, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: false
            });

            return this.__objs[name]
        }
    },

    form: function(name) {
        let obj = this.__objs[name] = {
            __zen: true,
            id: name
        }

        return obj
    },

    resonant: function(name, value) {
        Object.keys(this.__state).forEach( key => {
            if(this.__state[key] &&
            this.__state[key].depends.length > 0 &&
            this.__state[key].depends.indexOf(name) > -1 )
            {
                this.__state[key].resonants.forEach( resonant => resonant(value) )
            }
        })
    }
}

function zen(name, objs){
    if(!name || typeof name !== 'string') return;
    if(!objs) {
        let obj = __origin.obj(name)
        if(obj) {
            if(obj.base){
                return obj.getter()
            }else{
                return obj.obj
            }
        }
    }

    let state = __origin.state(name)

    if(typeof objs == 'object'){
        if(objs.__zen){
            return objs;
        }else{
            let dimension = 1, zenobj = __origin.form(name)
            //multi dimension objs
            Object.keys(objs).forEach( objkey => {
                let obj = objs[objkey]
                let __obj = __origin.obj(obj)

                if(__obj !== false){
                    if( !__obj.base ) {
                        state.depends.push(obj.__stateId)
                        dimension += obj.__dimension
                        zenobj[objkey] = obj
                    }else{
                        //define object property
                        state.depends.push(obj)
                        Object.defineProperty( zenobj, obj, {
                            get: __obj.getter,
                            set: __obj.setter,
                            enumerable: true,
                            configurable: false
                        });
                    }
                }else{
                    //not an zen instance
                    console.log('not an zen object name', obj, __obj)
                    console.log(__origin.__objs)
                }

            })

            zenobj.resonant = func => state.resonants.push(func)
            zenobj.__dimension = dimension
            zenobj.__stateId = state.id

            //god
            zenobj.__god = () => state

            return zenobj
        }
    }

    //init value
    let zenobj = __origin.formBase(
        name,
        () => state.stacks[state.stacks.length - 1],
        value => {
            state.stacks.push(value)

            //direct
            state.resonants.forEach( resonant => {
                resonant(value)
            } )

            //chanel / boarcasting
            __origin.resonant(name, value)
        }
    )

    state.stacks.push(objs)

    return zenobj
}

export default zen

