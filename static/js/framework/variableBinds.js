function bindVar(variableName, defaultValue) {
    let myVar = defaultValue;

    return Object.defineProperty(this, variableName, {
        get: function () { return myVar; },
        set: function (v) {
            myVar = v;
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeTwoWayBinding);

function initializeTwoWayBinding() {
    let bindNodes = {}
    
    /* Get all binded inputs/outputs */
    let binds = document.querySelectorAll('*[data-bind]')
    
    binds.forEach((bind) => {
        let bindVarVal = window[bind.dataset.bind] ? window[bind.dataset.bind] : null
    
        bind.value = bindVarVal
        bind.innerText = bindVarVal
    
        if (!bindEvents[bind.dataset.bind]) {
            bindEvents[bind.dataset.bind] = new Event(`${bind.dataset.bind}change`)
        }
    
        if (!bindNodes[bind.dataset.bind]) {
            bindNodes[bind.dataset.bind] = [bind]
        } else {
            bindNodes[bind.dataset.bind].push(bind)
        }
    
        bind.addEventListener('keyup', bindEvents)
        bind.addEventListener('onclick', bindEvents)
        bind.onchange = bindEvents;

        function bindEvents(e) {
            window[bind.dataset.bind] = e.target.value

            let changeEvent = new CustomEvent(`${bind.dataset.bind}change`, {
                "detail": {
                    bindVal: e.target.value
                }
            });
            
            bindNodes[bind.dataset.bind].forEach((eventBind) => {
                eventBind.dispatchEvent(changeEvent)
            })
        }
    
        bind.addEventListener(`${bind.dataset.bind}change`, function(e) {
            e.target.value = e.detail.bindVal
            e.target.innerText = e.detail.bindVal
        })
    })
}