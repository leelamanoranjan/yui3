/**
* The Native Transition Utility provides an API wrapper for CSS transitions.
* It is also the base module for the timer-based transition module.
* @module node
*/

/**
* Provides the base Transition class.
*
* @module node
* @submodule transition-native
*/

/**
 * A class for constructing transition instances.
 * @class Transition
 * @for Transition
 * @constructor
 * @extends Base
 */

var START = 'transition:start',
    END = 'transition:end',
    PROPERTY_END = 'transition:propertyEnd',

    TRANSITION = '-webkit-transition',
    TRANSITION_CAMEL = 'WebkitTransition',
    TRANSITION_PROPERTY = '-webkit-transition-property',
    TRANSITION_DURATION = '-webkit-transition-duration',
    TRANSITION_TIMING_FUNCTION = '-webkit-transition-timing-function',
    TRANSITION_DELAY = '-webkit-transition-delay',
    TRANSITION_END = 'webkitTransitionEnd',

Transition = function() {
    this.init.apply(this, arguments);
};

Transition._reKeywords = /^(?:node|duration|iterations|easing|delay)$/;

Transition.useNative = false;

if (TRANSITION in Y.config.doc.documentElement.style) {
    Transition.useNative = true;
    Transition.supported = true; // TODO: remove
}

Y.Node.DOM_EVENTS[TRANSITION_END] = 1; 

Transition.NAME = 'transition';

Transition.DEFAULT_EASING = 'ease-in-out';
Transition.DEFAULT_DURATION = 0.5;
Transition.DEFAULT_DELAY = 0;

Transition.prototype = {
    constructor: Transition,
    init: function(node, config) {
        if (!this._running) {
            this._node = node;
            this._config = config;
            node._transition = this; // cache for reuse

            this.initAttrs(config);

            this._duration = ('duration' in config) ?
                config.duration: this.constructor.DEFAULT_DURATION;

            this._delay = ('delay' in config) ?
                config.delay: this.constructor.DEFAULT_DELAY;

            this._easing = config.easing || this.constructor.DEFAULT_EASING;
            this._count = 0; // track number of animated properties
            this._totalDuration = 0;
            this._running = false;
        }
        return this;
    },

    initAttrs: function(config) {
        var attrs = {},
            attr;
        for (attr in config) {
            if (!Transition._reKeywords.test(attr)) {
                attrs[attr] = config[attr];
            }
        }

        if (attrs.transform && !attrs['-webkit-transform']) {
            attrs['-webkit-transform'] = attrs.transform;
            delete attrs.transform;
        }

        this._attrs = attrs;
    },

    /**
     * Starts or an animation.
     * @method run
     * @chainable
     */    
    run: function(callback) {
        var anim = this,
            attrs = anim._attrs,
            attr;

        if (!anim._running) {
            anim._running = true;

            anim._start();
        }

        anim._callback = callback;
        return anim;
    },

    _start: function() {
        this._runNative();
    },

    _prepDur: function(dur) {
        dur = parseFloat(dur);

        if (dur > this._totalDuration) {
            this._totalDuration = dur;
        }

        return dur + 's';
    },

    _runNative: function(time) {
        var transitions = {}, 
            anim = this,
            node = anim._node,
            domNode = node._node,
            style = domNode.style,
            computed = getComputedStyle(domNode),
            attrs = anim._attrs,
            cssText = '',
            cssTransition = computed[TRANSITION_PROPERTY],

            transitionText = TRANSITION_PROPERTY + ': ',
            duration = TRANSITION_DURATION + ': ',
            easing = TRANSITION_TIMING_FUNCTION + ': ',
            delay = TRANSITION_DELAY + ': ',
            transition,
            val,
            dur,
            del,
            attr;

        if (cssTransition !== 'all') {
            transitionText += cssTransition + ',';
            duration += computed[TRANSITION_DURATION] + ',';
            easing += computed[TRANSITION_TIMING_FUNCTION] + ',';
            delay += computed[TRANSITION_DELAY] + ',';

        }

        for (attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                transitions[attr] = attrs[attr];
                transition = transitions[attr];
                val = transition;
                anim._count++;

                if (typeof transition.value !== 'undefined') {
                    val = transition.value; 
                }

                if (typeof val === 'function') {
                    val = val.call(node, node);
                }

                dur = (typeof transition.duration !== 'undefined') ? transition.duration :
                        anim._duration;

                del = (typeof transition.delay !== 'undefined') ? transition.delay :
                        anim._delay;

                if (!dur) { // make async and fire events
                    dur = .00001;
                }

                duration += anim._prepDur(dur) + ',';
                delay += anim._prepDur(del) + ',';
                easing += (transition.easing || anim._easing) + ',';

                transitionText += attr + ',';
                cssText += attr + ': ' + val + '; ';
            }
        }

        transitionText = transitionText.replace(/,$/, ';');
        duration = duration.replace(/,$/, ';');
        easing = easing.replace(/,$/, ';');
        delay = delay.replace(/,$/, ';');

        if (!anim._hasEndEvent) {
            node.on(TRANSITION_END, this._onNativeEnd, this);
            anim._hasEndEvent = true;

        }

        //setTimeout(function() { // allow any style init to occur (setStyle, etc)
            style.cssText += transitionText + duration + easing + delay + cssText;
        //}, 0);

    },

    _onNativeEnd: function(e) {
        var event = e._event,
            anim = this,
            node = anim._node;

        anim._count--;
        if (anim._count <= 0)  {
            node._node.style[TRANSITION_CAMEL] = '';

            anim._running = false;

            if (anim._callback) {
                anim._callback.call(node, {
                    elapsedTime: event.elapsedTime
                });

                anim._callback = null;
            }
        }
    },

    destroy: function() {
        this.detachAll();
        this._node = null;
    }
};

Y.Transition = Transition;
Y.TransitionNative = Transition; // TODO: remove

/** 
    Animate one or more css properties to a given value.
    <pre>example usage:
        Y.one('#demo').transition({
            duration: 1, // seconds
            easing: 'ease-out',
            height: '10px',
            width: '10px',
            opacity: { // per property duration and/or easing
                value: 0,
                duration: 2,
                easing: 'ease-in'
            }
        });
    </pre>
    @for node
    @method transition
    @param {Object} An object containing one or more style properties, a duration and an easing.
    @chainable
*/
Y.Node.prototype.transition = function(config, callback) {
    var anim = this._transition;
    
    if (anim && !anim._running) {
        anim.init(this, config);
    } else {
        anim = new Transition(this, config);
    }

    anim.run(callback);
    return this;
};
