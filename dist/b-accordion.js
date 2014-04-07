(function () {
    var BAccordionPrototype = Object.create(BSelectable.prototype, {
            clickHandler: {
                enumerable: true,
                value: function (e) {
                    e.stopPropagation();
                    if (e.target.nodeName !== 'B-COLLAPSIBLE') {
                        e = { target: e.target.parentElement };
                    }
                    this._super.clickHandler.call(this, e);
                }
            },
            selectedChanged: {
                enumerable: true,
                value: function (oldValue, newValue) {
                    this._super.selectedChanged.call(this, oldValue, newValue);
                    if (oldValue !== null) {
                        this.getItem(oldValue).removeAttribute('active');
                    }
                    this.getItem(newValue).setAttribute('active', '');
                }
            }
        });
    window.BAccordion = document.registerElement('b-accordion', { prototype: BAccordionPrototype });
    Object.defineProperty(BAccordion.prototype, '_super', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: BSelectable.prototype
    });
}());