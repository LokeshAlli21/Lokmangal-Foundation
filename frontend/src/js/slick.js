export class Utils {
    constructor(selector) {
        this.elements = Utils.getSelector(selector);
        this.element = this.get(0);
        return this;
    }

    attr(name, value) {
        if (value === undefined) {
            if (!this.element) {
                return '';
            }
            return this.element.getAttribute(name);
        }
        this.each((el) => {
            el.setAttribute(name, value);
        });
        return this;
    }
    find(selector) {
        return new Utils(Utils.getSelector(selector, this.element));
    }
    children() {
        return new Utils(this.element.children);
    }
    append(html) {
        this.each((el) => {
            if (typeof html === 'string') {
                el.insertAdjacentHTML('beforeend', html);
            } else {
                el.appendChild(html);
            }
        });
        return this;
    }
    empty() {
        this.each((el) => {
            el.innerHTML = '';
        });
        return this;
    }
    eq(index) {
        return new Utils(this.elements[index]);
    }
    trigger(event, detail) {
        if (!this.element) {
            return this;
        }
        const eventName = event.split('.')[0];
        const isNativeEvent =
            typeof document.body['on' + eventName] !== 'undefined';
        if (isNativeEvent) {
            this.each((el) => {
                el.dispatchEvent(new Event(eventName));
            });
            return this;
        }
        const customEvent = new CustomEvent(eventName, {
            detail: detail || null,
        });
        this.each((el) => {
            el.dispatchEvent(customEvent);
        });
        return this;
    }
    static getSelector(selector, context) {
        if (selector && typeof selector !== 'string') {
            if (selector.length !== undefined) {
                return selector;
            }
            return [selector];
        }
        context = context || document;

        // For performance reasons, use getElementById
        // eslint-disable-next-line no-control-regex
        const idRegex = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/;
        if (idRegex.test(selector)) {
            const el = document.getElementById(selector.substring(1));
            return el ? [el] : [];
        }
        return [].slice.call(context.querySelectorAll(selector) || []);
    }
    get(index) {
        if (index !== undefined) {
            return this.elements[index];
        }
        return this.elements;
    }
    each(func) {
        if (!this.elements.length) {
            return this;
        }
        this.elements.forEach((el, index) => {
            func.call(el, el, index);
        });
        return this;
    }
}

Utils.eventListeners = {};

export default function $utils(selector) {
    return new Utils(selector);
}