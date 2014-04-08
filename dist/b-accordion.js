(function () {
    var PANEL_HEADER_CLASS = '.b-collapsible-header';
    var BAccordionPrototype = Object.create(BSelectable.prototype, {
            elementRole: { value: 'tablist' },
            elementLabel: { value: 'Accordion' },
            itemsRole: { value: 'tabpanel' },
            headersRole: { value: 'tab' },
            handleAria: {
                enumerable: true,
                value: function () {
                    this._super.handleAria.call(this);
                    this.getItems().forEach(function (panel) {
                        panel.setAttribute('aria-expanded', 'false');
                        panel.setAttribute('aria-hidden', 'true');
                        panel.querySelector(PANEL_HEADER_CLASS).setAttribute('role', this.headersRole);
                    }, this);
                }
            },
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
                    var oldItem = this.getItem(oldValue), newItem = this.getItem(newValue);
                    this._super.selectedChanged.call(this, oldValue, newValue);
                    if (oldValue !== null) {
                        oldItem.removeAttribute('active');
                        oldItem.setAttribute('aria-expanded', 'false');
                        oldItem.setAttribute('aria-hidden', 'true');
                    }
                    newItem.setAttribute('active', '');
                    newItem.setAttribute('aria-expanded', 'true');
                    newItem.setAttribute('aria-hidden', 'false');
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