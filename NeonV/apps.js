class NeonXApp {
    start() {

    }
}

class NeonVApp {
    async setMeta(_url) {
        this.metaURL = _url;
        this.urlPrefix = ";"
        if (this.metaURL.indexOf("http") != 0) {
            this.urlPrefix = _url.substring(0, _url.lastIndexOf("\\") == -1 ? _url.lastIndexOf("/") + 1 : _url.lastIndexOf("\\"));
        }
        await $.getJSON(this.metaURL, (json) => this.meta = json);
        return this;
    }

    setWindowObject(_object) {
        this.windowObject = _object;
        return this;
    }

    setIFrame(_object) {
        this.iframe = _object;
        return this;
    }

    start() {
        this.uuid = uuidv4();
        globalAppHandler.register(this);
        let container = document.createElement("div")
        container.style.animation = "fade-in 0.5s"
        container.classList.add("d-flex", "flex-column", "neonapp", "neonvapp", this.uuid);
        container.style.backgroundColor = this.meta.windowColor ? this.meta.windowColor == "" ? theme.windowBg : this.meta.windowColor : theme.windowBg;
        container.style.backdropFilter = "blur(60px) saturate(4)"
        container.style.borderRadius = "10px 10px 0 0";
        container.style.overflow = "hidden"
        container.style.position = "absolute"
        container.style.boxShadow = "0px 0px 17px 5px rgba(0,0,0,0.33)"
        let header = document.createElement("div");
        header.classList.add("d-flex");
        header.style.padding = "7px"
        header.style.backgroundColor = this.meta.windowHeaderColor ? this.meta.windowHeaderColor == "" ? theme.windowHeaderBg : this.meta.windowHeaderColor : theme.windowHeaderBg;
        let iconContainer = document.createElement("div")
        iconContainer.style.marginRight = "7px";
        let icon = document.createElement("img");
        icon.src = this.meta.icon.indexOf("http") == -1 ? this.urlPrefix + this.meta.icon : this.meta.icon;
        icon.style.width = "30px";
        iconContainer.appendChild(icon);
        header.appendChild(iconContainer);
        let titleContainer = document.createElement("div");
        titleContainer.style.color = theme.windowTitle;
        let titleSpan = document.createElement("span");
        titleSpan.appendChild(document.createTextNode(this.meta.name ? this.meta.name == "" ? "Unnamed Window" : this.meta.name : "Unnamed Window")); 
        titleSpan.classList.add("align-middle")
        titleSpan.style.fontWeight = "700"
        titleContainer.appendChild(titleSpan);
        header.appendChild(titleContainer);

        let buttonContainer = document.createElement("div")
        buttonContainer.classList.add("d-flex", "ml-auto");
        let closeContainer = document.createElement("div");
        let closeSpan = document.createElement("span");
        closeSpan.classList.add("align-middle")
        closeSpan.innerHTML = "<i class=\"fas fa-times\"></i>"
        closeContainer.appendChild(closeSpan);
        $(closeSpan).on("click", () => { this.stop(); })
        buttonContainer.appendChild(closeContainer);
        buttonContainer.style.marginRight = "7px";
        buttonContainer.style.color = theme.windowTitle
        header.appendChild(buttonContainer);

        container.appendChild(header);

        let iframe = document.createElement("iframe");
        iframe.src = this.meta.mainFile.indexOf("http") == 0 ? this.meta.mainFile : this.urlPrefix + this.meta.mainFile;
        iframe.style.border = "none";if (this.meta.defaultSize) {
            iframe.style.height = this.meta.defaultSize.y;
            iframe.style.width = this.meta.defaultSize.x;
        }
        container.appendChild(iframe);

        

        document.body.appendChild(container);
        this.setWindowObject(container);
        this.setIFrame(iframe)

        if (!this.meta.fixedSize) {
            $(container).resizable({
                containment: "body",
                minHeight: 44,
                minWidth: 280
            });            
        }

        $(container).draggable({
            containment: "body"
        });

        
        $(container).resize(_.debounce(() => {
            $(this.iframe).css("width", "100%");
            $(this.iframe).css("height", "100%");
        }, 200));
    }

    stop() {
        globalAppHandler.unregister(this);
        let animationEvent = whichAnimationEvent();
        for (let i = 0; i < document.getElementsByClassName(this.uuid).length; i++) {
            document.getElementsByClassName(this.uuid)[i].style.animation = "fade-out 0.5s";
        }
        $(this.windowObject).one(animationEvent, (event) => $(this.windowObject).remove())
        return delete this;
    }
}

