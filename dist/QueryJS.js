//
//  QueryJS.ts - Query JavaScript, a mininimal replacement for jQuery as a wrapper for querySelector and QuerySelectorAll.
//
//  Copyright (c) 2019 Aaron Nathaniel Gray -
//  Intellectual Property of Aaron Nathaniel Gray, only releasable under commercial license.
//
import "../../components/QueryJS/utils.js";
const isIE = navigator && navigator.userAgent.indexOf(' MSIE ') > -1;
const isEdge = navigator && /(edge)\/((\d+)?[\w\.]+)/i.exec(navigator.userAgent);
var QueryJS;
(function (QueryJS) {
    class Element {
        constructor(selector, parent) {
            var element;
            if (selector instanceof String) {
                if (parent instanceof Element && parent.element)
                    element = parent.element.querySelector(selector);
                else if (parent instanceof globalThis.Element)
                    element = parent.querySelector(selector);
                else
                    element = document.querySelector(selector);
            }
            else if (selector instanceof HTMLElement || selector instanceof globalThis.Element || selector instanceof Node)
                element = selector;
            else if (parent instanceof Element && parent.element)
                element = parent.element.querySelector(selector);
            else if (parent instanceof globalThis.Element)
                element = parent.querySelector(selector);
            else
                element = document.querySelector(selector);
            if (element !== null)
                this.element = element;
            else
                throw "error: Must not be null";
        }
        $(selector) {
            return new Element(selector, this.element);
        }
        $$(selector) {
            return new Elements(selector, this.element);
        }
        is(selector) {
            if (this.element != null && this.element.parentElement != null)
                return Array.from(this.element.parentElement.querySelectorAll(selector)).includes(this.element); // !!!
            else
                return false;
        }
        html(value) {
            if (value) {
                this.element.innerHTML = value;
                return this;
            }
            else
                return this.element.innerHTML;
        }
        text(value) {
            if (value) {
                this.element.innerText = value;
                return this;
            }
            else
                return this.element.innerText;
        }
        attr(name, value) {
            if (value) {
                this.element.setAttribute(name, value);
                return this;
            }
            else
                return this.element.getAttribute(name);
        }
        prop(key, value) {
            if (value) {
                this.element[key] = value; // ???
                return this;
            }
            else
                return this.element[key]; // ???
        }
        css(key, value) {
            if (value) {
                this.element.style[key.kebabToCamelCase()] = value;
                return this;
            }
            else
                return this.element.style[key.kebabToCamelCase()];
        }
        // classes
        addClass(classes) {
            this.element.classList.add(...[classes].flat());
            return this;
        }
        removeClass(classes) {
            this.element.classList.remove(...[classes].flat());
            return this;
        }
        toggleClass(classes, force = undefined) {
            var element = this.element;
            if (classes instanceof Array)
                [...[classes].flat()].forEach((cls) => {
                    element.classList.toggle(cls, force);
                });
            else
                element.classList.toggle(classes, force);
            return this;
        }
        hasClass(cls) {
            return this.element.classList.contains(cls);
        }
        replaceClass(oldClass, newClass) {
            this.element.classList.replace(oldClass, newClass);
        }
        getClasses() {
            return this.element.classList.value.split(isEdge ? ',' : ' '); // NOTE: Modified for Edge
        }
        //  Events
        /**
         * Registers an event handler to a specific event type on the element.
         **/
        on(event, listener, options) {
            this.element.addEventListener(event, listener, options);
            return this;
        }
        /**
         * Registers an event handler to a specific event type on the element
         * to be triggered oce only then cleared.
         **/
        once(event, listener, options) {
            if (!isIE) {
                options = options || { once: true };
                return this.element.addEventListener(event, listener, options);
            }
            else {
                var _this = this;
                return this.element.addEventListener(event, (evt) => {
                    _this.element.removeEventListener(event, listener, options);
                    listener(evt);
                }, options);
            }
        }
        /**
         * Removes an event listener from the element.
         **/
        off(event, listener, options) {
            this.element.removeEventListener(event, listener, options);
            return this;
        }
        /**
         * Dispatches an event to this element.
         **/
        dispatch(event) {
            return this.element.dispatchEvent(event);
        }
        // EventTarget
        /**
         * Registers an event handler to a specific event type on the element.
         **/
        addEventListener(event, listener, options) {
            return this.element.addEventListener(event, listener, options);
        }
        /**
         * Removes an event listener from the element.
         **/
        removeEventListener(event, listener, options) {
            return this.element.removeEventListener(event, listener, options);
        }
        /**
         * Dispatches an event to this element.
         **/
        dispatchEvent(event) {
            return this.element.dispatchEvent(event);
        }
        // Node
        // accessors
        /**
         * Returns a DOMString representing the base URL. The concept of base URL
         * changes from one language to another; in HTML, it corresponds to the
         * protocol, the domain name and the directory structure, that is all until
         * the last '/'.
         **/
        get baseURI() {
            return this.element.baseURI;
        }
        /**
         * Returns a live NodeList containing all the children of this node.
         * NodeList being live means that if the children of the Node change,
         * the NodeList object is automatically updated.
         **/
        get childNodes() {
            return Array.from(this.element.childNodes);
        }
        /**
         * Returns a live NodeList containing all the children of this node.
         * NodeList being live means that if the children of the Node change,
         * the NodeList object is automatically updated.
         **/
        get _childNodes() {
            return this.element.childNodes;
        }
        /**
         * Returns a Node representing the first direct child node of the node,
         * or null if the node has no child.
         **/
        get firstChild() {
            return new Element(this.element.firstChild);
        }
        /**
         * Returns a boolean indicating whether or not the Node is connected
         * (directly or indirectly) to the context object, e.g. the Document
         * object in the case of the normal DOM, or the ShadowRoot in the case
         * of a shadow DOM.
         **/
        get isConnected() {
            return this.element.isConnected;
        }
        /**
         * Returns a Node representing the last direct child node of the node,
         * or null if the node has no child.
         **/
        get lastChild() {
            return this.element.lastChild;
        }
        /**
         * Returns a Node representing the next node in the tree, or null if there
         * isn't such node.
         **/
        get nextSibling() {
            return this.element.nextSibling;
        }
        /**
         * Returns a DOMString containing the name of the Node. The structure of
         * the name will differ with the node type. E.g. An HTMLElement will
         * contain the name of the corresponding tag, like 'audio' for an
         * HTMLAudioElement, a Text node will have the '#text' string, or a
         * Document node will have the '#document' string.
         **/
        get nodeName() {
            return this.element.nodeName;
        }
        /**
         * Returns an unsigned short representing the type of the node. Possible values are:
         *
         *  ELEMENT_NODE	            1<br/>
         *  ATTRIBUTE_NODE 	            2<br/>
         *  TEXT_NODE	                3<br/>
         *  CDATA_SECTION_NODE	        4<br/>
         *  ENTITY_REFERENCE_NODE 	    5<br/>
         *  ENTITY_NODE 	            6<br/>
         *  PROCESSING_INSTRUCTION_NODE	7<br/>
         *  COMMENT_NODE	            8<br/>
         *  DOCUMENT_NODE	            9<br/>
         *  DOCUMENT_TYPE_NODE	        10<br/>
         *  DOCUMENT_FRAGMENT_NODE	    11<br/>
         *  NOTATION_NODE 	            12<br/>
         **/
        get nodeType() {
            return this.element.nodeType;
        }
        /**
         * Returns the value of the current node
         **/
        get nodeValue() {
            return this.element.nodeValue;
        }
        /**
         * Sets the value of the current node
         **/
        set nodeValue(value) {
            this.element.nodeValue = value;
        }
        /**
         * Returns the Document that this node belongs to. If the node is itself a
         * document, returns null.
         **/
        get ownerDocument() {
            return this.element.ownerDocument;
        }
        /**
         * Returns an Element that is the parent of this node. If the node has no
         * parent, or if that parent is not an Element, this property returns null.
         **/
        get parentElement() {
            return this.element.parentElement;
        }
        /**
         * Returns a Node that is the parent of this node. If there is no such node,
         * like if this node is the top of the tree or if doesn't participate in a
         * tree, this property returns null.
         **/
        get parentNode() {
            return this.element.parentNode;
        }
        /**
         * Returns a Node representing the previous node in the tree, or null if
         * there isn't such node.
         **/
        get previousSibling() {
            return this.element.previousSibling;
        }
        /**
         * Returns the textual content of an element and all its descendants.
         **/
        get textContent() {
            return this.element.textContent;
        }
        // Node
        // Methods
        /**
         * Adds the specified childNode argument as the last child to the current
         * node. If the argument referenced an existing node on the DOM tree, the
         * node will be detached from its current position and attached at the new
         * position.
         **/
        appendChild(child) {
            return this.element.appendChild(child);
        }
        /**
         * Clone a Node, and optionally, all of its contents. By default, it clones
         * the content of the node.
         **/
        cloneNode(deep = false) {
            return this.element.cloneNode(deep);
        }
        /**
         * Compares the position of the current node against another node in any
         * other document.
         **/
        compareDocumentPosition(other) {
            return this.element.compareDocumentPosition(other);
        }
        /**
         * Returns a Boolean value indicating whether a node is a descendant of a
         * given node or not.
         **/
        contains(node) {
            return this.element.contains(node);
        }
        /**
         * Returns the context object's root which optionally includes the shadow
         * root if it is available.
         **/
        getRootNode(options) {
            return this.element.getRootNode(options);
        }
        /**
         * Returns a Boolean indicating if the element has any child nodes, or not.
         **/
        hasChildNodes() {
            return this.element.hasChildNodes();
        }
        /**
         * Inserts a Node before the reference node as a child of a specified parent
         * node.
         **/
        insertBefore(newChild, refChild) {
            return this.element.insertBefore(newChild, refChild);
        }
        /**
         * Accepts a namespace URI as an argument and returns a Boolean with a value
         * of true if the namespace is the default namespace on the given node or
         * false if not.
         **/
        isDefaultNamespace(namespace) {
            return this.element.isDefaultNamespace(namespace);
        }
        /**
         * Returns a Boolean which indicates whether or not two nodes are of the same
         * type and all their defining data points match.
         **/
        isEqualNode(other) {
            return this.element.isEqualNode(other);
        }
        /**
         * Returns a Boolean value indicating whether or not the two nodes are the
         * same (that is, they reference the same object).
         **/
        isSameNode(other) {
            return this.element.isSameNode(other);
        }
        /**
         * Returns a DOMString containing the prefix for a given namespace URI, if
         * present, and null if not. When multiple prefixes are possible, the
         * result is implementation-dependent.
         **/
        lookupPrefix(namespace) {
            return this.element.lookupPrefix(namespace);
        }
        /**
         * Accepts a prefix and returns the namespace URI associated with it on
         * the given node if found (and null if not). Supplying null for the
         * prefix will return the default namespace.
         **/
        lookupNamespaceURI(prefix) {
            return this.element.lookupNamespaceURI(prefix);
        }
        /**
         * Clean up all the text nodes under this element (merge adjacent,
         * remove empty).
         **/
        normalize() {
            this.element.normalize();
        }
        /**
         * Removes a child node from the current element, which must be a child of
         * the current node.
         **/
        removeChild(oldChild) {
            return this.element.removeChild(oldChild);
        }
        /**
         * Replaces one child Node of the current one with the second one given in
         * parameter.
         **/
        replaceChild(oldChild, newChild) {
            return this.element.replaceChild(oldChild, newChild);
        }
        // ParentNode
        // Properties
        /**
         * Returns the number of children of this ParentNode which are elements.
         **/
        get childElementCount() {
            return this.element.childElementCount;
        }
        /**
         * Returns an array of Elements containing all of the Element objects that
         * are children of this ParentNode, omitting all of its non-element nodes.
         **/
        get children() {
            return new Elements(Array.from(this.element.children));
        }
        /**
         * Returns a live HTMLCollection containing all of the Element objects
         * that are children of this ParentNode, omitting all of its non-element
         * nodes.
         **/
        get _children() {
            return this.element.children;
        }
        /**
         * Returns the first node which is both a child of this ParentNode and
         * is also an Element, or null if there is none.
         **/
        get firstElementChild() {
            return new Element(this.element.firstElementChild);
        }
        /**
         * Returns the first node which is both a child of this ParentNode and
         * is also an Element, or null if there is none.
         **/
        get _firstElementChild() {
            return this.element.firstElementChild;
        }
        /**
         * Returns the last node which is both a child of this ParentNode and is
         * an Element, or null if there is none.
         **/
        get lastElementChild() {
            return new Element(this.element.lastElementChild);
        }
        /**
         * Returns the last node which is both a child of this ParentNode and is
         * an Element, or null if there is none.
         **/
        get _lastElementChild() {
            return this.element.lastElementChild;
        }
        // Methods
        /**
         * Inserts a set of Node objects or DOMString objects after the last child
         * of the ParentNode. DOMString objects are inserted as equivalent Text
         * nodes.
         **/
        append(...children) {
            return this.element.append(...children);
        }
        /**
         * Inserts a set of Node objects or DOMString objects before the first
         * child of the ParentNode. DOMString objects are inserted as equivalent
         * Text nodes.
         **/
        prepend(...children) {
            return this.element.append(...children);
        }
        // ChildNode
        /**
         * Inserts a set of Node or DOMString objects in the children list of
         * this ChildNode's parent, just after this ChildNode. DOMString
         * objects are inserted as equivalent Text nodes.
         * @exception HierarchyRequestError: Node cannot be inserted at the
         * specified point in the hierarchy.
         **/
        after(...nodes) {
            this.element.after(...nodes);
        }
        /**
         * Inserts a set of Node or DOMString objects in the children list of
         * this ChildNode's parent, just before this ChildNode. DOMString
         * objects are inserted as equivalent Text nodes.
         * @exception HierarchyRequestError: Node cannot be inserted at the
         * specified point in the hierarchy.
         **/
        before(...nodes) {
            this.element.before(...nodes);
        }
        /**
         * Removes the element from the children list of its parent.
         **/
        remove() {
            this.element.remove();
        }
        /**
         * Replaces this ChildNode in the children list of its parent with a
         * set of Node or DOMString objects. DOMString objects are inserted
         * as equivalent Text nodes.
         * @exception HierarchyRequestError: Node cannot be inserted at the
         * specified point in the hierarchy.
         **/
        replaceWith(...nodes) {
            this.element.replaceWith(...nodes);
        }
        // Element
        // Properties
        /**
         * Returns an object containing the assigned attributes of the corresponding
         * HTML element.
         * @return Returns a JavaScript Object
         **/
        get attributes() {
            return Object.from(this.element.attributes);
        }
        /**
         * Returns a NamedNodeMap object containing the assigned attributes of the
         * corresponding HTML element.
         **/
        get _attributes() {
            return this.element.attributes;
        }
        /**
         * Returns a string or array of strings containing the list of class attributes.
         **/
        get classList() {
            var classes = this.element.classList.value.split(' ');
            return classes.length == 1 ? classes[0] : classes;
        }
        /**
         * Takes a string or array of strings containing the list of class
         * attributes and sets classList property.
         **/
        set classList(classes) {
            this.element.classList.value = [classes].flat().join(' ');
        }
        /**
         * Returns a DOMTokenList containing the list of class attributes.
         **/
        get _classList() {
            return this.element.classList;
        }
        /**
         * Get the className property of the Element interface gets and sets the
         * value of the class attribute of the specified element.
         **/
        get className() {
            return this.element.className;
        }
        /**
         * Set the className property of the Element interface gets and sets the
         * value of the class attribute of the specified element.
         **/
        set className(name) {
            this.element.className = name;
        }
        /**
         * Returns a Number representing the inner height of the element.
         **/
        get clientHeight() {
            return this.element.clientHeight;
        }
        /**
         * Returns a Number representing the width of the left border of the element.
         **/
        get clientLeft() {
            return this.element.clientLeft;
        }
        /**
         * Returns a Number representing the width of the top border of the element.
         **/
        get clientTop() {
            return this.element.clientTop;
        }
        /**
         * Returns a Number representing the width of the left border of the element.
         **/
        get clientWidth() {
            return this.element.clientWidth;
        }
        /**
         * Get the id of the element.
         **/
        get id() {
            return this.element.id;
        }
        /**
         * Set the id of the element.
         **/
        set id(value) {
            this.element.id = value;
        }
        /**
         * Get the markup of the element's content.
         **/
        get innerHTML() {
            return this.element.innerHTML;
        }
        /**
         * Set the markup of the element's content.
         **/
        set innerHTML(value) {
            this.element.innerHTML = value;
        }
        /**
         * Get a string representing the local part of the qualified name of the element.
         **/
        get localName() {
            return this.element.localName;
        }
        /**
         * The namespace URI of the element, or null if it is no namespace.
         **/
        get namespaceURI() {
            return this.element.namespaceURI;
        }
        /**
         * Returns the Element immediately following this node in its parent's
         * children list, or null if there is no Element in the list following
         * this node.
         * TODO: Check if valid on Element
         **/
        get nextElementSibling() {
            return new Element(this.element.nextElementSibling);
        }
        /**
         * Returns the Element immediately following this node in its parent's
         * children list, or null if there is no Element in the list following
         * this node.
         * TODO: Check if valid on Element
         **/
        get _nextElementSibling() {
            return this.element.nextElementSibling;
        }
        /**
         * Set a DOMString representing the markup of the element including its content.
         * When used as a setter, replaces the element with nodes parsed from the given
         * string.
         **/
        get outerHTML() {
            return this.element.outerHTML;
        }
        /**
         * Get a DOMString representing the markup of the element including its content.
         * When used as a setter, replaces the element with nodes parsed from the given
         * string.
         **/
        set outerHTML(value) {
            this.element.outerHTML = value;
        }
        /**
         * A DOMString representing the namespace prefix of the element, or null if no prefix
         * is specified.
         **/
        get prefix() {
            return this.element.prefix;
        }
        /**
         * Returns the Element immediately prior to this node in its parent's
         * children list, or null if there is no Element in the list prior to
         * this node.
         * TODO: Check if valid on Element
         **/
        get previousElementSibling() {
            return new Element(this.element.previousElementSibling);
        }
        /**
         * Returns the Element immediately prior to this node in its parent's
         * children list, or null if there is no Element in the list prior to
         * this node.
         * TODO: Check if valid on Element
         **/
        get _previousElementSibling() {
            return this.element.previousElementSibling;
        }
        /**
         * Returns a Number representing the scroll view height of an element.
         **/
        get scrollHeight() {
            return this.element.scrollHeight;
        }
        /**
         * Is a Number representing the left scroll offset of the element.
         **/
        get scrollLeft() {
            return this.element.scrollLeft;
        }
        /**
         * A Number representing number of pixels the top of the document is
         * scrolled vertically.
         **/
        get scrollTop() {
            return this.element.scrollTop;
        }
        /**
         * Returns a Number representing the scroll view width of the element.
         **/
        get scrollWidth() {
            return this.element.scrollWidth;
        }
        /**
         * Returns the open shadow root that is hosted by the element, or null if
         * no open shadow root is present.
         **/
        get shadowRoot() {
            return this.element.shadowRoot;
        }
        /**
         * Returns the name of the shadow DOM slot the element is inserted in.
         * EXPERIMENTAL
         **/
        get slot() {
            return this.element.slot;
        }
        /**
         * Returns a String with the name of the tag for the given element.
         **/
        get tagName() {
            return this.element.tagName;
        }
        // Element
        // Methods
        /**
         * Attatches a shadow DOM tree to the specified element and returns a
         * reference to its ShadowRoot.
         **/
        attachShadow(init) {
            return this.element.attachShadow(init);
        }
        /**
         * A shortcut method to create and run an animation on an element. Returns
         * the created Animation object instance.
         **/
        animate(keyframes, options) {
            return this.element.animate(keyframes, options);
        }
        /**
         * Returns the Element which is the closest ancestor of the current element
         * (or the current element itself) which matches the selectors given in
         * parameter.
         **/
        closest(selector) {
            return new Element(this.element.closest(selector));
        }
        /**
         * Returns the Element which is the closest ancestor of the current element
         * (or the current element itself) which matches the selectors given in
         * parameter.
         **/
        _closest(selector) {
            return this.element.closest(selector);
        }
        /**
         * Returns an array of Animation objects currently active on the element.
         **/
        getAnimations() {
            return this.element.getAnimations();
        }
        /**
         * Retrieves the value of the named attribute from the current node and
         * returns it as an Object.
         **/
        getAttribute(key) {
            return this.element.getAttribute(key);
        }
        /**
         * Returns an array of attribute names from the current element.
         **/
        getAttributeNames() {
            return this.element.getAttributeNames();
        }
        /**
         * Retrieves the value of the attribute with the specified name and
         * namespace, from the current node and returns it as an Object.
         **/
        getAttributeNS(namespace, key) {
            return this.element.getAttributeNS(namespace, key);
        }
        /**
         * Returns the size of an element and its position relative to the viewport.
         **/
        getBoundingClientRect() {
            return this.element.getBoundingClientRect();
        }
        /**
         * Returns a collection of rectangles that indicate the bounding rectangles
         * for each line of text in a client.
         **/
        getClientRects() {
            return this.element.getClientRects();
        }
        /**
         * Returns a live HTMLCollection that contains all descendants of the
         * current element that possess the list of classes given in the parameter.
         **/
        getElementsByClassName(classes) {
            return new Elements(Array.from(this.element.getElementsByClassName((classes instanceof Array) ? classes.join(' ') : classes)));
        }
        /**
         * Returns a live HTMLCollection that contains all descendants of the
         * current element that possess the list of classes given in the parameter.
         **/
        _getElementsByClassName(classes) {
            classes = (classes instanceof Array) ? classes.join(" ") : classes;
            return this.element.getElementsByClassName(classes);
        }
        /**
         * Returns a live HTMLCollection that contains all descendants of the current
         * element that possess the list of classes given in the parameter.
         **/
        getElementsByTagName(tag) {
            return new Elements(Array.from(this.element.getElementsByTagName(tag)));
        }
        /**
         * Returns a live HTMLCollection that contains all descendants of the current
         * element that possess the list of classes given in the parameter.
         **/
        _getElementsByTagName(tag) {
            return Array.from(this.element.getElementsByTagName(tag));
        }
        /**
         * Returns a live HTMLCollection containing all descendant elements, of a
         * particular tag name, from the current element.
         **/
        getElementsByTagNameNS(namespace, tag) {
            return new Elements(Array.from(this.element.getElementsByTagNameNS(namespace, tag)));
        }
        /**
         * Returns a live HTMLCollection containing all descendant elements, of a
         * particular tag name, from the current element.
         **/
        _getElementsByTagNameNS(namespace, tag) {
            return Array.from(this.element.getElementsByTagNameNS(namespace, tag));
        }
        /**
         * Returns a Boolean indicating if the element has the specified attribute or not.
         **/
        hasAttribute(key) {
            return this.element.hasAttribute(key);
        }
        /**
         * Returns a Boolean indicating if the element has the specified attribute,
         * in the specified namespace, or not.
         **/
        hasAttributeNS(namespace, key) {
            return this.element.hasAttributeNS(namespace, key);
        }
        /**
         * Returns a Boolean indicating if the element has the specified attribute
         * or not.
         **/
        hasAttributes() {
            return this.element.hasAttributes();
        }
        /**
         * Indicates whether the element on which it is invoked has pointer capture
         * for the pointer identified by the given pointer ID.
         **/
        hasPointerCapture(pointerId) {
            return this.element.hasPointerCapture(pointerId);
        }
        /**
         * Inserts a given element node at a given position relative to the
         * element it is invoked upon.
         **/
        insertAdjacentElement(position, element) {
            return new Element(this.element.insertAdjacentElement(position, element));
        }
        /**
         * Inserts a given element node at a given position relative to the
         * element it is invoked upon.
         **/
        _insertAdjacentElement(position, element) {
            return this.element.insertAdjacentElement(position, element);
        }
        /**
         * Parses the text as HTML or XML and inserts the resulting nodes into the
         * tree in the position given.
         **/
        insertAdjacentHTML(position, text) {
            this.element.insertAdjacentHTML(position, text);
            return this;
        }
        /**
         * Inserts a given text node at a given position relative to the element
         * it is invoked upon.
         **/
        insertAdjacentText(position, text) {
            this.element.insertAdjacentHTML(position, text);
            return this;
        }
        /**
         * Returns a Boolean indicating whether or not the element would be
         * selected by the specified selector string.
         **/
        matches(selector) {
            return this.element.matches(selector);
        }
        /**
         * Returns the first Element with the current element as root that matches
         * the specified group of selectors.
         **/
        querySelector(selector) {
            return new Element(this.element.querySelector(selector));
        }
        /**
         * Returns the first Element with the current element as root that matches
         * the specified group of selectors.
         **/
        _querySelector(selector) {
            return this.element.querySelector(selector);
        }
        /**
         * Returns a NodeList representing a list of elements with the current
         * element as root that matches the specified group of selectors.
         **/
        querySelectorAll(selector) {
            return new Elements(Array.from(this.element.querySelectorAll(selector)));
        }
        /**
         * Returns a NodeList representing a list of elements with the current
         * element as root that matches the specified group of selectors.
         **/
        _querySelectorAll(selector) {
            return Array.from(this.element.querySelectorAll(selector));
        }
        /**
         * Releases (stops) pointer capture that was previously set for a specific
         * pointer event.
         **/
        releasePointerCapture(pointerId) {
            this.element.releasePointerCapture(pointerId);
        }
        /**
         * Removes the named attribute from the current node.
         **/
        removeAttribute(key) {
            this.element.removeAttribute(key);
            return this;
        }
        /**
         * Removes the attribute with the specified name and namespace, from the
         * current node.
         **/
        removeAttributeNS(namespace, key) {
            this.element.removeAttributeNS(namespace, key);
            return this;
        }
        /**
         * Asynchronously asks the browser to make the element full-screen.
         * EXPERIMENTAL
         **/
        requestFullscreen(options) {
            return this.element.requestFullscreen(options);
        }
        /**
         * Allows to asynchronously ask for the pointer to be locked on the given
         * element.
         * EXPERIMENTAL
         **/
        requestPointerLock() {
            this.element.requestPointerLock();
        }
        /**
         * Scrolls to a particular set of coordinates inside a given element.
         **/
        scroll(coord, y) {
            if (coord instanceof Object)
                this.element.scroll(coord);
            else if (y)
                this.element.scroll(coord, y);
            else
                throw "Error: invalid y coordinate";
        }
        /**
         * Scrolls an element by the given amount.
         **/
        scrollBy(coord, y) {
            if (coord instanceof Object)
                this.element.scrollBy(coord);
            else if (y)
                this.element.scroll(coord, y);
            else
                throw "Error: invalid y coordinate";
        }
        /**
         * Scrolls the page until the element gets into the view.
         **/
        scrollIntoView(arg) {
            this.element.scrollIntoView(arg);
            return this;
        }
        /**
         * Scrolls to a particular set of coordinates inside a given element.
         **/
        scrollTo(coord, y) {
            if (coord instanceof Object)
                this.element.scrollTo(coord);
            else if (y)
                this.element.scroll(coord, y);
            else
                throw "Error: invalid y coordinate";
        }
        /**
         * Sets the value of a named attribute of the current node.
         **/
        setAttribute(key, value) {
            this.element.setAttribute(key, value);
            return this;
        }
        /**
         * Sets the value of the attribute with the specified name and namespace,
         * from the current node.
         **/
        setAttributeNS(namespace, key, value) {
            this.element.setAttributeNS(namespace, key, value);
            return this;
        }
        /**
         * Designates a specific element as the capture target of future pointer events.
         **/
        setPointerCapture(pointerId) {
            this.element.setPointerCapture(pointerId);
        }
        /**
         * Toggles a boolean attribute, removing it if it is present and adding it if it is not present, on the specified element.
         * @return true if attribute **key** is eventually present, and false otherwise.
         **/
        toggleAttribute(key, force) {
            return this.element.toggleAttribute(key, force);
        }
        // HTMLElement
        // Properties
        /**
         * Returns a DOMString containing the element's assigned access key.
         **/
        get accessKey() {
            return this.element.accessKey;
        }
        /**
         * Is the element's 'contenteditable' attribute set ?
         **/
        get contentEditable() {
            return (this.element.contentEditable == "true");
        }
        /**
         * Set the 'contenteditable' attribute of the element.
         **/
        set contentEditable(value) {
            this.element.contentEditable = value ? "true" : "false";
        }
        /**
         * Returns a DOMStringMap with which script can read and write the
         * element's custom data attributes (data-*) .
         **/
        get dataset() {
            return Object.from(this.element.dataset);
        }
        /**
         * Returns a DOMStringMap with which script can read and write the
         * element's custom data attributes (data-*) .
         **/
        get _dataset() {
            return this.element.dataset;
        }
        /**
         * Is a string, reflecting the dir global attribute, representing the
         * directionality of the element. Possible values are "ltr", "rtl",
         * and "auto".
         **/
        get dir() {
            return this.element.dir;
        }
        /**
         * Is a string, reflecting the dir global attribute, representing the
         * directionality of the element. Possible values are "ltr", "rtl",
         * and "auto".
         **/
        set dir(value) {
            this.element.dir = value;
        }
        /**
         * Is a Boolean indicating if the element can be dragged.
         **/
        get draggable() {
            return this.element.draggable;
        }
        /**
         * Is a Boolean indicating if the element can be dragged.
         **/
        set draggable(value) {
            this.element.draggable = value;
        }
        /**
         * Is a Boolean indicating if the element is hidden or not.
         **/
        get hidden() {
            return this.element.hidden;
        }
        /**
         * Is a Boolean indicating if the element is hidden or not.
         **/
        set hidden(value) {
            this.element.hidden = value;
        }
        /**
         * Represents the "rendered" text content of a node and its descendants.
         * As a getter, it approximates the text the user would get if they
         * highlighted the contents of the element with the cursor and then
         * copied it to the clipboard.
         **/
        get innerText() {
            return this.element.innerText;
        }
        /**
         * Set the innerText property of the HTMLElement interface which represents
         * the "rendered" text content of a node and its descendants.
         **/
        set innerText(value) {
            this.element.innerText = value;
        }
        /**
         * Returns a Boolean that indicates whether or not the content of the
         * element can be edited.
         **/
        get isContentEditable() {
            return this.element.isContentEditable;
        }
        /**
         * Get a string representing the language of an element's attributes,
         * text, and element contents.
         **/
        get lang() {
            return this.element.lang;
        }
        /**
         * Set a string representing the language of an element's attributes,
         * text, and element contents.
         **/
        set lang(value) {
            this.element.lang = value;
        }
        /**
         * Returns the cryptographic number used once that is used by Content
         * Security Policy to determine whether a given fetch will be allowed
         * to proceed.
         **/
        get nonce() {
            return this.element.nonce;
        }
        /**
         * Returns a double containing the height of an element, relative to the
         * layout.
         **/
        get offsetHeight() {
            return this.element.offsetHeight;
        }
        /**
         * Returns a double, the distance from this element's left border to its
         * offsetParent's left border.
         **/
        get offsetLeft() {
            return this.element.offsetLeft;
        }
        /**
         * Returns a Element that is the element from which all offset calculations
         * are currently computed.
         **/
        get offsetParent() {
            return new Element(this.element.offsetParent);
        }
        /**
         * Returns a Element that is the element from which all offset calculations
         * are currently computed.
         **/
        get _offsetParent() {
            return this.element.offsetParent;
        }
        /**
         * Returns a double, the distance from this element's top border to its
         * offsetParent's top border.
         **/
        get offsetTop() {
            return this.element.offsetTop;
        }
        /**
         * Returns a double containing the width of an element, relative to the
         * layout.
         **/
        get offsetWidth() {
            return this.element.offsetWidth;
        }
        /**
         * Get the style attribute to be applied to the element.
         **/
        get style() {
            return this.element.style;
        }
        /**
         * Get a number representing the position of the element in the tabbing
         * order.
         **/
        get tabIndex() {
            return this.element.tabIndex;
        }
        /**
         * Set a number representing the position of the element in the tabbing
         * order.
         **/
        set tabIndex(value) {
            this.element.tabIndex = value;
        }
        /**
         * Is a DOMString containing the text that appears in a popup box when
         * mouse is over the element
         **/
        get title() {
            return this.element.title;
        }
        // Methods
        /**
         * Removes keyboard focus from the currently focused element.
         **/
        blur() {
            this.element.blur();
            return this;
        }
        /**
         * Sends a mouse click event to the element.
         **/
        click() {
            this.element.click();
            return this;
        }
        /**
         * Makes the element the current keyboard focus.
         **/
        focus() {
            this.element.focus();
            return this;
        }
    }
    QueryJS.Element = Element;
    class Elements {
        constructor(selector, parent) {
            this.forEach = this.each;
            var selection = null;
            if (selector instanceof Array) {
                if (selector.length) {
                    if (selector[0] instanceof globalThis.Element || selector[0] instanceof HTMLElement || selector[0] instanceof Node)
                        selection = selector;
                    else if (selector[0] instanceof Element)
                        selection = selector.map((queryjs) => { return queryjs.element; });
                }
                else
                    selection = null;
            }
            else if (parent instanceof Element)
                selection = Array.from(parent.element.querySelectorAll(selector));
            else if (parent)
                selection = Array.from(parent.querySelectorAll(selector));
            else
                selection = Array.from(document.querySelectorAll(selector));
            if (selection)
                this.selection = selection;
            else
                throw "Error: bad selector";
        }
        get length() {
            return this.selection.length;
        }
        $(selector) {
            return new Elements(this.selection.map(function (element) { return new Element(selector, element); }));
        }
        $$(selector) {
            return new Elements(this.selection.map(function (element) { return new Elements(selector, element); }).flat());
        }
        //
        each(fn, ...args) {
            this.selection.forEach((element, index, array) => {
                var _args = args;
                fn.apply(new Element(element), _args);
            }, this);
        }
        map(fn, ...args) {
            return this.selection.map((element, index, array) => {
                var _args = args;
                return fn.apply(new Element(element), _args);
            }, this);
        }
        //
        html(value) {
            if (value) {
                this.selection.map(function (element) { element.innerHTML = value; });
                return this;
            }
            else
                return this.selection.map(function (element) { return element.innerHTML; });
        }
        text(value) {
            if (value) {
                this.selection.map(function (element) { element.innerText = value; });
                return this;
            }
            else
                return this.selection.map(function (element) { return element.innerText; });
        }
        attr(name, value) {
            if (value) {
                this.selection.map(function (element) { element.setAttribute(name, value); });
                return this;
            }
            else
                return this.selection.map(function (element) { return element.getAttribute(name); });
        }
        prop(key, value) {
            if (value) {
                this.selection.map(function (element) { element[key] = value; });
                return this;
            }
            else
                return this.selection.map(function (element) { return element[key]; });
        }
        css(key, value) {
            if (value) {
                this.selection.map(function (element) { element.style[key.kebabToCamelCase()] = value; });
                return this;
            }
            else
                return this.selection.map(function (element) { return element.style[key.kebabToCamelCase()]; });
        }
        /**
         * Get the style attribute to be applied to the element.
         **/
        get style() {
            if (this.selection.length > 1)
                return this.selection[0].style;
            else
                return this.selection.map(function (element) { return element.style; });
        }
        // classes
        addClass(classes) {
            this.selection.map(function (element, index, array) {
                element.classList.add(...[classes].flat());
            });
            return this;
        }
        removeClass(classes) {
            this.selection.map(function (element, index, array) {
                element.classList.remove(...[classes].flat());
            });
            return this;
        }
        toggleClass(classes, force) {
            this.selection.map(function (element, index, array) {
                if (classes instanceof Array)
                    [...[classes].flat()].forEach((cls) => {
                        element.classList.toggle(cls, force);
                    });
                else
                    element.classList.toggle(classes, force);
            });
            return this;
        }
        hasClass(cls) {
            return this.selection.map(function (element, index, array) {
                return element.classList.contains(cls);
            });
        }
        replaceClass(oldClass, newClass) {
            this.selection.map(function (element, index, array) {
                element.classList.replace(oldClass, newClass);
            });
            return this;
        }
        getClasses() {
            return this.selection.map(function (element, index, array) {
                return element.classList.value.split(isEdge ? ',' : ' ');
            }).flat(); // NOTE: Modified for Edge
        }
        //  Events
        on(event, listener, options) {
            this.selection.map(function (element) { element.addEventListener(event, listener, options); });
            return this;
        }
        once(event, listener, options) {
            if (!isIE) {
                options = options || { once: true };
                return this.selection.map(function (element) {
                    return element.addEventListener(event, listener, options);
                });
            }
            else {
                return this.selection.map(function (element) {
                    return element.addEventListener(event, (evt) => {
                        element.removeEventListener(event, listener, options);
                        listener(evt);
                    });
                }, options);
            }
        }
        off(event, listener, options) {
            this.selection.map(function (element) { element.removeEventListener(event, listener, options); });
            return this;
        }
        // EventTarget
        addEventListener(event, listener, options) {
            this.selection.map(function (element) { return element.addEventListener(event, listener, options); });
        }
        removeEventListener(event, listener, options) {
            this.selection.map(function (element) { return element.removeEventListener(event, listener, options); });
        }
        /**
         * Dispatches an event to these selected elements.
         **/
        dispatch(event) {
            return this.selection.map(function (element) { return element.dispatchEvent(event); });
        }
    }
    QueryJS.Elements = Elements;
    function $(selector, parent) {
        return new Element(selector, parent);
    }
    QueryJS.$ = $;
    function createDocumentFragment() {
        return document.createDocumentFragment();
    }
    QueryJS.createDocumentFragment = createDocumentFragment;
    function createElement(tag, attributes, content) {
        var element = document.createElement(tag);
        if (attributes) {
            for (let attribute of attributes)
                element.setAttribute(attribute, attributes[attribute]);
            if (content) {
                if (content instanceof Array)
                    for (let child in content)
                        element.appendChild(content[child]);
                else
                    element.appendChild(content);
            }
        }
        return element;
    }
    QueryJS.createElement = createElement;
    function createTextNode(text) {
        return document.createTextNode(text);
    }
    QueryJS.createTextNode = createTextNode;
    $.createDocumentFragment = QueryJS.createDocumentFragment;
    $.createElement = QueryJS.createElement;
    $.createTextNode = QueryJS.createTextNode;
    function $$(selector, parent) {
        return new Elements(selector, parent);
    }
    QueryJS.$$ = $$;
})(QueryJS || (QueryJS = {})); // End namespace QueryJS
const QueryJS_Element = QueryJS.Element;
const QueryJS_Elements = QueryJS.Elements;
const QueryJS_$ = QueryJS.$;
const QueryJS_$$ = QueryJS.$$;
export { QueryJS as default, QueryJS, QueryJS_Element as Element, QueryJS_Elements as Elements, QueryJS_$ as $, QueryJS_$$ as $$ };
//# sourceMappingURL=QueryJS.js.map
