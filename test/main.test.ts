import { expect } from 'chai'
import sinon from 'sinon'
import {$, $$, Element} from "../src/QueryJS";

const isEdge = navigator && /(edge)\/((\d+)?[\w\.]+)/i.exec(navigator.userAgent);

describe('core', function () {

    before(function(){
        fixture.setBase('test/fixtures')
    });

    describe('requirements', function () {
    	it('Array.from should be a function', function () {
    	    expect(typeof Array.from).to.be.equal("function");
    	});
        it('document.addEventListener should be a function', function () {
    	    expect(typeof document.addEventListener).to.be.equal("function");
        });
    	it('document.querySelector should be a function', function () {
    	    expect(typeof document.querySelector).to.be.equal("function");
    	});
    	it('document.querySelectorAll should be a function', function () {
    	    expect(typeof document.querySelectorAll).to.be.equal("function");
    	});
    	describe('utility functions', function () {
        	it('Object.from should be a function', function () {
        	    expect(typeof Object.from).to.be.equal("function");
        	});
        	it('String.prototype.kebabToCamelCase should be a function', function () {
        	    expect(typeof String.prototype.kebabToCamelCase).to.be.equal("function");
        	});
    	});
	});

	describe('exports', function () {

    	it('Element should exist', function () {
    	    expect(Element).to.exist;
  	    });
    	it('Element.prototype should exist', function () {
    	    expect(typeof Element.prototype).to.exist;
  	    });
    	it('Selection should exist', function () {
    	    expect(Selection).to.exist;
  	    });
    	it('Selection.prototype should exist', function () {
    	    expect(typeof Selection.prototype).to.exist;
  	    });
    	it('$ should be a function', function () {
    	    expect(typeof $).to.be.equal("function");
    	});
    	it('$$ should be a function', function () {
    	    expect(typeof $$).to.be.equal("function");
    	});

    });

	// class Element

    describe('class Element', function () {

        //  constructor(selector:Selector|Element|HTMLElement, parent?:Element|ParentNode) {
        //      var element:HTMLElement|null;
        //      if (selector instanceof Element)
        //          element = <HTMLElement>selector;
        //      else if (parent instanceof Element)
        //          element = parent.element.querySelector(<string>selector);
        //      else if (parent)
        //          element = parent.querySelector(<string>selector);
        //      else
        //          element = document.querySelector(<string>selector);
        //
        //      if (element)
        //          this.element = element;
        //      else
        //          throw "Error: bad selector";
        //  }

        describe('constructor', function () {

            beforeEach(function(){
                fixture.load('div-foo-div-bar.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("is an instanceof Element of document.querySelector('#foo')", function () {
                it("should return a Element with the same element value", function () {
                    var element = document.querySelector('#foo');
                    expect(new Element(element).element).to.be.equal(element);
                });
            });

            describe("if parent is an instanceof Element", function () {
                it("should return a Element with the element containing 'foobar'", function () {
                    var parent = document.querySelector('#foo');
                    var foobar = new Element('#bar', parent);
                    expect(foobar.text()).to.be.equal('foobar');
                });
                it("should return a Element with the element the same as document.querySelector('#foo #bar')", function () {
                    var parent = new Element('#foo');
                    var foobar = new Element('#bar', parent);
                    expect(foobar.element).to.be.equal(document.querySelector('#foo #bar'));
                });
            });

            describe("if parent is an instanceof Document", function () {
                it("should return a Element with the element the same as document.querySelector('#foo')", function () {
                    var foobar = new Element('#foo', document);
                    expect(foobar.element).to.be.equal(document.querySelector('#foo'));
                });
            });

            describe("is a selector '#bar' from document", function () {
                it("should return a Element with the text 'bar'", function () {
                    expect(new Element('#bar').text()).to.be.equal('bar');
                });
            });
/*
            describe("is a selector '#barfoo' from document", function () {
                it("should throw", function () {
                    expect(new Element('#barfoo')).to.throw();
                });
            });
*/
        });

        // function $(selector:Selector|Element|HTMLElement|HTMLDocument, parent?:Element|ParentNode):Element {
        //     return new Element(selector, element);
        // }

        describe('$()', function () {

            beforeEach(function(){
            	fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("$('#foo')", function () {
                it("should return a Element with the element containing 'foo'", function () {
                    expect($('#foo').text()).to.be.equal('foo');
                });
            });

        });


        // function $$(selector:string|Selection|Element[]|Element[], parent?:Element|Element|HTMLElement|HTMLDocument):Selection {
        //     return new Selection(selector, parent);
        // }

        describe('$$', function () {
        });


        //  $(selector:Selector):Element {
        //      return new Element(selector, this.element);
        //  }

        describe('$().$()', function () {

            beforeEach(function(){
                fixture.load('div-foo-div-bar.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("$('#foo').$('#bar')", function () {
                it("should return a Element with the element containing 'foobar'", function () {
                    expect($('#foo').$('#bar').text()).to.be.equal('foobar');
                });
            });

        });

        //  is(selector:Selector):boolean {
        //      if (this.element.parentElement)
        //          return Array.from(this.element.parentElement.querySelectorAll(selector)).includes(this.element);    // ???
        //      else
        //          return false;
        //  }

        describe('is()', function () {

            beforeEach(function(){
                fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("$('#foo').is('#foo')", function () {
                it("should return true", function () {
                    expect($('#foo').is('#foo')).to.be.true;
                });
            });

            describe("$('#foo').is('[id=\"foo\"]')", function () {
                it("should return true", function () {
                    expect($('#foo').is('[id="foo"]')).to.be.true;
                });
            });

            describe("$('#foo').is('[id=\"bar\"]')", function () {
                it("should return false", function () {
                    expect($('#foo').is('[id="bar"]')).to.be.false;
                });
            });

        });

        //  html(value?:string):string|Element {
        //      if (value) {
        //          this.element.innerHTML = value;
        //          return this;
        //      }
        //      else
        //          return this.element.innerHTML;
        //  }

        describe('html()', function () {
            beforeEach(function(){
                fixture.load('span-span.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            // getter

            describe("$('#foo').html()", function () {
                it("should return 'span'", function () {
                    expect($("#foo").html()).to.be.equal('span');
                });
            });

            // setter

            describe("$('#foo').html('a span')", function () {
                it("should allow $('#foo').html() == 'a span'", function () {
                    $('#foo').html('a span');
                    expect($('#foo').html()).to.be.equal('a span');
                });
            });
        });

        //  text(value?:string) {
        //      if (value) {
        //          this.element.innerText = value;
        //          return this;
        //      }
        //      else
        //          return this.element.innerText;
        //  }

        describe('text()', function () {

            beforeEach(function(){
                fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            // getter

            describe("$('#foo').text()", function () {
                it("should return 'foo'", function () {
                    expect($('#foo').text()).to.be.equal('foo');
                });
            });

            // setter

            describe("$('#foo').text('bar')", function () {
                it("should allow $('foo').text() == 'bar'", function () {
                    $('#foo').text('bar');
                    expect($('#foo').text()).to.be.equal('bar');
                });
            });

        });

        //  attr(name:string, value?:string) {
        //      if (value) {
        //          this.element.setAttribute(name, value);
        //          return this;
        //      }
        //      else
        //          return this.element.getAttribute(name);
        //  }

        describe('attr()', function () {

            beforeEach(function(){
                fixture.load('foo-attr-test-bar.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            // getter

            describe("$('#foo').attr('test')", function () {
                it("should return 'bar'", function () {
                    expect($('#foo').attr('test'), 'bar');
                });
            });

            // setter

            describe("$('#foo').attr('test', 'foo')", function () {
                it("should allow $('#foo').attr('test') == 'foo'", function () {
                    $('#foo').attr('test', 'foo');
                    expect($('#foo').attr('test'), 'foo');
                });
            });
        });

        //  prop(key:string, value?:string) {
        //      if (value) {
        //          (<any>this.element)[key] = value;   // ???
        //          return this;
        //      }
        //      else
        //          return (<any>this.element)[key];    // ???
        //  }
/*
        describe('prop()', function () {

            // getter

            describe("$('#foo').prop('data-test')", function () {
                it("should return 'bar'", function () {
                    $('#foo').element['data-test'] = 'bar';
                    expect($('#foo').prop('data-test'), 'bar');
                });
            });

            // setter

            describe("$('#foo').prop('test')", function () {
                it("should allow $('#foo').prop('test') == 'foo'", function () {
                    $('#foo').prop('test', 'foo');
                    expect($('#foo').prop('test'), 'foo');
                });
            });
        });
*/
        //  css(key:string, value?:string) {
        //      if (value) {
        //          this.element.style[<any>kebabToCamelCase(key)] = value;
        //          return this;
        //      }
        //      else
        //          return this.element.style[<any>kebabToCamelCase(key)];
        //  }

        describe('css()', function () {
            beforeEach(function(){
              fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            // getter

            describe("$('#foo').css('border')", function () {
                it("should return undefined", function () {
                    expect($("#foo").css('border')).to.be.equal(undefined);
                });
            });

            // setter

            describe("$('#foo').css('border', '5px solid red')", function () {
                it("should allow $('#foo').css('border', '5px solid red') == $('#foo').css('border')", function () {
                    $('#foo').css('border', '5px solid red');
                    expect($('#foo').css('border')).to.be.equal('5px solid red');
                });
            });
        });

    // classes

        //  addClass(classes:string|string[]) {
        //      this.element.classList.add([classes].flat().join(' '));
        //      return this;
        //  }

        describe('addClass()', function () {

            beforeEach(function(){
                fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("add single class", function () {
                describe("$('#foo').addClass('test-class')", function () {
                    it("document.querySelector('#foo').classList.value should return 'test-class'", function () {
                        expect(Array.from(document.querySelector('#foo').classList)).to.be.deep.equal([]);
                        $('#foo').addClass('test-class');
                        expect(Array.from(document.querySelector('#foo').classList)).to.be.deep.equal(['test-class']);
                    });
                });
            });

            describe("add array of classes", function () {
                describe("$('#foo').addClass(['foo', 'bar'])", function () {
                    it("document.querySelector('#foo').classList.value should return 'foo bar'", function () {
                        expect(document.querySelector('#foo').classList.value).to.be.equal('');
                        $('#foo').addClass(['foo', 'bar']);

                        expect(document.querySelector('#foo').classList.value.split(isEdge ? ',' : ' ')).to.be.deep.equal(['foo', 'bar']);
                    });
                });
            });
        });

        //  removeClass(classes:string|string[]) {
        //      this.element.classList.remove([classes].flat().join(' '));
        //      return this;
        //  }

        describe('removeClass()', function () {

            beforeEach(function(){
                fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("$('#foo').removeClass('test-class')", function () {
                it("document.querySelector('#foo').classList.value should return null", function () {
                    document.querySelector('#foo').classList.add('test-class');
                    expect(document.querySelector('#foo').classList.value).to.be.equal('test-class');
                    $('#foo').removeClass('test-class');
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                });
            });

        });

        //  toggleClass(classes:string|string[], force:boolean) {
        //      this.element.classList.toggle([classes].flat().join(' '), force);
        //      return this;
        //  }

        describe('toggleClass()', function () {

            beforeEach(function(){
                fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("$('#foo').toggleClass('test-class')", function () {
                it("$('#foo').toggleClass() should toggle", function () {
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                    $('#foo').toggleClass('test-class');
                    expect(document.querySelector('#foo').classList.value).to.be.equal('test-class');
                    $('#foo').toggleClass('test-class');
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                });
            });

            describe("$('#foo').toggleClass('test-class', true)", function () {
                it("$('#foo').toggleClass(*, true) should add", function () {
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                    $('#foo').toggleClass('test-class', true);
                    expect(document.querySelector('#foo').classList.value).to.be.equal('test-class');
                    $('#foo').toggleClass('test-class', true);
                    expect(document.querySelector('#foo').classList.value).to.be.equal('test-class');
                });
            });

            describe("$('#foo').toggleClass('test-class', false)", function () {
                it("$('#foo').toggleClass(*, false) should remove", function () {
                    document.querySelector('#foo').classList.add('test-class');
                    expect(document.querySelector('#foo').classList.value).to.be.equal('test-class');
                    $('#foo').toggleClass('test-class', false);
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                    $('#foo').toggleClass('test-class', false);
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                });
            });

            describe("toggle an array of classes", function () {
                describe("$('#foo').toggleClass(['foo', 'bar'])", function () {
                    it("$('#foo').toggleClass() should toggle both classes", function () {
                        expect(document.querySelector('#foo').classList.value).to.be.equal('');
                        $('#foo').toggleClass(['foo', 'bar']);
                        expect(Array.from(document.querySelector('#foo').classList.value.split(isEdge ? ',' : ' '))).to.be.deep.equal(['foo', 'bar']);
                        $('#foo').toggleClass(['foo', 'bar']);
                        expect(document.querySelector('#foo').classList.value).to.be.equal('');
                    });
                });
            });

        });


        //  hasClass(cls:string) {
        //      return this.element.classList.contains(cls);
        //  }

        describe('hasClass()', function () {

            beforeEach(function(){
                fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("$('#foo').hasClass('test-class')", function () {
                it("$('#foo').hasClass() should work", function () {
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                    $('#foo').addClass('test-class');
                    expect($('#foo').hasClass('test-class')).to.be.true;
                });
            });

        });

        //  replaceClass(oldClass:string, newClass:string) {
        //      this.element.classList.replace(oldClass, newClass);
        //      return this;
        //  }

        describe('replaceClass()', function () {

            beforeEach(function(){
                fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("$('#foo').replaceClass('test-class')", function () {
                it("document.querySelector('#foo').classList.value should return 'test-class'", function () {
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                    $('#foo').addClass('show');
                    expect(document.querySelector('#foo').classList.value).to.be.equal('show');
                    $('#foo').replaceClass('show', 'hide');
                    expect(document.querySelector('#foo').classList.value).to.be.equal('hide');
                });
            });

        });

        //
        //  getClasses():string[] {
        //      return Array.from(this.element.classList);
        //  }

        describe('getClasses()', function () {

            beforeEach(function(){
                fixture.load('div-foo.html');
            });

            afterEach(function() {
                fixture.cleanup();
            });

            describe("$('#foo').getClasses()", function () {
                it("$('#foo').getClasses() should work", function () {
                    expect(document.querySelector('#foo').classList.value).to.be.equal('');
                    $('#foo').addClass('foo');
                    $('#foo').addClass('bar');
                    expect($('#foo').getClasses()).to.be.deep.equal(['foo', 'bar']);
                });
            });

        });

    //  Events

        //
        //  on<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:boolean|any) {
        //      this.element.addEventListener(event, listener, options);
        //      return this;
        //  }

        describe('on()', function () {
            var documentEventSpy;

            beforeEach(function(){
                documentEventSpy = sinon.spy();
                $(document).on('change', documentEventSpy);
            });

            it('should catch a event when fired', function(){
                var event = new Event('change');

                $(document).dispatch(event);

                //make sure our spy was fired once and only once
                expect(documentEventSpy.callCount).to.equal(1);
            });
        });

        //
        //  //once<K extends keyof DocumentEventMap>(event: K, listener: (this: Document|HTMLElement, ev: DocumentEventMap[K]) => any, options:any)
        //  once<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:any) {
        //      options = options || {once: true};
        //      return this.element.addEventListener(event, listener, options);
        //  }

        describe('once()', function () {
            var documentEventSpy;

            beforeEach(function(){
                documentEventSpy = sinon.spy();
            });

            it('event should only fire once', function(){
                var event = new Event('change');

                $(document).once('change', documentEventSpy);
                document.dispatchEvent(event);

                expect(documentEventSpy.calledOnce).to.be.true;
            });

            it('event should not fire twice', function(){
                var event = new Event('change');

                $(document).once('change', documentEventSpy);
                document.dispatchEvent(event);

                expect(documentEventSpy.calledOnce).to.be.true;

                document.dispatchEvent(event);

                expect(documentEventSpy.calledOnce).to.be.true;
            });
        });

        //
        //  off<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:boolean|any) {
        //      this.element.removeEventListener(event, listener, options);
        //      return this;
        //  }

        describe('off()', function () {
            var documentEventSpy;

            beforeEach(function(){
                documentEventSpy = sinon.spy();
            });

            it('should remove event listener', function(){
                var event = new Event('change');

                $(document).on('change', documentEventSpy);
                document.dispatchEvent(event);

                $(document).off('change', documentEventSpy);
                document.dispatchEvent(event);

                expect(documentEventSpy.callCount).to.equal(1);
            });
        });

        //  dispatch(event:Event):bool {
        //      return this.elment.dispatchEvent(event);
        //  }

        describe('dispatch()', function () {
            var documentEventSpy;

            beforeEach(function(){
                documentEventSpy = sinon.spy();
                document.addEventListener('change', documentEventSpy);
            });

            it('should dispatch an event', function(){
                var event = new Event('change');
                $(document).dispatch(event);

                //make sure our spy was fired once and only once
                expect(documentEventSpy.callCount).to.equal(1);
            });
        });

    // EventTarget

        //  addEventListener<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:boolean|any) {
        //      return this.element.addEventListener(event, listener, options);
        //  }

        describe('addEventListener()', function () {
            var documentEventSpy;

            beforeEach(function(){
                documentEventSpy = sinon.spy();
                $(document).addEventListener('change', documentEventSpy);
            });

            it('should catch a event when fired', function(){
                var event = new Event('change');

                document.dispatchEvent(event);

                //make sure our spy was fired once and only once
                expect(documentEventSpy.callCount).to.equal(1);
            });
        });

        //  removeEventListener<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:boolean|any) {
        //      return this.element.removeEventListener(event, listener, options)
        //  }

        describe('removeEventListener()', function () {
            var documentEventSpy;

            beforeEach(function(){
                documentEventSpy = sinon.spy();
                document.addEventListener('change', documentEventSpy);
            });

            it('should remove event listener', function(){
                expect(typeof Element.prototype.removeEventListener).to.be.equal("function"); // Guard

                var event = new Event('change');

                document.dispatchEvent(event);

                expect(documentEventSpy.callCount).to.equal(1);

                document.removeEventListener('change', documentEventSpy);

                document.dispatchEvent(event);

                //make sure our spy was fired once and only once
                expect(documentEventSpy.callCount).to.equal(1);
            });
        });

        //  dispatch(event:Event):bool {
        //      return this.elment.dispatchEvent(event);
        //  }

        describe('dispatchEvent()', function () {
            var documentEventSpy;

            beforeEach(function(){
                documentEventSpy = sinon.spy();
                document.addEventListener('change', documentEventSpy);
            });

            it('should dispatch an event', function(){
                var event = new Event('change');
                $(document).dispatchEvent(event);

                //make sure our spy was fired once and only once
                expect(documentEventSpy.callCount).to.equal(1);
            });
        });

    // Accessors

        // Node

        //  get baseURI():string {
        //      return this.element.baseURI;
        //  }

        describe('get baseURI()', function () {
        });

        //  get childNodes():ChildNode[] {
        //      return Array.from(this.element.childNodes);
        //  }

        describe('get childNodes()', function () {
        });

        //  get _childNodes():NodeListOf<ChildNode> {
        //      return this.element.childNodes;
        //  }

        describe('get _childNodes()', function () {
        });

        //  get firstChild():Element {
        //      return new Element(this.element.firstChild);
        //  }

        describe('get firstChild()', function () {
        });

        //  get lastChild():ChildNode | null {
        //      return this.element.lastChild;
        //  }

        describe('get lastChild()', function () {
        });

        //  get nextSibling():ChildNode | null {
        //      return this.element.nextSibling;
        //  }

        describe('get nextSibling()', function () {
        });

        //  get nodeName():string {
        //      return this.element.nodeName;
        //  }

        describe('get nodeName()', function () {
        });

        //  get nodeType():number {
        //      return this.element.nodeType;
        //  }

        describe('get nodeType()', function () {
        });

        //  get nodeValue():string | null {
        //      return this.element.nodeValue;
        //  }

        describe('get nodeValue()', function () {
        });

        //  set nodeValue(value:string | null) {
        //      this.element.nodeValue = value;
        //  }

        describe('set nodeValue()', function () {
        });

        //  get ownerDocument():Document | null {
        //      return this.element.ownerDocument;
        //  }

        describe('get ownerDocument()', function () {
        });

        //  get parentElement():HTMLElement | null {
        //      return this.element.parentElement;
        //  }

        describe('get parentElement()', function () {
        });

        //  get parentNode():Node & ParentNode | null { // TODO: Check
        //      return this.element.parentNode;
        //  }

        describe('get parentNode()', function () {
        });

        //  get previousSibling():Node | null {
        //      return this.element.previousSibling;
        //  }

        describe('get previousSibling()', function () {
        });

        //  get textContent():string|null {
        //      return this.element.textContent;
        //  }

    // Elget textContentement

        //  get attributes():any {
        //      return Object.from(this.element.attributes);
        //  }

        describe('get attributes()', function () {
        });

        //  get _attributes():NamedNodeMap {
        //      return this.element.attributes;
        //  }

        describe('get _attributes()', function () {
        });

        //  get childElementCount():number {
        //      return this.element.childElementCount;
        //  }

        describe('get childElementCount()', function () {
        });

        //  get children():Element[] {
        //      return Array.from(this.element.children);
        //  }

        describe('get children()', function () {
        });

        //  get _children():HTMLCollection {
        //      return this.element.children;
        //  }

        describe('get _children()', function () {
        });

        //  get className():string {
        //      return this.element.className;
        //  }

        describe('get className()', function () {
        });

        //  set className(name:string) {
        //      this.element.className = name;
        //  }

        describe('set className()', function () {
        });

        //  get classList():string|string[] {
        //      var classes = this.element.classList.value.split(' ');
        //      return classes.length == 1 ? classes[0] : classes;
        //  }

        describe('get classList()', function () {
        });

        //  set classList(classes:string|string[]) {
        //      this.element.classList.value = [classes].flat().join(' ');
        //  }

        describe('set classList()', function () {
        });

        //  get _classList():DOMTokenList {
        //      return this.element.classList;
        //  }

        describe('get _classList()', function () {
        });

        //  get clientHeight():number {
        //      return this.element.clientHeight;
        //  }

        describe('get clientHeight()', function () {
        });

        //  get clientWidth():number {
        //      return this.element.clientWidth;
        //  }

        describe('get clientWidth()', function () {
        });

        //  get clientLeft():number {
        //      return this.element.clientLeft;
        //  }

        describe('get clientLeft()', function () {
        });

        //  get clientTop():number {
        //      return this.element.clientTop;
        //  }

        describe('get clientTop()', function () {
        });

        //  get dataset() {         // TODO: attributes data-*:object ???
        //      return this.element.dataset;
        //  }

        describe('get dataset()', function () {
        });

        //  get firstElementChild():Element {
        //      return new Element(this.element.firstElementChild);
        //  }

        describe('get firstElementChild()', function () {
        });

        //  get _firstElementChild():Element|null {
        //      return this.element.firstElementChild;
        //  }

        describe('get _firstElementChild()', function () {
        });

        //  get id():string {
        //      return this.element.id;
        //  }

        describe('get id()', function () {
        });

        //  set id(value:string) {
        //      this.element.id = value;
        //  }

        describe('set id()', function () {
        });

        //  get innerHTML():string {
        //      return this.element.innerHTML;
        //  }

        describe('get innerHTML()', function () {
        });

        //  set innerHTML(value:string) {
        //      this.element.innerHTML = value;
        //  }

        describe('set innerHTML()', function () {
        });

        //  get innerText():string {
        //      return this.element.innerText;
        //  }

        describe('get innerText()', function () {
        });

        //  set innerText(value:string) {
        //      this.element.innerText = value;
        //  }

        describe('set innerText()', function () {
        });

        //  get isContentEditable():boolean {
        //      return this.element.isContentEditable;
        //  }

        describe('get isContentEditable()', function () {
        });

        //  get lang():string {
        //      return this.element.lang;
        //  }

        describe('get lang()', function () {
        });

        //  set lang(value:string) {
        //      this.element.lang = value;
        //  }

        describe('set lang()', function () {
        });

        //  get lastElementChild():Element {
        //      return new Element(this.element.lastElementChild);
        //  }

        describe('get lastElementChild()', function () {
        });

        //  get _lastElementChild():Element | null {
        //      return this.element.lastElementChild;
        //  }

        describe('get _lastElementChild()', function () {
        });

        //  get localName():string {
        //      return this.element.localName;
        //  }

        describe('get localName()', function () {
        });

        //  get namespaceURI():string|null {
        //      return this.element.namespaceURI;
        //  }

        describe('get namespaceURI()', function () {
        });

        //  get nextElementSibling():Element | null {
        //      return this.element.nextElementSibling;
        //  }

        describe('get nextElementSibling()', function () {
        });

        //  get offsetHeight():number {
        //      return this.element.offsetHeight;
        //  }

        describe('get offsetHeight()', function () {
        });

        //  get offsetWidth():number {
        //      return this.element.offsetWidth;
        //  }

        describe('get offsetWidth()', function () {
        });

        //  get offsetLeft():number {
        //      return this.element.offsetLeft;
        //  }

        describe('get offsetLeft()', function () {
        });

        //  get offsetTop():number {
        //      return this.element.offsetTop;
        //  }

        describe('get offsetTop()', function () {
        });

        //  get offsetParent():Element | null {     // ERR
        //      return this.element.offsetParent;
        //  }

        describe('get offsetParent()', function () {
        });

        //  get outerHTML():string {
        //      return this.element.outerHTML;
        //  }

        describe('get outerHTML()', function () {
        });

        //  set outerHTML(value:string) {
        //      this.element.outerHTML = value;
        //  }

        describe('set outerHTML()', function () {
        });

        //  get prefix():string | null {
        //      return this.element.prefix;
        //  }

        describe('get prefix()', function () {
        });

        //  get previousElementSibling():Element | null {
        //      return this.element.previousElementSibling;
        //  }

        describe('get previousElementSibling()', function () {
        });

        //  get scrollHeight():number {
        //      return this.element.scrollHeight;
        //  }

        describe('get scrollHeight()', function () {
        });

        //  get scrollWidth():number {
        //      return this.element.scrollWidth;
        //  }

        describe('get scrollWidth()', function () {
        });

        //  get scrollLeft():number {
        //      return this.element.scrollLeft;
        //  }

        describe('get scrollLeft()', function () {
        });

        //  get scrollTop():number {
        //      return this.element.scrollTop;
        //  }

        describe('get scrollTop()', function () {
        });

        //  get style():string|null {
        //      return this.element.getAttribute("style");
        //  }

        describe('get style()', function () {
        });

        //  set style(value:string|null) {
        //      this.element.setAttribute("style", value || "");
        //  }

        describe('set style()', function () {
        });

        //  get tagName():string {
        //      return this.element.tagName;
        //  }

        describe('get tagName()', function () {
        });

        //  get title():string {
        //      return this.element.title;
        //  }

//  W3C Elget titleement Methods

    // Node

        //  appendChild(child:Node):Node {
        //      return this.element.appendChild(child);
        //  }

        describe('appendChild()', function () {
        });

        //  cloneNode(deep:boolean = false):Node {
        //      return this.element.cloneNode(deep);
        //  }

        describe('cloneNode()', function () {
        });

        //  compareDocumentPosition(other:Node):number {
        //      return this.element.compareDocumentPosition(other);
        //  }

        describe('compareDocumentPosition()', function () {
        });

        //  hasChildNodes():boolean {
        //      return this.element.hasChildNodes();
        //  }

        describe('hasChildNodes()', function () {
        });

        //  insertBefore(newChild:Node, refChild:Node):Node {
        //      return this.element.insertBefore(newChild, refChild);
        //  }

        describe('insertBefore()', function () {
        });

        //  isDefaultNamespace(namespace:string):boolean {
        //      return this.element.isDefaultNamespace(namespace);
        //  }

        describe('isDefaultNamespace()', function () {
        });

        //  isEqualNode(other:Node):boolean {
        //      return this.element.isEqualNode(other);
        //  }

        describe('isEqualNode()', function () {
        });

        //  isSameNode(other:Node):boolean {
        //      return this.element.isSameNode(other);
        //  }

        describe('isSameNode()', function () {
        });

        //  lookupNamespaceURI(prefix:string):string|null {
        //      return this.element.lookupNamespaceURI(prefix);
        //  }

        describe('lookupNamespaceURI()', function () {
        });

        //  lookupPrefix(namespace:string):string|null {
        //      return this.element.lookupPrefix(namespace);
        //  }

        describe('lookupPrefix()', function () {
        });

        //  normalize():void {
        //      this.element.normalize();
        //  }

        describe('normalize()', function () {
        });

        //  removeChild(oldChild:Node):Node {
        //      return this.element.removeChild(oldChild);
        //  }

        describe('removeChild()', function () {
        });

        //  replaceChild(oldChild:Node, newChild:Node):Node {
        //      return this.element.replaceChild(oldChild, newChild);
        //  }

        describe('replaceChild()', function () {
        });

    // Element

        //  blur():Element {
        //      this.element.blur();
        //      return this;
        //  }

        describe('blur()', function () {
        });

        //  focus():Element {
        //      this.element.focus();
        //      return this;
        //  }

        describe('focus()', function () {
        });

        //  getAttribute(key:string):string|null {
        //      return this.element.getAttribute(key);
        //  }

        describe('getAttribute()', function () {
        });

        //  getAttributeNS(namespace:string, key:string) {
        //      return this.element.getAttributeNS(namespace, key);
        //  }

        describe('getAttributeNS()', function () {
        });

        //  getBoundingClientRect():any {
        //      return this.element.getBoundingClientRect();
        //  }

        describe('getBoundingClientRect()', function () {
        });

        //  getClientRects():any {
        //      return this.element.getClientRects();
        //  }

        describe('getClientRects()', function () {
        });

        //  getElementsByClassName(classes:string|string[]):HTMLCollectionOf<Element> {
        //      classes = (classes instanceof Array) ? classes.join(" ") : classes;
        //      return this.element.getElementsByClassName(classes);
        //  }

        describe('getElementsByClassName()', function () {
        });

        //  getElementsByTagName(tag:string):Element[] {
        //      return Array.from(this.element.getElementsByTagName(tag));
        //  }

        describe('getElementsByTagName()', function () {
        });

        //  getElementsByTagNameNS(namespace:string, tag:string):Element[] {
        //      return Array.from(this.element.getElementsByTagNameNS(namespace, tag));
        //  }

        describe('getElementsByTagNameNS()', function () {
        });

        //  hasAttribute(key:string):boolean {
        //      return this.element.hasAttribute(key);
        //  }

        describe('hasAttribute()', function () {
        });

        //  hasAttributeNS(namespace:string, key:string):boolean {
        //      return this.element.hasAttributeNS(namespace, key);
        //  }

        describe('hasAttributeNS()', function () {
        });

        //  insertAdjacentHTML(position:InsertPosition, text:string) {
        //      this.element.insertAdjacentHTML(position, text);
        //      return this;
        //  }

        describe('insertAdjacentHTML()', function () {
        });

        //
        //  querySelector(selector:Selector):Element {
        //      return new Element(this.element.querySelector(selector));
        //  }

        describe('querySelector()', function () {
        });

        //  _querySelector(selector:Selector):Element|null {
        //      return this.element.querySelector(selector);
        //  }

        describe('_querySelector()', function () {
        });

        //  querySelectorAll(selector:Selector):Element[] {
        //      return Array.from(this.element.querySelectorAll(selector));
        //  }

        describe('querySelectorAll()', function () {
        });

        //  _querySelectorAll(selector:Selector):Element[] {
        //      return Array.from(this.element.querySelectorAll(selector));
        //  }

        describe('_querySelectorAll()', function () {
        });

        //  removeAttribute(key:string):Element {
        //      this.element.removeAttribute(key);
        //      return this;
        //  }

        describe('removeAttribute()', function () {
        });

        //  removeAttributeNS(namespace:string, key:string):Element {
        //      this.element.removeAttributeNS(namespace, key);
        //      return this;
        //  }

        describe('removeAttributeNS()', function () {
        });

        //  scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        //      this.element.scrollIntoView(arg);
        //      return this;
        //  }

        describe('scrollIntoView()', function () {
        });

        //  setAttribute(key:string, value:string) {        // ???
        //      this.element.setAttribute(key, value);
        //      return this;
        //  }

        describe('setAttribute()', function () {
        });

        //  setAttributeNS(namespace:string, key:string, value:string) {    // ???
        //      this.element.setAttributeNS(namespace, key, value);
        //      return this;
        //  }

        describe('setAttributeNS()', function () {
        });
    });

    // class Selection {

    describe('class Selection', function () {

        //  constructor(selector:string|Selection|Element[]|Element[], parent?:Element|Element|HTMLElement|HTMLDocument) {
        //      var selection:Element[]
        //      if (selector instanceof Array) {
        //          if (selector.length) {
        //              if (selector[0] instanceof Element)
        //                  selection = <Element[]>selector;
        //              else if (selector[0] instanceof Element)
        //                  selection = (<Element[]>selector).map((queryjs) => { return <any>queryjs.element; });
        //          }
        //          else
        //              selection = null;
        //      }
        //      else if (selection instanceof Selection)
        //          selection = (<Selection>selector).selection;
        //      else if (parent instanceof Element)
        //          selection = Array.from(parent.element.querySelectorAll(<string>selector));
        //      else if (parent)
        //          selection = Array.from(parent.querySelectorAll(<string>selector));
        //      else
        //          selection = Array.from(document.querySelectorAll(<string>selector));
        //
        //      if (selection)
        //          this.selection = selection;
        //      else
        //          throw "Error: bad selector";
        //  }

        describe('()', function () {
        });

        //  $(selector:string):Selection {
        //      return new Selection(this.selection.map(function(element) { return new Element(selector, element); }));
        //  }

        describe('$(()', function () {
        });

        //  $$(selector:string):Selection {
        //      return new Selection(this.selection.map(function(element) { return new Selection(selector, element); }).flat());
        //  }

        describe('$$(()', function () {
        });

        //  html(value?:string):Selection|string[] {
        //      if (value) {
        //          this.selection.map(function(element:HTMLElement) { element.innerHTML = value; });
        //          return this;
        //      }
        //      else
        //          return this.selection.map(function(element:HTMLElement) { return element.innerHTML; });
        //  }

        describe('html()', function () {
        });

        //  text(value:string):Selection|string[] {
        //      if (value) {
        //          this.selection.map(function(element:HTMLElement) { element.innerText = value; });
        //          return this;
        //      }
        //      else
        //          return this.selection.map(function(element:HTMLElement) { return element.innerText; });
        //  }

        describe('text()', function () {
        });

        //  attr(name:string, value?:string):Selection|string[] {
        //      if (value) {
        //          this.selection.map(function(element) { element.setAttribute(name, value); });
        //          return this;
        //      }
        //      else
        //          return this.selection.map(function(element) { return element.getAttribute(name); });
        //  }

        describe('attr()', function () {
        });

    //  Events

        //  addEventListener<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:boolean|any) {
        //      this.selection.map(function(element) { return element.addEventListener(event, listener, options); });
        //  }

        describe('addEventListener()', function () {
        });

        //  removeEventListener<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:boolean|any) {
        //      this.selection.map(function(element) { return element.removeEventListener(event, listener, options); });
        //  }

        describe('removeEventListener()', function () {
        });

        //  on<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:boolean|any) {
        //      this.addEventListener(event, listener, options);
        //      return this;
        //  }

        describe('on()', function () {
        });

        //  once<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:any) {
        //      if (!isIE) {
        //          options = options || {once: true};
        //          return this.selection.map(function(element) {
        //              return element.addEventListener(event, listener, options);
        //          });
        //      }
        //      else {
        //          var _this = this;
        //          return this.selection.map(function(element) {
        //              return element.addEventListener(event, (evt: Event):void => {
        //                  element.removeEventListener(event, listener, options);
        //                  listener(evt);
        //              });
        //          }, options);
        //      }
        //  }

        describe('once()', function () {
        });

        //  off<K extends keyof DocumentEventMap>(event: K, listener: EventListener, options:boolean|any) {
        //      this.removeEventListener(event, listener, options);
        //      return this;
        //  }

        describe('off()', function () {
        });

    });

});
