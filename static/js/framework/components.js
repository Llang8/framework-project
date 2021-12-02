class App {
    constructor(config) {
        this.app = document.querySelector(config.mount)
    }
}

class Component {
    constructor(config) {
        this.name = config.name
        this.data = config.dataObj
        this.template = config.template

        // Set parent component
        this.parent = config.parent

        if (config.created) {
            this.created = config.created
        }

        // Call created lifecycle hook
        this.created()
    }

    created = () => {
        console.log(`${this.name} component created`)
    }

    render = () => {
        renderedTemplate = this.template;

        this.data.forEach((datom) => {
            renderedTemplate = renderedTemplate.replace(`{{${datom}}}`, this.data[datom])
        })

        let el = document.getElementById(this.name).innerHTML

        if (el) {
            el.innerHTML = render
        }
    }

    
}