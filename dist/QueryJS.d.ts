import "./utils";
declare namespace QueryJS {
    type Selector = string;
    class Element {
        constructor(selector: Selector | globalThis.Element | HTMLElement | HTMLDocument | null, parent?: Element | ParentNode | HTMLElement);
        element: HTMLElement | globalThis.Element | HTMLDocument;
        $(selector: Selector): Element;
        $$(selector: Selector): Elements;
        is(selector: Selector): boolean;
        html(value?: string): string | Element;
        text(value?: string): string | this;
        attr(name: string, value?: string): string | this | null;
        prop(key: string, value?: string): any;
        css(key: string, value?: string): string | this;
        addClass(classes: string | string[]): this;
        removeClass(classes: string | string[]): this;
        toggleClass(classes: string | string[], force?: boolean | undefined): this;
        hasClass(cls: string): boolean;
        replaceClass(oldClass: string, newClass: string): void;
        getClasses(): string[];
        /**
         * Registers an event handler to a specific event type on the element.
         **/
        on<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options?: boolean | any): this;
        /**
         * Registers an event handler to a specific event type on the element
         * to be triggered oce only then cleared.
         **/
        once<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options?: any): void;
        /**
         * Removes an event listener from the element.
         **/
        off<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options?: boolean | any): this;
        /**
         * Dispatches an event to this element.
         **/
        dispatch(event: Event): boolean;
        /**
         * Registers an event handler to a specific event type on the element.
         **/
        addEventListener<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options?: boolean | any): void;
        /**
         * Removes an event listener from the element.
         **/
        removeEventListener<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options?: boolean | any): void;
        /**
         * Dispatches an event to this element.
         **/
        dispatchEvent(event: Event): boolean;
        /**
         * Returns a DOMString representing the base URL. The concept of base URL
         * changes from one language to another; in HTML, it corresponds to the
         * protocol, the domain name and the directory structure, that is all until
         * the last '/'.
         **/
        readonly baseURI: string;
        /**
         * Returns a live NodeList containing all the children of this node.
         * NodeList being live means that if the children of the Node change,
         * the NodeList object is automatically updated.
         **/
        readonly childNodes: ChildNode[];
        /**
         * Returns a live NodeList containing all the children of this node.
         * NodeList being live means that if the children of the Node change,
         * the NodeList object is automatically updated.
         **/
        readonly _childNodes: NodeListOf<ChildNode>;
        /**
         * Returns a Node representing the first direct child node of the node,
         * or null if the node has no child.
         **/
        readonly firstChild: Element;
        /**
         * Returns a boolean indicating whether or not the Node is connected
         * (directly or indirectly) to the context object, e.g. the Document
         * object in the case of the normal DOM, or the ShadowRoot in the case
         * of a shadow DOM.
         **/
        readonly isConnected: boolean;
        /**
         * Returns a Node representing the last direct child node of the node,
         * or null if the node has no child.
         **/
        readonly lastChild: ChildNode | null;
        /**
         * Returns a Node representing the next node in the tree, or null if there
         * isn't such node.
         **/
        readonly nextSibling: Node | null;
        /**
         * Returns a DOMString containing the name of the Node. The structure of
         * the name will differ with the node type. E.g. An HTMLElement will
         * contain the name of the corresponding tag, like 'audio' for an
         * HTMLAudioElement, a Text node will have the '#text' string, or a
         * Document node will have the '#document' string.
         **/
        readonly nodeName: string;
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
        readonly nodeType: number;
        /**
         * Returns the value of the current node
         **/
        /**
        * Sets the value of the current node
        **/
        nodeValue: string | null;
        /**
         * Returns the Document that this node belongs to. If the node is itself a
         * document, returns null.
         **/
        readonly ownerDocument: Document | null;
        /**
         * Returns an Element that is the parent of this node. If the node has no
         * parent, or if that parent is not an Element, this property returns null.
         **/
        readonly parentElement: HTMLElement | null;
        /**
         * Returns a Node that is the parent of this node. If there is no such node,
         * like if this node is the top of the tree or if doesn't participate in a
         * tree, this property returns null.
         **/
        readonly parentNode: Node & ParentNode | null;
        /**
         * Returns a Node representing the previous node in the tree, or null if
         * there isn't such node.
         **/
        readonly previousSibling: Node | null;
        /**
         * Returns the textual content of an element and all its descendants.
         **/
        readonly textContent: string | null;
        /**
         * Adds the specified childNode argument as the last child to the current
         * node. If the argument referenced an existing node on the DOM tree, the
         * node will be detached from its current position and attached at the new
         * position.
         **/
        appendChild(child: Node): Node;
        /**
         * Clone a Node, and optionally, all of its contents. By default, it clones
         * the content of the node.
         **/
        cloneNode(deep?: boolean): Node;
        /**
         * Compares the position of the current node against another node in any
         * other document.
         **/
        compareDocumentPosition(other: Node): number;
        /**
         * Returns a Boolean value indicating whether a node is a descendant of a
         * given node or not.
         **/
        contains(node: Node): boolean;
        /**
         * Returns the context object's root which optionally includes the shadow
         * root if it is available.
         **/
        getRootNode(options: any): Node;
        /**
         * Returns a Boolean indicating if the element has any child nodes, or not.
         **/
        hasChildNodes(): boolean;
        /**
         * Inserts a Node before the reference node as a child of a specified parent
         * node.
         **/
        insertBefore(newChild: Node, refChild: Node): Node;
        /**
         * Accepts a namespace URI as an argument and returns a Boolean with a value
         * of true if the namespace is the default namespace on the given node or
         * false if not.
         **/
        isDefaultNamespace(namespace: string): boolean;
        /**
         * Returns a Boolean which indicates whether or not two nodes are of the same
         * type and all their defining data points match.
         **/
        isEqualNode(other: Node): boolean;
        /**
         * Returns a Boolean value indicating whether or not the two nodes are the
         * same (that is, they reference the same object).
         **/
        isSameNode(other: Node): boolean;
        /**
         * Returns a DOMString containing the prefix for a given namespace URI, if
         * present, and null if not. When multiple prefixes are possible, the
         * result is implementation-dependent.
         **/
        lookupPrefix(namespace: string): string | null;
        /**
         * Accepts a prefix and returns the namespace URI associated with it on
         * the given node if found (and null if not). Supplying null for the
         * prefix will return the default namespace.
         **/
        lookupNamespaceURI(prefix: string): string | null;
        /**
         * Clean up all the text nodes under this element (merge adjacent,
         * remove empty).
         **/
        normalize(): void;
        /**
         * Removes a child node from the current element, which must be a child of
         * the current node.
         **/
        removeChild(oldChild: Node): Node;
        /**
         * Replaces one child Node of the current one with the second one given in
         * parameter.
         **/
        replaceChild(oldChild: Node, newChild: Node): Node;
        /**
         * Returns the number of children of this ParentNode which are elements.
         **/
        readonly childElementCount: number;
        /**
         * Returns an array of Elements containing all of the Element objects that
         * are children of this ParentNode, omitting all of its non-element nodes.
         **/
        readonly children: Elements;
        /**
         * Returns a live HTMLCollection containing all of the Element objects
         * that are children of this ParentNode, omitting all of its non-element
         * nodes.
         **/
        readonly _children: HTMLCollection;
        /**
         * Returns the first node which is both a child of this ParentNode and
         * is also an Element, or null if there is none.
         **/
        readonly firstElementChild: Element;
        /**
         * Returns the first node which is both a child of this ParentNode and
         * is also an Element, or null if there is none.
         **/
        readonly _firstElementChild: globalThis.Element | null;
        /**
         * Returns the last node which is both a child of this ParentNode and is
         * an Element, or null if there is none.
         **/
        readonly lastElementChild: Element;
        /**
         * Returns the last node which is both a child of this ParentNode and is
         * an Element, or null if there is none.
         **/
        readonly _lastElementChild: globalThis.Element | null;
        /**
         * Inserts a set of Node objects or DOMString objects after the last child
         * of the ParentNode. DOMString objects are inserted as equivalent Text
         * nodes.
         **/
        append(...children: Node[] | string[]): void;
        /**
         * Inserts a set of Node objects or DOMString objects before the first
         * child of the ParentNode. DOMString objects are inserted as equivalent
         * Text nodes.
         **/
        prepend(...children: Node[] | string[]): void;
        /**
         * Inserts a set of Node or DOMString objects in the children list of
         * this ChildNode's parent, just after this ChildNode. DOMString
         * objects are inserted as equivalent Text nodes.
         * @exception HierarchyRequestError: Node cannot be inserted at the
         * specified point in the hierarchy.
         **/
        after(...nodes: (Node | string)[]): void;
        /**
         * Inserts a set of Node or DOMString objects in the children list of
         * this ChildNode's parent, just before this ChildNode. DOMString
         * objects are inserted as equivalent Text nodes.
         * @exception HierarchyRequestError: Node cannot be inserted at the
         * specified point in the hierarchy.
         **/
        before(...nodes: (Node | string)[]): void;
        /**
         * Removes the element from the children list of its parent.
         **/
        remove(): void;
        /**
         * Replaces this ChildNode in the children list of its parent with a
         * set of Node or DOMString objects. DOMString objects are inserted
         * as equivalent Text nodes.
         * @exception HierarchyRequestError: Node cannot be inserted at the
         * specified point in the hierarchy.
         **/
        replaceWith(...nodes: (Node | string)[]): void;
        /**
         * Returns an object containing the assigned attributes of the corresponding
         * HTML element.
         * @return Returns a JavaScript Object
         **/
        readonly attributes: any;
        /**
         * Returns a NamedNodeMap object containing the assigned attributes of the
         * corresponding HTML element.
         **/
        readonly _attributes: NamedNodeMap;
        /**
         * Returns a string or array of strings containing the list of class attributes.
         **/
        /**
        * Takes a string or array of strings containing the list of class
        * attributes and sets classList property.
        **/
        classList: string | string[];
        /**
         * Returns a DOMTokenList containing the list of class attributes.
         **/
        readonly _classList: DOMTokenList;
        /**
         * Get the className property of the Element interface gets and sets the
         * value of the class attribute of the specified element.
         **/
        /**
        * Set the className property of the Element interface gets and sets the
        * value of the class attribute of the specified element.
        **/
        className: string;
        /**
         * Returns a Number representing the inner height of the element.
         **/
        readonly clientHeight: number;
        /**
         * Returns a Number representing the width of the left border of the element.
         **/
        readonly clientLeft: number;
        /**
         * Returns a Number representing the width of the top border of the element.
         **/
        readonly clientTop: number;
        /**
         * Returns a Number representing the width of the left border of the element.
         **/
        readonly clientWidth: number;
        /**
         * Get the id of the element.
         **/
        /**
        * Set the id of the element.
        **/
        id: string;
        /**
         * Get the markup of the element's content.
         **/
        /**
        * Set the markup of the element's content.
        **/
        innerHTML: string;
        /**
         * Get a string representing the local part of the qualified name of the element.
         **/
        readonly localName: string;
        /**
         * The namespace URI of the element, or null if it is no namespace.
         **/
        readonly namespaceURI: string | null;
        /**
         * Returns the Element immediately following this node in its parent's
         * children list, or null if there is no Element in the list following
         * this node.
         * TODO: Check if valid on Element
         **/
        readonly nextElementSibling: Element | null;
        /**
         * Returns the Element immediately following this node in its parent's
         * children list, or null if there is no Element in the list following
         * this node.
         * TODO: Check if valid on Element
         **/
        readonly _nextElementSibling: globalThis.Element | null;
        /**
         * Set a DOMString representing the markup of the element including its content.
         * When used as a setter, replaces the element with nodes parsed from the given
         * string.
         **/
        /**
        * Get a DOMString representing the markup of the element including its content.
        * When used as a setter, replaces the element with nodes parsed from the given
        * string.
        **/
        outerHTML: string;
        /**
         * A DOMString representing the namespace prefix of the element, or null if no prefix
         * is specified.
         **/
        readonly prefix: string | null;
        /**
         * Returns the Element immediately prior to this node in its parent's
         * children list, or null if there is no Element in the list prior to
         * this node.
         * TODO: Check if valid on Element
         **/
        readonly previousElementSibling: Element | null;
        /**
         * Returns the Element immediately prior to this node in its parent's
         * children list, or null if there is no Element in the list prior to
         * this node.
         * TODO: Check if valid on Element
         **/
        readonly _previousElementSibling: globalThis.Element | null;
        /**
         * Returns a Number representing the scroll view height of an element.
         **/
        readonly scrollHeight: number;
        /**
         * Is a Number representing the left scroll offset of the element.
         **/
        readonly scrollLeft: number;
        /**
         * A Number representing number of pixels the top of the document is
         * scrolled vertically.
         **/
        readonly scrollTop: number;
        /**
         * Returns a Number representing the scroll view width of the element.
         **/
        readonly scrollWidth: number;
        /**
         * Returns the open shadow root that is hosted by the element, or null if
         * no open shadow root is present.
         **/
        readonly shadowRoot: ShadowRoot | null;
        /**
         * Returns the name of the shadow DOM slot the element is inserted in.
         * EXPERIMENTAL
         **/
        readonly slot: string;
        /**
         * Returns a String with the name of the tag for the given element.
         **/
        readonly tagName: string;
        /**
         * Attatches a shadow DOM tree to the specified element and returns a
         * reference to its ShadowRoot.
         **/
        attachShadow(init: ShadowRootInit): ShadowRoot;
        /**
         * A shortcut method to create and run an animation on an element. Returns
         * the created Animation object instance.
         **/
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
        /**
         * Returns the Element which is the closest ancestor of the current element
         * (or the current element itself) which matches the selectors given in
         * parameter.
         **/
        closest(selector: Selector): Element;
        /**
         * Returns the Element which is the closest ancestor of the current element
         * (or the current element itself) which matches the selectors given in
         * parameter.
         **/
        _closest(selector: Selector): globalThis.Element | null;
        /**
         * Returns an array of Animation objects currently active on the element.
         **/
        getAnimations(): Animation[];
        /**
         * Retrieves the value of the named attribute from the current node and
         * returns it as an Object.
         **/
        getAttribute(key: string): string | null;
        /**
         * Returns an array of attribute names from the current element.
         **/
        getAttributeNames(): string[];
        /**
         * Retrieves the value of the attribute with the specified name and
         * namespace, from the current node and returns it as an Object.
         **/
        getAttributeNS(namespace: string, key: string): string | null;
        /**
         * Returns the size of an element and its position relative to the viewport.
         **/
        getBoundingClientRect(): any;
        /**
         * Returns a collection of rectangles that indicate the bounding rectangles
         * for each line of text in a client.
         **/
        getClientRects(): any;
        /**
         * Returns a live HTMLCollection that contains all descendants of the
         * current element that possess the list of classes given in the parameter.
         **/
        getElementsByClassName(classes: string | string[]): Elements;
        /**
         * Returns a live HTMLCollection that contains all descendants of the
         * current element that possess the list of classes given in the parameter.
         **/
        _getElementsByClassName(classes: string | string[]): HTMLCollectionOf<globalThis.Element>;
        /**
         * Returns a live HTMLCollection that contains all descendants of the current
         * element that possess the list of classes given in the parameter.
         **/
        getElementsByTagName(tag: string): Elements;
        /**
         * Returns a live HTMLCollection that contains all descendants of the current
         * element that possess the list of classes given in the parameter.
         **/
        _getElementsByTagName(tag: string): globalThis.Element[];
        /**
         * Returns a live HTMLCollection containing all descendant elements, of a
         * particular tag name, from the current element.
         **/
        getElementsByTagNameNS(namespace: string, tag: string): Elements;
        /**
         * Returns a live HTMLCollection containing all descendant elements, of a
         * particular tag name, from the current element.
         **/
        _getElementsByTagNameNS(namespace: string, tag: string): globalThis.Element[];
        /**
         * Returns a Boolean indicating if the element has the specified attribute or not.
         **/
        hasAttribute(key: string): boolean;
        /**
         * Returns a Boolean indicating if the element has the specified attribute,
         * in the specified namespace, or not.
         **/
        hasAttributeNS(namespace: string, key: string): boolean;
        /**
         * Returns a Boolean indicating if the element has the specified attribute
         * or not.
         **/
        hasAttributes(): boolean;
        /**
         * Indicates whether the element on which it is invoked has pointer capture
         * for the pointer identified by the given pointer ID.
         **/
        hasPointerCapture(pointerId: number): boolean;
        /**
         * Inserts a given element node at a given position relative to the
         * element it is invoked upon.
         **/
        insertAdjacentElement(position: InsertPosition, element: globalThis.Element): Element;
        /**
         * Inserts a given element node at a given position relative to the
         * element it is invoked upon.
         **/
        _insertAdjacentElement(position: InsertPosition, element: globalThis.Element): globalThis.Element | null;
        /**
         * Parses the text as HTML or XML and inserts the resulting nodes into the
         * tree in the position given.
         **/
        insertAdjacentHTML(position: InsertPosition, text: string): this;
        /**
         * Inserts a given text node at a given position relative to the element
         * it is invoked upon.
         **/
        insertAdjacentText(position: InsertPosition, text: string): this;
        /**
         * Returns a Boolean indicating whether or not the element would be
         * selected by the specified selector string.
         **/
        matches(selector: Selector): boolean;
        /**
         * Returns the first Element with the current element as root that matches
         * the specified group of selectors.
         **/
        querySelector(selector: Selector): Element;
        /**
         * Returns the first Element with the current element as root that matches
         * the specified group of selectors.
         **/
        _querySelector(selector: Selector): globalThis.Element | null;
        /**
         * Returns a NodeList representing a list of elements with the current
         * element as root that matches the specified group of selectors.
         **/
        querySelectorAll(selector: Selector): Elements;
        /**
         * Returns a NodeList representing a list of elements with the current
         * element as root that matches the specified group of selectors.
         **/
        _querySelectorAll(selector: Selector): globalThis.Element[];
        /**
         * Releases (stops) pointer capture that was previously set for a specific
         * pointer event.
         **/
        releasePointerCapture(pointerId: number): void;
        /**
         * Removes the named attribute from the current node.
         **/
        removeAttribute(key: string): Element;
        /**
         * Removes the attribute with the specified name and namespace, from the
         * current node.
         **/
        removeAttributeNS(namespace: string, key: string): Element;
        /**
         * Asynchronously asks the browser to make the element full-screen.
         * EXPERIMENTAL
         **/
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        /**
         * Allows to asynchronously ask for the pointer to be locked on the given
         * element.
         * EXPERIMENTAL
         **/
        requestPointerLock(): void;
        /**
         * Scrolls to a particular set of coordinates inside a given element.
         **/
        scroll(coord: number | ScrollToOptions, y?: number): void;
        /**
         * Scrolls an element by the given amount.
         **/
        scrollBy(coord: number | ScrollToOptions, y?: number): void;
        /**
         * Scrolls the page until the element gets into the view.
         **/
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): this;
        /**
         * Scrolls to a particular set of coordinates inside a given element.
         **/
        scrollTo(coord: number | ScrollToOptions, y?: number): void;
        /**
         * Sets the value of a named attribute of the current node.
         **/
        setAttribute(key: string, value: string): Element;
        /**
         * Sets the value of the attribute with the specified name and namespace,
         * from the current node.
         **/
        setAttributeNS(namespace: string, key: string, value: string): this;
        /**
         * Designates a specific element as the capture target of future pointer events.
         **/
        setPointerCapture(pointerId: number): void;
        /**
         * Toggles a boolean attribute, removing it if it is present and adding it if it is not present, on the specified element.
         * @return true if attribute **key** is eventually present, and false otherwise.
         **/
        toggleAttribute(key: string, force?: boolean): boolean;
        /**
         * Returns a DOMString containing the element's assigned access key.
         **/
        readonly accessKey: string;
        /**
         * Is the element's 'contenteditable' attribute set ?
         **/
        /**
        * Set the 'contenteditable' attribute of the element.
        **/
        contentEditable: boolean;
        /**
         * Returns a DOMStringMap with which script can read and write the
         * element's custom data attributes (data-*) .
         **/
        readonly dataset: any;
        /**
         * Returns a DOMStringMap with which script can read and write the
         * element's custom data attributes (data-*) .
         **/
        readonly _dataset: DOMStringMap;
        /**
         * Is a string, reflecting the dir global attribute, representing the
         * directionality of the element. Possible values are "ltr", "rtl",
         * and "auto".
         **/
        /**
        * Is a string, reflecting the dir global attribute, representing the
        * directionality of the element. Possible values are "ltr", "rtl",
        * and "auto".
        **/
        dir: string;
        /**
         * Is a Boolean indicating if the element can be dragged.
         **/
        /**
        * Is a Boolean indicating if the element can be dragged.
        **/
        draggable: boolean;
        /**
         * Is a Boolean indicating if the element is hidden or not.
         **/
        /**
        * Is a Boolean indicating if the element is hidden or not.
        **/
        hidden: boolean;
        /**
         * Represents the "rendered" text content of a node and its descendants.
         * As a getter, it approximates the text the user would get if they
         * highlighted the contents of the element with the cursor and then
         * copied it to the clipboard.
         **/
        /**
        * Set the innerText property of the HTMLElement interface which represents
        * the "rendered" text content of a node and its descendants.
        **/
        innerText: string;
        /**
         * Returns a Boolean that indicates whether or not the content of the
         * element can be edited.
         **/
        readonly isContentEditable: boolean;
        /**
         * Get a string representing the language of an element's attributes,
         * text, and element contents.
         **/
        /**
        * Set a string representing the language of an element's attributes,
        * text, and element contents.
        **/
        lang: string;
        /**
         * Returns the cryptographic number used once that is used by Content
         * Security Policy to determine whether a given fetch will be allowed
         * to proceed.
         **/
        readonly nonce: string | undefined;
        /**
         * Returns a double containing the height of an element, relative to the
         * layout.
         **/
        readonly offsetHeight: number;
        /**
         * Returns a double, the distance from this element's left border to its
         * offsetParent's left border.
         **/
        readonly offsetLeft: number;
        /**
         * Returns a Element that is the element from which all offset calculations
         * are currently computed.
         **/
        readonly offsetParent: Element | null;
        /**
         * Returns a Element that is the element from which all offset calculations
         * are currently computed.
         **/
        readonly _offsetParent: globalThis.Element | null;
        /**
         * Returns a double, the distance from this element's top border to its
         * offsetParent's top border.
         **/
        readonly offsetTop: number;
        /**
         * Returns a double containing the width of an element, relative to the
         * layout.
         **/
        readonly offsetWidth: number;
        /**
         * Get the style attribute to be applied to the element.
         **/
        readonly style: any;
        /**
         * Get a number representing the position of the element in the tabbing
         * order.
         **/
        /**
        * Set a number representing the position of the element in the tabbing
        * order.
        **/
        tabIndex: number;
        /**
         * Is a DOMString containing the text that appears in a popup box when
         * mouse is over the element
         **/
        readonly title: string;
        /**
         * Removes keyboard focus from the currently focused element.
         **/
        blur(): Element;
        /**
         * Sends a mouse click event to the element.
         **/
        click(): this;
        /**
         * Makes the element the current keyboard focus.
         **/
        focus(): Element;
    }
    class Elements {
        constructor(selector: Selector | Element[] | globalThis.Element[], parent?: Element | globalThis.Element | HTMLElement | HTMLDocument);
        selection: globalThis.Element[];
        readonly length: number;
        $(selector: string): Elements;
        $$(selector: string): Elements;
        each(fn: (this: Element, ...args: any[]) => void, ...args: any[]): void;
        forEach: (fn: (this: Element, ...args: any[]) => void, ...args: any[]) => void;
        map(fn: (this: Element, ...args: any[]) => void, ...args: any[]): any[];
        html(value?: string): Elements | string[];
        text(value: string): Elements | string[];
        attr(name: string, value?: string): Elements | (string | null)[];
        prop(key: string, value?: string): any[] | this;
        css(key: string, value?: string): string[] | this;
        /**
         * Get the style attribute to be applied to the element.
         **/
        readonly style: any;
        addClass(classes: string | string[]): this;
        removeClass(classes: string | string[]): this;
        toggleClass(classes: string | string[], force: boolean): this;
        hasClass(cls: string): boolean[];
        replaceClass(oldClass: string, newClass: string): this;
        getClasses(): string[];
        on<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options: boolean | any): this;
        once<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options: any): void[];
        off<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options: boolean | any): this;
        addEventListener<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options: boolean | any): void;
        removeEventListener<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options: boolean | any): void;
        /**
         * Dispatches an event to these selected elements.
         **/
        dispatch(event: Event): boolean[];
    }
    function $(selector: Selector | globalThis.Element | HTMLElement | HTMLDocument, parent?: Element | globalThis.Element | ParentNode): Element;
    namespace $ {
        var createDocumentFragment: typeof QueryJS.createDocumentFragment;
        var createElement: typeof QueryJS.createElement;
        var createTextNode: typeof QueryJS.createTextNode;
    }
    function createDocumentFragment(): DocumentFragment;
    function createElement(tag: string, attributes: any, content: any): HTMLElement;
    function createTextNode(text: string): Text;
    function $$(selector: Selector | Element[] | globalThis.Element[], parent?: Element | globalThis.Element | HTMLElement | HTMLDocument): Elements;
}
declare const QueryJS_Element: typeof QueryJS.Element;
declare const QueryJS_Elements: typeof QueryJS.Elements;
declare const QueryJS_$: typeof QueryJS.$;
declare const QueryJS_$$: typeof QueryJS.$$;
export { QueryJS as default, QueryJS, QueryJS_Element as Element, QueryJS_Elements as Elements, QueryJS_$ as $, QueryJS_$$ as $$ };
//# sourceMappingURL=QueryJS.d.ts.map